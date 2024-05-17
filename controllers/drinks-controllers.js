
const HttpError = require('../models/http-error');
const uuid = require('uuid');

let DUMMY_DRINKS = [
    {
        id: 'b1',
        title: 'Té de Manzanilla',
        creator: 'u1'
    },
    {
        id: 'b2',
        title: 'Té de Valeriana',
        creator: 'u2'
    },
    {
        id: 'b3',
        title: 'Té de Jazmin',
        creator: 'u3'
    },
    {
        id: 'b4',
        title: 'Té de Romero',
        creator: 'u4'
    },
    {
        id: 'b5',
        title: 'Té de Aniz',
        creator: 'u5'
    },
    {
        id: 'b6',
        title: 'Té de Cúrcuma ',
        creator: 'u6'
    },
    {
        id: 'b7',
        title: 'Café',
        creator: 'u7'
    },
];

const getAllDrinks = (req, res, next)=>{
    res.json({drinks : DUMMY_DRINKS});
};

const getDrinksById = (req, res, next) => {    
    const drink = DUMMY_DRINKS.find(p => {
        return p.id === req.params.pid;
    });
    if (!drink){        
        const error = new Error('La bebida en mención, no existe para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({drink});
    }    
};

const getDrinksByUsers = (req, res, next)=>{
    const drinks = DUMMY_DRINKS.find(p => {
        return p.creator === req.params.uid
    });    

    if (!drinks){
        const error = new HttpError('La bebida en mención, no existe para el creador especificado', 404);
        throw error;
    }

    res.json({drinks});
};

const saveDrink = (req, res, next)=>{
    const {title, creator} = req.body;
    const createdDrink = {
        id: uuid.v4(),
        title,
        creator
    };
    DUMMY_DRINKS.push(createdDrink);
    res.status(201).json({drink:createdDrink});
    res.json({drinks});
};
//updateDrinks = Patch
const updateDrink = (req,res,next)=>{
    const {title} = req.body;
    const drinkId= req.params.pid;
    console.log(drinkId);
    const updatedDrink = {... DUMMY_DRINKS.find(p=>p.id === drinkId)};
    const drinksIndex = DUMMY_DRINKS.findIndex(p=>p.id === drinkId);
    updatedDrink.title = title;
    DUMMY_DRINKS [drinksIndex] = updatedDrink;
    res.status(200).json({drink : updatedDrink});    
};

const deleteDrink = (req, res, next) => {
    const drinkId = req.params.pid;
    DUMMY_DRINKS = DUMMY_DRINKS.filter (p => p.id !== drinkId)
    res.status(200).json({message: 'Bebida Borrada'});
};

exports.getAllDrinks = getAllDrinks;
exports.getDrinksById = getDrinksById;
exports.getDrinksByUsers = getDrinksByUsers;
exports.saveDrink = saveDrink;
exports.updateDrink = updateDrink;
exports.deleteDrink = deleteDrink;