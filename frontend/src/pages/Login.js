import { useState } from "react";
import useAuthContext from "../Hook/useAuthContext";

const Login = () => {
  const { dispatch } = useAuthContext()


  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  
  const handleSubmit = async (e) => {
     e.preventDefault()

    let url = 'https://fullstack-food-tracker-back.vercel.app/api/user/login'
    const userData = { email, password }

    // sent data to mongDB 
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (response.ok) {
      setError(null)

      // let user to be gotten globally 
      dispatch({ type: 'LOGIN', payload: json })
    
      // store user inside the local storage
      localStorage.setItem('user', JSON.stringify(json))
    }
    
    if(!response.ok) {
      setError(json.error)
    }
  }

   
    return (
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Login in</h3>
        <label>Email address:</label>
        <input type="email" placeholder="Enter your Email Address"
        onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        />
        <p class="error">{error}</p>
        <button>Login in</button>
      </form>
    );
  };
  
  export default Login;
