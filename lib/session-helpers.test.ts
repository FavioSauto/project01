import { getSession, getUserSubscription, invalidateAllSessions, notifySubscriptionChange } from './session-helpers';
import { auth } from '@/features/auth/libs/auth';
import { db } from '@/drizzle/db';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Mock Next.js headers and cache
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

// Mock auth
jest.mock('@/features/auth/libs/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
      revokeOtherSessions: jest.fn(),
    },
  },
}));

// Mock db
jest.mock('@/drizzle/db', () => ({
  db: {
    query: {
      user: {
        findFirst: jest.fn(),
      },
    },
  },
}));

describe('session-helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getSession', () => {
    it('should return session if authenticated', async () => {
      const mockSession = { user: { id: 'user-1' } };
      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.getSession as jest.Mock).mockResolvedValue(mockSession);

      const result = await getSession();

      expect(result).toBe(mockSession);
      expect(auth.api.getSession).toHaveBeenCalled();
    });

    it('should return null if not authenticated', async () => {
      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.getSession as jest.Mock).mockResolvedValue(null);

      const result = await getSession();

      expect(result).toBe(null);
    });

    it('should return null if an error occurs', async () => {
      (headers as jest.Mock).mockRejectedValue(new Error('Headers error'));

      const result = await getSession();

      expect(result).toBe(null);
    });
  });

  describe('getUserSubscription', () => {
    it('should return null if no session', async () => {
      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.getSession as jest.Mock).mockResolvedValue(null);

      const result = await getUserSubscription();

      expect(result).toBe(null);
    });

    it('should return fresh subscription data if authenticated', async () => {
      const mockSession = { user: { id: 'user-1' } };
      const mockUserData = {
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
        subscriptionEndsAt: new Date(),
        creditsRemaining: 10,
      };

      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.getSession as jest.Mock).mockResolvedValue(mockSession);
      (db.query.user.findFirst as jest.Mock).mockResolvedValue(mockUserData);

      const result = await getUserSubscription();

      expect(result).toEqual({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
        subscriptionEndsAt: mockUserData.subscriptionEndsAt,
        creditsRemaining: 10,
      });
    });

    it('should return null if user data not found', async () => {
      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.getSession as jest.Mock).mockResolvedValue({ user: { id: 'user-1' } });
      (db.query.user.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await getUserSubscription();

      expect(result).toBe(null);
    });

    it('should handle null fields from DB', async () => {
      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.getSession as jest.Mock).mockResolvedValue({ user: { id: 'user-1' } });
      (db.query.user.findFirst as jest.Mock).mockResolvedValue({
        subscriptionTier: null,
        subscriptionStatus: null,
        subscriptionEndsAt: null,
        creditsRemaining: null,
      });

      const result = await getUserSubscription();

      expect(result).toEqual({
        subscriptionTier: null,
        subscriptionStatus: null,
        subscriptionEndsAt: null,
        creditsRemaining: null,
      });
    });

    it('should return null if an error occurs', async () => {
      (headers as jest.Mock).mockRejectedValue(new Error('DB error'));

      const result = await getUserSubscription();

      expect(result).toBe(null);
    });
  });

  describe('invalidateAllSessions', () => {
    it('should return true if successful', async () => {
      (headers as jest.Mock).mockResolvedValue(new Map());
      (auth.api.revokeOtherSessions as jest.Mock).mockResolvedValue({ success: true });

      const result = await invalidateAllSessions();

      expect(result).toBe(true);
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    });

    it('should return false if an error occurs', async () => {
      (auth.api.revokeOtherSessions as jest.Mock).mockRejectedValue(new Error('Revoke error'));

      const result = await invalidateAllSessions();

      expect(result).toBe(false);
    });
  });

  describe('notifySubscriptionChange', () => {
    it('should revalidate paths', async () => {
      await notifySubscriptionChange();

      expect(revalidatePath).toHaveBeenCalledWith('/(protectedFeatures)', 'layout');
      expect(revalidatePath).toHaveBeenCalledWith('/api', 'layout');
      expect(revalidatePath).toHaveBeenCalledWith('/', 'layout');
    });

    it('should not throw if revalidatePath fails', async () => {
      (revalidatePath as jest.Mock).mockImplementation(() => {
        throw new Error('Revalidate error');
      });

      await expect(notifySubscriptionChange()).resolves.not.toThrow();
    });
  });
});


