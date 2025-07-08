import { useEffect, useRef, useState } from 'react';
import s from './base.module.css'



function Cookies2(){
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchActualUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8016/api/users/me', {
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Ошибка');

      const data = await response.json();
      setUser(data);

      
    } catch (err) {
      console.error(err); 
    }
  };

  fetchActualUser();
}, []);


    return(
        <div className={s.cookies}>
            <p>{user ? `Вы вошли как: ${user.username}` : 'Вы не вошли'}</p>
        </div>
    )
}


function ChatInput(){
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://127.0.0.1:8016/api/ws/');

    websocket.onopen = () => {console.log('Connected to WebSocket server');  setWs(websocket);};

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => {
          return [...prevMessages, data]
        });
      } catch (err) {
        console.error('ошибка парсинга', err)
      }
    }

    websocket.onclose = () => console.log('Disconnected from WebSocket server');
    websocket.onerror = (error) => console.error('error -> ', error)

    return () => websocket.close();
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ content: input }));

      setInput('');
    }
  };

  return (
    <div className="notification-center">
      <h2>Real-Time Notifications</h2>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message.sender.username}: {message.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};





function Chat(){
    const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8016/api/users')
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
          <Cookies2/>
        </div>
      </div>
      <div className={s.chat_wrapper}>
        <h1>Сообщения:</h1>
        <div className={s.chat_block}>
            <ChatInput/>
        </div>
      </div>
    </div>
    )
}

export default Chat