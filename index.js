//import library
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
//create app
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
const uri= "mongodb+srv://almansouralhanouf:<alhanouf>@cluster0.ypb5qmo.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect('mongodb://localhost:27017/alhanouf', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

//data upload
app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var password = req.body.password;
    var data = {
        "name": name,
        "email": email,
        "phno": phno,
        "password": password
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) throw err;
        console.log("Record Inserted Successfully");
    });
    return res.redirect('signup_success.html');

})

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');

}).listen(3000);

console.log("Listening on Port 3000");