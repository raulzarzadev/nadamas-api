const { Router} = require('express')
const router = Router();

const { getEntrenos, createEntreno } = require('../controllers/entreno.controllers')

router.route('/')
    .get(getEntrenos)
    .post(createEntreno)
   


module.exports = router