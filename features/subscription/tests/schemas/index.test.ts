import {
  subscriptionTierSchema,
  subscriptionStatusSchema,
  subscriptionPlanSchema,
  mockCheckoutSchema,
  subscriptionUpdateSchema,
} from '@/features/subscription/schemas';

describe('subscriptionTierSchema', function describeSubscriptionTierSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates Pro tier', function itValidatesProTier() {
      const result = subscriptionTierSchema.safeParse('Pro');

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toBe('Pro');
      }
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid tier', function itRejectsInvalidTier() {
      const result = subscriptionTierSchema.safeParse('Basic');

      expect(result.success).toBe(false);
    });

    it('rejects empty string', function itRejectsEmptyString() {
      const result = subscriptionTierSchema.safeParse('');

      expect(result.success).toBe(false);
    });

    it('rejects case-sensitive mismatch', function itRejectsCaseMismatch() {
      const result = subscriptionTierSchema.safeParse('pro');

      expect(result.success).toBe(false);
    });
  });
});

describe('subscriptionStatusSchema', function describeSubscriptionStatusSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates active status', function itValidatesActive() {
      const result = subscriptionStatusSchema.safeParse('active');
      expect(result.success).toBe(true);
    });

    it('validates canceled status', function itValidatesCanceled() {
      const result = subscriptionStatusSchema.safeParse('canceled');
      expect(result.success).toBe(true);
    });

    it('validates expired status', function itValidatesExpired() {
      const result = subscriptionStatusSchema.safeParse('expired');
      expect(result.success).toBe(true);
    });

    it('validates past_due status', function itValidatesPastDue() {
      const result = subscriptionStatusSchema.safeParse('past_due');
      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid status', function itRejectsInvalidStatus() {
      const result = subscriptionStatusSchema.safeParse('pending');

      expect(result.success).toBe(false);
    });

    it('rejects empty string', function itRejectsEmptyString() {
      const result = subscriptionStatusSchema.safeParse('');

      expect(result.success).toBe(false);
    });
  });
});

describe('subscriptionPlanSchema', function describeSubscriptionPlanSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates monthly plan', function itValidatesMonthly() {
      const result = subscriptionPlanSchema.safeParse('monthly');

      expect(result.success).toBe(true);
    });

    it('validates annual plan', function itValidatesAnnual() {
      const result = subscriptionPlanSchema.safeParse('annual');

      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid plan', function itRejectsInvalidPlan() {
      const result = subscriptionPlanSchema.safeParse('weekly');

      expect(result.success).toBe(false);
    });
  });
});

describe('mockCheckoutSchema', function describeMockCheckoutSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates checkout with monthly plan', function itValidatesMonthlyCheckout() {
      const result = mockCheckoutSchema.safeParse({ plan: 'monthly' });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.plan).toBe('monthly');
      }
    });

    it('validates checkout with annual plan', function itValidatesAnnualCheckout() {
      const result = mockCheckoutSchema.safeParse({ plan: 'annual' });

      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects missing plan', function itRejectsMissingPlan() {
      const result = mockCheckoutSchema.safeParse({});

      expect(result.success).toBe(false);
    });

    it('rejects invalid plan', function itRejectsInvalidPlan() {
      const result = mockCheckoutSchema.safeParse({ plan: 'quarterly' });

      expect(result.success).toBe(false);
    });
  });
});

describe('subscriptionUpdateSchema', function describeSubscriptionUpdateSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates with all optional fields', function itValidatesAllOptional() {
      const result = subscriptionUpdateSchema.safeParse({
        subscriptionTier: 'Pro',
        subscriptionStatus: 'active',
        subscriptionEndsAt: new Date('2025-12-31'),
        creditsRemaining: 100,
      });

      expect(result.success).toBe(true);
    });

    it('validates with partial fields', function itValidatesPartialFields() {
      const result = subscriptionUpdateSchema.safeParse({
        subscriptionStatus: 'canceled',
      });

      expect(result.success).toBe(true);
    });

    it('validates empty object (all fields optional)', function itValidatesEmptyObject() {
      const result = subscriptionUpdateSchema.safeParse({});

      expect(result.success).toBe(true);
    });

    it('validates with only creditsRemaining', function itValidatesOnlyCredits() {
      const result = subscriptionUpdateSchema.safeParse({
        creditsRemaining: 50,
      });

      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid tier', function itRejectsInvalidTier() {
      const result = subscriptionUpdateSchema.safeParse({
        subscriptionTier: 'Basic',
      });

      expect(result.success).toBe(false);
    });

    it('rejects invalid status', function itRejectsInvalidStatus() {
      const result = subscriptionUpdateSchema.safeParse({
        subscriptionStatus: 'unknown',
      });

      expect(result.success).toBe(false);
    });

    it('rejects non-integer credits', function itRejectsNonIntegerCredits() {
      const result = subscriptionUpdateSchema.safeParse({
        creditsRemaining: 10.5,
      });

      expect(result.success).toBe(false);
    });

    it('rejects invalid date type', function itRejectsInvalidDate() {
      const result = subscriptionUpdateSchema.safeParse({
        subscriptionEndsAt: 'not-a-date',
      });

      expect(result.success).toBe(false);
    });
  });
});

