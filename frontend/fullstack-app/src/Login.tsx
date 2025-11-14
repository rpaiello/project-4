import { useState, useEffect } from "react";
import axios from "axios";
import type { User } from "./App";
const BASE_API_URL = "http://localhost:3000";

function Login({globalLoginFunc, globalUsernameFunc, registerFunc, userList}: any) {
    const [uname, setUname] = useState<string>('');
    const [upass, setUpass] = useState<string[]>(['', '']); //First string for password input, second string for "Retype Password" input
    const [errMsg, setErrMsg] = useState<string[]>(['', '', '']);
    /**
     * errMsg[0]: Username error message
     * errMsg[1]: Password error message
     * errMsg[2]: Password retype error message
     */

    const [mode, setMode] = useState<'register' | 'login'>('login');
    // const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

    const handleFormChange = (e: any) => {
        const target = e.target.id;
        const value = e.target.value as string;

        // Copilot sez: Just using the "uname" and "upass" state variables can read a stale, previous state instead of the newest value of the state. So we specify a fresh, locally-scoped "newUname" and "newUpass"
        let newUname = uname;
        const newUpass = [upass[0], upass[1]];

        if (target === 'uname') newUname = value;
        if (target === 'upass') newUpass[0] = value;
        if (target === 'retypeupass') newUpass[1] = value;

        // update state from the computed fresh values
        setUname(newUname);
        setUpass(newUpass);

        const newErr: string[] = ['', '', ''];
        if (newUname.length > 16 || newUname.length < 4) {
            newErr[0] = 'Username must be between 4 and 16 characters';
        }
        if (newUpass[0].length > 20 || newUpass[0].length < 4) {
            newErr[1] = 'Password must be between 4 and 20 characters';
        }
        if (mode === 'register' && newUpass[0] !== newUpass[1]) {
            newErr[2] = "Passwords don't match";
        }

        setErrMsg(newErr);
    }

    const handleLogin = (e: any) => {
        e.preventDefault();
        const login = [uname, upass[0]];
        let loginFlag = false;
        
        for (let user of userList) {
            if (user.uname === login[0] && user.upass === login[1]) {
                try {
                    globalUsernameFunc(uname);
                    setUname('');
                    setUpass(['', '']);
                    setErrMsg(['','','']);
                    loginFlag = true;
                    globalLoginFunc(true);
                } catch (error) {
                    console.error(error)
                }
            }
        }
        if (!loginFlag) alert("This account doesn't exist!");
    }

    const handleRegistration = async (e: any) => {
        e.preventDefault();
        const registration = {uname: uname, upass: upass[0]}

        for (let user of userList) {
            if (user.uname === registration.uname) {
                alert("This account already exists!");
                return;
            }
        }

        try {
            const response = await axios.post<User>(`${BASE_API_URL}/api/register`, {...registration});
            registerFunc(response.data);
            alert('Successfully created account');
            handleModeChange();
        } catch (error) {
            console.error(error)
        }
    }

    const handleModeChange = () => {
        const cMode = mode;
        setUname('');
        setUpass(['', '']);
        setErrMsg(['','','']);
        if (cMode == 'login') setMode('register');
        else setMode('login');
    }

    if (mode == 'login') return (
        <>
            <button onClick={handleModeChange}>register new user</button>
            <br />
            <form action="/" onSubmit={handleLogin}>
                <label htmlFor="uname">Username</label>
                <input type="text" placeholder="myname123" value={uname} onChange={handleFormChange} id="uname" required /> {uname.length}
                <span className="error">{errMsg[0]}</span>
                <br />
                <label htmlFor="upass">Password</label>
                <input type="password" placeholder="••••••" value={upass[0]} onChange={handleFormChange} id="upass" required /> {upass[0].length}
                <span className="error">{errMsg[1]}</span>
                <br />
                <input type="submit" id="submit" disabled={Boolean(errMsg[0] || errMsg[1] || errMsg[2])} />
            </form>
        </>
    ); else return (
        <>
        <>
            <button onClick={handleModeChange}>login existing user</button>
            <br />
            <form action="/" onSubmit={handleRegistration}>
                <label htmlFor="uname">Username</label>
                <input type="text" placeholder="myname123" value={uname} onChange={handleFormChange} id="uname" required /> {uname.length}
                <span className="error">{errMsg[0]}</span>
                <br />
                <label htmlFor="upass">Password</label>
                <input type="password" placeholder="••••••" value={upass[0]} onChange={handleFormChange} id="upass" required /> {upass[0].length}
                <span className="error">{errMsg[1]}</span>
                <br />
                <label htmlFor="retypeupass">Retype Password</label>
                <input type="password" placeholder="••••••" value={upass[1]} onChange={handleFormChange} id="retypeupass" required /> {upass[1].length}
                <span className="error">{errMsg[2]}</span>
                <br />
                <input type="submit" id="submit" disabled={Boolean(errMsg[0] || errMsg[1] || errMsg[2])} />
            </form>
        </>
        </>
    )
}

export default Login;