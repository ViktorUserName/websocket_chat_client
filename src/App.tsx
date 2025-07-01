import Chat from './pages/chat';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/login';
import Navbar from './elements/navbar';
import Register from './pages/register';


function Homepage(){
  return(
    <div>
      homepage
    </div>
  )
}

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/reg' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App