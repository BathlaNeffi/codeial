const express=require('express');
const passport=require('passport');

const router=express.Router();

const userController=require('../controllers/user_controller');
router.use(express.static('./assets'));





router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
//  usee passport as middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) ,userController.createSession);

router.get('/sign_out',userController.destroySession);


module.exports=router;