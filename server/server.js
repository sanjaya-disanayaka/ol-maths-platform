const authMiddleware = require('./authMiddleware')
const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const prisma = require('./prisma')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: 'O/L Maths API is running!'
    })
})

app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return res.status(400).json({
                message: 'Email already registered!'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        res.status(201).json({
            message: 'Registration successful!',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Registration error:', error)

        res.status(500).json({
            message: 'Something went wrong!'
        })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        // User doesn't exist
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        // Compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        res.json({
            message: 'Login successful!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Login error:', error)

        res.status(500).json({
            message: 'Something went wrong!'
        })
    }
})

app.get('/api/me', authMiddleware, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        res.json({
            message: 'Authenticated user',
            user
        })

    } catch (error) {
        console.error('Get user error:', error)

        res.status(500).json({
            message: 'Something went wrong!'
        })
    }
})
const PORT = 5001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})