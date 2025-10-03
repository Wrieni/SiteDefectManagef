import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if (username == 'admin' && password == 'admin'){
            localStorage.setItem('authToken', 'faketoken'),
            localStorage.setItem('userRole', 'manager'),
            window.location.href='/'
        }
        else {
            alert('неверные данные')
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Войти в систему</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <p>Label</p>
                        <input type='text' value = {username} onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required>
                        </input>
                        <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required>
                        </input>
                        <Button type='submit' 
                            size="sm"
                            variant="default"
                            >Войти</Button>                       
                    </form>
                </CardContent>
            </Card>
            
        </div>
    )
}

export default LoginPage