import './App.css'
import Login from './components/login/Login'
import Register from './components/register/Register'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
