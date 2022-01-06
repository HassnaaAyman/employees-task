/** @format */

import React, { useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3001';

function App() {
  useEffect(() => {
    fetch(`${API_BASE_URL}/employees`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log({ result });
        },
        (error) => {
          console.log({ error });
        },
      );
  }, []);

  return <div>hassnaa</div>;
}

export default App;
