import {
  checkRateLimit,
  clearRateLimit,
  clearAllRateLimits,
  checkUserRateLimit,
} from './rate-limiter';

describe('rate-limiter', () => {
  beforeEach(() => {
    clearAllRateLimits();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('checkRateLimit', () => {
    const config = {
      maxRequests: 3,
      windowMs: 1000, // 1 second
    };

    it('should allow requests within the limit', () => {
      const identifier = 'test-ip';

      let result = checkRateLimit(identifier, config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(2);

      result = checkRateLimit(identifier, config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(1);

      result = checkRateLimit(identifier, config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(0);
    });

    it('should deny requests exceeding the limit', () => {
      const identifier = 'test-ip';

      // Use up the limit
      checkRateLimit(identifier, config);
      checkRateLimit(identifier, config);
      checkRateLimit(identifier, config);

      const result = checkRateLimit(identifier, config);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should reset limit after window has passed', () => {
      const identifier = 'test-ip';

      // Use up the limit
      checkRateLimit(identifier, config);
      checkRateLimit(identifier, config);
      checkRateLimit(identifier, config);

      // Advance time by 1.1 seconds
      jest.advanceTimersByTime(1100);

      const result = checkRateLimit(identifier, config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(2);
    });

    it('should handle different identifiers independently', () => {
      const configWithSmallLimit = { maxRequests: 1, windowMs: 1000 };
      
      checkRateLimit('ip-1', configWithSmallLimit);
      
      const result1 = checkRateLimit('ip-1', configWithSmallLimit);
      expect(result1.allowed).toBe(false);

      const result2 = checkRateLimit('ip-2', configWithSmallLimit);
      expect(result2.allowed).toBe(true);
    });

    it('should calculate resetAt correctly', () => {
      const identifier = 'test-ip';
      const now = Date.now();
      
      const result = checkRateLimit(identifier, config);
      expect(result.resetAt).toBe(now + config.windowMs);
    });
  });

  describe('checkUserRateLimit', () => {
    const config = { maxRequests: 2, windowMs: 1000 };

    it('should use a user-specific prefix', () => {
      const userId = 'user-123';
      
      checkUserRateLimit(userId, config);
      
      // Manually checking the same identifier as checkUserRateLimit would use
      const result = checkRateLimit(`user:${userId}`, config);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(0);
    });
  });

  describe('clearRateLimit', () => {
    it('should clear data for a specific identifier', () => {
      const identifier = 'test-ip';
      const config = { maxRequests: 1, windowMs: 1000 };

      checkRateLimit(identifier, config);
      expect(checkRateLimit(identifier, config).allowed).toBe(false);

      clearRateLimit(identifier);
      expect(checkRateLimit(identifier, config).allowed).toBe(true);
    });
  });

  describe('cleanup logic', () => {
    it('should perform global cleanup periodically', () => {
      const config = { maxRequests: 10, windowMs: 1000 };
      
      // Add an entry
      checkRateLimit('old-ip', config);
      
      // Advance time beyond cleanup interval (10 mins)
      // and twice the window duration
      jest.advanceTimersByTime(11 * 60 * 1000);
      
      // This call should trigger global cleanup
      checkRateLimit('new-ip', config);
      
      // After cleanup, old-ip should be gone, so a new check should start fresh
      const result = checkRateLimit('old-ip', config);
      expect(result.remaining).toBe(9);
    });
  });
});


