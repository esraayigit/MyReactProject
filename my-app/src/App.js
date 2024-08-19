import React, { useState, useEffect } from 'react';
import { getFirestore, collection, onSnapshot, addDoc } from 'firebase/firestore';

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

  function savetodatabase(username) {
    const messagesCollection = collection(database, "messages");
    const payload = { message: username };

    addDoc(messagesCollection, payload)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });

    setUserName('');
    setPassword('');
    console.log('username:', username);
    console.log('password:', password);
    console.log('payload:', payload);
  }


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

        <button disabled={!username} onClick={()=>savetodatabase(username)} >Save to database</button>
      </header>
      <div className='infos' > 
       <ul>
        {values.map(item => (
          <li key={item.id}>{item.data.message}</li>
        ))}
      </ul>
      </div>  
    </div>
  );
}

export default App;
