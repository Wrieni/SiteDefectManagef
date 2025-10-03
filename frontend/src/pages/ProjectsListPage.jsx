import { useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Button } from "../components/ui/Button";
import { Search, Filter, Plus, Grid, List } from "lucide-react";

export function ProjectsListPage({userRole, onTaskClick, onStatusChange, onCreateTask }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">
            {userRole === 'executor' ? 'My Tasks' : 'All Tasks'}
          </h2>
          
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

    </div>
  );
}