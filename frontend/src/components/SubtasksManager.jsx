import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
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
  taskId, 
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

      {/* Add New Subtask Form */}
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
                value={prioritySelectOptions.find(opt => opt.value === newSubtask.priority)}
                onChange={(selected) => prioritySelectOptions(selected?.value)}
                placeholder="Priority"
                inClearable={false}
                >
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                options={statusSelectOptions}
                value={statusSelectOptions.find(opt => opt.value === newSubtask.status)}
                onChange={(selected) => statusSelectOptions(selected?.value)}
                placeholder="Status"
                inClearable={false}
                >
                </Select>
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
    </div>
  );
}