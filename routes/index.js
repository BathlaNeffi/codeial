const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

console.log('router is used');
router.get('/profile', homeController.profile);
router.get('/', homeController.home);


module.exports=router;