const { response } = require("express");
const express = require("express");
const router = express.Router();
const Animal = require("../models/animals.model");
const auth = require("../auth-middelware");

// GET ALL ANIMALS
router.get("/animals", async (req, res, next) => {
    // query is the parameters that comes after ? in the url
    let limit = parseInt(req.query.limit) || 5
    let offset = parseInt(req.query.offset) || 0   
    try {
        let count = (await Animal.find()).length
        let result = await Animal.find().limit(limit).skip(offset)

        let queryStringNext = `?offset=${offset + limit}&limit=${limit}`
        let queryStringPrevious;

        if (offset >= limit) {
            queryStringPrevious = `?offset=${offset - limit}&limit=${limit}`
        }

        let apiUrl = `${req.protocol + "://"}${req.hostname}${req.hostname === "localhost" ? ":" + process.env.PORT : ''}` 
        let apiPath = `${req.baseUrl}${req.path}`

        let output = {
            count,
            next: offset + limit < count ? apiUrl + apiPath + queryStringNext : null,
            previous: offset > 0 ? apiUrl + apiPath + queryStringPrevious : null,
            result,
            url: apiUrl + req.originalUrl
        }
        
        res.json(output)

    } catch (error) {
        return next(error)
    }        
})

// GET SINGLE ANIMAL BY ID
router.get("/animals/:animalId", async (req, res, next) => {
    try {
        let result = await Animal.findById(req.params.animalId)

        // return 404 if no result is found
        if (result == null) {
            res.status(404)
            res.end()
            return
        }

        // 200 - Standard response for successful HTTP requests
        // res.status(200)
        res.json(result)

    } catch (error) {
        return next(error)
    }
})

router.post("/animals", auth, (request, response, next) => {
    try {
        let animal = new Animal({
            type: request.fields.type,
            breed: request.fields.breed,
            name: request.fields.name,
            age: request.fields.age,
            sex: request.fields.sex,
            colors: request.fields.colors
        })
        animal.save()
        // 201 - created new resource
        response.status(201)
        response.json(animal)
    } catch (error) {
        return next(error)
    }
})

router.delete("/animals/:animalId", auth, async (req, res, next) => {
    try {
        await Animal.findByIdAndDelete(req.params.animalId)

        res.status(200)
        res.end()

    } catch (error) {
        return next(error)
    }
})

router.patch("/animals/:animalId", auth, async (req, res, next) => {
    let { type, breed, name, age, sex, colors } = req.fields
    let updateObject = {}
    
    if (type) updateObject.type = type
    if (breed) updateObject.breed = breed
    if (name) updateObject.name = name
    if (age) updateObject.age = age
    if (sex) updateObject.sex = sex
    if (colors) updateObject.colors = colors

    let updatedAnimal = await Animal.findByIdAndUpdate(req.params.animalId, updateObject, {new: true})
    res.json(updatedAnimal)
    res.end()
})

module.exports = router;