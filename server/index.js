const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
const bcrypt = require('bcrypt')
const authRoutes = require('./routes/auth.js');
const userRoutes = require('./routes/users.js');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/posts.js');
const  verifyToken = require('./middleware/auth.js');
const User = require('./models/User.js');
const Post = require('./models/Post.js');
const helmet = require('helmet')
const { users, posts } = require('./data/index.js');

dotenv.config();
const uri = "mongodb+srv://malikzeyan:gz8JRMvZa7dNbqbo@cluster0.1x3r12y.mongodb.net/socialmedia?retryWrites=true&w=majority"
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
const corsOptions = {
  origin: 'https://socialmedia-app-iehy.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // You may need this depending on your use case.
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


app.use("/", express.static(path.join(__dirname, "public/assets")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.get("/",(req,res)=>{
  res.send("hello world")
})


//Done
app.post("/auth/register", upload.single("picture"), async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        friends
      } = req.body;
  const picturePath = req.file.filename;
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newUser = new User({
        name,
        email,
        password: passwordHash,
        picturePath:picturePath,
        friends,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })


app.post("/posts", verifyToken, upload.single("picture"),async (req, res) => {
  try{
    console.log(req.body)
      const { userId,name,description,userPicturePath } = req.body;
      const picturePath = req.file.filename;
      const user = await User.findById(userId);
      const newPost = new Post({
        userId,
        name,
        description,
        userPicturePath,
        picturePath,
        likes: {},
        comments: [],
      });
      await newPost.save();
  
      const post = await Post.find();
      res.status(201).json(post);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  }
  );

//Done
app.use("/auth", authRoutes);

app.use("/users", userRoutes);

app.use("/posts", postRoutes);
const connecttomongo= async ()=>{
  
  
  const PORT = process.env.PORT || 6001;
  await mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
}
  connecttomongo()
