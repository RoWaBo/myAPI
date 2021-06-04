const { response } = require("express");
const express = require("express");
const router = express.Router();
const Food = require("../models/foods.model");
const auth = require("../auth-middelware");

router.get("/foods", async (req, res, next) => {
    try {
        let result = await Food.find()
        res.json(result)
    } catch (error) {
        return next(error)    
    }
})

router.get("/foods/:foodId", async (req, res, next) => {
    try {
        let result = await Food.findById(req.params.foodId)
        res.json(result)            
    } catch (error) {
        return next(error)
    }
})

router.post("/foods", auth, (req, res, next) => {
    try {
        let food = new Food({
            brand: req.fields.brand,    
            product_name: req.fields.product_name,    
            price: req.fields.price,    
            weight: req.fields.weight,    
            animal: req.fields.animal    
        })
        food.save()
        res.status(201)
        res.json(food)
    } catch (error) {
        return next(error)
    }
})

router.patch("/foods/:foodId", auth, async (req, res, next) => {
    let { brand, product_name, price, weight, animal } = req.fields
    let updateObject = {}

    if (brand) updateObject.brand = brand
    if (product_name) updateObject.product_name = product_name
    if (price) updateObject.price = price
    if (weight) updateObject.weight = weight
    if (animal) updateObject.animal = animal

    let updatedFood = await Food.findByIdAndUpdate(req.params.foodId, updateObject, {new: true})
    res.json(updatedFood)
    res.end()
})

router.delete("/foods/:foodId", auth, async (req, res, next) => {
    try {
        let deletedFood = await Food.findByIdAndDelete(req.params.foodId)
        res.json(deletedFood)
        res.end()
    } catch (error) {
        return next(error)
    }
})

module.exports = router;