import './App.css'
import Inicio from './components/inicio/Inicio'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Reporte from './components/reporte/Reporte'
import Prestamos from './components/prestamos/Prestamos'
import Transacciones from './components/transacciones/Transacciones'
// import Gestion from './components/gestion/Gestion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/inicio' element={<Inicio/>}/>
          <Route path='/reporte' element={<Reporte/>}/>
          <Route path='/prestamos' element={<Prestamos/>}/>
          <Route path='/transacciones' element={<Transacciones/>}/>
          {/* <Route path='/gestion' element={<Gestion/>}/> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
