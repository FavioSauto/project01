import {
  createHouseholdSchema,
  updateHouseholdSchema,
  updateMemberRoleSchema,
  addMemberSchema,
} from '@/features/feature01/schemas/feature';

describe('createHouseholdSchema', function describeCreateHouseholdSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates a valid household name', function itValidatesValidName() {
      const result = createHouseholdSchema.safeParse({ name: 'My Household' });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe('My Household');
      }
    });

    it('accepts names at minimum length (1 character)', function itAcceptsMinLength() {
      const result = createHouseholdSchema.safeParse({ name: 'A' });

      expect(result.success).toBe(true);
    });

    it('accepts names at maximum length (50 characters)', function itAcceptsMaxLength() {
      const name = 'A'.repeat(50);
      const result = createHouseholdSchema.safeParse({ name });

      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects empty name', function itRejectsEmptyName() {
      const result = createHouseholdSchema.safeParse({ name: '' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toContain('Household name is required');
      }
    });

    it('rejects name exceeding 50 characters', function itRejectsLongName() {
      const name = 'A'.repeat(51);
      const result = createHouseholdSchema.safeParse({ name });

      expect(result.success).toBe(false);
    });

    it('rejects missing name field', function itRejectsMissingName() {
      const result = createHouseholdSchema.safeParse({});

      expect(result.success).toBe(false);
    });

    it('rejects non-string name', function itRejectsNonStringName() {
      const result = createHouseholdSchema.safeParse({ name: 123 });

      expect(result.success).toBe(false);
    });
  });
});

describe('updateHouseholdSchema', function describeUpdateHouseholdSchema() {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000';

  describe('success cases', function describeSuccessCases() {
    it('validates a valid update payload', function itValidatesValidPayload() {
      const result = updateHouseholdSchema.safeParse({
        id: validUuid,
        name: 'Updated Household',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe(validUuid);
        expect(result.data.name).toBe('Updated Household');
      }
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid UUID format', function itRejectsInvalidUuid() {
      const result = updateHouseholdSchema.safeParse({
        id: 'not-a-uuid',
        name: 'Test',
      });

      expect(result.success).toBe(false);
    });

    it('rejects empty name', function itRejectsEmptyName() {
      const result = updateHouseholdSchema.safeParse({
        id: validUuid,
        name: '',
      });

      expect(result.success).toBe(false);
    });

    it('rejects missing id', function itRejectsMissingId() {
      const result = updateHouseholdSchema.safeParse({
        name: 'Test',
      });

      expect(result.success).toBe(false);
    });
  });
});

describe('updateMemberRoleSchema', function describeUpdateMemberRoleSchema() {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000';

  describe('success cases', function describeSuccessCases() {
    it('validates admin role assignment', function itValidatesAdminRole() {
      const result = updateMemberRoleSchema.safeParse({
        householdId: validUuid,
        memberId: validUuid,
        role: 'admin',
      });

      expect(result.success).toBe(true);
    });

    it('validates member role assignment', function itValidatesMemberRole() {
      const result = updateMemberRoleSchema.safeParse({
        householdId: validUuid,
        memberId: validUuid,
        role: 'member',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid role value', function itRejectsInvalidRole() {
      const result = updateMemberRoleSchema.safeParse({
        householdId: validUuid,
        memberId: validUuid,
        role: 'superadmin',
      });

      expect(result.success).toBe(false);
    });

    it('rejects invalid householdId UUID', function itRejectsInvalidHouseholdId() {
      const result = updateMemberRoleSchema.safeParse({
        householdId: 'invalid',
        memberId: validUuid,
        role: 'admin',
      });

      expect(result.success).toBe(false);
    });

    it('rejects invalid memberId UUID', function itRejectsInvalidMemberId() {
      const result = updateMemberRoleSchema.safeParse({
        householdId: validUuid,
        memberId: 'invalid',
        role: 'admin',
      });

      expect(result.success).toBe(false);
    });
  });
});

describe('addMemberSchema', function describeAddMemberSchema() {
  const validUuid = '550e8400-e29b-41d4-a716-446655440000';

  describe('success cases', function describeSuccessCases() {
    it('validates a valid add member request', function itValidatesValidRequest() {
      const result = addMemberSchema.safeParse({
        householdId: validUuid,
        email: 'test@example.com',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
      }
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid email format', function itRejectsInvalidEmail() {
      const result = addMemberSchema.safeParse({
        householdId: validUuid,
        email: 'not-an-email',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toContain('Invalid email address');
      }
    });

    it('rejects empty email', function itRejectsEmptyEmail() {
      const result = addMemberSchema.safeParse({
        householdId: validUuid,
        email: '',
      });

      expect(result.success).toBe(false);
    });

    it('rejects invalid householdId UUID', function itRejectsInvalidHouseholdId() {
      const result = addMemberSchema.safeParse({
        householdId: 'invalid',
        email: 'test@example.com',
      });

      expect(result.success).toBe(false);
    });
  });
});

