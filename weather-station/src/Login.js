import {useState, useEffect} from 'react'

export default function Login({isLoggedInSetter}) {

    const [loggedInState, setLoggedInState] = useState(false)

    useEffect(() =>{
        isLoggedInSetter(loggedInState);
    }, [isLoggedInSetter, loggedInState])

    const [accountCredentials, setAccountCredentials] = useState({
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        setAccountCredentials({...accountCredentials, [e.target.name]: e.target.value});
    }

    const login = () => {
        const json = localStorage.getItem(accountCredentials.email)
        if (json !== null) {
            const userPassword = JSON.parse(json).password;
            if (userPassword === accountCredentials.password){
                setLoggedInState(true)
            } else {
                alert("email or password incorrect")
            }
        } else {
            alert("email or password incorrect")
        }
    }
    const createAccount = () => {
        const data = {password: 'password123', weatherStations: []}
        const json = JSON.stringify(data)
        localStorage.setItem('cody@gmail.com', json)
        alert("account created\nemail: cody@gmail.com\npassword: password123")
    }

    return (
        <div className="login-page-container">
            <h1>Log In</h1>
            email:
            <input
                className="form-input"
                type="email"
                name="email"
                onChange={changeHandler}
                value={accountCredentials.email}
            /><br/>
            password:
            <input 
                className="form-input"
                type="password"
                name="password"
                onChange={changeHandler}
                value={accountCredentials.password}
            /><br/>
            <button className="form-input" onClick={login}>login</button><br/>
            <button className='form-input' onClick={createAccount}>create account</button>
        </div>
    )
}