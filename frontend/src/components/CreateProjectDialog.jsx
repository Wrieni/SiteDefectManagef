
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { Select } from "./ui/Select";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";


const users = [ // временные данные, заменить на реальных юзеров из пропсов или контекста
  { id: 'user-1', name: 'Alice Johnson' },
  { id: 'user-2', name: 'Bob Smith' },
  { id: 'user-3', name: 'Charlie Brown' },
];

const observers = [
  { id: '5', name: 'Tom Observer', role: 'observer' },
  { id: '6', name: 'Lisa Watcher', role: 'observer' },
  { id: '7', name: 'David Monitor', role: 'observer' },
];

export function CreateTaskDialog({ onClose, onCreateTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState();
  const [selectedObservers, setSelectedObservers] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !assigneeId || !dueDate) {
      return;
    }
    const assignee = users.find(u => u.id === assigneeId);
    if (!assignee) return;

    const newTask = {
      id: Math.random().toString(36).substr(2, 9), // временный id
      title: title.trim(),
      description: description.trim(),
      status: 'new',
      priority,
      assignee: {
        id: assignee.id,
        name: assignee.name,
      },
      reporter: {
        id: 'manager-1',
        name: 'Current Manager', // заменить на текущего юзера
      },
      dueDate,
      createdAt: new Date(),
      observers: selectedObservers.length,
      subtasks: [], 
    };

    onCreateTask(newTask);
    
    setTitle('');
    setDescription('');
    setAssigneeId('');
    setPriority('medium');
    setDueDate(undefined);
    setSelectedObservers([]);
    
    onClose();
  };


  return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              required
            />
            </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide task details and requirements..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Assignee *</Label>
              <Select
                options ={users.map(user => ({ value: user.id, label: user.name }))}
                value={users.find(user => user.id === assigneeId)}
                onChange={(selected) => setAssigneeId(selected?.value)}
                placeholder="Select assignee"
                isClearable={false}
              >          
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>

                <Select
                    options ={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                        { value: 'urgent', label: 'Urgent' },
                    ]}
                    value={{ value: priority, label: priority.charAt(0).toUpperCase() + priority.slice(1) }}
                    onChange={(selected) => setPriority(selected?.value)}
                    placeholder="Select priority"
                    isClearable={false} 
                >
                </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Due Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar selected={dueDate} onSelect={setDueDate} />
              </PopoverContent>
            </Popover>
          </div>
        <Label>Observers</Label>

        <Select
            options ={observers.map(observer => ({ value: observers.id, label: observers.name }))}
            value={observers.find(observer => observers.id === assigneeId)}
            onChange={(selected) => setAssigneeId(selected?.value)}
            placeholder="Select assignee"
            isClearable={false}
        >
        </Select>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || !assigneeId || !dueDate}>
              Create Task
            </Button>
          </div>
        </form>
  );
}