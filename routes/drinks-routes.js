const express = require('express');

const drinksControllers = require('../controllers/drinks-controllers');

const router = express.Router();

router.get('/', drinksControllers.getAllDrinks);

router.get('/:pid', drinksControllers.getDrinksById);

router.get('/users/:uid', drinksControllers.getDrinksByUsers);

router.post('/', drinksControllers.saveDrink);

router.patch('/:pid', drinksControllers.updateDrink);

router.delete('/:pid',drinksControllers.deleteDrink);

module.exports = router;
