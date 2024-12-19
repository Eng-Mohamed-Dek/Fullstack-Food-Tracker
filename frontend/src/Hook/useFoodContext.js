import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";

const useFoodContext = () => {
  const context = useContext(FoodContext);

  if (!context) throw Error("No context Exist!");

  return context;
};

export default useFoodContext;
