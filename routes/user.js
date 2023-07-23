const express=require('express');

const router=express.Router();

const userController=require('../controllers/user_controller');
router.use(express.static('./assets'));



router.get('/profile',userController.profile);

module.exports=router;