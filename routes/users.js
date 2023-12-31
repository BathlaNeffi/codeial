const express=require('express');
const passport=require('passport');

const router=express.Router();

const userController=require('../controllers/user_controller');
router.use(express.static('./assets'));





router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
//  usee passport as middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
) ,userController.createSession);

router.get('/sign_out',userController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope :['profile', 'email']})) ;

router.get('/auth/google/callback', passport.authenticate('google',{failureRedirect: '/users/sign-in'}), userController.createSession);


module.exports=router;