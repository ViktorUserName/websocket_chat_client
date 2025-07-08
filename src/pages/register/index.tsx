import { useState } from "react"

export default function Register(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e :React.FormEvent) => {
        e.preventDefault();

        if (!username || !password){
            alert('введите имя и пароль')
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8016/api/users/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password})
            });

            if (!response.ok) {
                alert('неверный логин или пароль')
                return;
            }

            const data = await response.json();
            console.log(data)
        }catch (error){
            console.error(error)
        }
    }


    return(
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
      </form>
    )
}