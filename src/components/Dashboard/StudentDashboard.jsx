import React, { useMemo, useState } from 'react';
import { FiBook, FiFileText, FiBarChart2, FiBell, FiLogOut, FiHome, FiUser, FiAward, FiClock } from 'react-icons/fi';

const StudentDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data - in a real app, this would come from an API
  const [availableExams, setAvailableExams] = useState([
    { id: 1, subject: 'Mathematics', form: 'Form 1', date: '2023-07-15', questions: 20, price: 100, purchased: true, attempts: 2, bestScore: 85 },
    { id: 2, subject: 'Biology', form: 'Form 2', date: '2023-07-18', questions: 15, price: 150, purchased: false, attempts: 0, bestScore: 0 },
    { id: 3, subject: 'Chemistry', form: 'Form 3', date: '2023-07-20', questions: 25, price: 120, purchased: true, attempts: 1, bestScore: 72 }
  ]);
  
  const [availableNotes, setAvailableNotes] = useState([
    { id: 1, subject: 'Mathematics', title: 'Algebra Basics', form: 'Form 1', downloads: 128, lastUpdated: '2023-06-10', price: 50, purchased: true },
    { id: 2, subject: 'Biology', title: 'Cell Structure', form: 'Form 2', downloads: 95, lastUpdated: '2023-06-15', price: 75, purchased: false },
    { id: 3, subject: 'Physics', title: 'Newtonian Mechanics', form: 'Form 4', downloads: 110, lastUpdated: '2023-06-20', price: 60, purchased: true }
  ]);
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'New Exam Added', content: 'Mathematics Form 1 paper now available', date: '2023-07-10' },
    { id: 2, title: 'System Maintenance', content: 'Platform will be down Sunday 9pm-11pm', date: '2023-07-12' },
    { id: 3, title: 'New Notes Uploaded', content: 'Chemistry Form 3 notes now available', date: '2023-07-14' }
  ]);

  const [performanceStats, setPerformanceStats] = useState([
    { subject: 'Mathematics', attempts: 5, avgScore: 78, bestScore: 92, improvement: '+15%' },
    { subject: 'Physics', attempts: 3, avgScore: 65, bestScore: 78, improvement: '+8%' },
    { subject: 'Chemistry', attempts: 4, avgScore: 72, bestScore: 85, improvement: '+12%' }
  ]);

  // Purchase functions
  const purchaseExam = (examId) => {
    setAvailableExams(prev => prev.map(exam => 
      exam.id === examId ? { ...exam, purchased: true } : exam
    ));
  };

  const purchaseNote = (noteId) => {
    setAvailableNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, purchased: true } : note
    ));
  };

  // Derived values
  const attemptedExams = useMemo(() => availableExams.filter(e => e.attempts > 0), [availableExams]);

  const averageScore = useMemo(() => {
    if (attemptedExams.length === 0) return 0;
    const sum = attemptedExams.reduce((s, e) => s + (e.bestScore || 0), 0);
    return Math.round(sum / attemptedExams.length);
  }, [attemptedExams]);

  const highestScore = useMemo(() => {
    if (attemptedExams.length === 0) return 0;
    return Math.max(...attemptedExams.map(e => e.bestScore || 0));
  }, [attemptedExams]);

  const bestSubject = useMemo(() => {
    if (performanceStats.length === 0) return 'N/A';
    return performanceStats.reduce((prev, current) => (prev.avgScore > current.avgScore ? prev : current)).subject;
  }, [performanceStats]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Student Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Performance Summary Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiAward className="mr-2" /> Performance Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exams Taken:</span>
                    <span className="font-medium">{attemptedExams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-medium">{`${averageScore}%`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Subject:</span>
                    <span className="font-medium">{bestSubject}</span>
                  </div>
                </div>
              </div>

              {/* Resources Summary Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiBook className="mr-2" /> Resources Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Exams:</span>
                    <span className="font-medium">{availableExams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Available Notes:</span>
                    <span className="font-medium">{availableNotes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchased Resources:</span>
                    <span className="font-medium">{availableExams.filter(e => e.purchased).length + availableNotes.filter(n => n.purchased).length}</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiClock className="mr-2" /> Recent Activity
                </h3>
                <div className="space-y-3">
                  {attemptedExams
                    .slice()
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 2)
                    .map(exam => (
                      <div key={exam.id} className="text-sm">
                        <p className="font-medium">{exam.subject} Exam</p>
                        <p className="text-gray-600">Score: {exam.bestScore}%</p>
                      </div>
                    ))}
                  {attemptedExams.length === 0 && (
                    <p className="text-gray-600 text-sm">No recent exam activity</p>
                  )}
                </div>
              </div>
            </div>

            {/* Recent Announcements */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">📢 Recent Announcements</h3>
              <div className="space-y-4">
                {announcements.slice(0, 2).map(announcement => (
                  <div key={announcement.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                    <p className="text-gray-600 mt-1">{announcement.content}</p>
                    <p className="text-sm text-gray-400 mt-2">Posted: {announcement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Available Exams</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Exams List */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Ksh)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {availableExams.map((exam) => (
                        <tr key={exam.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.form}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.questions}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {exam.purchased ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Purchased</span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Available</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempts > 0 ? `${exam.bestScore}%` : 'Not attempted'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {exam.purchased ? (
                              <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-1 px-3 rounded-md text-sm transition duration-200">Take Exam</button>
                            ) : (
                              <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md text-sm transition duration-200"
                                onClick={() => purchaseExam(exam.id)}
                              >
                                Purchase
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Subject Notes</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Notes List */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Ksh)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {availableNotes.map((note) => (
                        <tr key={note.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{note.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.form}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {note.purchased ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Purchased</span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Available</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {note.purchased ? (
                              <button className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-1 px-3 rounded-md text-sm transition duration-200">Download</button>
                            ) : (
                              <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md text-sm transition duration-200"
                                onClick={() => purchaseNote(note.id)}
                              >
                                Purchase
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Announcements</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium text-lg text-gray-800">{announcement.title}</h3>
                    <p className="text-gray-600 mt-1">{announcement.content}</p>
                    <p className="text-sm text-gray-400 mt-2">Posted: {announcement.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Performance Tracking</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Overall Performance */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Overall Performance</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Exams Taken:</span>
                    <span className="font-medium">{attemptedExams.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-medium">{`${averageScore}%`}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Highest Score:</span>
                    <span className="font-medium">{`${highestScore}%`}</span>
                  </div>
                </div>
              </div>
              
              {/* Subject Breakdown */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Subject Breakdown</h3>
                <div className="space-y-4">
                  {performanceStats.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{subject.subject}</span>
                        <span>Avg: {subject.avgScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gray-800 h-2.5 rounded-full" 
                          style={{ width: `${subject.avgScore}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Attempts: {subject.attempts}</span>
                        <span>Best: {subject.bestScore}% ({subject.improvement})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Exam History */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Exam History</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attemptedExams.map((exam) => (
                      <tr key={exam.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.form}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempts}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.bestScore}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-gray-800 hover:text-gray-900 mr-3">View</button>
                          <button className="text-blue-600 hover:text-blue-900">Retake</button>
                        </td>
                      </tr>
                    ))}
                    {attemptedExams.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No exam history available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="flex items-center justify-between mb-8 p-2">
          <h1 className="text-xl font-semibold">Student Portal</h1>
        </div>
        
        <div className="mb-6 p-2">
          <div className="flex items-center mb-2">
            <div className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              <FiUser className="text-xl" />
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-300">Form 2 Student</p>
            </div>
          </div>
        </div>
        
        <nav className="space-y-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FiHome className="mr-3" />
            Dashboard
          </button>
          
          <button
            onClick={() => setActiveTab('exams')}
            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'exams' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FiBook className="mr-3" />
            Exams
          </button>
          
          <button
            onClick={() => setActiveTab('notes')}
            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'notes' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FiFileText className="mr-3" />
            Subject Notes
          </button>
          
          <button
            onClick={() => setActiveTab('announcements')}
            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'announcements' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FiBell className="mr-3" />
            Announcements
          </button>
          
          <button
            onClick={() => setActiveTab('performance')}
            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'performance' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FiBarChart2 className="mr-3" />
            Performance
          </button>
          
          <button
            onClick={() => { /* Add logout logic here */ }}
            className="w-full flex items-center p-3 rounded-lg hover:bg-gray-700 mt-4"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default StudentDashboard;
