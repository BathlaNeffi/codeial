const express=require('express');
const router=express.Router();
const passport=require('passport');


const postConroller=require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postConroller.create);

module.exports=router;