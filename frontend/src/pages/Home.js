import React, { useEffect } from "react";
import FoodDetails from "../components/FoodDetails";
import FoodForm from "../components/FoodForm";
import useFoodContext from "../Hook/useFoodContext";
import useAuthContext from "../Hook/useAuthContext";

const Home = () => {
  // const [foodData, setFoodData] = useState(null)
  const { foods, dispatch } = useFoodContext()
  const { user } = useAuthContext()

  // console.log(user)

  let url = 'http://localhost:5000/api/foods'

  useEffect(() => {
  
  const getData = async () => {
    const response = await fetch(url, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    })
    const data = await response.json()
    // setFoodData(data)
    dispatch({
      type: 'GET_FOODS',
      payload: data,
    })
  }

    if (user) {
      getData()
    }
  }, [foods, user])

  // console.log("food Data", foods)
  // if(!foods) return <h1>Loading......</h1>

  return (
    <>
       <h6>Food Details Daily Tracker Data</h6>
      <div className="home">
        <div>
          { foods && foods.map((foodData) => (
              <FoodDetails id={foodData._id}  foodName={foodData.foodName} Meals={foodData.mealsPer} bodyWeight={foodData.bodyWeight} />
            ))
          }
        </div>
        <FoodForm />
      </div>
    </>
  )
}

export default Home;
