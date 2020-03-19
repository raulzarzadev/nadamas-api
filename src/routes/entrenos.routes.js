const { Router} = require('express')
const router = Router();

const { getEntrenos } = require('../controllers/entreno.controllers')

router.route('/')
    .get(getEntrenos)
   


module.exports = router