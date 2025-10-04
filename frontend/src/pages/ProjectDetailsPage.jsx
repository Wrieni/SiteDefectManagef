import { Button } from "../components/ui/Button";
import { Textarea } from "../components/ui/Textarea";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { SubtaskManager } from "./SubtaskManager";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Paperclip, 
  Eye, 
  MessageSquare, 
  Upload, 
  ArrowLeft,
  Edit,
  Save,
  X
} from "lucide-react";


export function TaskDetailsPage({ 
  task, 
  userRole, 
  onStatusChange, 
  onUpdateTask, 
  onBack}) {
  const [newComment, setNewComment] = useState('');
  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority
  });

  const handleAddSubtask = (newSubtask) => {
    const subtask = {
      ...newSubtask,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: getCurrentUserName()
    };
    
    const updatedSubtasks = [...subtasks, subtask];
    setSubtasks(updatedSubtasks);
    
    if (onUpdateTask) {
      onUpdateTask(task.id, { subtasks: updatedSubtasks });
    }
  };

  const handleUpdateSubtask = (subtaskId, updates) => {
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === subtaskId 
        ? { ...subtask, ...updates, updatedAt: new Date() }
        : subtask
    );
    setSubtasks(updatedSubtasks);
    
    if (onUpdateTask) {
      onUpdateTask(task.id, { subtasks: updatedSubtasks });
    }
  };


  const getCurrentUserName = () => {
    if (userRole === 'manager') return 'Sarah Manager';
    if (userRole === 'executor') return 'John Doe'; //заменить потом на текущего пользователя
    return 'Observer';
  };

  const handleSaveEdit = () => {
    if (onUpdateTask) {
      onUpdateTask(task.id, editedTask);
    }
    setIsEditing(false);
  };

  const canEditTask = userRole === 'manager';
  const canChangeStatus = userRole === 'executor' && task.assignee.id === 'current-user';
  const canComment = userRole !== 'observer';

  const isOverdue = new Date() > task.dueDate && task.status !== 'completed';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tasks
        </Button>
        
        <div className="flex items-center gap-2">
          {canEditTask && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? <X className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
          )}
          {isEditing && (
            <Button size="sm" onClick={handleSaveEdit}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  className="text-xl font-medium mb-2"
                />
              ) : (
                <CardTitle className="text-xl mb-2">{task.title}</CardTitle>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <Badge className={`${statusColors[task.status]} text-xs px-2 py-1`}>
                  {task.status.replace('-', ' ')}
                </Badge>
                {isEditing ? (
                  <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                    className="text-xs border rounded px-2 py-1"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                ) : (
                  <Badge className={`${priorityColors[task.priority]} text-xs px-2 py-1`}>
                    {task.priority}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">#{task.id}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm mb-2 block">Description</Label>
            {isEditing ? (
              <Textarea
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-muted-foreground">
                {task.description}
              </p>
            )}
          </div>

          {canChangeStatus && (
            <div className="flex gap-2 pt-2">
              {task.status === 'new' && (
                <Button 
                  size="sm" 
                  onClick={() => onStatusChange?.(task.id, 'in-progress')}
                >
                  Start Task
                </Button>
              )}
              {task.status === 'in-progress' && (
                <Button 
                  size="sm" 
                  onClick={() => onStatusChange?.(task.id, 'review')}
                >
                  Submit for Review
                </Button>
              )}
              {task.status === 'review' && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onStatusChange?.(task.id, 'in-progress')}
                >
                  Back to Progress
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}