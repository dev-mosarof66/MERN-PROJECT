import 'dotenv/config'
import app from './app.js'
import connectDB from './db/connectDB.db.js'


const port = process.env.PORT || 3000



app.listen(port,()=>{
    console.log(`app is listening at port : ${port}`);
    connectDB()
})