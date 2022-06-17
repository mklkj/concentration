const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:admin@cluster0.kzpscbj.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(
    connectionString,
    {useNewUrlParser: true},
    () => console.log(" Mongoose is connected"),
);
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));

const Schema = mongoose.Schema;

const User = new Schema({
    id: Schema.ObjectId,
    name: String,
    username: String,
    email: String,
    registrationDate: Date
});
const UserModel = mongoose.model("Users", User);

router.post('/', function (req, res) {
    console.log(req.body);
    if (!req.body.email) {
        return res.status(400).json({success: false, message: "Invalid input"});
    }

    UserModel.exists({email: req.body.email}, (err, isExist) => {
        if (err) {
            return res.status(400).json({success: false, message: err.toString()});
        }

        if (isExist) {
            return res.status(400).json({success: false, message: "User already exists!"});
        }

        const user = new UserModel({ name: req.body.name, username: req.body.username, email: req.body.email });
        user.save((err) => {
            if (err) {
                console.error(err);
            }

            return res.status(200).json({success: true, message: "Registration success! "});
        })
    });
});

module.exports = router;
