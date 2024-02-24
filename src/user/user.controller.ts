
import { Request, Response } from "express";
import { logger } from "../services/logger.service.js";
import {  userService } from "./user.service.js";
import { User } from "../models/user.model.js";


export async function getUserById(req: Request, res: Response) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(400).send({ err: 'Failed to get user' })
    }
}
export async function getUserByEmail(req: Request, res: Response) {
    try {
        const user = await userService.getByEmail(req.params.email)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(400).send({ err: 'Failed to get user' })
    }
}

export async function getUsers(req: Request, res: Response) {
    try {
        // const filterBy = {
        //     txt: req.query?.txt || '',
        //     minBalance: +req.query?.minBalance || 0
        // }
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(400).send({ err: 'Failed to get users' })
    }
}

export async function addUser(req: Request, res: Response) {

    try {
        const user :User = req.body
        const addedUser = await userService.add(user)
        res.json(addedUser)
    } catch (err) {
        logger.error('Failed to add user', err)
        res.status(400).send({ err: 'Failed to add user' })
    }
}

export async function removeUser(req: Request, res: Response) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(400).send({ err: 'Failed to delete user' })
    }
}

export async function updateUser(req: Request, res: Response) {
    try {
        const user :User = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(400).send({ err: 'Failed to update user' })
    }
}

export async function checkEmail(req: Request, res: Response) {
    // const { email } = req.query;
    // console.log("🚀 ~ checkEmail ~ email:", email)

    try {
        // Check if a user with the provided email exists in the database
        const existingUser = await userService.getByEmail(req.params.email)

        // Return true if a user with the email exists, false otherwise
        res.json(!!existingUser);
    } catch (error) {
        // Handle errors (e.g., database errors)
        console.error('Error checking existing email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}