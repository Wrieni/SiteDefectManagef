import { useState, useMemo } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/Button";
import { Search, Filter, Plus, Grid, List } from "lucide-react";

export function ProjectsListPage({tasks, userRole, onTaskClick, onStatusChange, onCreateTask }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const filteredTasks = useMemo(() => {
    let filtered = Array.isArray(tasks) ? tasks.slice() : [];

    if (userRole === 'executor') {
      
      filtered = filtered.filter(task => task?.assignee?.id === currentUserId); //поменять на нормальный id юзера
    } else if (userRole === 'observer') {   
      filtered = tasks;
    }

    if (searchQuery) {
      const q = String(searchQuery).toLowerCase();
      filtered = filtered.filter(task =>
        String(task.title || '').toLowerCase().includes(q) ||
        String(task.description || '').toLowerCase().includes(q) ||
        String((task.assignee && task.assignee.name) || '').toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(task => task?.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(task => task?.priority === priorityFilter);
    }

    return filtered;
  }, [tasks, userRole, searchQuery, statusFilter, priorityFilter, currentUserId]);

  const groupedTasks = useMemo(() => ({
    'new': filteredTasks.filter(t => t.status === 'new'),
    'in-progress': filteredTasks.filter(t => t.status === 'in-progress'),
    'review': filteredTasks.filter(t => t.status === 'review'),
    'completed': filteredTasks.filter(t => t.status === 'completed'),
  }), [filteredTasks]);

  const statusColumns = [
    { key: 'new', title: 'New', color: 'bg-blue-100 text-blue-800' },
    { key: 'in-progress', title: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { key: 'review', title: 'Review', color: 'bg-purple-100 text-purple-800' },
    { key: 'completed', title: 'Completed', color: 'bg-green-100 text-green-800' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">
            {userRole === 'executor' ? 'My Tasks' : 'All Tasks'}
          </h2>
          <p className="text-muted-foreground">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
          </p>     
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          {userRole === 'manager' && (
            <Button onClick={onCreateTask}>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">       
            <ProjectCard
              key={task.id}
              task={task}
              userRole={userRole}
              onTaskClick={onTaskClick}
              onStatusChange={onStatusChange}
            />        
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {statusColumns.map((column) => (
            <div key={column.key} className="space-y-4">
              <div className="flex items-center justify-between">

                <span className="text-sm text-muted-foreground">
                  {groupedTasks[column.key].length}
                </span>
              </div>
              <div className="space-y-3">
                {groupedTasks[column.key].map((task) => (
                  <ProjectCard
                    key={task.id}
                    task={task}
                    userRole={userRole}
                    onTaskClick={onTaskClick}
                    onStatusChange={onStatusChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg mb-2">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
              ? 'Try adjusting your filters or search query.'
              : userRole === 'manager'
              ? 'Get started by creating your first task.'
              : userRole === 'executor'
              ? 'No tasks have been assigned to you yet.'
              : 'No tasks to observe yet.'
            }
          </p>
          {userRole === 'manager' && !searchQuery && statusFilter === 'all' && priorityFilter === 'all' && (
            <Button onClick={onCreateTask}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Task
            </Button>
          )}
        </div>
      )}
    </div>
  );
}