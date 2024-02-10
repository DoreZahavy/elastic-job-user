import express from 'express'
import { addUser, getUserById, getUsers, removeUser, updateUser } from './user.controller.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.get('/', addUser)
router.put('/:id', updateUser)
router.delete('/:id', removeUser)

export const userRoutes = router