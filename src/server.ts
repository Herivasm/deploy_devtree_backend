// CJS Common JS: const express = require('express') 
import express from 'express' //ESM  Ecmascript modules
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'
import cors from 'cors'

connectDB()

const app = express()

// Cors
app.use(cors(corsConfig))

// Read forms data
app.use(express.json())

app.use('/', router)

export default app