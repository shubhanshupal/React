const express = require('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');

const app = express();
//middleware - plugin 
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to the Home Page!');
});
app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}}</li>`).join('')}
    </ul>`;
    res.send(html);
});


// REST API endpoint
app.get('/api/users', (req, res) => {
    res.json(users);
});

// REST API endpoint to get user by ID (dynamic path parameter)
// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const find_user = users.find(user=> user.id === id);
//     res.json(find_user);
// });

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    users.push({id: users.length + 1, ...newUser });
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users,null,2),(err, data)=>{
        res.json({status:'Sucess', message:'User created successfully', id: users.length });

    });

    // console.log(req.body);
    //Todo: Handle user creation logic here
});

// app.patch('/api/users/:id', (req, res) => {
//     //Todo: Handle user update logic here
//     res.send('PATCH request to /api/users/:id');
// });

// app.delete('/api/users/:id', (req, res) => {
//     //Todo: Handle user deletion logic here
//     res.send('DELETE request to /api/users/:id');
// });


// note we can see here '/api/users/:id' route is repeated for different HTTP methods (GET, PATCH, DELETE). we can handle all these methods using app.route() method
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const find_user = users.find(user=> user.id === id);
        res.json(find_user);
    })
    .patch((req, res) => {
        const id = Number(req.params.id);
        const find_user = users.find(user=> user.id === id);

        for(key in req.body){
            find_user[key]= req.body[key];
        }
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users,null,2),(err,data)=>{
            if(err){
                res.status(500).json({status:'Error', message:'Failed to update user'});
                return;
            }else{
                res.json({status:'Success', message:'User updated successfully', id: find_user.id });
            }
        });

        //Todo: Handle user update logic here
        // res.send('PATCH request to /api/users/:id');
    })
    .delete((req, res) => {
        //Todo: Handle user deletion logic here
        const id = Number(req.params.id);
        const deleteUser = users.findIndex((user)=> user.id=== id);

        const deletedUser = users.splice(deleteUser,1)[0];
        fs.writeFile('./MOCK_DATA.json',JSON.stringify(users,null,2) ,(err)=>{
            if(err){
                res.status(500).json({status:'Error', message:'Failed to delete user'});
                return;
            }
            
            res.json({status:'Success', message:'User deleted successfully',id: deletedUser.id });
            
        })
        // res.send('DELETE request to /api/users/:id');
    });

app.listen(8001, () => {
    console.log('Express server is running on port 8001');
});