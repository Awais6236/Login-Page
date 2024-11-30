const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Users');
    console.log('Connected to MongoDB');
}

var LoginSchema = new mongoose.Schema({
    Username : String,
    Password : String
});

var User = mongoose.model('User', LoginSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.status(200).sendFile(path.join(__dirname,'views', 'index.html'));
})

app.post('/', (req, res)=> {
try {

    var newUser = new User(req.body);
    newUser.save();
    res.send(`
        <script>
        alert("User's data is saved successfully");
        window.location.href = '/';
        </script>
        `);
    } catch(err){
        res.send(`
            <script>
            alert("User's data is not saved successfully");
            window.location.href = '/';
            </script>
            `);
    }
    
});

app.listen(port, (req, res)=> {
    console.log(`Server listening on ${port}`);
})