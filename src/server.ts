import dotenv from 'dotenv'
import { createConnection } from 'typeorm';
import app from './index'

dotenv.config();

createConnection().then(() => {
  console.log('Connected to databae =)')
})


app.listen(3000, () => {
  console.log('server running on port: 3000')
})