// AuthWrapper.jsx
import { useState } from 'react';
import StudentDashboard from './Student';

const AuthWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedForm, setSelectedForm] = useState('Form 1');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold text-green-700 mb-6">Sign In</h2>
          <select 
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="Form 1">Form 1</option>
            <option value="Form 2">Form 2</option>
            <option value="Form 3">Form 3</option>
            <option value="Form 4">Form 4</option>
          </select>
          <button 
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return <StudentDashboard selectedForm={selectedForm} />;
};

export default AuthWrapper;