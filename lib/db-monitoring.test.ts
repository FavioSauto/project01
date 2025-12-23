import { queryMonitor, withQueryTiming, withTiming, getPerformanceReport, QUERY_THRESHOLDS } from './db-monitoring';

describe('db-monitoring', () => {
  beforeEach(() => {
    queryMonitor.clear();
    jest.restoreAllMocks();
  });

  describe('queryMonitor', () => {
    it('should record and retrieve query stats', () => {
      queryMonitor.record({
        queryName: 'test-query',
        durationMs: 50,
        timestamp: new Date(),
        slow: false,
      });

      const stats = queryMonitor.getQueryStats('test-query');
      expect(stats).toEqual({
        queryName: 'test-query',
        count: 1,
        avgMs: 50,
        minMs: 50,
        maxMs: 50,
        slowCount: 0,
        slowPercentage: 0,
      });
    });

    it('should handle multiple records for the same query', () => {
      queryMonitor.record({ queryName: 'q', durationMs: 10, timestamp: new Date(), slow: false });
      queryMonitor.record({ queryName: 'q', durationMs: 20, timestamp: new Date(), slow: false });
      queryMonitor.record({ queryName: 'q', durationMs: 150, timestamp: new Date(), slow: true });

      const stats = queryMonitor.getQueryStats('q');
      expect(stats?.count).toBe(3);
      expect(stats?.avgMs).toBe(60); // (10 + 20 + 150) / 3
      expect(stats?.slowCount).toBe(1);
      expect(stats?.slowPercentage).toBe(33);
    });

    it('should limit the number of timings kept in memory', () => {
      // Accessing private property for testing
      const monitor = queryMonitor as any;
      const limit = monitor.maxTimings;

      for (let i = 0; i < limit + 10; i++) {
        queryMonitor.record({ queryName: 'q', durationMs: 1, timestamp: new Date(), slow: false });
      }

      expect(monitor.timings.length).toBe(limit);
    });

    it('should return slowest queries', () => {
      queryMonitor.record({ queryName: 'fast', durationMs: 10, timestamp: new Date(), slow: false });
      queryMonitor.record({ queryName: 'slow', durationMs: 200, timestamp: new Date(), slow: true });
      queryMonitor.record({ queryName: 'medium', durationMs: 50, timestamp: new Date(), slow: false });

      const slowest = queryMonitor.getSlowestQueries(2);
      expect(slowest.length).toBe(2);
      expect(slowest[0].queryName).toBe('slow');
      expect(slowest[1].queryName).toBe('medium');
    });
  });

  describe('withQueryTiming', () => {
    it('should measure and record successful query', async () => {
      const result = await withQueryTiming('test', async () => {
        return 'data';
      });

      expect(result).toBe('data');
      const stats = queryMonitor.getQueryStats('test');
      expect(stats?.count).toBe(1);
    });

    it('should record failed query', async () => {
      const error = new Error('DB fail');
      await expect(withQueryTiming('fail-test', async () => {
        throw error;
      })).rejects.toThrow(error);

      const stats = queryMonitor.getQueryStats('fail-test (FAILED)');
      expect(stats?.count).toBe(1);
      expect(stats?.slowCount).toBe(1);
    });
  });

  describe('withTiming', () => {
    it('should measure sync operation', () => {
      const result = withTiming('sync-op', () => 'sync-result');
      expect(result).toBe('sync-result');
    });

    it('should rethrow error from sync operation', () => {
      expect(() => withTiming('fail-sync', () => {
        throw new Error('fail');
      })).toThrow('fail');
    });
  });

  describe('getPerformanceReport', () => {
    it('should generate a summary report', () => {
      queryMonitor.record({ queryName: 'q1', durationMs: 10, timestamp: new Date(), slow: false });
      queryMonitor.record({ queryName: 'q2', durationMs: 200, timestamp: new Date(), slow: true });

      const report = getPerformanceReport();
      expect(report.summary.totalQueries).toBe(2);
      expect(report.summary.uniqueQueries).toBe(2);
      expect(report.summary.slowQueries).toBe(1);
      expect(report.slowestQueries[0].queryName).toBe('q2');
    });
  });
});

