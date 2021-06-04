const { response } = require("express");
const express = require("express");
const router = express.Router();
const Accessory = require("../models/accessories.model");
const auth = require("../auth-middelware");

router.get("/accessories", async (req, res, next) => {
    try {
        let result = await Accessory.find()
        res.json(result)
    } catch (error) {
        return next(error)    
    }
})

router.get("/accessories/:accessoryId", async (req, res, next) => {
    try {
        let result = await Accessory.findById(req.params.accessoryId)
        res.json(result)            
    } catch (error) {
        return next(error)
    }
})

router.post("/accessories", auth, (req, res, next) => {
    try {
        let accessory = new Accessory({
            brand: req.fields.brand,    
            product_name: req.fields.product_name,    
            price: req.fields.price,    
            product_group: req.fields.product_group
        })
        accessory.save()
        res.status(201).json(accessory)
    } catch (error) {
        return next(error)
    }
})

router.patch("/accessories/:accessoryId", auth, async (req, res, next) => {
    let { brand, product_name, price, product_group  } = req.fields
    let updateObject = {}

    if (brand) updateObject.brand = brand
    if (product_name) updateObject.product_name = product_name
    if (price) updateObject.price = price
    if (product_group) updateObject.product_group = product_group

    let updatedAccessory = await Accessory.findByIdAndUpdate(req.params.accessoryId, updateObject, {new: true})
    res.json(updatedAccessory)
    res.end()
})

router.delete("/accessories/:accessoryId", auth, async (req, res, next) => {
    try {
        let deletedAccessory = await Accessory.findByIdAndDelete(req.params.accessoryId)
        res.json(deletedAccessory)
        res.end()
    } catch (error) {
        return next(error)
    }
})

module.exports = router;