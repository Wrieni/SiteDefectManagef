import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import LoginPage from './pages/LoginPage';

function App() {
    const isAuth = !!localStorage.getItem('authToken');

  return (
    <Router>
      <div className='App'>
        <Routes>
        <Route path='/login' element={!isAuth ? <LoginPage/> : <Navigate to='/'/>}>
        </Route>
        <Route path='/' element={isAuth ? <Dashbord/> : <Navigate to='/login'/>}></Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
