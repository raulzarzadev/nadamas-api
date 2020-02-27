const { Router} = require('express')
const router = Router();

const {getTasks, getTask, createTask, updateTask, deleteTask} = require('../controllers/task.controllers')

router.get('/tasks', getTasks) ;
router.get('/task/:id' , getTask ) ;
router.post('/task', createTask ) ;
router.put('/task/:id', updateTask ) ;
router.delete('/task/:id', deleteTask) ;


module.exports = router