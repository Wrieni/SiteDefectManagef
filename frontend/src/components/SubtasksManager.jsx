import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { Label } from "./ui/Label";
import { Badge } from "./ui/Badge";
import { Select } from "./ui/Select";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Clock, 
  Trash2,
  Edit3,
  Save,
  X
} from "lucide-react";

  const prioritySelectOptions = [ //переписать на русский потом
    { value: "all", label: "All Priority" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];

   const statusSelectOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress'},
    { value: 'review', label: 'Review'},
    { value: 'completed', label: 'Completed' }
  ];

const statusIcons = {
  'pending': Circle,
  'in-progress': Clock,
  'completed': CheckCircle2,
  'blocked': AlertCircle
};

const statusColors = {
  'pending': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'blocked': 'bg-red-100 text-red-800'
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-700',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-orange-100 text-orange-800',
  'critical': 'bg-red-100 text-red-800'
};

export function SubtaskManager({ 
  subtasks, 
  onAddSubtask, 
  onUpdateSubtask, 
  onDeleteSubtask, 
  userRole,
  currentUser 
}) {
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [editingSubtaskId, setEditingSubtaskId] = useState(null);
  const [newSubtask, setNewSubtask] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });

  const [editingSubtask, setEditingSubtask] = useState({});

  const canManageSubtasks = userRole === 'executor';

  const handleAddSubtask = () => {
    if (!newSubtask.title.trim()) return;

    onAddSubtask({
      title: newSubtask.title,
      description: newSubtask.description,
      status: newSubtask.status,
      priority: newSubtask.priority
    });

    setNewSubtask({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium'
    });
    setIsAddingSubtask(false);
  };

  const handleEditSubtask = (subtask) => {
    setEditingSubtaskId(subtask.id);
    setEditingSubtask(subtask);
  };

  const handleSaveEdit = () => {
    if (editingSubtaskId && editingSubtask) {
      onUpdateSubtask(editingSubtaskId, editingSubtask);
      setEditingSubtaskId(null);
      setEditingSubtask({});
    }
  };

  const handleCancelEdit = () => {
    setEditingSubtaskId(null);
    setEditingSubtask({});
  };

  const handleStatusChange = (subtaskId, newStatus) => {
    onUpdateSubtask(subtaskId, { status: newStatus, updatedAt: new Date() });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg">Subtasks & Defects</h3>
          <Badge variant="outline">{subtasks.length}</Badge>
        </div>
        {canManageSubtasks && !isAddingSubtask && (
          <Button 
            size="sm" 
            onClick={() => setIsAddingSubtask(true)}
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subtask
          </Button>
        )}
      </div>

      {isAddingSubtask && canManageSubtasks && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Add New Subtask</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subtask-title">Title *</Label>
              <Input
                id="subtask-title"
                value={newSubtask.title}
                onChange={(e) => setNewSubtask({ ...newSubtask, title: e.target.value })}
                placeholder="Enter subtask title..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtask-description">Description</Label>
              <Textarea
                id="subtask-description"
                value={newSubtask.description}
                onChange={(e) => setNewSubtask({ ...newSubtask, description: e.target.value })}
                placeholder="Describe the subtask or defect..."
                className="min-h-[80px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select
                  options={prioritySelectOptions}
                  value={prioritySelectOptions.find(opt => opt.value === newSubtask.priority) || null}
                  onChange={(selected) => setNewSubtask({ ...newSubtask, priority: selected?.value || 'medium' })}
                  placeholder="Priority"
                  isClearable={false}
                />
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  options={statusSelectOptions}
                  value={statusSelectOptions.find(opt => opt.value === newSubtask.status) || null}
                  onChange={(selected) => setNewSubtask({ ...newSubtask, status: selected?.value || 'pending' })}
                  placeholder="Status"
                  isClearable={false}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsAddingSubtask(false)}
                size="sm"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddSubtask}
                disabled={!newSubtask.title.trim()}
                size="sm"
              >
                Add Subtask
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* список подзадач (дефектов) */}
      <div className="space-y-3">
        {subtasks.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <Circle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No subtasks created yet</p>
              {canManageSubtasks && (
                <p className="text-sm mt-1">Add subtasks to break down this task into smaller items</p>
              )}
            </CardContent>
          </Card>
        ) : (
          subtasks.map((subtask) => {
            const StatusIcon = statusIcons[subtask.status];
            const isEditing = editingSubtaskId === subtask.id;
            
            return (
              <Card key={subtask.id} className="transition-all hover:shadow-sm">
                <CardContent className="p-4">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          value={editingSubtask.title || ''}
                          onChange={(e) => setEditingSubtask({ ...editingSubtask, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={editingSubtask.description || ''}
                          onChange={(e) => setEditingSubtask({ ...editingSubtask, description: e.target.value })}
                          className="min-h-[60px]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          {
                            (() => {
                              const editPriorityOptions = [
                                { value: 'low', label: 'Low' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'high', label: 'High' },
                                { value: 'critical', label: 'Critical' },
                              ];
                              return (
                                <Select
                                  options={editPriorityOptions}
                                  value={editPriorityOptions.find(opt => opt.value === (editingSubtask.priority || 'medium')) || null}
                                  onChange={(selected) => setEditingSubtask({ ...editingSubtask, priority: selected?.value || 'medium' })}
                                  placeholder="Priority"
                                  isClearable={false}
                                />
                              );
                            })()
                          }
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select 
                            value={editingSubtask.status || 'pending'} 
                            onValueChange={(value) => setEditingSubtask({ ...editingSubtask, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="blocked">Blocked</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveEdit}>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    /* View Mode */
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <StatusIcon className={`h-5 w-5 mt-0.5 ${
                            subtask.status === 'completed' ? 'text-green-600' :
                            subtask.status === 'in-progress' ? 'text-blue-600' :
                            subtask.status === 'blocked' ? 'text-red-600' :
                            'text-gray-400'
                          }`} />
                          <div className="flex-1">
                            <h4 className={`font-medium ${subtask.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                              {subtask.title}
                            </h4>
                            {subtask.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {subtask.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge className={`${statusColors[subtask.status]} text-xs px-2 py-1`}>
                            {subtask.status.replace('-', ' ')}
                          </Badge>
                          <Badge className={`${priorityColors[subtask.priority]} text-xs px-2 py-1`}>
                            {subtask.priority}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-5 w-5">
                            <AvatarFallback className="text-xs">
                              {currentUser.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>Created {subtask.createdAt.toLocaleDateString()}</span>
                          {subtask.updatedAt && subtask.updatedAt.getTime() !== subtask.createdAt.getTime() && (
                            <span>• Updated {subtask.updatedAt.toLocaleDateString()}</span>
                          )}
                        </div>

                        {canManageSubtasks && (
                          <div className="flex items-center gap-1">
                            {subtask.status !== 'completed' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleStatusChange(subtask.id, 'completed')}
                                className="h-6 px-2 text-xs"
                              >
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Complete
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditSubtask(subtask)}
                              className="h-6 px-2"
                            >
                              <Edit3 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDeleteSubtask(subtask.id)}
                              className="h-6 px-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {subtasks.length > 0 && (
        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-medium text-blue-600">
                {subtasks.filter(s => s.status === 'pending').length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-lg font-medium text-yellow-600">
                {subtasks.filter(s => s.status === 'in-progress').length}
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-medium text-green-600">
                {subtasks.filter(s => s.status === 'completed').length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-lg font-medium text-red-600">
                {subtasks.filter(s => s.status === 'blocked').length}
              </div>
              <div className="text-xs text-muted-foreground">Blocked</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}