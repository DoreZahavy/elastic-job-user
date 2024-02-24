import { log } from 'console'
import { User } from '../models/user.model.js'
import { dbService } from '../services/db.service.js'
import { logger } from '../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const userService = {
    add,            // Create (Signup)
    getById,        // Read (Profile page)
    update,         // Update (Edit profile)
    remove,         // Delete (remove user)
    query,          // List (of users)
    getByEmail   // Used for Login
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria() // filterBy
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find(criteria).toArray()
        users = users.map(user => {
            delete user.password
            // user.createdAt = new ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        logger.error('cannot find users', err)
        throw err
    }
}

async function getById(userId: string) {
    
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ _id: new ObjectId(userId) })
        if (user?.password) delete user.password
        return user
    } catch (err) {
        logger.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}

async function getByEmail(email: string) {
    console.log("🚀 ~ getByEmail ~ email:", email)
    try {
        const collection = await dbService.getCollection('user')
        return await collection.findOne({ email })
    } catch (err) {
        logger.error(`while finding user by email: ${email}`, err)
        throw err
    }
}

async function remove(userId: string) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ _id: new ObjectId(userId) })
    } catch (err) {
        logger.error(`cannot remove user ${userId}`, err)
        throw err
    }
}

async function update(user: Partial<User>) {
    try {
        // peek only updatable properties
        const userToSave = {
            ...user,
            _id: new ObjectId(user._id), // needed for the returned obj
        }
        // const userToSave = user
        // user._id = new ObjectId(user._id)
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        logger.error(`cannot update user ${user._id}`, err)
        throw err
    }
}

async function add(user: User) {
    try {

        // Validate that there are no such user:
        const existUser = await getByEmail(user.email)
        if (existUser) throw new Error('Email taken')
        // peek only updatable fields!
        const userToAdd : Omit<User, "_id">= {
            ...user
            // email: user.email,
            // password: user.password,
            // fullName: user.fullName,
            // imgUrl: user.imgUrl,

        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        logger.error('cannot add user', err)
        throw err
    }
}

function _buildCriteria() { // filterBy
    const criteria = {}
    // if (filterBy.txt) {
    //     const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    //     criteria.$or = [
    //         {
    //             email: txtCriteria
    //         },
    //         {
    //             fullname: txtCriteria
    //         }
    //     ]
    // }
    // if (filterBy.minBalance) {
    //     criteria.score = { $gte: filterBy.minBalance }
    // }
    return criteria
}




