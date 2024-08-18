import React, { useState, useEffect } from 'react';
import { database, collection, onSnapshot } from './firebase'; // Doğru içe aktarma

import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [values, setValues] = useState([]);

  useEffect(() => {
    const messagesCollection = collection(database, "messages");
    const unsubscribe = onSnapshot(messagesCollection, snapshot => 
      setValues(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    );

    return () => unsubscribe(); // Cleanup function
  }, []);

  return (
    <div className="App">
      <header>
        <input 
          type="text" 
          placeholder="Data Input..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button disabled={!input}>Save to database</button>
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
