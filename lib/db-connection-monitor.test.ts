import { getConnectionStats, getActiveConnections, terminateIdleConnections, logPoolStats } from './db-connection-monitor';
import { Pool } from 'pg';

describe('db-connection-monitor', () => {
  let mockClient: any;
  let mockPool: any;

  beforeEach(() => {
    mockClient = {
      query: jest.fn(),
      release: jest.fn(),
    };
    mockPool = {
      connect: jest.fn().mockResolvedValue(mockClient),
      totalCount: 10,
      idleCount: 5,
      waitingCount: 0,
    };
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('getConnectionStats', () => {
    it('should query and return connection stats', async () => {
      const mockResult = {
        rows: [{ total_connections: 5, active_connections: 2, idle_connections: 3 }],
      };
      mockClient.query.mockResolvedValueOnce(mockResult);

      const stats = await getConnectionStats(mockPool as Pool);

      expect(mockPool.connect).toHaveBeenCalled();
      expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining('pg_stat_activity'));
      expect(stats).toEqual(mockResult.rows[0]);
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should release client even if query fails', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('Query failed'));

      await expect(getConnectionStats(mockPool as Pool)).rejects.toThrow('Query failed');
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('getActiveConnections', () => {
    it('should return list of active connections', async () => {
      const mockRows = [{ pid: 123, usename: 'user', state: 'active' }];
      mockClient.query.mockResolvedValueOnce({ rows: mockRows });

      const connections = await getActiveConnections(mockPool as Pool);

      expect(connections).toEqual(mockRows);
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('terminateIdleConnections', () => {
    it('should terminate idle connections and return count', async () => {
      mockClient.query.mockResolvedValueOnce({ rowCount: 3 });

      const count = await terminateIdleConnections(mockPool as Pool, 10);

      expect(count).toBe(3);
      expect(mockClient.query).toHaveBeenCalledWith(expect.stringContaining("INTERVAL '10 minutes'"));
      expect(mockClient.release).toHaveBeenCalled();
    });

    it('should return 0 if no rowCount is present', async () => {
      mockClient.query.mockResolvedValueOnce({});

      const count = await terminateIdleConnections(mockPool as Pool);

      expect(count).toBe(0);
    });
  });

  describe('logPoolStats', () => {
    it('should log pool stats and db stats by default', async () => {
      const mockDbStats = { total_connections: 5 };
      mockClient.query.mockResolvedValueOnce({ rows: [mockDbStats] });

      await logPoolStats(mockPool as Pool);

      expect(console.log).toHaveBeenCalledWith('[Pool Stats]', {
        total: 10,
        idle: 5,
        waiting: 0,
      });
      expect(console.log).toHaveBeenCalledWith('[DB Connection Stats]', mockDbStats);
    });

    it('should only log pool stats if includeDbStats is false', async () => {
      await logPoolStats(mockPool as Pool, false);

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(mockPool.connect).not.toHaveBeenCalled();
    });

    it('should log error if db stats query fails', async () => {
      mockClient.query.mockRejectedValueOnce(new Error('DB error'));

      await logPoolStats(mockPool as Pool);

      expect(console.error).toHaveBeenCalledWith('[DB Stats Error]', expect.any(Error));
    });
  });
});


