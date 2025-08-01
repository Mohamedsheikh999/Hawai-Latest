// components/Auth/SignInForm.js
import React, { useState } from 'react';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import Button from '../UI/Button';

const SignInForm = ({ theme, onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic
    console.log('Signing in with:', { email, password });
  };

  return (
    <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Sign In</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Email Address
          </label>
          <div className={`flex items-center px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
            <FiMail className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full outline-none bg-transparent ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="password" className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Password
          </label>
          <div className={`flex items-center px-3 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}>
            <FiLock className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full outline-none bg-transparent ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className={`rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
            />
            <label htmlFor="remember" className={`ml-2 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Remember me
            </label>
          </div>
          <a href="#" className={`text-sm ${theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-green-600 hover:text-green-700'}`}>
            Forgot password?
          </a>
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          theme={theme} 
          className="w-full group"
        >
          <span className="flex items-center justify-center">
            Sign In <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </form>
      
      <div className={`mt-6 text-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
        Don't have an account?{' '}
        <button 
          onClick={onToggleForm} 
          className={`font-medium ${theme === 'dark' ? 'text-emerald-400 hover:text-emerald-300' : 'text-green-600 hover:text-green-700'}`}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignInForm;