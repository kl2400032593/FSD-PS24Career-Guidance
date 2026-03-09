import { useState } from 'react';
import { Login } from './components/Login';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { Toaster } from './components/ui/sonner';
import {
  mockCareerPaths,
  mockCounselors,
  mockResources,
  mockSessions,
} from './data/mockData';

export default function App() {
  // State initialization
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [resources, setResources] = useState(mockResources);
  const [sessions, setSessions] = useState(mockSessions);

  const handleLogin = (role, email) => {
    setUserRole(role);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserEmail('');
  };

  const handleUpdateResources = (updatedResources) => {
    setResources(updatedResources);
  };

  const handleBookSession = (counselorId, date, time) => {
    const newSession = {
      id: Date.now().toString(),
      studentId: 'user1',
      counselorId,
      date,
      time,
      status: 'scheduled',
    };
    setSessions([...sessions, newSession]);
  };

  // Conditional Rendering Logic
  if (!userRole) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  if (userRole === 'admin') {
    return (
      <>
        <AdminDashboard
          onLogout={handleLogout}
          resources={resources}
          counselors={mockCounselors}
          sessions={sessions}
          onUpdateResources={handleUpdateResources}
        />
        <Toaster />
      </>
    );
  }

  return (
    <>
      <UserDashboard
        onLogout={handleLogout}
        userEmail={userEmail}
        careerPaths={mockCareerPaths}
        counselors={mockCounselors}
        resources={resources}
        sessions={sessions}
        onBookSession={handleBookSession}
      />
      <Toaster />
    </>
  );
}