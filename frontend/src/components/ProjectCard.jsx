import { Button } from "./ui/Button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";


const statusColors = {
    'Новый': 'bg-blue-100 text-blue-800',
    'В процессе':'bg-yellow-100 text-yellow-800',
    'Завершен': 'bg-green-100 text-green-800',
    'На проверке':'bg-purple-100 text-purple-800'
};

const priorityColors = {
    'Низкий': 'bg-gray-100 text-gray-800',
    'Средний': 'bg-blue-100 text-blue-800',
    'Высокий': 'bg-orange-100 text-orange-800',
    'Срочно': 'bg-red-100 text-red-800'
};

function ProjectCard(task){

    // получить инициалы
    const getInitials = (name) => {
        return name.split(' ').map(n=>n[0]).join('').toUpperCase();
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    <p>
                        {task.description}
                    </p>
                </CardDescription>
                <Button
                 size="sm"
                 variant="default"
                 onClick={(e) => {
                    e.stopPropagination();
                 }}
                >Посмотреть детали</Button>
            </CardContent>
        </Card>
    )

}
export {ProjectCard};