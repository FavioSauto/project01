import { handleAuthError, withAuthErrorHandling } from './auth-error-handler';
import { authClient } from '@/features/auth/libs/auth-client';

// Mock authClient
jest.mock('@/features/auth/libs/auth-client', () => ({
  authClient: {
    signOut: jest.fn(),
  },
}));

describe('auth-error-handler', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    delete window.location;
    window.location = {
      ...originalLocation,
      origin: 'http://localhost',
      href: '',
    };
  });

  afterAll(() => {
    window.location = originalLocation;
  });

  describe('handleAuthError', () => {
    it('should not do anything if the error is not an auth session error', async () => {
      const error = new Error('Some other error');
      await handleAuthError(error);

      expect(authClient.signOut).not.toHaveBeenCalled();
      expect(window.location.href).toBe('');
    });

    it('should sign out and redirect if the error is an auth session error', async () => {
      const error = new Error('Unauthorized');
      (authClient.signOut as jest.Mock).mockResolvedValueOnce({});

      await handleAuthError(error);

      expect(authClient.signOut).toHaveBeenCalled();
      expect(window.location.href).toBe('http://localhost/log-in');
    });

    it('should include redirect query param if currentPath is provided', async () => {
      const error = new Error('Session expired');
      (authClient.signOut as jest.Mock).mockResolvedValueOnce({});

      await handleAuthError(error, '/dashboard');

      expect(window.location.href).toBe('http://localhost/log-in?redirect=%2Fdashboard');
    });

    it('should not include redirect query param if currentPath is /log-in or /sign-up', async () => {
      const error = new Error('Session expired');
      
      await handleAuthError(error, '/log-in');
      expect(window.location.href).toBe('http://localhost/log-in');

      await handleAuthError(error, '/sign-up');
      expect(window.location.href).toBe('http://localhost/log-in');
    });

    it('should still redirect if signOut fails', async () => {
      const error = new Error('Invalid session');
      (authClient.signOut as jest.Mock).mockRejectedValueOnce(new Error('Sign out failed'));

      await handleAuthError(error);

      expect(window.location.href).toBe('http://localhost/log-in');
    });
  });

  describe('withAuthErrorHandling', () => {
    it('should call the function and return its result if no error occurs', async () => {
      const fn = jest.fn().mockResolvedValue('success');
      const wrapped = withAuthErrorHandling(fn);

      const result = await wrapped('arg1');

      expect(fn).toHaveBeenCalledWith('arg1');
      expect(result).toBe('success');
      expect(window.location.href).toBe('');
    });

    it('should handle auth error and rethrow if function fails with auth error', async () => {
      const error = new Error('Unauthorized');
      const fn = jest.fn().mockRejectedValue(error);
      const wrapped = withAuthErrorHandling(fn, '/profile');

      await expect(wrapped()).rejects.toThrow(error);

      expect(window.location.href).toBe('http://localhost/log-in?redirect=%2Fprofile');
    });

    it('should not handle auth error but still rethrow if function fails with other error', async () => {
      const error = new Error('Other error');
      const fn = jest.fn().mockRejectedValue(error);
      const wrapped = withAuthErrorHandling(fn);

      await expect(wrapped()).rejects.toThrow(error);

      expect(window.location.href).toBe('');
    });
  });
});


