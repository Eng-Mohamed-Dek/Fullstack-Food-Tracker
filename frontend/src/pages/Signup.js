import { useState } from "react";
import useAuthContext from "../Hook/useAuthContext";


const Signup = () => {
  const { dispatch } = useAuthContext()


  const [email, setEmail ] = useState('')
  const [password, setPassword] = useState('')
  const [Error, setError] = useState(null)
  
  const handleSubmit = async (e) => {
     e.preventDefault()

    const userData = { email, password }
    let url = 'http://localhost:5000/api/user/signup'

    // sent data to mongDB 
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()

    if (response.ok) {
      setError(null)
      // let user to be gotten globally 
      dispatch({ type: 'LOGIN', payload: data })
      
      // store user inside the local storage
      localStorage.setItem('user', JSON.stringify(data))
    }
    
    if(!response.ok) {
      setError(data.error)
    }
  }
   
    return (
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Create a New User</h3>
        <label>Email address:</label>
        <input type="text" placeholder="Enter your Email Address"
        onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input type="password" placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        />
        {Error && <p class="error">{Error}</p>}
        <button>Sign up</button>
      </form>
    );
  };
  
  export default Signup;