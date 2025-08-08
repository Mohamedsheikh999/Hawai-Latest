import React, { useState } from 'react';
import { FiBook, FiFileText, FiBarChart2, FiBell, FiLogOut, FiHome, FiUsers } from 'react-icons/fi';

const AdminDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('dashboard');
  const [exams, setExams] = useState([
    { id: 1, subject: 'Mathematics', form: 'Form 1', date: '2023-07-15', questions: 20, attempts: 45, avgScore: 72, passRate: 85, price: 100 },
    { id: 2, subject: 'Biology', form: 'Form 2', date: '2023-07-18', questions: 15, attempts: 32, avgScore: 68, passRate: 80, price: 150 }
  ]);
  
  const [notes, setNotes] = useState([
    { id: 1, subject: 'Mathematics', title: 'Algebra Basics', form: 'Form 1', downloads: 128, lastUpdated: '2023-06-10', price: 50 },
    { id: 2, subject: 'Biology', title: 'Cell Structure', form: 'Form 2', downloads: 95, lastUpdated: '2023-06-15', price: 75 }
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
    questions: '',
    file: null,
    price: ''
  });
  
  const [noteForm, setNoteForm] = useState({
    subject: '',
    title: '',
    form: 'Form 1',
    file: null,
    price: ''
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
      questions: parseInt(examForm.questions),
      avgScore: 0,
      passRate: 0,
      price: parseInt(examForm.price)
    };
    setExams([...exams, newExam]);
    setExamForm({ subject: '', form: 'Form 1', date: '', questions: '', file: null, price: '' });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    const newNote = {
      id: notes.length + 1,
      ...noteForm,
      downloads: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      price: parseInt(noteForm.price)
    };
    setNotes([...notes, newNote]);
    setNoteForm({ subject: '', title: '', form: 'Form 1', file: null, price: '' });
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

  // Calculate total revenue
  const totalRevenue = exams.reduce((sum, exam) => sum + (exam.attempts * exam.price), 0) +
                     notes.reduce((sum, note) => sum + (note.downloads * note.price), 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Exams Summary Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiBook className="mr-2" /> Exams Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Exams:</span>
                    <span className="font-medium">{exams.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Attempts:</span>
                    <span className="font-medium">{exams.reduce((sum, exam) => sum + exam.attempts, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg. Pass Rate:</span>
                    <span className="font-medium">
                      {exams.length > 0 
                        ? Math.round(exams.reduce((sum, exam) => sum + exam.passRate, 0) / exams.length) 
                        : 0}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes Summary Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiFileText className="mr-2" /> Notes Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Notes:</span>
                    <span className="font-medium">{notes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Downloads:</span>
                    <span className="font-medium">{notes.reduce((sum, note) => sum + note.downloads, 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Most Popular:</span>
                    <span className="font-medium">
                      {notes.length > 0 
                        ? notes.reduce((prev, current) => (prev.downloads > current.downloads) ? prev : current).title
                        : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Revenue Summary Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                  <FiBarChart2 className="mr-2" /> Revenue Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue:</span>
                    <span className="font-medium">Ksh {totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Exams:</span>
                    <span className="font-medium">Ksh {exams.reduce((sum, exam) => sum + (exam.attempts * exam.price), 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">From Notes:</span>
                    <span className="font-medium">Ksh {notes.reduce((sum, note) => sum + (note.downloads * note.price), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'exams':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Exam Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Exam Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">➕ Add New Exam</h3>
                <form onSubmit={handleAddExam}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={examForm.subject}
                      onChange={(e) => setExamForm({...examForm, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Form</label>
                    <select
                      name="form"
                      value={examForm.form}
                      onChange={(e) => setExamForm({...examForm, form: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <option value="Form 1">Form 1</option>
                      <option value="Form 2">Form 2</option>
                      <option value="Form 3">Form 3</option>
                      <option value="Form 4">Form 4</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Exam Date</label>
                    <input
                      type="date"
                      name="date"
                      value={examForm.date}
                      onChange={(e) => setExamForm({...examForm, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Number of Questions</label>
                    <input
                      type="number"
                      name="questions"
                      value={examForm.questions}
                      onChange={(e) => setExamForm({...examForm, questions: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Upload Questions (PDF)</label>
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => setExamForm({...examForm, file: e.target.files[0]})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      accept=".pdf"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Price (Ksh)</label>
                    <input
                      type="number"
                      name="price"
                      value={examForm.price}
                      onChange={(e) => setExamForm({...examForm, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                      min="0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                  >
                    Add Exam
                  </button>
                </form>
              </div>

              {/* Exams List */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-4">📚 Current Exams</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Ksh)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (Ksh)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {exams.map((exam) => (
                        <tr key={exam.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.form}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempts}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.attempts * exam.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-gray-800 hover:text-gray-900 mr-3">Edit</button>
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
          </div>
        );
      case 'notes':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Notes Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Note Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">🗂️ Add New Notes</h3>
                <form onSubmit={handleAddNote}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={noteForm.subject}
                      onChange={(e) => setNoteForm({...noteForm, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={noteForm.title}
                      onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Form</label>
                    <select
                      name="form"
                      value={noteForm.form}
                      onChange={(e) => setNoteForm({...noteForm, form: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <option value="Form 1">Form 1</option>
                      <option value="Form 2">Form 2</option>
                      <option value="Form 3">Form 3</option>
                      <option value="Form 4">Form 4</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Upload Notes (PDF)</label>
                    <input
                      type="file"
                      name="file"
                      onChange={(e) => setNoteForm({...noteForm, file: e.target.files[0]})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      accept=".pdf"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Price (Ksh)</label>
                    <input
                      type="number"
                      name="price"
                      value={noteForm.price}
                      onChange={(e) => setNoteForm({...noteForm, price: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                      min="0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                  >
                    Upload Notes
                  </button>
                </form>
              </div>

              {/* Notes List */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-4">📝 Current Notes</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Form</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Ksh)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue (Ksh)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {notes.map((note) => (
                        <tr key={note.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{note.subject}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.form}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.downloads}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{note.downloads * note.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-gray-800 hover:text-gray-900 mr-3">Edit</button>
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
          </div>
        );
      case 'announcements':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Announcements Management</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Announcement Form */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">📢 Post Announcement</h3>
                <form onSubmit={handleAddAnnouncement}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Content</label>
                    <textarea
                      name="content"
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                  >
                    Post Announcement
                  </button>
                </form>
              </div>

              {/* Announcements List */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-800 mb-4">📢 Current Announcements</h3>
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-lg text-gray-800">{announcement.title}</h4>
                          <p className="text-gray-600 mt-1">{announcement.content}</p>
                          <p className="text-sm text-gray-400 mt-2">Posted: {announcement.date}</p>
                        </div>
                        <div>
                          <button className="text-gray-800 hover:text-gray-900 mr-3">Edit</button>
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
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">System Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Revenue Summary */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue Summary</h3>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-lg text-gray-800 mb-2">Total Revenue</h4>
                    <p className="text-2xl font-bold">Ksh {totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Exam Revenue:</span>
                        <span>Ksh {exams.reduce((sum, exam) => sum + (exam.attempts * exam.price), 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Notes Revenue:</span>
                        <span>Ksh {notes.reduce((sum, note) => sum + (note.downloads * note.price), 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Top Performing Resources */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Top Performing Resources</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Top Exams</h4>
                    {exams
                      .sort((a, b) => (b.attempts * b.price) - (a.attempts * a.price))
                      .slice(0, 3)
                      .map(exam => (
                        <div key={exam.id} className="flex justify-between items-center mb-2">
                          <span>{exam.subject} ({exam.form})</span>
                          <span>Ksh {(exam.attempts * exam.price).toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Top Notes</h4>
                    {notes
                      .sort((a, b) => (b.downloads * b.price) - (a.downloads * a.price))
                      .slice(0, 3)
                      .map(note => (
                        <div key={note.id} className="flex justify-between items-center mb-2">
                          <span>{note.title} ({note.form})</span>
                          <span>Ksh {(note.downloads * note.price).toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detailed Stats */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Detailed Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Exams by Form</h4>
                  {['Form 1', 'Form 2', 'Form 3', 'Form 4'].map(form => {
                    const formExams = exams.filter(e => e.form === form);
                    return (
                      <div key={form} className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span>{form}</span>
                          <span>Ksh {formExams.reduce((sum, exam) => sum + (exam.attempts * exam.price), 0).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-gray-800 h-2.5 rounded-full" 
                            style={{ width: `${(formExams.length / exams.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Notes by Subject</h4>
                  {['Mathematics', 'Biology', 'Chemistry', 'Physics'].map(subject => {
                    const subjectNotes = notes.filter(n => n.subject === subject);
                    return (
                      <div key={subject} className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span>{subject}</span>
                          <span>Ksh {subjectNotes.reduce((sum, note) => sum + (note.downloads * note.price), 0).toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-gray-800 h-2.5 rounded-full" 
                            style={{ width: `${(subjectNotes.length / notes.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
          <h1 className="text-xl font-semibold">Admin Portal</h1>
        </div>
        
        <div className="mb-6 p-2">
          <div className="flex items-center mb-2">
            <div className="bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
              <FiUsers className="text-xl" />
            </div>
            <div>
              <p className="font-medium">Administrator</p>
              <p className="text-xs text-gray-300">Super Admin</p>
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
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'stats' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            <FiBarChart2 className="mr-3" />
            Statistics
          </button>
          
          <button
            onClick={() => {}}
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

export default AdminDashboard;