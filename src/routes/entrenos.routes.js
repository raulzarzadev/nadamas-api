const { Router } = require('express')
const router = Router();
const isAuthenticated = require("../authenticatons/jwt.authentication");

const { getEntrenos, createEntreno, getEntreno, updateEntreno, deleteEntreno } = require('../controllers/entreno.controllers')

router.route('/')
    .get(/* isAuthenticated, */ getEntrenos)
    .post(/* isAuthenticated,  */createEntreno)

router.route('/:id')
    .get(/* isAuthenticated, */ getEntreno)
    .delete(/* isAuthenticated, */ deleteEntreno)

//.put('/:id', updateEntreno)

module.exports = router