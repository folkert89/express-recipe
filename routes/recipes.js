const router = require('express').Router()
const { Recipe } = require('../models')

// hij roepte middleware aan als routes. routes als use..
router.get('/recipes', (req, res, next) => {
  Recipe.find()
    // Newest recipes first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((recipes) => res.json(recipes))
    // Forward any errors to error handler
    .catch((error) => next(error))
  })
  .get('/recipes/:id', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
        if (!recipe) { return next() }
        res.json(recipe)
      })
      .catch((error) => next(error))
  })
  .post('/recipes',  (req, res, next) => {
    let newRecipe = req.body
    Recipe.create(newRecipe)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })
  .put('/recipes', (req, res, next) => {
    const id = req.params.id
    Recipe.findById(id)
      .then((recipe) => {
      if (!recipe) { return next() }

      const newData = req.body

      recipe.update(newData)
        .then((updatedRecipe) => {
          res.json(updatedRecipe)
    })
    .catch((error) => next(error))
    })
    .catch((error) => next(error))
  })
  .patch('/recipes/:id',  (req, res, next) => {
    const recipeId = req.params.id
    let update = req.body


    Recipe.findOneAndUpdate(recipeId, update)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })

  .delete('/recipes/:id',  (req, res, next) => {
    const recipeId = req.params.id

    Recipe.findOneAndRemove(recipeId)
      .then((recipe) => res.json(recipe))
      .catch((error) => next(error))
  })




module.exports = router
