const express=require('express');
const router=express.Router();
const {handler}=require('../controllers/stripeController')
const {handlerV}=require('../controllers/buyController')

router.get('/stripe',handler)

// router.post('/stripe',handlerV)

module.exports=router