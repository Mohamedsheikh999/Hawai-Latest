import React, { useState } from 'react';

const StudentDashboard = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    selectedForm: 'Form 1'
  });

  // Sample data organized by form
  const examData = {
    'Form 1': [
      { id: 1, subject: 'Mathematics', date: '2023-07-15', attempted: false },
      { id: 2, subject: 'English', date: '2023-07-20', attempted: false }
    ],
    'Form 2': [
      { id: 3, subject: 'Biology', date: '2023-07-18', attempted: true, score: 78 },
      { id: 4, subject: 'Chemistry', date: '2023-07-22', attempted: false }
    ],
    'Form 3': [
      { id: 5, subject: 'Physics', date: '2023-07-25', attempted: true, score: 85 },
      { id: 6, subject: 'History', date: '2023-07-28', attempted: false }
    ],
    'Form 4': [
      { id: 7, subject: 'Geography', date: '2023-08-01', attempted: true, score: 92 },
      { id: 8, subject: 'Computer Science', date: '2023-08-05', attempted: false }
    ]
  };

  const noteData = {
    'Form 1': [
      { subject: 'Mathematics', title: 'Basic Algebra', summary: 'Introduction to algebraic concepts' },
      { subject: 'English', title: 'Grammar Rules', summary: 'Essential grammar for beginners' }
    ],
    'Form 2': [
      { subject: 'Biology', title: 'Cell Structure', summary: 'Detailed notes on cell biology' },
      { subject: 'Chemistry', title: 'Periodic Table', summary: 'Understanding elements and their properties' }
    ],
    'Form 3': [
      { subject: 'Physics', title: 'Newton\'s Laws', summary: 'Fundamental principles of motion' },
      { subject: 'History', title: 'World War II', summary: 'Key events and figures' }
    ],
    'Form 4': [
      { subject: 'Geography', title: 'Climate Zones', summary: 'Global climate patterns and ecosystems' },
      { subject: 'Computer Science', title: 'Python Basics', summary: 'Introduction to programming concepts' }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          <form onSubmit={handleAuthSubmit}>
            {isSignUp && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">Select Your Form</label>
              <select
                name="selectedForm"
                value={formData.selectedForm}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={toggleAuthMode}
              className="text-green-600 hover:underline focus:outline-none"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Filter data based on selected form
  const currentForm = formData.selectedForm;
  const exams = examData[currentForm] || [];
  const notes = noteData[currentForm] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-green-700">
          Welcome, {formData.name || 'Student'} ({currentForm})
        </h1>
        <button
          onClick={handleLogout}
          className="text-green-600 hover:text-green-800 underline text-sm"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Exams Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📅</span> Upcoming Exams
          </h2>
          <div className="space-y-4">
            {exams.filter(exam => !exam.attempted).map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {exam.subject.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <p className="text-sm text-gray-500">Date: {exam.date}</p>
                  </div>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <span className="mr-2">✅</span> Exam Results
          </h2>
          <div className="space-y-4">
            {exams.filter(exam => exam.attempted).map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {exam.subject.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <p className="text-sm text-gray-500">Score: {exam.score}/100</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  exam.score >= 50 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {exam.score >= 50 ? 'Pass' : 'Fail'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📝</span> {currentForm} Notes
          </h2>
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {note.subject.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-sm text-gray-500">{note.summary}</p>
                  </div>
                </div>
                <button className="flex items-center text-green-600 hover:text-green-800 text-sm">
                  <span className="mr-1">📥</span> PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;