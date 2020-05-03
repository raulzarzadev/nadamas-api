const { Router } = require('express')
const router = Router();

const { getEntrenos, createEntreno, getEntreno, updateEntreno, deleteEntreno } = require('../controllers/entreno.controllers')

router.route('/')
    .get(getEntrenos)
    .post(createEntreno)

router.route('/:id')
    .get(getEntreno)
    .delete(deleteEntreno)

//.put('/:id', updateEntreno)

module.exports = router