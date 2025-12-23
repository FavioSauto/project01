import {
  mockCheckout,
  cancelSubscription,
  reactivateSubscription,
  getCurrentSubscription,
} from '@/features/subscription/server/actions';

// Mock dependencies
jest.mock('@/features/auth/libs/auth', function mockAuth() {
  return {
    auth: {
      api: {
        getSession: jest.fn(),
      },
    },
  };
});

jest.mock('next/headers', function mockHeaders() {
  return {
    headers: jest.fn().mockResolvedValue(new Headers()),
  };
});

jest.mock('@/features/subscription/server/db', function mockDb() {
  return {
    getUserSubscription: jest.fn(),
    updateUserSubscription: jest.fn(),
  };
});

jest.mock('@/lib/session-helpers', function mockSessionHelpers() {
  return {
    notifySubscriptionChange: jest.fn(),
  };
});

// Import mocked modules for assertions
import { auth } from '@/features/auth/libs/auth';
import { getUserSubscription, updateUserSubscription } from '@/features/subscription/server/db';
import { notifySubscriptionChange } from '@/lib/session-helpers';

const mockGetSession = auth.api.getSession as jest.Mock;
const mockGetUserSubscription = getUserSubscription as jest.Mock;
const mockUpdateUserSubscription = updateUserSubscription as jest.Mock;
const mockNotifySubscriptionChange = notifySubscriptionChange as jest.Mock;

describe('mockCheckout', function describeMockCheckout() {
  beforeEach(function beforeEachTest() {
    jest.clearAllMocks();
  });

  describe('success cases', function describeSuccessCases() {
    it('subscribes user to monthly Pro plan', async function itSubscribesMonthly() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockUpdateUserSubscription.mockResolvedValue(undefined);
      mockNotifySubscriptionChange.mockResolvedValue(undefined);

      const result = await mockCheckout({ plan: 'monthly' });

      expect(result.success).toContain('Pro (monthly)');
      expect(mockUpdateUserSubscription).toHaveBeenCalledWith(
        'user-123',
        expect.objectContaining({
          subscriptionTier: 'Pro',
          subscriptionStatus: 'active',
        })
      );
      expect(mockNotifySubscriptionChange).toHaveBeenCalled();
    });

    it('subscribes user to annual Pro plan', async function itSubscribesAnnual() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockUpdateUserSubscription.mockResolvedValue(undefined);
      mockNotifySubscriptionChange.mockResolvedValue(undefined);

      const result = await mockCheckout({ plan: 'annual' });

      expect(result.success).toContain('Pro (annual)');
      expect(mockUpdateUserSubscription).toHaveBeenCalled();
    });

    it('sets correct subscription end date for monthly plan', async function itSetsMonthlyEndDate() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockUpdateUserSubscription.mockResolvedValue(undefined);
      mockNotifySubscriptionChange.mockResolvedValue(undefined);

      await mockCheckout({ plan: 'monthly' });

      const callArgs = mockUpdateUserSubscription.mock.calls[0][1];
      const endsAt = callArgs.subscriptionEndsAt as Date;
      const now = new Date();
      const daysDiff = Math.round((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      expect(daysDiff).toBeGreaterThanOrEqual(29);
      expect(daysDiff).toBeLessThanOrEqual(31);
    });

    it('sets correct subscription end date for annual plan', async function itSetsAnnualEndDate() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockUpdateUserSubscription.mockResolvedValue(undefined);
      mockNotifySubscriptionChange.mockResolvedValue(undefined);

      await mockCheckout({ plan: 'annual' });

      const callArgs = mockUpdateUserSubscription.mock.calls[0][1];
      const endsAt = callArgs.subscriptionEndsAt as Date;
      const now = new Date();
      const daysDiff = Math.round((endsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      expect(daysDiff).toBeGreaterThanOrEqual(364);
      expect(daysDiff).toBeLessThanOrEqual(366);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('returns error when user is not logged in', async function itReturnsErrorWhenNotLoggedIn() {
      mockGetSession.mockResolvedValue(null);

      const result = await mockCheckout({ plan: 'monthly' });

      expect(result.error).toBe('You must be logged in to subscribe');
      expect(mockUpdateUserSubscription).not.toHaveBeenCalled();
    });

    it('returns error when session has no user', async function itReturnsErrorWhenNoUser() {
      mockGetSession.mockResolvedValue({ user: null });

      const result = await mockCheckout({ plan: 'monthly' });

      expect(result.error).toBe('You must be logged in to subscribe');
    });

    it('returns error for invalid plan', async function itReturnsErrorForInvalidPlan() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });

      // @ts-expect-error - Testing invalid input
      const result = await mockCheckout({ plan: 'invalid' });

      expect(result.error).toBe('Invalid subscription plan');
    });

    it('returns error when update fails', async function itReturnsErrorOnUpdateFailure() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockUpdateUserSubscription.mockRejectedValue(new Error('DB error'));

      const result = await mockCheckout({ plan: 'monthly' });

      expect(result.error).toBe('Failed to process subscription. Please try again.');
    });
  });
});

describe('cancelSubscription', function describeCancelSubscription() {
  beforeEach(function beforeEachTest() {
    jest.clearAllMocks();
  });

  describe('success cases', function describeSuccessCases() {
    it('cancels active Pro subscription', async function itCancelsActiveSubscription() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
      });
      mockUpdateUserSubscription.mockResolvedValue(undefined);
      mockNotifySubscriptionChange.mockResolvedValue(undefined);

      const result = await cancelSubscription();

      expect(result.success).toContain('Subscription canceled');
      expect(mockUpdateUserSubscription).toHaveBeenCalledWith('user-123', {
        subscriptionStatus: 'canceled',
      });
      expect(mockNotifySubscriptionChange).toHaveBeenCalled();
    });
  });

  describe('error cases', function describeErrorCases() {
    it('returns error when user is not logged in', async function itReturnsErrorWhenNotLoggedIn() {
      mockGetSession.mockResolvedValue(null);

      const result = await cancelSubscription();

      expect(result.error).toBe('You must be logged in');
    });

    it('returns error when no subscription exists', async function itReturnsErrorWhenNoSubscription() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue(null);

      const result = await cancelSubscription();

      expect(result.error).toBe('No active subscription found');
    });

    it('returns error when subscription is not Pro', async function itReturnsErrorWhenNotPro() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue({
        subscriptionTier: null,
        subscriptionStatus: null,
      });

      const result = await cancelSubscription();

      expect(result.error).toBe('No active subscription found');
    });

    it('returns error when update fails', async function itReturnsErrorOnFailure() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
      });
      mockUpdateUserSubscription.mockRejectedValue(new Error('DB error'));

      const result = await cancelSubscription();

      expect(result.error).toBe('Failed to cancel subscription. Please try again.');
    });
  });
});

describe('reactivateSubscription', function describeReactivateSubscription() {
  beforeEach(function beforeEachTest() {
    jest.clearAllMocks();
  });

  describe('success cases', function describeSuccessCases() {
    it('reactivates canceled subscription', async function itReactivatesSubscription() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'canceled',
      });
      mockUpdateUserSubscription.mockResolvedValue(undefined);
      mockNotifySubscriptionChange.mockResolvedValue(undefined);

      const result = await reactivateSubscription();

      expect(result.success).toContain('reactivated');
      expect(mockUpdateUserSubscription).toHaveBeenCalledWith('user-123', {
        subscriptionStatus: 'active',
      });
    });
  });

  describe('error cases', function describeErrorCases() {
    it('returns error when user is not logged in', async function itReturnsErrorWhenNotLoggedIn() {
      mockGetSession.mockResolvedValue(null);

      const result = await reactivateSubscription();

      expect(result.error).toBe('You must be logged in');
    });

    it('returns error when no canceled subscription exists', async function itReturnsErrorWhenNoCanceledSubscription() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
      });

      const result = await reactivateSubscription();

      expect(result.error).toBe('No canceled subscription found');
    });

    it('returns error when subscription is null', async function itReturnsErrorWhenNull() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue(null);

      const result = await reactivateSubscription();

      expect(result.error).toBe('No canceled subscription found');
    });
  });
});

describe('getCurrentSubscription', function describeGetCurrentSubscription() {
  beforeEach(function beforeEachTest() {
    jest.clearAllMocks();
  });

  describe('success cases', function describeSuccessCases() {
    it('returns subscription data for logged in user', async function itReturnsSubscriptionData() {
      const subscriptionData = {
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
        subscriptionEndsAt: new Date(),
        creditsRemaining: 100,
      };
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue(subscriptionData);

      const result = await getCurrentSubscription();

      expect(result.success).toBe('Subscription retrieved');
      expect(result.data).toEqual(subscriptionData);
    });

    it('returns null subscription data for free user', async function itReturnsNullForFreeUser() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockResolvedValue(null);

      const result = await getCurrentSubscription();

      expect(result.success).toBe('Subscription retrieved');
      expect(result.data).toBeNull();
    });
  });

  describe('error cases', function describeErrorCases() {
    it('returns error when user is not logged in', async function itReturnsErrorWhenNotLoggedIn() {
      mockGetSession.mockResolvedValue(null);

      const result = await getCurrentSubscription();

      expect(result.error).toBe('You must be logged in');
    });

    it('returns error when retrieval fails', async function itReturnsErrorOnFailure() {
      mockGetSession.mockResolvedValue({
        user: { id: 'user-123' },
      });
      mockGetUserSubscription.mockRejectedValue(new Error('DB error'));

      const result = await getCurrentSubscription();

      expect(result.error).toBe('Failed to retrieve subscription');
    });
  });
});

