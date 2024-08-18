import React, { useState, useEffect } from 'react';
import { database, collection, onSnapshot } from './firebase'; // Doğru içe aktarma

import './App.css';

function App() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = useState([]);

  useEffect(() => {
    const messagesCollection = collection(database, "messages");
    const unsubscribe = onSnapshot(messagesCollection, snapshot => 
      setValues(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    );

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="App">
      <header>
        <input 
          type="text" 
          placeholder="Kullanici Adi " 
          value={username} 
          onChange={(e) => setUserName(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Şifre" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button disabled={!username}>Save to database</button>
      </header>
      <ul>
        {values.map(item => (
          <li key={item.id}>{item.data.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
