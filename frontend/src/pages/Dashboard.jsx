import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  TrendingUp 
} from "lucide-react";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function Dashboard({ userRole, tasks }) {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const overdueTasks = tasks.filter(t => new Date() > t.dueDate && t.status !== 'completed').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Task status distribution
  const statusData = [
    { name: 'New', value: tasks.filter(t => t.status === 'new').length, color: '#0088FE' },
    { name: 'In Progress', value: inProgressTasks, color: '#00C49F' },
    { name: 'Review', value: tasks.filter(t => t.status === 'review').length, color: '#FFBB28' },
    { name: 'Completed', value: completedTasks, color: '#FF8042' }
  ];

  // Priority distribution
  const priorityData = [
    { name: 'Low', count: tasks.filter(t => t.priority === 'low').length },
    { name: 'Medium', count: tasks.filter(t => t.priority === 'medium').length },
    { name: 'High', count: tasks.filter(t => t.priority === 'high').length },
    { name: 'Urgent', count: tasks.filter(t => t.priority === 'urgent').length }
  ];

  // Recent activity based on user role
  const getRecentActivity = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return sortedTasks.slice(0, 5);
  };

  const getMyTasks = () => {
    if (userRole === 'executor') {
      return tasks.filter(t => t.assignee.id === 'current-user');
    }
    return tasks;
  };

  const myTasks = getMyTasks();
  const recentActivity = getRecentActivity();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {userRole === 'executor' ? 'Assigned to you' : 'All tasks'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              Active tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-red-600">{overdueTasks}</div>
            <p className="text-xs text-muted-foreground">
              Need attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Priority Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((task) => (
                <div key={task.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback className="text-xs">
                      {task.assignee.name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{task.assignee.name}</span>
                      {' '}was assigned{' '}
                      <span className="font-medium">"{task.title}"</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={`text-xs px-2 py-0 ${
                          task.status === 'completed' ? 'bg-green-100 text-green-800' :
                          task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                          task.status === 'review' ? 'bg-purple-100 text-purple-800' :
                          'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {task.status.replace('-', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {task.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Tasks / Team Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {userRole === 'executor' ? 'My Tasks' : 'Team Overview'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userRole === 'executor' ? (
                // Show executor's assigned tasks
                myTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm line-clamp-1">{task.title}</p>
                      <p className="text-xs text-muted-foreground">
                        Due: {task.dueDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Badge 
                      className={`text-xs px-2 py-0 ${
                        task.status === 'completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        task.status === 'review' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </div>
                ))
              ) : (
                [
                  { name: 'John Doe', tasks: 3, completed: 8 },
                  { name: 'Jane Smith', tasks: 2, completed: 12 },
                  { name: 'Mike Johnson', tasks: 5, completed: 6 },
                  { name: 'Sarah Wilson', tasks: 1, completed: 15 },
                ].map((member) => (
                  <div key={member.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm">{member.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {member.completed} completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{member.tasks}</p>
                      <p className="text-xs text-muted-foreground">active</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}