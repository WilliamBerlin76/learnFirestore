const router = require('express').Router();

const userRouter = require('../routes/usersRouter');

router.use('/users', userRouter);

module.exports = router