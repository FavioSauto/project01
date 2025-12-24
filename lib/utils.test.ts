import { cn, getErrorMessage } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge classes correctly', () => {
      expect(cn('a', 'b')).toBe('a b');
      expect(cn('a', { b: true, c: false })).toBe('a b');
      expect(cn('p-4', 'p-2')).toBe('p-2'); // tailwind-merge in action
    });
  });

  describe('getErrorMessage', () => {
    it('should return string error', () => {
      expect(getErrorMessage('test error', 'fallback')).toBe('test error');
    });

    it('should return message from Error object', () => {
      expect(getErrorMessage(new Error('error object message'), 'fallback')).toBe('error object message');
    });

    it('should return message from object with message property', () => {
      expect(getErrorMessage({ message: 'object message' }, 'fallback')).toBe('object message');
    });

    it('should return fallback if error is empty string', () => {
      expect(getErrorMessage('', 'fallback')).toBe('fallback');
    });

    it('should return fallback if error is null/undefined', () => {
      expect(getErrorMessage(null, 'fallback')).toBe('fallback');
      expect(getErrorMessage(undefined, 'fallback')).toBe('fallback');
    });

    it('should return fallback if message property is not a string', () => {
      expect(getErrorMessage({ message: 123 }, 'fallback')).toBe('fallback');
    });
  });
});


