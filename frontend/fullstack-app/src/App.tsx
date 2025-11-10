import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface User {
  uname: string,
  upass: string
}

const BASE_API_URL = 'http://localhost:3000'

function App() {
  const [users, setUsers] = useState<User[]>([]);

  const handleNewUserRegistered = (newUser: User) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
        axios.get<User[]>(`${BASE_API_URL}/api/Users`)
        .then(response => setUsers(response.data))
        .catch(error => console.error(`Flagrant fetch error: ${error}`));
    }

  useEffect(() => {
    axios.get<User[]>(`${BASE_API_URL}/api/Users`)
    .then(response => setUsers(response.data))
    .catch(error => console.error(`Flagrant fetch error: ${error}`));
  })

  return (
    <>
      //Todo
    </>
  )
}

export default App
