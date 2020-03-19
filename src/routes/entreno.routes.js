const { Router} = require('express')
const router = Router();


const {getEntrenos, getEntreno, createEntreno, updateEntreno, deleteEntreno} = require('../controllers/entreno.controllers')

router.route('/')
    .get(getEntrenos)
    .post(createEntreno)

//router.get('/entrenos', getEntrenos) ;
router.get('/:id' , getEntreno ) ;
//router.post('/entreno', createEntreno ) ;
//router.put('/entreno/:id', updateEntreno ) ;
//router.delete('/entreno/:id', deleteEntreno) ;


module.exports = router