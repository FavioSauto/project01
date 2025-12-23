import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SignUpForm } from '@/features/auth/components/SignUpForm';

// Mock Next.js navigation
const mockPush = jest.fn();

jest.mock('next/navigation', function mockNavigation() {
  return {
    useRouter: function useRouter() {
      return {
        push: mockPush,
        replace: jest.fn(),
        prefetch: jest.fn(),
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
      signUp: {
        email: jest.fn(),
      },
      signIn: {
        social: jest.fn(),
      },
    },
  };
});

import { authClient } from '@/features/auth/libs/auth-client';
const mockSignUpEmail = authClient.signUp.email as jest.Mock;
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

describe('SignUpForm', function describeSignUpForm() {
  const user = userEvent.setup();

  beforeEach(function beforeEachTest() {
    jest.clearAllMocks();
  });

  describe('rendering', function describeRendering() {
    it('renders sign up form with all fields', function itRendersSignUpForm() {
      render(<SignUpForm />);

      expect(screen.getByText('Enter your email below to sign up')).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign up with google/i })).toBeInTheDocument();
    });

    it('renders log in link', function itRendersLogInLink() {
      render(<SignUpForm />);

      const logInLink = screen.getByRole('link', { name: /log in/i });
      expect(logInLink).toBeInTheDocument();
      expect(logInLink).toHaveAttribute('href', '/log-in');
    });
  });

  describe('form validation', function describeFormValidation() {
    it('does not submit form with short password', async function itBlocksShortPassword() {
      render(<SignUpForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Sign up' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'short');
      await user.click(submitButton);

      await waitFor(function waitForValidation() {
        expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
      });
      expect(mockSignUpEmail).not.toHaveBeenCalled();
    });
  });

  describe('form submission', function describeFormSubmission() {
    it('calls signUp.email with valid data', async function itCallsSignUpEmail() {
      mockSignUpEmail.mockImplementation(function mockImpl(values, callbacks) {
        callbacks.onSuccess();
      });

      render(<SignUpForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Sign up' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForSignUp() {
        expect(mockSignUpEmail).toHaveBeenCalledWith(
          {
            name: 'John Doe',
            email: 'test@example.com',
            password: 'password123',
          },
          expect.objectContaining({
            onSuccess: expect.any(Function),
          })
        );
      });
    });

    it('redirects to dashboard on success', async function itRedirectsOnSuccess() {
      mockSignUpEmail.mockImplementation(function mockImpl(values, callbacks) {
        callbacks.onSuccess();
      });

      render(<SignUpForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Sign up' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForRedirect() {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  describe('Google sign up', function describeGoogleSignUp() {
    it('calls signIn.social for Google sign up', async function itCallsGoogleSignIn() {
      render(<SignUpForm />);

      const googleButton = screen.getByRole('button', { name: /sign up with google/i });
      await user.click(googleButton);

      expect(mockSignInSocial).toHaveBeenCalledWith({
        provider: 'google',
        callbackURL: '/dashboard',
      });
    });
  });

  describe('accessibility', function describeAccessibility() {
    it('has accessible form labels', function itHasAccessibleLabels() {
      render(<SignUpForm />);

      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('disables submit button while submitting', async function itDisablesButtonWhileSubmitting() {
      mockSignUpEmail.mockImplementation(function mockImpl() {
        return new Promise(function neverResolve() {
          // Never resolves to keep form in submitting state
        });
      });

      render(<SignUpForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: 'Sign up' });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(function waitForDisabled() {
        expect(submitButton).toBeDisabled();
      });
    });
  });
});

