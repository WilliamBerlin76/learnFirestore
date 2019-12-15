const router = require('express').Router();

const userRouter = require('../routes/usersRouter');
const restaurantRouter = require('../routes/restaurantRouter');

router.use('/users', userRouter);
router.use('/restaurants', restaurantRouter);

module.exports = router