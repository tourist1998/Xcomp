const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router = express.Router();
const Need = require('./../model/need.js');

exports.Needfood = async(req,res,next) => {
    const need = await Need.create(req.body); 
    need.save();
    res.status(200).json({
        "Status" : "Success",
        need
    }); 
}

exports.getAllNeed = async(req,res,next) => {
    const need = await Need.find();
    res.status(200).send({
        "Status" : "Sucess",
        need
    });
}
