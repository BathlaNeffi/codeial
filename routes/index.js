const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');



console.log('router is used');
router.get('/anotherhome', homeController.anotherhome);
router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.post('/save', homeController.saveProfile);
router.use('/api',require('./api'));
router.use('/likes', require('./likes'));




// for any further routes, access from here
// router.use('/routerName', require('./routerprofile'));


module.exports=router;