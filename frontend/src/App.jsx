import { useState } from 'react';
import { clearAuth } from './utils/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';
import { ProjectsListPage as TaskList } from './pages/ProjectsListPage';
import { TaskDialog } from './components/TaskDialog';
import { Dashboard } from './pages/Dashboard';
import { TaskDetailsPage } from './pages/ProjectDetailsPage';
import { CreateTaskDialog } from './components/CreateProjectDialog';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';
import { Avatar, AvatarFallback } from './components/ui/Avatar';
import { LayoutDashboard, CheckSquare, Users, Settings, LogOut, Menu } from 'lucide-react';

const mockTasks = [
  {
    id: '1',
    title: 'Design new user interface for dashboard',
    description: 'Create a modern, responsive dashboard interface with improved user experience and accessibility features.',
    status: 'in-progress',
    priority: 'high',
    assignee: { id: 'current-user', name: 'John Doe', avatar: undefined },
    reporter: { id: 'manager-1', name: 'Sarah Manager', avatar: undefined },
    dueDate: new Date('2024-02-15'),
    createdAt: new Date('2024-01-10'),
    attachments: 3,
    observers: 2,
    subtasks: [
      {
        id: 'st1',
        title: 'Create color scheme and typography',
        description: 'Define the visual design system including colors, fonts, and spacing',
        status: 'completed',
        priority: 'medium',
        createdAt: new Date('2024-01-11'),
        updatedAt: new Date('2024-01-12'),
        createdBy: 'John Doe'
      },
      {
        id: 'st2',
        title: 'Design dashboard layout wireframe',
        description: 'Create low-fidelity wireframes for the main dashboard layout',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-13'),
        createdBy: 'John Doe'
      }
    ]
  },
  {
    id: '2',
    title: 'Implement user authentication system',
    description: 'Set up secure login/logout functionality with JWT tokens and password reset capabilities.',
    status: 'review',
    priority: 'urgent',
    assignee: { id: '2', name: 'Jane Smith', avatar: undefined },
    reporter: { id: 'manager-1', name: 'Sarah Manager', avatar: undefined },
    dueDate: new Date('2024-02-20'),
    createdAt: new Date('2024-01-12'),
    attachments: 1,
    observers: 1
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all REST API endpoints with examples, request/response formats, and error codes.',
    status: 'new',
    priority: 'medium',
    assignee: { id: '3', name: 'Mike Johnson', avatar: undefined },
    reporter: { id: 'manager-1', name: 'Sarah Manager', avatar: undefined },
    dueDate: new Date('2024-02-25'),
    createdAt: new Date('2024-01-15'),
    attachments: 0,
    observers: 3
  },
  {
    id: '4',
    title: 'Optimize database queries',
    description: 'Review and optimize slow database queries to improve application performance.',
    status: 'completed',
    priority: 'high',
    assignee: { id: 'current-user', name: 'John Doe', avatar: undefined },
    reporter: { id: 'manager-1', name: 'Sarah Manager', avatar: undefined },
    dueDate: new Date('2024-01-30'),
    createdAt: new Date('2024-01-05'),
    attachments: 2,
    observers: 1,
    subtasks: [
      {
        id: 'st3',
        title: 'Identify slow queries in production logs',
        description: 'Analysis of slow query logs to find problematic queries',
        status: 'completed',
        priority: 'high',
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-08'),
        createdBy: 'John Doe'
      },
      {
        id: 'st4',
        title: 'Add database indexes',
        description: 'Add missing indexes to improve query performance',
        status: 'completed',
        priority: 'high',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-10'),
        createdBy: 'John Doe'
      }
    ]
  },
  {
    id: '5',
    title: 'Setup automated testing pipeline',
    description: 'Configure CI/CD pipeline with automated unit and integration tests.',
    status: 'new',
    priority: 'low',
    assignee: { id: '4', name: 'Sarah Wilson', avatar: undefined },
    reporter: { id: 'manager-1', name: 'Sarah Manager', avatar: undefined },
    dueDate: new Date('2024-03-01'),
    createdAt: new Date('2024-01-18'),
    attachments: 0,
    observers: 2
  }
];

const userRoles = [
  { id: 'manager', name: 'Manager', description: 'Can create and manage all tasks' },
  { id: 'executor', name: 'Executor', description: 'Can work on assigned tasks' },
  { id: 'observer', name: 'Observer', description: 'Can view and monitor tasks' }
];

export default function App() {
  const [currentUserRole, setCurrentUserRole] = useState('manager');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isCreateTaskDialogOpen, setIsCreateTaskDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewingTaskDetails, setViewingTaskDetails] = useState(false);
  const [previousTab, setPreviousTab] = useState('tasks');

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setPreviousTab(activeTab);
    setViewingTaskDetails(true);
    setSidebarOpen(false);
  };

  const handleBackFromTaskDetails = () => {
    setViewingTaskDetails(false);
    setSelectedTask(null);
    setActiveTab(previousTab);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleUpdateTask = (taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    );
  };

  const handleCreateTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const getCurrentUserName = () => {
    switch (currentUserRole) {
      case 'manager': return 'Sarah Manager';
      case 'executor': return 'John Doe';
      case 'observer': return 'Tom Observer';
      default: return 'User';
    }
  };

  // token is available via getToken() when needed

  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-primary" />
                <h1 className="text-xl">TaskFlow</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Role:</span>
                <select
                  value={currentUserRole}
                  onChange={(e) => setCurrentUserRole(e.target.value)}
                  className="text-sm border rounded px-2 py-1 bg-background"
                >
                  {userRoles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {getCurrentUserName().split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm">{getCurrentUserName()}</p>
                  <p className="text-xs text-muted-foreground capitalize">{currentUserRole}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-4 pt-20 lg:pt-4">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === 'dashboard' ? 'selected' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('dashboard');
                    setSidebarOpen(false);
                  }}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                
                <Button
                  variant={activeTab === 'tasks' ? 'selected' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab('tasks');
                    setSidebarOpen(false);
                  }}
                >
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Tasks
                  <Badge className="ml-auto bg-primary/10 text-primary border-0">
                    {currentUserRole === 'executor' 
                      ? tasks.filter(t => t.assignee.id === 'current-user').length
                      : tasks.length
                    }
                  </Badge>
                </Button>

                {/* Only managers can access team management */}
                {currentUserRole === 'manager' && (
                  <Button
                    variant={activeTab === 'team' ? 'selected' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => {
                      setActiveTab('team');
                      setSidebarOpen(false);
                    }}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Team
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  disabled
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>

              <div className="absolute bottom-4 left-4 right-4">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={() => { clearAuth(); window.location.href='/login' }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 p-6">
            {viewingTaskDetails && selectedTask ? (
              <TaskDetailsPage
                task={selectedTask}
                userRole={currentUserRole}
                onStatusChange={handleStatusChange}
                onUpdateTask={handleUpdateTask}
                onBack={handleBackFromTaskDetails}
              />
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <Dashboard userRole={currentUserRole} tasks={tasks} />
                )}
                
                {activeTab === 'tasks' && (
                  <TaskList
                    tasks={tasks}
                    userRole={currentUserRole}
                    onTaskClick={handleTaskClick}
                    onStatusChange={handleStatusChange}
                    onCreateTask={() => setIsCreateTaskDialogOpen(true)}
                  />
                )}

                {activeTab === 'team' && currentUserRole === 'manager' && (
              <div className="space-y-6">
                <h2 className="text-2xl">Team Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'John Doe', role: 'executor', tasks: 3, completed: 8, status: 'active' },
                    { name: 'Jane Smith', role: 'executor', tasks: 2, completed: 12, status: 'active' },
                    { name: 'Mike Johnson', role: 'executor', tasks: 5, completed: 6, status: 'active' },
                    { name: 'Sarah Wilson', role: 'executor', tasks: 1, completed: 15, status: 'active' },
                    { name: 'Tom Observer', role: 'observer', tasks: 0, completed: 0, status: 'active' },
                  ].map((member) => (
                    <div key={member.name} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{member.name}</p>
                          <Badge variant="outline" className="capitalize">
                            {member.role}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Active Tasks</p>
                          <p className="text-lg">{member.tasks}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Completed</p>
                          <p className="text-lg">{member.completed}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
              </>
            )}
          </main>
        </div>

        {/* Dialogs */}
        <TaskDialog
          task={selectedTask}
          isOpen={isTaskDialogOpen}
          onClose={() => {
            setIsTaskDialogOpen(false);
            setSelectedTask(null);
          }}
          userRole={currentUserRole}
          onStatusChange={handleStatusChange}
          onUpdateTask={handleUpdateTask}
        />

        <CreateTaskDialog
          isOpen={isCreateTaskDialogOpen}
          onClose={() => setIsCreateTaskDialogOpen(false)}
          onCreateTask={handleCreateTask}
        />
      </div>
    </Router>
  );
}
