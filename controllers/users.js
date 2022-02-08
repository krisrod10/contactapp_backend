const db = require('../db/db');
const bcrypt = require('bcrypt');

const getUser = (req, res) => {
    console.log('Get all users');

    let sql = `SELECT * FROM Users`;

    bd.query(sql, (error, results) => {
        if(error){
            console.log('Failed to return all users.');
            res.sendStatus(500);
        } else {
            console.log('User : ', results);
            res.json(results);
        } 
    })
}

const getUserById = (req, res) => {
    console.log("Get user by id");

    let id = req.params.id;

    let sql = `SELECT * FROM Users WHERE id = ?`;

    db.query(sql, id, (error, results) => {
        if(error){
            console.log(`Failed to get user by id ${id}`, error);
            res.sendStatus(500);
        } else if(rows.length > 1){
            console.error('Too many users returned for the id ', id);
            res.sendStatus(500);
        } else if (rows.length == 0){
            console.error(`No user found with the id ${id}`);
            res.sendStatus(500);
        } else if (rows.length == 1){
            res.json(rows[0]);
        }
    })
}

const createUser = (req,res) => {
    console.log("Inside createUser");

    let username = req.body.username;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;

    // make sure that the password and the confirm password are the same
    if(password!== confirmPassword){
        return res.status(400).send('Passwords do not match');
    }

    let passwordHash = bcrypt.hashSync(password, 10);

    let sql = `INSERT INTO Users (username, password_hash, role) values(?, ?, ?)`;

    db.query(sql,[username, passwordHash, 'user'], (error, rows) => {
        // if the insert query returned an error, we log the error
        // and return a failed message back
        if(error){
            console.error("Failed to add user", error);
            res.sendStatus(500).send('Failed to add user');
        } else {
            // if the insert statement ran withoit and error then the user was created
            res.send("User Created");
        }
    })
}

const updateUser = (req, res) => {
    console.log('PUT/ inside updateUser');

    let id = req.params.id;
    let password = req.body.password;

    // generate the hash of the password that will be stored in the database
    let passwordHash = bcrypt.hashSync(password, 10);

    let sql = `UPDATE Users SET password_hash = ? WHERE id = ?`;

    db.query(sql, [passwordHash, id], (error, results) => {
        if(error){
            console.log("Failed to update user by id", id);
            res.sendStatus(500);
        } else {
            console.log('User successfully updated');
            res.sendStatus(204);
        }
    })
}

const deleteUser = (req, res) => {
    console.log("Inside deleteUser");

    let id = req.params.id;

    let sql = `DELETE FROM Users WHERE id = ?`;

    db.query(sql, id, (error, results) => {
        if(error){
            console.log("Failed to delete user by id ", id);
            res.sendStatus(500);
        } else {
            console.log("Users successfully deleted");
            res.sendStatus(204);
        }
    })
}

module.exports = {
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}