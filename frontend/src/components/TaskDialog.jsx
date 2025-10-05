import { useState } from 'react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/Avatar';
import { Textarea } from './ui/Textarea';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { Separator } from './ui/Separator';
import { SubtaskManager } from './SubtasksManager';
import { Calendar, Clock, User, Paperclip, MessageSquare, Upload } from 'lucide-react';

export function TaskDialog({ task, isOpen, onClose, userRole, onStatusChange, onUpdateTask }) {
  const [newComment, setNewComment] = useState('');
  const [subtasks, setSubtasks] = useState((task && task.subtasks) || []);

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

  const [comments] = useState([
    { id: '1', author: 'John Doe', content: "I've started working on this task. Will provide an update by end of day.", createdAt: new Date('2024-01-15T10:30:00') },
    { id: '2', author: 'Sarah Manager', content: 'Please make sure to follow the design guidelines mentioned in the attached document.', createdAt: new Date('2024-01-15T14:45:00') },
    { id: '3', author: 'John Doe', content: 'Task completed. Please review the attached files.', createdAt: new Date('2024-01-16T16:20:00') }
  ]);

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();

  const handleAddSubtask = (newSubtask) => {
    const subtask = {
      ...newSubtask,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: getCurrentUserName()
    };
    const updated = [...subtasks, subtask];
    setSubtasks(updated);
    if (onUpdateTask && task) onUpdateTask(task.id, { subtasks: updated });
  };

  const handleUpdateSubtask = (subtaskId, updates) => {
    const updated = subtasks.map(s => s.id === subtaskId ? { ...s, ...updates, updatedAt: new Date() } : s);
    setSubtasks(updated);
    if (onUpdateTask && task) onUpdateTask(task.id, { subtasks: updated });
  };

  const handleDeleteSubtask = (subtaskId) => {
    const updated = subtasks.filter(s => s.id !== subtaskId);
    setSubtasks(updated);
    if (onUpdateTask && task) onUpdateTask(task.id, { subtasks: updated });
  };

  const getCurrentUserName = () => {
    if (userRole === 'manager') return 'Sarah Manager';
    if (userRole === 'executor') return 'John Doe';
    return 'Observer';
  };

  if (!isOpen || !task) return null;

  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'review': 'bg-purple-100 text-purple-800',
    'completed': 'bg-green-100 text-green-800'
  };

  const priorityColors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-blue-100 text-blue-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  };

  const canEditTask = userRole === 'manager';
  const canChangeStatus = userRole === 'executor' && task.assignee.id === 'current-user';
  const canComment = userRole !== 'observer';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col rounded-lg">
        <div className="p-4 border-b flex items-start justify-between">
          <h3 className="text-lg font-medium pr-8">{task.title}</h3>
          <div className="flex gap-2">
            <Badge className={`${statusColors[task.status]} px-3 py-1`}>{task.status.replace('-', ' ')}</Badge>
            <Badge className={`${priorityColors[task.priority]} px-3 py-1`}>{task.priority}</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Description</Label>
              <p className="mt-1 text-muted-foreground">{task.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-xs text-muted-foreground">Assignee</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6"><AvatarImage src={task.assignee.avatar} /><AvatarFallback className="text-xs">{getInitials(task.assignee.name)}</AvatarFallback></Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-xs text-muted-foreground">Reporter</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6"><AvatarImage src={task.reporter.avatar} /><AvatarFallback className="text-xs">{getInitials(task.reporter.name)}</AvatarFallback></Avatar>
                    <span className="text-sm">{task.reporter.name}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-xs text-muted-foreground">Due Date</Label>
                  <p className="text-sm mt-1">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <Label className="text-xs text-muted-foreground">Created</Label>
                  <p className="text-sm mt-1">{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="flex items-center gap-2"><Paperclip className="h-4 w-4" />Attachments ({attachments.length})</Label>
              {canEditTask && (
                <Button size="sm" variant="outline"><Upload className="h-4 w-4 mr-2" />Upload File</Button>
              )}
            </div>
            <div className="space-y-2">
              {attachments.map(att => (
                <div key={att.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center"><Paperclip className="h-4 w-4 text-blue-600" /></div>
                    <div>
                      <p className="text-sm">{att.name}</p>
                      <p className="text-xs text-muted-foreground">{att.size} • {att.type} • Uploaded by {att.uploadedBy} on {att.uploadedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Download</Button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {userRole === 'executor' && task.assignee.id === 'current-user' && (
            <>
              <SubtaskManager taskId={task.id} subtasks={subtasks} onAddSubtask={handleAddSubtask} onUpdateSubtask={handleUpdateSubtask} onDeleteSubtask={handleDeleteSubtask} userRole={userRole} currentUser={getCurrentUserName()} />
              <Separator />
            </>
          )}

          {userRole === 'manager' && subtasks.length > 0 && (
            <>
              <div>
                <Label className="flex items-center gap-2 mb-4"><MessageSquare className="h-4 w-4" />Subtasks & Defects ({subtasks.length})</Label>
                <div className="space-y-3">
                  {subtasks.map(st => (
                    <div key={st.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`font-medium ${st.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{st.title}</h4>
                        <div className="flex gap-2">
                          <Badge className={`text-xs px-2 py-0 ${st.status === 'completed' ? 'bg-green-100 text-green-800' : st.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : st.status === 'blocked' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{st.status.replace('-', ' ')}</Badge>
                          <Badge className={`text-xs px-2 py-0 ${st.priority === 'critical' ? 'bg-red-100 text-red-800' : st.priority === 'high' ? 'bg-orange-100 text-orange-800' : st.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{st.priority}</Badge>
                        </div>
                      </div>
                      {st.description && <p className="text-sm text-muted-foreground mb-2">{st.description}</p>}
                      <p className="text-xs text-muted-foreground">Created by {st.createdBy} on {new Date(st.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
            </>
          )}

          <div>
            <Label className="flex items-center gap-2 mb-4"><MessageSquare className="h-4 w-4" />Comments ({comments.length})</Label>
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{getInitials(c.author)}</AvatarFallback></Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><span className="text-sm">{c.author}</span><span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()} at {new Date(c.createdAt).toLocaleTimeString()}</span></div>
                    <p className="text-sm text-muted-foreground">{c.content}</p>
                  </div>
                </div>
              ))}

              {canComment && (
                <div className="mt-4 space-y-2">
                  <Textarea placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="min-h-[80px]" />
                  <div className="flex justify-end"><Button size="sm" disabled={!newComment.trim()}>Add Comment</Button></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t p-4">
          <div className="flex gap-2">
            {canChangeStatus && (
              <>
                {task.status === 'new' && (<Button onClick={() => onStatusChange?.(task.id, 'in-progress')} variant="default">Start Task</Button>)}
                {task.status === 'in-progress' && (<Button onClick={() => onStatusChange?.(task.id, 'review')} variant="default">Submit for Review</Button>)}
              </>
            )}

            {userRole === 'manager' && task.status === 'review' && (
              <div className="flex gap-2">
                <Button onClick={() => onStatusChange?.(task.id, 'completed')} variant="default">Approve</Button>
                <Button onClick={() => onStatusChange?.(task.id, 'in-progress')} variant="outline">Request Changes</Button>
              </div>
            )}
          </div>

          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}
