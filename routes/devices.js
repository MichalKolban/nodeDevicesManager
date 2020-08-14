// import express from 'express'
const express = require('express')
const router = express.Router()
const DeviceModel = require('../model/deviceModel')


// get all
router.get('/', async function (req, res) {
    try {
        const devices = await DeviceModel.find();
        res.send(devices)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }

})

// get one
router.get('/:id', getDevice, function(req,res){
    res.json(res.device)
})

// post
router.post('/', async function (req, res) {
    const device = new DeviceModel({
        name: req.body.name,
        company: req.body.company,
        quantity: req.body.quantity,
        price: req.body.price
    })
    device.company = device.company.charAt(0).toUpperCase() + device.company.slice(1)

    if (checkCompanyName(device.company)) {
        try {
            const deviceNew = await device.save();
            return res.status(201).json(deviceNew)
            
        } catch (err) {
            return res.status(400).json({
                message: err.message
            })
        }
    } else {
        return res.status(400).json({
            message: 'One of parameters was wrong'
        })
    }

})

// update one
router.patch('/:id', getDevice, async function(req,res){
    if(req.body.name != null){
        res.device.name = req.body.name
    }
    if(req.body.company != null){
        res.device.company = req.body.company
    }
    if(req.body.price != null){
        res.device.price = req.body.price
    }
    if(req.body.quantity != null){
        res.device.quantity = req.body.quantity
    }

    try {
        const updatedDevice = await res.device.save()
        res.json(updatedDevice)
    }catch (err){
        res.status(400).json({message: err.message})
    }
})

// delete
router.delete('/:id', getDevice, async function(req,res){
try{
    await res.device.remove();
    res.json({message: 'item deleted'})
}catch (err){
res.status(500).json({message: err.message})
}
})


async function getDevice(req, res, next){
    let device;
    try{
        device = await DeviceModel.findById(req.params.id)
        if(device == null){
            return res.status(404).json({message: 'Cannot find device'})
        }
    }catch (err){
        return res.status(500).json({message: err.message})
    }
    res.device = device;
    next();
}


// check if company is valid
function checkCompanyName(companyName){
    const companyArr = ['Nokia', 'Apple', 'Samsung', 'OnePlus', 'Sony']
    return companyArr.includes(companyName) ? true : false
}

module.exports = router
