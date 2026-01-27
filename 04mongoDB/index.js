//step:1 install mongoose inside the application
// npm i mongoose

const express = require('express');


//Step:2 include require mongoose to the file
const mongoose = require('mongoose');

const app = express();
const port = 8001;

app.use(express.urlencoded({ extended: false }));

//Step:3 make connection to mongoDB /database_name
mongoose.connect('mongodb://127.0.0.1:27017/learn-mongo-1')
    .then(() => console.log("monogDb connected"))
    .catch((err) => console.log("ERROR :", err))

//Step:4 create Schema

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true,
    }
},
    { timestamps: true }// this will add createdAt and updatedAt fields automatically into the database
)

//Step:5 create Model
const User = mongoose.model('User', userSchema);

//Routes
//home route
app.get('/', (req, res) => {
    console.log("This is home page!");
    res.end("You are in home page!")
});

//get all users
app.get('/users', async (req, res) => {
    const allUsers = await User.find({});
    const html = `<ul>
        ${allUsers.map(user =>`<li> ${user.first_name} - ${user.email}</li>`
        ).join()}
    </ul>`;
    return res.send(html);
})

app.get('/api/users', async (req, res) => {
    const allUsers = await User.find({}); 
    return res.send(allUsers);
})


app.route('/api/users/:id')
.get(async (req, res) => {
    const id = req.params.id;
    const find_user = await User.findById(id);
    console.log("Find User :", find_user);
    res.json(find_user);
})

.patch(async (req, res) => {
    const id = req.params.id;
    const update_user = await User.findByIdAndUpdate(id,req.body);
    res.send(`Update user with data: ${update_user}`);
})
.delete(async (req, res) =>{
    const id = req.params.id;
    const delete_user = await User.findByIdAndDelete(id);
    res.send(`Deleted User: ${delete_user}`);
})

//create user
app.post('/api/user', async (req, res) => {
    const body = req.body;
    console.log(body);

    //check if any field is missing
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        res.status(400).send({ message: 'field missing! Please check all the missing fields' });
    }
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })
    // console.log("Result :", result);
    res.status(201).send({ msg: 'User created successfully', data: result })
});

app.listen(port, (err) => {
    if (!err) {
        console.log("Server is running on port :", port)
    }
});