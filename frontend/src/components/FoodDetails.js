import React from 'react'
import useFoodContext from '../Hook/useFoodContext'
import useAuthContext from '../Hook/useAuthContext'

const FoodDetails = ({ foodName, bodyWeight, Meals, id }) => {
  const { dispatch } = useFoodContext()
  const { user } = useAuthContext()


  const handleDelete = async () => {
    // delete api 
    const response = await fetch('http://localhost:5000/api/foods/' + id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` }
    })

    const data = await response.json()

    if (response.ok) {
      dispatch({
        type: 'DELETE_FOOD',
        payload: data
      })
    }
  }

  return (
    <>
      <div className='food-details'>
        <h4>{foodName}</h4>
          <p> <strong>Your Weight (kg): </strong> {bodyWeight} </p>
          <p> <strong>Meals Per Day : </strong> {Meals} </p>
          <span className='delete' onClick={handleDelete}>Delete</span>
      </div>
     </>
  )
}

export default FoodDetails