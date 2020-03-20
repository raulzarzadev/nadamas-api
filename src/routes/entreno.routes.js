const { Router} = require('express')
const router = Router();


const { getEntreno, updateEntreno, deleteEntreno} = require('../controllers/entreno.controllers')

router.route('/:id')
    .get(getEntreno)
    .delete(deleteEntreno)
    
    //.put('/:id', updateEntreno)




module.exports = router