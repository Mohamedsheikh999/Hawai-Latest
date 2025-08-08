// import React from 'react';
// import { Calendar, Card, Badge, List, Avatar, Button } from 'antd';
// import {
//   FilePdfOutlined,
//   BookOutlined,
//   NotificationOutlined,
//   ClockCircleOutlined,
//   CheckCircleOutlined
// } from '@ant-design/icons';

// const StudentDashboard = () => {
//   // Sample data - replace with your actual data
//   const subjects = ['Mathematics', 'English', 'Biology', 'Chemistry', 'Physics'];
//   const forms = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];
  
//   const exams = [
//     { id: 1, subject: 'Mathematics', form: 'Form 2', date: '2023-06-15', attempted: true, score: 85 },
//     { id: 2, subject: 'English', form: 'Form 2', date: '2023-06-20', attempted: false },
//     { id: 3, subject: 'Biology', form: 'Form 3', date: '2023-06-25', attempted: true, score: 72 },
//   ];
  
//   const notes = [
//     { subject: 'Mathematics', title: 'Algebra Basics', summary: 'Introduction to algebraic expressions and equations' },
//     { subject: 'Biology', title: 'Cell Structure', summary: 'Detailed notes on prokaryotic and eukaryotic cells' },
//     { subject: 'Physics', title: 'Newton\'s Laws', summary: 'Explanation of the three laws of motion' },
//   ];
  
//   const announcements = [
//     'New Biology Form 2 exam paper added',
//     'Mathematics Form 3 notes updated',
//     'School holiday schedule posted',
//   ];

//   return (
//     <div className="student-dashboard" style={{ 
//       padding: '24px', 
//       backgroundColor: '#f5f5f5',
//       minHeight: '100vh'
//     }}>
//       <h1 style={{ 
//         color: '#2e7d32', 
//         marginBottom: '24px',
//         fontWeight: 500
//       }}>Student Dashboard</h1>
      
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {/* Available Exams Card */}
//         <Card 
//           title={<><BookOutlined /> Available Exams</>}
//           headStyle={{ backgroundColor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}
//           style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//         >
//           {forms.map(form => (
//             <div key={form} style={{ marginBottom: '16px' }}>
//               <h3 style={{ color: '#2e7d32', marginBottom: '8px' }}>{form}</h3>
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//                 {subjects.map(subject => (
//                   <Badge key={`${form}-${subject}`} count={5} style={{ backgroundColor: '#388e3c' }}>
//                     <Button 
//                       type="default" 
//                       style={{ 
//                         backgroundColor: '#e8f5e9', 
//                         borderColor: '#c8e6c9',
//                         color: '#2e7d32'
//                       }}
//                     >
//                       {subject}
//                     </Button>
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </Card>
        
//         {/* Upcoming Exams Card */}
//         <Card 
//           title={<><ClockCircleOutlined /> Upcoming Exams</>}
//           headStyle={{ backgroundColor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}
//           style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//         >
//           <List
//             itemLayout="horizontal"
//             dataSource={exams.filter(exam => !exam.attempted)}
//             renderItem={exam => (
//               <List.Item>
//                 <List.Item.Meta
//                   avatar={<Avatar style={{ backgroundColor: '#388e3c' }}>{exam.subject.charAt(0)}</Avatar>}
//                   title={`${exam.subject} - ${exam.form}`}
//                   description={`Due: ${exam.date}`}
//                 />
//                 <Button type="primary" style={{ backgroundColor: '#2e7d32', borderColor: '#1b5e20' }}>
//                   View
//                 </Button>
//               </List.Item>
//             )}
//           />
//         </Card>
        
//         {/* Results Card */}
//         <Card 
//           title={<><CheckCircleOutlined /> Exam Results</>}
//           headStyle={{ backgroundColor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}
//           style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//         >
//           <List
//             itemLayout="horizontal"
//             dataSource={exams.filter(exam => exam.attempted)}
//             renderItem={exam => (
//               <List.Item>
//                 <List.Item.Meta
//                   avatar={<Avatar style={{ backgroundColor: '#388e3c' }}>{exam.subject.charAt(0)}</Avatar>}
//                   title={`${exam.subject} - ${exam.form}`}
//                   description={`Score: ${exam.score}/100`}
//                 />
//                 <Badge 
//                   status={exam.score >= 50 ? 'success' : 'error'} 
//                   text={exam.score >= 50 ? 'Pass' : 'Fail'} 
//                 />
//               </List.Item>
//             )}
//           />
//         </Card>
//       </div>
      
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: '1fr 1fr',
//         gap: '20px',
//         marginBottom: '24px'
//       }}>
//         {/* Notes Card */}
//         <Card 
//           title={<><BookOutlined /> Subject Notes</>}
//           headStyle={{ backgroundColor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}
//           style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//         >
//           <List
//             itemLayout="horizontal"
//             dataSource={notes}
//             renderItem={note => (
//               <List.Item
//                 actions={[
//                   <Button 
//                     type="text" 
//                     icon={<FilePdfOutlined style={{ color: '#2e7d32' }} />} 
//                     onClick={() => console.log(`Download ${note.title}`)}
//                   />
//                 ]}
//               >
//                 <List.Item.Meta
//                   avatar={<Avatar style={{ backgroundColor: '#388e3c' }}>{note.subject.charAt(0)}</Avatar>}
//                   title={`${note.subject}: ${note.title}`}
//                   description={note.summary}
//                 />
//               </List.Item>
//             )}
//           />
//         </Card>
        
//         {/* Announcements Card */}
//         <Card 
//           title={<><NotificationOutlined /> Announcements</>}
//           headStyle={{ backgroundColor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}
//           style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//         >
//           <List
//             itemLayout="horizontal"
//             dataSource={announcements}
//             renderItem={item => (
//               <List.Item>
//                 <List.Item.Meta
//                   avatar={<Avatar style={{ backgroundColor: '#388e3c' }}><NotificationOutlined /></Avatar>}
//                   title={item}
//                   description="2 hours ago"
//                 />
//               </List.Item>
//             )}
//           />
//         </Card>
//       </div>
      
//       {/* Calendar Section */}
//       <Card 
//         title="Academic Calendar"
//         headStyle={{ backgroundColor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}
//         style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
//       >
//         <Calendar 
//           fullscreen={false} 
//           style={{ border: '1px solid #e8e8e8', borderRadius: '4px' }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default StudentDashboard;


import React from 'react';
import StudentDashboard from '../components/Dashboard/StudentDashboard';

const Student = () => {
  return (
    <div>
      <StudentDashboard />
    </div>
  );
};

export default Student;
