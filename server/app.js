
import  express  from "express"
import fileUpload from "express-fileupload"
import postsRoutes from "./routes/posts.routes.js"

const app = express()


app.use(express.json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './upload'
}))
app.use(postsRoutes)
//app.use((req,res) => {res.send('Not Found')})


export default app