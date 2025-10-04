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


  const statusColors = {
    'new': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'review': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'bg-gray-100 text-gray-700',
    'medium': 'bg-yellow-100 text-yellow-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  };

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

   const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);
    setSubtasks(updatedSubtasks);
    
    if (onUpdateTask) {
      onUpdateTask(task.id, { subtasks: updatedSubtasks });
    }
  };


  const [attachments] = useState([
    {
      id: '1',
      name: 'design-mockup.pdf',
      size: '2.4 MB',
      type: 'PDF',
      uploadedBy: 'John Doe',
      uploadedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'task-completion-report.docx',
      size: '856 KB',
      type: 'Document',
      uploadedBy: 'Jane Smith',
      uploadedAt: new Date('2024-01-16')
    }
  ]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs">
                <User className="h-3 w-3" />
                Assignee
              </Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.assignee.avatar} />
                  <AvatarFallback className="text-xs">
                    {getInitials(task.assignee.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.assignee.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs">
                <User className="h-3 w-3" />
                Reporter
              </Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={task.reporter.avatar} />
                  <AvatarFallback className="text-xs">
                    {getInitials(task.reporter.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm">{task.reporter.name}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs">
                <Calendar className="h-3 w-3" />
                Due Date
              </Label>
              <p className={`text-sm ${isOverdue ? 'text-red-600' : ''}`}>
                {task.dueDate.toLocaleDateString()}
                {isOverdue && <span className="ml-2 text-xs">(Overdue)</span>}
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-xs">
                <Clock className="h-3 w-3" />
                Created
              </Label>
              <p className="text-sm">{task.createdAt.toLocaleDateString()}</p>
            </div>
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

        {userRole === 'executor' && task.assignee.id === 'current-user' && (
        <Card>
          <CardHeader>
            <CardTitle>Subtasks & Defects</CardTitle>
          </CardHeader>
          <CardContent>
            <SubtaskManager
              taskId={task.id}
              subtasks={subtasks}
              onAddSubtask={handleAddSubtask}
              onUpdateSubtask={handleUpdateSubtask}
              onDeleteSubtask={handleDeleteSubtask}
              userRole={userRole}
              currentUser={getCurrentUserName()}
            />
          </CardContent>
        </Card>
        )}

        {userRole === 'manager' && subtasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Subtasks & Defects ({subtasks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subtasks.map((subtask) => (
                <div key={subtask.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-medium ${subtask.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {subtask.title}
                    </h4>
                    <div className="flex gap-2">
                      <Badge className={`text-xs px-2 py-0 ${
                        subtask.status === 'completed' ? 'bg-green-100 text-green-800' :
                        subtask.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        subtask.status === 'blocked' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {subtask.status.replace('-', ' ')}
                      </Badge>
                      <Badge className={`text-xs px-2 py-0 ${
                        subtask.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        subtask.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        subtask.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {subtask.priority}
                      </Badge>
                    </div>
                  </div>
                  {subtask.description && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {subtask.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Created by {subtask.createdBy} on {subtask.createdAt.toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* attachments */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Paperclip className="h-4 w-4" />
              Attachments ({attachments.length})
            </Label>
            {canComment && (
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <Paperclip className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{attachment.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {attachment.size} • Uploaded by {attachment.uploadedBy} on {attachment.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* comments */}
      <Card>
        <CardHeader className="pb-3">
          <Label className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comments
          </Label>
        </CardHeader>
        <CardContent className="space-y-4">
          {canComment && (
            <div className="space-y-3">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end">
                <Button 
                  size="sm"
                  disabled={!newComment.trim()}
                  onClick={() => {
                    setNewComment('');
                  }}
                >
                  Add Comment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}