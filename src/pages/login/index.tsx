import { useNavigate } from 'react-router-dom';
import s from './index.module.css'
import { useState } from 'react';


function Cookies(){
    return(
        <div className={s.cookies}>
            <p>cookies</p>
        </div>
    )
}

//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuZXdVczEiLCJleHAiOjE3NTEzOTc5Nzh9.HqoiyVdb2eTrnSInDCJl_V7Zej1NygiTH31tM-VOFMk",
//   "token_type": "bearer"

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
//   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Введите логин и пароль');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8025/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        alert('Неверный логин или пароль');
        return;
      }

      const data = await response.json();
      console.log(data)
    //   navigate('/dashboard'); // путь после входа, можешь заменить

    } catch (error) {
      console.error('Ошибка при входе:', error);
      alert('Ошибка сервера');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>

      {password !== '' && <div>s</div>}
    </form>
  );
}

export default function Login(){
    return (
        <div className={s.wrapper}>
            <div>
                <Cookies/>
                <LoginForm/>
            </div>
        </div>
    )
}