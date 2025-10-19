import './App.css'
import Inicio from './components/inicio/Inicio'
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
          <Route path='/inicio' element={<Inicio/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
