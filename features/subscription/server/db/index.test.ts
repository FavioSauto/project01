import { getUserSubscription, getUserWithSubscription, updateUserSubscription } from './index';
import { db } from '@/drizzle/db';
import { user } from '@/drizzle/schema';

// Mock drizzle
jest.mock('@/drizzle/db', () => ({
  db: {
    query: {
      user: {
        findFirst: jest.fn(),
      },
    },
    update: jest.fn(() => ({
      set: jest.fn(() => ({
        where: jest.fn().mockResolvedValue({}),
      })),
    })),
  },
}));

describe('subscription-db', () => {
  const userId = 'user-1';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserSubscription', () => {
    it('should return subscription data if found', async () => {
      const mockResult = {
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
      };
      (db.query.user.findFirst as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await getUserSubscription(userId);

      expect(result).toBe(mockResult);
      expect(db.query.user.findFirst).toHaveBeenCalled();
    });

    it('should return null if not found', async () => {
      (db.query.user.findFirst as jest.Mock).mockResolvedValueOnce(null);

      const result = await getUserSubscription(userId);

      expect(result).toBe(null);
    });

    it('should throw semantic error on failure', async () => {
      (db.query.user.findFirst as jest.Mock).mockRejectedValueOnce(new Error('DB error'));

      await expect(getUserSubscription(userId)).rejects.toThrow('Failed to retrieve user subscription');
    });
  });

  describe('getUserWithSubscription', () => {
    it('should return full user data if found', async () => {
      const mockResult = { id: userId, email: 'test@example.com' };
      (db.query.user.findFirst as jest.Mock).mockResolvedValueOnce(mockResult);

      const result = await getUserWithSubscription(userId);

      expect(result).toBe(mockResult);
    });

    it('should throw if user not found', async () => {
      (db.query.user.findFirst as jest.Mock).mockResolvedValueOnce(null);

      await expect(getUserWithSubscription(userId)).rejects.toThrow(`User with ID ${userId} not found`);
    });
  });

  describe('updateUserSubscription', () => {
    it('should update user data successfully', async () => {
      const updateData = { subscriptionTier: 'Pro' as const };
      
      await updateUserSubscription(userId, updateData);

      expect(db.update).toHaveBeenCalledWith(user);
    });

    it('should throw semantic error on failure', async () => {
      const updateData = { subscriptionTier: 'Pro' as const };
      (db.update as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Update failed');
      });

      await expect(updateUserSubscription(userId, updateData)).rejects.toThrow('Failed to update user subscription');
    });
  });
});


