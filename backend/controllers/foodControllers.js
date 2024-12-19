const foodModel = require('../models/FoodModels')

// CRUD - create , read , update , delete 

// Get All Foods - READ
const readData = async (req, res) => {
    const user_id = req.user._id;
    const Data = await foodModel.find({ user_id }).sort({createdAt: -1 })
    res.status(200).json(Data)
}

// Post / Create a new Food Item - CREATE
const createData =  async (req, res) => {
    try {

        const { foodName, bodyWeight, mealsPer } = req.body
        
        //validations
        if (!foodName || !bodyWeight || !mealsPer) {
            throw Error("Please Fill Out all Inputs");
        }
        
        const user_id = req.user._id;
        const newFood = await foodModel.create({foodName, bodyWeight, mealsPer , user_id});
        res.status(200).json({newFood})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Delete / Delete a new Food Item - CREATE
const deleteData = async (req, res) => {
    const { id } = req.params;
    await foodModel.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: "Deleted Successfully!" })
        }).catch(error => { 
            res.status(401).json({error: error.message})
        })
}

// export routes 
module.exports = {
    readData,
    createData,
    deleteData  
}
