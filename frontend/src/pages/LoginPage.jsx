import React, { useState } from "react"

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault()
        if (username == 'admin' && password == 'admin'){
            localStorage.setItem('authtoken', 'faketoken'),
            localStorage.setItem('userRole', 'manager'),
            window.location.href='/'
        }
        else {
            alert('неверные данные')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value = {username} onChange={(e) => setUsername(e.target.value)} required> Username
                </input>
                <input type='text' value={password} onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button type='submit'></button>
            </form>
        </div>
    )
}

export default LoginPage