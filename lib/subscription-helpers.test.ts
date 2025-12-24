import {
  getUserSubscriptionTier,
  isSubscriptionActive,
  canAccessFeature,
  getFeatureLimits,
  getMaxConcurrentConnections,
} from './subscription-helpers';
import { getUserSubscription } from '@/features/subscription/server/db';

jest.mock('@/features/subscription/server/db', () => ({
  getUserSubscription: jest.fn(),
}));

describe('subscription-helpers', () => {
  describe('getUserSubscriptionTier', () => {
    it('should return null if user has no subscription', async () => {
      (getUserSubscription as jest.Mock).mockResolvedValueOnce(null);
      const result = await getUserSubscriptionTier('user-1');
      expect(result).toBe(null);
    });

    it('should return Pro if user has active Pro subscription', async () => {
      const endsAt = new Date();
      endsAt.setDate(endsAt.getDate() + 30);
      
      (getUserSubscription as jest.Mock).mockResolvedValueOnce({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
        subscriptionEndsAt: endsAt,
      });

      const result = await getUserSubscriptionTier('user-1');
      expect(result).toBe('Pro');
    });

    it('should return null if Pro subscription is expired', async () => {
      const endsAt = new Date();
      endsAt.setDate(endsAt.getDate() - 1);
      
      (getUserSubscription as jest.Mock).mockResolvedValueOnce({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
        subscriptionEndsAt: endsAt,
      });

      const result = await getUserSubscriptionTier('user-1');
      expect(result).toBe(null);
    });

    it('should return null if status is not active', async () => {
      const endsAt = new Date();
      endsAt.setDate(endsAt.getDate() + 30);
      
      (getUserSubscription as jest.Mock).mockResolvedValueOnce({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'canceled',
        subscriptionEndsAt: endsAt,
      });

      const result = await getUserSubscriptionTier('user-1');
      expect(result).toBe(null);
    });
  });

  describe('isSubscriptionActive', () => {
    it('should return false if status is not active', () => {
      expect(isSubscriptionActive('canceled', new Date())).toBe(false);
      expect(isSubscriptionActive(null, new Date())).toBe(false);
    });

    it('should return false if endsAt is null', () => {
      expect(isSubscriptionActive('active', null)).toBe(false);
    });

    it('should return false if endsAt is in the past', () => {
      const past = new Date();
      past.setDate(past.getDate() - 1);
      expect(isSubscriptionActive('active', past)).toBe(false);
    });

    it('should return true if status is active and endsAt is in the future', () => {
      const future = new Date();
      future.setDate(future.getDate() + 1);
      expect(isSubscriptionActive('active', future)).toBe(true);
    });
  });

  describe('canAccessFeature', () => {
    it('should return true only for Pro tier', () => {
      expect(canAccessFeature('Pro', 'any-feature')).toBe(true);
      expect(canAccessFeature(null, 'any-feature')).toBe(false);
    });
  });

  describe('getFeatureLimits', () => {
    it('should return limits for Pro tier', () => {
      const limits = getFeatureLimits('Pro');
      expect(limits).not.toBeNull();
      expect(limits?.maxConcurrentConnections).toBe(5);
    });

    it('should return null for non-Pro tier', () => {
      expect(getFeatureLimits(null)).toBeNull();
    });
  });

  describe('getMaxConcurrentConnections', () => {
    it('should return 5 for Pro tier', () => {
      expect(getMaxConcurrentConnections('Pro')).toBe(5);
    });

    it('should return 0 for non-Pro tier', () => {
      expect(getMaxConcurrentConnections(null)).toBe(0);
    });
  });
});


