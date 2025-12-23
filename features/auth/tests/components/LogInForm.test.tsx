import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LogInForm } from '@/features/auth/components/LogInForm';

// Mock Next.js navigation
const mockPush = jest.fn();
const mockGet = jest.fn();

jest.mock('next/navigation', function mockNavigation() {
  return {
    useRouter: function useRouter() {
      return {
        push: mockPush,
        replace: jest.fn(),
        prefetch: jest.fn(),
      };
    },
    useSearchParams: function useSearchParams() {
      return {
        get: mockGet,
      };
    },
  };
});

// Mock Next.js Link
jest.mock('next/link', function mockNextLink() {
  return {
    __esModule: true,
    default: function Link({
      href,
      children,
      ...props
    }: {
      href: string;
      children: React.ReactNode;
      [key: string]: unknown;
    }) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    },
  };
});

// Mock auth client
jest.mock('@/features/auth/libs/auth-client', function mockAuthClient() {
  return {
    authClient: {
      signIn: {
        email: jest.fn(),
        social: jest.fn(),
      },
    },
  };
});

import { authClient } from '@/features/auth/libs/auth-client';
const mockSignInEmail = authClient.signIn.email as jest.Mock;
const mockSignInSocial = authClient.signIn.social as jest.Mock;

// Mock sonner toast
jest.mock('sonner', function mockSonner() {
  return {
    toast: {
      error: jest.fn(),
      success: jest.fn(),
    },
  };
});

describe('LogInForm', function describeLogInForm() {
  const user = userEvent.setup();

  beforeEach(function beforeEachTest() {
    jest.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

  describe('rendering', function describeRendering() {
    it('renders login form with all fields', function itRendersLoginForm() {
      render(<LogInForm />);

      expect(screen.getByText('Enter your email below to log in')).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /log in with google/i })).toBeInTheDocument();
    });

    it('renders sign up link', function itRendersSignUpLink() {
      render(<LogInForm />);

      const signUpLink = screen.getByRole('link', { name: /sign up/i });
      expect(signUpLink).toBeInTheDocument();
      expect(signUpLink).toHaveAttribute('href', '/sign-up');
    });

    it('renders forgot password link', function itRendersForgotPasswordLink() {
      render(<LogInForm />);

      expect(screen.getByRole('link', { name: /forgot your password/i })).toBeInTheDocument();
    });
  });

  describe('form validation', function describeFormValidation() {
    it('does not submit form with short password', async function itBlocksShortPassword() {
      render(<LogInForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Log In' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'short');
      await user.click(submitButton);

      await waitFor(function waitForValidation() {
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      });
      expect(mockSignInEmail).not.toHaveBeenCalled();
    });
  });

  describe('form submission', function describeFormSubmission() {
    it('calls signIn.email with valid credentials', async function itCallsSignInEmail() {
      mockSignInEmail.mockImplementation(function mockImpl(values, callbacks) {
        callbacks.onSuccess();
      });

      render(<LogInForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Log In' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForSignIn() {
        expect(mockSignInEmail).toHaveBeenCalledWith(
          {
            email: 'test@example.com',
            password: 'password123',
          },
          expect.objectContaining({
            onSuccess: expect.any(Function),
            onError: expect.any(Function),
          })
        );
      });
    });

    it('redirects to default route on success', async function itRedirectsOnSuccess() {
      mockGet.mockReturnValue(null);
      mockSignInEmail.mockImplementation(function mockImpl(values, callbacks) {
        callbacks.onSuccess();
      });

      render(<LogInForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Log In' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForRedirect() {
        expect(mockPush).toHaveBeenCalledWith('/analyze');
      });
    });

    it('redirects to custom route from search params', async function itRedirectsToCustomRoute() {
      mockGet.mockReturnValue('/dashboard');
      mockSignInEmail.mockImplementation(function mockImpl(values, callbacks) {
        callbacks.onSuccess();
      });

      render(<LogInForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Log In' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForRedirect() {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('displays error message on login failure', async function itDisplaysErrorOnFailure() {
      mockSignInEmail.mockImplementation(function mockImpl(values, callbacks) {
        callbacks.onError({ message: 'Invalid credentials' });
      });

      render(<LogInForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Log In' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForError() {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });
    });
  });

  describe('Google sign in', function describeGoogleSignIn() {
    it('calls signIn.social for Google login', async function itCallsGoogleSignIn() {
      render(<LogInForm />);

      const googleButton = screen.getByRole('button', { name: /log in with google/i });
      await user.click(googleButton);

      expect(mockSignInSocial).toHaveBeenCalledWith({
        provider: 'google',
        callbackURL: '/analyze',
      });
    });

    it('uses custom redirect for Google login', async function itUsesCustomRedirectForGoogle() {
      mockGet.mockReturnValue('/custom-redirect');

      render(<LogInForm />);

      const googleButton = screen.getByRole('button', { name: /log in with google/i });
      await user.click(googleButton);

      expect(mockSignInSocial).toHaveBeenCalledWith({
        provider: 'google',
        callbackURL: '/custom-redirect',
      });
    });
  });

  describe('accessibility', function describeAccessibility() {
    it('has accessible form labels', function itHasAccessibleLabels() {
      render(<LogInForm />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('disables submit button while submitting', async function itDisablesButtonWhileSubmitting() {
      mockSignInEmail.mockImplementation(function mockImpl() {
        return new Promise(function neverResolve() {
          // Never resolves to keep form in submitting state
        });
      });

      render(<LogInForm />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Log In' });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForDisabled() {
        expect(submitButton).toBeDisabled();
      });
    });
  });
});

