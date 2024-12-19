import React, { useState } from "react";
import useFoodContext from "../Hook/useFoodContext";
import useAuthContext from "../Hook/useAuthContext";

const FoodForm = () => {
  
  const { dispatch } = useFoodContext()
  const { user } = useAuthContext()

  const [foodName, setFoodName] = useState("");
  const [bodyWeight, setWeight] = useState("");
  const [mealsPer, setMeals] = useState("");
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => { 
    event.preventDefault()
    
    if (!user) {
      setError('You must be logged in')
      return
    }
    
    let url = 'http://localhost:5000/api/foods'
    const foodData = { foodName, bodyWeight, mealsPer }
    
    // sent data to mongDB 
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(foodData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const data = await response.json()

    if (response.ok) {
      setMeals("")
      setFoodName("")
      setWeight("")
      dispatch({ type: 'CREATE_FOOD', payload: data })
      setError(null)
    }
    
    if(!response.ok) {
      setError(data.error)
    }


  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Day New Food</h3>
      <label>Food Name</label>
      <input
        type="text"
        placeholder="Enter Your Food Name"
        onChange={(e) => setFoodName(e.target.value)}
      />
      <label>Your Weight (kg)</label>
      <input
        type="text"
        placeholder="Enter Your Your Weight"
        onChange={(e) => setWeight(e.target.value)}
      />
      <label>Meals Per Day</label>
      <input
        type="text"
        placeholder="Enter Your Meals Per Day"
        onChange={(e) => setMeals(e.target.value)}
      />
      {error && <p class="error">{error}</p>}
      <button>Add New Food</button>
    </form>
  );
};

export default FoodForm;
