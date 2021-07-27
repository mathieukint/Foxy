const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

// Authentication
router.post('/register', authController.signUp);
router.post('/login', authController.logIn);
router.get('/logout', authController.logOut);

// user Display: 'block'
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);
// router.patch('/like/:id', userController.like);

module.exports = router;