import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Login from './Login'
import Dashboard from './Dashboard'

export interface User {
  uid: number,
  uname: string,
  upass: string
}

const BASE_API_URL = 'http://localhost:3000'

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLogged, setLoggedState] = useState<boolean>(false);
  const [globalUsername, setGlobalUsername] = useState<string>('');
  const [webcontent, setWebcontent] = useState<any>(null);

  useEffect(() => {
    fetch("./webcontent.json")
      .then(x => x.json())
      .then(data => setWebcontent(data))
      .catch(err => console.error("Flagrant fetch error: ", err));
  }, []);

  const handleNewUserRegistered = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, newUser]);
    axios.get<User[]>(`${BASE_API_URL}/api/Users`)
    .then(response => setUsers(response.data))
    .catch(error => console.error(`Flagrant fetch error: ${error}`));
  }

  const setGlobalLoginStatus = (status: boolean) => {
    setLoggedState(status);
  }

  useEffect(() => {
    axios.get<User[]>(`${BASE_API_URL}/api/Users`)
    .then(response => setUsers(response.data))
    .catch(error => console.error(`Flagrant fetch error: ${error}`));
  })

  if (!isLogged) return (
    <>
      <Login globalLoginFunc={setGlobalLoginStatus} globalUsernameFunc={setGlobalUsername} registerFunc={handleNewUserRegistered} userList={users} />
    </>
  ); else return (
    <>
      <Dashboard content={webcontent} username={globalUsername} logoutFunc={setGlobalLoginStatus} />
    </>
  )
}

export default App
