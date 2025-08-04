import React, { useState } from 'react';

const AdminDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('exams');
  const [exams, setExams] = useState([
    { id: 1, subject: 'Mathematics', form: 'Form 1', date: '2023-07-15', questions: 20, attempts: 45 },
    { id: 2, subject: 'Biology', form: 'Form 2', date: '2023-07-18', questions: 15, attempts: 32 }
  ]);
  
  const [notes, setNotes] = useState([
    { id: 1, subject: 'Mathematics', title: 'Algebra Basics', form: 'Form 1', downloads: 128 },
    { id: 2, subject: 'Biology', title: 'Cell Structure', form: 'Form 2', downloads: 95 }
  ]);
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'New Exam Added', content: 'Mathematics Form 1 paper now available', date: '2023-07-10' },
    { id: 2, title: 'System Maintenance', content: 'Platform will be down Sunday 9pm-11pm', date: '2023-07-12' }
  ]);

  // Form states
  const [examForm, setExamForm] = useState({
    subject: '',
    form: 'Form 1',
    date: '',
    questions: ''
  });
  
  const [noteForm, setNoteForm] = useState({
    subject: '',
    title: '',
    form: 'Form 1',
    file: null
  });
  
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: ''
  });

  // CRUD Operations
  const handleAddExam = (e) => {
    e.preventDefault();
    const newExam = {
      id: exams.length + 1,
      ...examForm,
      attempts: 0,
      questions: parseInt(examForm.questions)
    };
    setExams([...exams, newExam]);
    setExamForm({ subject: '', form: 'Form 1', date: '', questions: '' });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: notes.length + 1,
      ...noteForm,
      downloads: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setNotes([...notes, newNote]);
    setNoteForm({ subject: '', title: '', form: 'Form 1', file: null });
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const newAnnouncement = {
      id: announcements.length + 1,
      ...announcementForm,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setAnnouncementForm({ title: '', content: '' });
  };

  const handleDelete = (type, id) => {
    if (type === 'exam') {
      setExams(exams.filter(exam => exam.id !== id));
    } else if (type === 'note') {
      setNotes(notes.filter(note => note.id !== id));
    } else if (type === 'announcement') {
      setAnnouncements(announcements.filter(ann => ann.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="bg-white text-green-700 px-4 py-2 rounded-md font-medium">
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'exams' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('exams')}
          >
            Exams
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'notes' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'announcements' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('announcements')}
          >
            Announcements
          </button>
          <button
            className={`py-2 px-4 font-medium ${activeTab === 'stats' ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-500'}`}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
        </div>

        {/* Exams Management */}
        {activeTab === 'exams' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Exam Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-green-700">➕ Add New Exam</h2>
              <form onSubmit={handleAddExam}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={examForm.subject}
                    onChange={(e) => setExamForm({...examForm, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Form</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={examForm.form}
                    onChange={(e) => setExamForm({...examForm, form: e.target.value})}
                  >
                    <option value="Form 1">Form 1</option>
                    <option value="Form 2">Form 2</option>
                    <option value="Form 3">Form 3</option>
                    <option value="Form 4">Form 4</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Exam Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={examForm.date}
                    onChange={(e) => setExamForm({...examForm, date: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Number of Questions</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={examForm.questions}
                    onChange={(e) => setExamForm({...examForm, questions: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Upload Questions (PDF)</label>
                  <input
                    type="file"
                    className="w-full p-2 border rounded"
                    accept=".pdf"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Add Exam
                </button>
              </form>
            </div>

            {/* Exams List */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-green-700">📚 Current Exams</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Questions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exams.map((exam) => (
                      <tr key={exam.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.form}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.questions}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempts}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete('exam', exam.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Notes Management */}
        {activeTab === 'notes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Note Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-green-700">🗂️ Add New Notes</h2>
              <form onSubmit={handleAddNote}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={noteForm.subject}
                    onChange={(e) => setNoteForm({...noteForm, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Form</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={noteForm.form}
                    onChange={(e) => setNoteForm({...noteForm, form: e.target.value})}
                  >
                    <option value="Form 1">Form 1</option>
                    <option value="Form 2">Form 2</option>
                    <option value="Form 3">Form 3</option>
                    <option value="Form 4">Form 4</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Upload Notes (PDF)</label>
                  <input
                    type="file"
                    className="w-full p-2 border rounded"
                    accept=".pdf"
                    onChange={(e) => setNoteForm({...noteForm, file: e.target.files[0]})}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Upload Notes
                </button>
              </form>
            </div>

            {/* Notes List */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-green-700">📝 Current Notes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {notes.map((note) => (
                      <tr key={note.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{note.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.form}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.downloads}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDelete('note', note.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Announcements Management */}
        {activeTab === 'announcements' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Add Announcement Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-green-700">📢 Post Announcement</h2>
              <form onSubmit={handleAddAnnouncement}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Content</label>
                  <textarea
                    className="w-full p-2 border rounded"
                    rows="4"
                    value={announcementForm.content}
                    onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Post Announcement
                </button>
              </form>
            </div>

            {/* Announcements List */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 text-green-700">📢 Current Announcements</h2>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{announcement.title}</h3>
                        <p className="text-gray-600 mt-1">{announcement.content}</p>
                        <p className="text-sm text-gray-400 mt-2">Posted: {announcement.date}</p>
                      </div>
                      <div>
                        <button className="text-green-600 hover:text-green-900 mr-2">Edit</button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete('announcement', announcement.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        {activeTab === 'stats' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 text-green-700">📈 Usage Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Exam Attempts Chart */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-4">Exam Attempts</h3>
                <div className="h-64 bg-gray-50 flex items-center justify-center">
                  {/* Placeholder for chart - would be replaced with actual chart library */}
                  <p className="text-gray-400">Bar chart showing exam attempts would appear here</p>
                </div>
              </div>
              
              {/* Popular Notes */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium mb-4">Most Downloaded Notes</h3>
                <div className="space-y-3">
                  {notes
                    .sort((a, b) => b.downloads - a.downloads)
                    .slice(0, 5)
                    .map((note) => (
                      <div key={note.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{note.title}</p>
                          <p className="text-sm text-gray-500">{note.subject} - {note.form}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {note.downloads} downloads
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            
            {/* Detailed Stats Table */}
            <div>
              <h3 className="font-medium mb-4">Detailed Exam Statistics</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Form</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attempts</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg. Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pass Rate</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exams.map((exam) => (
                      <tr key={exam.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.form}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempts}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;