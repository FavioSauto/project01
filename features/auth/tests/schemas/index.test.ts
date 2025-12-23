import { SignUpSchema, LoginSchema } from '@/features/auth/schemas';

describe('SignUpSchema', function describeSignUpSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates a valid signup payload', function itValidatesValidPayload() {
      const result = SignUpSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('user@example.com');
        expect(result.data.name).toBe('John Doe');
      }
    });

    it('accepts password at minimum length (8 characters)', function itAcceptsMinPasswordLength() {
      const result = SignUpSchema.safeParse({
        email: 'user@example.com',
        password: '12345678',
        name: 'John',
      });

      expect(result.success).toBe(true);
    });

    it('accepts name at minimum length (1 character)', function itAcceptsMinNameLength() {
      const result = SignUpSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
        name: 'J',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid email format', function itRejectsInvalidEmail() {
      const result = SignUpSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
        name: 'John Doe',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.email).toBeDefined();
      }
    });

    it('rejects empty email', function itRejectsEmptyEmail() {
      const result = SignUpSchema.safeParse({
        email: '',
        password: 'password123',
        name: 'John Doe',
      });

      expect(result.success).toBe(false);
    });

    it('rejects password shorter than 8 characters', function itRejectsShortPassword() {
      const result = SignUpSchema.safeParse({
        email: 'user@example.com',
        password: '1234567',
        name: 'John Doe',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Password must be at least 8 characters'
        );
      }
    });

    it('rejects empty name', function itRejectsEmptyName() {
      const result = SignUpSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
        name: '',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toContain('Name is required');
      }
    });

    it('rejects missing fields', function itRejectsMissingFields() {
      const result = SignUpSchema.safeParse({});

      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.email).toBeDefined();
        expect(errors.password).toBeDefined();
        expect(errors.name).toBeDefined();
      }
    });
  });

  describe('security cases', function describeSecurityCases() {
    it('validates email with special characters in local part', function itValidatesSpecialCharEmail() {
      const result = SignUpSchema.safeParse({
        email: 'user+test@example.com',
        password: 'password123',
        name: 'John',
      });

      expect(result.success).toBe(true);
    });

    it('handles unicode in name', function itHandlesUnicodeName() {
      const result = SignUpSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
        name: 'José García',
      });

      expect(result.success).toBe(true);
    });
  });
});

describe('LoginSchema', function describeLoginSchema() {
  describe('success cases', function describeSuccessCases() {
    it('validates a valid login payload', function itValidatesValidPayload() {
      const result = LoginSchema.safeParse({
        email: 'user@example.com',
        password: 'password123',
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('user@example.com');
      }
    });
  });

  describe('error cases', function describeErrorCases() {
    it('rejects invalid email format', function itRejectsInvalidEmail() {
      const result = LoginSchema.safeParse({
        email: 'invalid-email',
        password: 'password123',
      });

      expect(result.success).toBe(false);
    });

    it('rejects password shorter than 8 characters', function itRejectsShortPassword() {
      const result = LoginSchema.safeParse({
        email: 'user@example.com',
        password: 'short',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.password).toContain(
          'Password must be at least 8 characters'
        );
      }
    });

    it('rejects missing email', function itRejectsMissingEmail() {
      const result = LoginSchema.safeParse({
        password: 'password123',
      });

      expect(result.success).toBe(false);
    });

    it('rejects missing password', function itRejectsMissingPassword() {
      const result = LoginSchema.safeParse({
        email: 'user@example.com',
      });

      expect(result.success).toBe(false);
    });
  });
});

