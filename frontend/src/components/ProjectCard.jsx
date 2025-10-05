import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";


function ProjectCard({ task }){
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
                >Посмотреть детали</Button>
            </CardContent>
        </Card>
    )
}
export {ProjectCard};