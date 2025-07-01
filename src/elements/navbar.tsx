import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav>
            <Link to='/'>Главная</Link>
            <Link to='/login'>Логин</Link>
            <Link to='/chat'>Чат</Link>
            <Link to='/reg'>Регистрация</Link>
            
        </nav>
    )
}