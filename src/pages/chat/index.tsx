import { useEffect, useRef, useState } from 'react';
import s from './base.module.css'


function Cookies2(){
  const [user, setUser] = useState(null);

useEffect(() => {
  const fetchActualUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8012/api/users/me', {
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
    const websocket = new WebSocket('ws://127.0.0.1:8016/api/ws/wss');
    setWs(websocket);

    websocket.onopen = () => console.log('Connected to WebSocket server');
    websocket.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    websocket.onclose = () => console.log('Disconnected from WebSocket server');
    websocket.onerror = (error) => console.error('error -> ', error)

    // Cleanup on unmount
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
      <div className="messages">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
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



//  function ChatInput() {
//   const [messages, setMessages] = useState<string[]>([]);
//   const [text, setText] = useState('');
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     const websocket = new WebSocket('ws://127.0.0.1:8016/api/ws/wss');
//     setWs(websocket)

//     websocket.onopen = () => console.log('Connected to WebSocket server');
//     websocket.onmessage = (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     };
//     websocket.onclose = () => console.log('Disconnected from WebSocket server');
//     websocket.onerror = (error) => console.error('error -> ', error)

//     return () => websocket.close();
//   }, []);

// const sendMessage = (e: React.FormEvent) => {
//   e.preventDefault();

//   if (ws && ws.readyState === WebSocket.OPEN) {
//     ws.send(text);
//     setText('');
//   } else {
//     console.warn('WebSocket не подключен или не открыт');
//   }
// };

//   return (
//     <div>
//       <h1>WebSocket Chat</h1>
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           id="messageText"
//           autoComplete="off"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//       <ul id="messages">
//         {messages.map((msg, idx) => (
//           <li key={idx}>{msg}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


function Chat(){
    const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8012/api/users')
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