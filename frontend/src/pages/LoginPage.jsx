import React, { useState } from "react"
import { setToken, setUserRole } from '../utils/auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password })
            })
            if (!res.ok) {
                const err = await res.text()
                throw new Error(err || 'Login failed')
            }
            const data = await res.json()
            setToken(data.token)
            setUserRole(data.role)
            try {
                const { getUserFirstName, getUserLastName, setUserFirstName, setUserLastName } = await import('../utils/auth')
                const fn = getUserFirstName();
                const ln = getUserLastName();
                if (!fn && !ln) {
                    const local = (data.email || username).split('@')[0];
                    const parts = local.split(/[._\- ]+/);
                    if (parts.length >= 2) {
                        setUserFirstName(parts[0]);
                        setUserLastName(parts.slice(1).join(' '));
                    } else {
                        setUserFirstName(parts[0]);
                    }
                }
            } catch {
                // ignore
            }
            window.location.href='/'
        } catch(err){
            console.error('Login error', err)
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