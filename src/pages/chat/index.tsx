import { useEffect, useState } from 'react';
import s from './base.module.css'

function Chat(){
    const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8040/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (err) {
        console.error('Ошибка загрузки пользователей:', err)
      }
    }

    fetchUsers()
  }, [])

    return(
         <div className={s.wrapper}>
      <div className={s.users}>
        <div>
          <h2>Офлайн:</h2>
          {users.map(user => (
            <a href={`#${user.id}`} key={user.id}>
              {user.username}
            </a>
          ))}
        </div>
        <div>
          <h2>Онлайн:</h2>
        </div>
      </div>
      <div className={s.chat_wrapper}>
        <h1>Сообщения:</h1>
        <div className={s.chat_block}>
          
        </div>
      </div>
    </div>
    )
}

export default Chat