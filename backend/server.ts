import express from 'express'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()
const port = process.env.EXPRESS_PORT

const app = express()
app.use(cors({
  origin: '*'
}))
app.use(express.static('public'))
app.use(express.json())


import cropsRouter from './routes/crops'
app.use('/crops', cropsRouter)

app.get('/', async (req, res) => {
  try {
    const crops = await prisma.crops.findMany()
    // res.send('Up & Working!!')
    res.json(crops)
  } catch (error) {
    console.log(error)
  }
})

app.listen(port, () => {
  console.log(`Server is started on port ${port}`)
})