const { Router} = require('express')
const router = Router();


const { getEntreno, createEntreno, updateEntreno, deleteEntreno} = require('../controllers/entreno.controllers')

router.route('/:id')
    .get(getEntreno)
    .post(createEntreno)
    //.put('/:id', updateEntreno)
    //.delete('/:id', deleteEntreno)




module.exports = router