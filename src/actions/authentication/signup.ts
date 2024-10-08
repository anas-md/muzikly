'use server'

import User from '@/db/models/user.model'
import dbconnect from '@/db/dbconnect'
import signupSchema from '@/schemas/signup'
import argon from 'argon2'
import { z } from 'zod'
import auth from '@/auth/auth'

export default async function Signup(values: z.infer<typeof signupSchema>) {
    const db = await dbconnect()
    if (db.error) return { error: db.error }

    const validate = signupSchema.safeParse(values)
    if (!validate.success) return { error: 'Invalid request' }
    try {
        const hash = await argon.hash(values.password)
        const user = await User.create({ ...validate.data, password: hash })
        const res = await auth.createSession({ userId: user._id.toString(), expiresIn: 1000 * 60 * 60 * 24 * 30 })
        if (res.error) return { error: res.error }
        return { success: 'Account created successfully' }
    } catch (error: any) {
        if (error.code === 11000) {
            return { error: 'Email already in use' }
        }
        return { error: 'Something went wrong' }
    }
}
