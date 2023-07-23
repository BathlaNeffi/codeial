const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');


console.log('router is used');
router.get('/anotherhome', homeController.anotherhome);
router.get('/', homeController.home);
router.use('/users',require('./user'));
router.post('/save', homeController.saveProfile);



// for any further routes, access from here
// router.use('/routerName', require('./routerprofile'));


module.exports=router;