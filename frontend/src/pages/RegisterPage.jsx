import React, { useState } from "react"
import { getUserRole } from '../utils/auth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

const RegisterPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(1);

    const userRole = getUserRole();

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try{
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, hashPassword: password, roleId: parseInt(roleId) })
            })
            if (!res.ok) {
                const err = await res.text()
                throw new Error(err || 'Register failed')
            }
            window.location.href='/'
        } catch(err){
            console.error('Register error', err)
            alert('Ошибка регистрации')
        }
    }

    if (userRole !== 'manager') {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Доступ запрещён</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Страница регистрации доступна только менеджеру.</p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Регистрация пользователя</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input type='text' placeholder='Фамилия' value = {lastname} onChange={(e) => setLastname(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required />

                        <input type='text' placeholder='Имя' value = {firstname} onChange={(e) => setFirstname(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required />

                        <input type='email' placeholder='Email' value = {email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required />

                        <input type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        required />

                        <select value={roleId} onChange={(e) => setRoleId(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
                            <option value={1}>Manager</option>
                            <option value={2}>Executor</option>
                            <option value={3}>Observer</option>
                        </select>

                        <Button type='submit' 
                            size="sm"
                            variant="default"
                            >Зарегистрировать</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage
