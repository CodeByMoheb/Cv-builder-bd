
import React, { useState } from 'react';
import { PageState } from '../App';
import * as api from '../services/api';

interface ResetPasswordPageProps {
  onNavigate: (page: PageState) => void;
  token: string;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onNavigate, token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError('');
    setLoading(true);
    try {
        await api.resetPassword(token, password);
        setMessage('Your password has been reset successfully! You can now log in.');
    } catch(err: any) {
        setError(err.message || 'Failed to reset password. The link may have expired.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-xl border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Set a new password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-center">{error}</p>}
            {message && <p className="text-sm text-green-700 bg-green-50 p-3 rounded-md text-center">{message}</p>}

            {!message && (
                <>
                <div className="rounded-md shadow-sm space-y-2">
                    <div>
                    <label htmlFor="password" className="sr-only">New Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="input"
                        placeholder="New Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    </div>
                    <div>
                    <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
                    <input
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        className="input"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-primary/50"
                    >
                    {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </div>
                </>
            )}

            <div className="text-sm text-center">
                <a onClick={() => onNavigate({ name: 'login' })} className="font-medium text-primary hover:text-primary/80 cursor-pointer">
                Back to login
                </a>
            </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
