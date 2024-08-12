const express=require('express')

const router=express.Router()

const controller=require('../controller/controller')

router.get('/get',controller.get)
router.post('/post',controller.post)
router.put('/put/:id',controller.put)
router.delete('/del/:id',controller.del)