const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bcrypt = require("bcrypt")
const app = express()
const jwt = require("jsonwebtoken")
const User = require("./models/userSchema")
const Blog = require("./models/blogSchema")

//middleware
app.use(express.json())
app.use(cors())

dotenv.config()
function authToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token === null) return res.status(401).send()
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send()
        req.user = user
        next()
    })
}
//routes
app.get("/api/blogs", async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 })
    res.json(blogs)
})
app.post("/api/blogs/create", authToken, async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.name;
    try {
        const newBlog = await Blog.create({ title, author, content })
        res.status(200).json(newBlog)
    } catch (err) {
        res.status(400).send("Internal server error")
    }
})
app.delete("/api/blogs/delete/:id", authToken, async (req, res) => {
    const blogId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send("Error while deleting blog")
    }
    try {
        const blog = await Blog.findByIdAndDelete(blogId)
        if (!blog) return res.status(400).send("No blog Found")
        else return res.status(200).json(blog)
    } catch (err) {
        res.status(500).send("internal server error")
    }
})
app.get("/api/blogs/user-blogs", authToken, async (req, res) => {
    try {
        const UserBlogs = await Blog.find({ author: { $regex: new RegExp(req.user.name, 'i') } })
        res.json(UserBlogs)
    } catch (err) {
        res.status(500).send("Internal server error")
    }
})
app.get("/api/blogs/:id", async (req, res) => {
    const blogId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).json("NO Blog Found")
    }
    const blog = await Blog.findById(blogId)
    if (!blog)
        return res.status(400).send("NO Blog Found")
    else
        return res.status(200).json(blog)
})
const generateToken = async (username) => {
    try {
        const token = await jwt.sign({ "name": username }, process.env.ACCESS_TOKEN_SECRET)

        return token
    } catch {
        console.log("error while generating token")
    }
}
app.post("/api/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newuser = new User({ "name": req.body.name, "password": hashedPassword });
        await newuser.save()
        res.status(201).send("successfully created")
    }
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
})
app.post("/api/login", async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name })
        if (!user) {
            return res.status(404).send("user does not exist")
        }
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = await generateToken(user.name)
            res.status(200).json({"username":user.name, "token": token })
        }
        else {
            return res.status(401).send("Invalid credentials")
        }
    }
    catch (err) {
        return res.status(500).send(err.message)
    }
})
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log("listening on port 5000");
    })
}).catch(err => { console.log(err.message); })