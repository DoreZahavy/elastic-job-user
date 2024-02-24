import express from 'express'
import {checkEmail, addUser, getUserById, getUsers, removeUser, updateUser, getUserByEmail } from './user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)
router.get('/email/:email', getUserByEmail)
router.get('/check-email/:email', checkEmail)

export const userRoutes = router