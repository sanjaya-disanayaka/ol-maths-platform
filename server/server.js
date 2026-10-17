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

        // Login successful
        res.json({
            message: 'Login successful!',
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

const PORT = 5001

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})