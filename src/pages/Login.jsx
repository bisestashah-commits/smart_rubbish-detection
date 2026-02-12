import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const demoLogin = () => {
    setEmail('admin@smartrubbish.com');
    setPassword('adminpassword');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
            ♻
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">
          Smart Rubbish Detection
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to report waste and earn eco-points
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-100 focus:outline-none"
          />

          <div className="text-right text-sm text-green-600 cursor-pointer">
            Forgot password?
          </div>

          <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Login
          </button>
        </form>

        {/* Switch */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-green-600 cursor-pointer font-semibold"
          >
            Register here
          </a>
        </p>

        {/* Demo */}
        <div className="mt-4 bg-gray-100 p-3 rounded-lg text-sm text-gray-600">
          <strong>Demo Credentials:</strong>
          <br />
          Admin: admin@smartrubbish.com / adminpassword
          <button
            type="button"
            onClick={demoLogin}
            className="block w-full mt-2 text-green-600 font-semibold hover:underline"
          >
            Use Demo
          </button>
        </div>
      </div>
    </div>
  );
}