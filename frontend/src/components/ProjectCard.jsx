import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import { Calendar, Clock, User, Paperclip, Eye } from "lucide-react";

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

function ProjectCard({ task, userRole, onTaskClick, onStatusChange }){
        const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase();
        const isOverdue = new Date() > new Date(task.dueDate) && task.status !== 'completed';

        return(
            <Card className={`cursor-pointer transition-all hover:shadow-md ${isOverdue ? 'border-red-200' : ''}`}>
                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                        <CardTitle className="text-sm line-clamp-2" onClick={() => onTaskClick?.(task)}>{task.title}</CardTitle>
                        <div className="flex gap-1 ml-2">
                            <Badge className={`${statusColors[task.status] || 'bg-gray-100 text-gray-800'} text-xs px-2 py-1`}>{task.status}</Badge>
                            <Badge className={`${priorityColors[task.priority] || 'bg-gray-100 text-gray-800'} text-xs px-2 py-1`}>{task.priority}</Badge>
                        </div>
                    </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <CardDescription>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                                {task.description}
                            </p>
                        </CardDescription>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span className={isOverdue ? 'text-red-600' : ''}>{new Date(task.dueDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <User className="h-3 w-3" />
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-xs">{getInitials(task.assignee.name)}</AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs">{task.assignee.name}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        {task.attachments && (
                                            <div className="flex items-center gap-1">
                                                <Paperclip className="h-3 w-3" />
                                                <span>{task.attachments}</span>
                                            </div>
                                        )}
                                        {task.observers && (
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                <span>{task.observers}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-3 flex gap-2">
                                    <Button 
                                     size="sm" 
                                     variant="outline" 
                                     onClick={(e) => { e.stopPropagation(); onTaskClick?.(task); }}
                                     className="flex-1 text-xs h-8"
                                    >
                                        View Details
                                    </Button>
                                </div>
                        </CardContent>
                </Card>
        )
}
export {ProjectCard};