const db = require('../db/db');

const getContacts = (req, res) => {
    console.log('Show all contacts');

    let sql = `SELECT * FROM Contacts`;

    db.query(sql, (req, res) => {
    if(error){
        console.log("Failed to return all contacts");
        res.sendStatus(500);
    } else {
        console.log("Contacts: ", results);
        res.json(results);
    }
    })
}

const getContactById = (req, res) => {
    console.log("Get user by id", req.params.id);

    let id = req.params.id;

    let sql = `SELECT * FROM Contacts WHERE id = ?`;

    db.query(sql, id, (error, results) => {
        if(error){
            console.log("Error when fetching user by id", error);
            res.sendStatus(500);
        } else if(rows.length > 1){
            console.error('Too many contacts return for the id', id);
            res.sendStatus(500);
        } else if(rows.length == 0){
            console.error(`No user for id ${id} found`)
            res.sendStatus(401).json(null);
        } else if(rows.length == 1){
            res.json(rows[0]);
        }
    })
}

let createContact = (req, res) => {
    console.log('POST/createContact', req.body.username);

    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone = req.body.phone;

    let sql = `INSERT INTO Contacts (firstname, lastname, email, phone) values(?, ?, ?, ?)`;

    let params = [];
    params.push(firstname);
    params.push(lastname);
    params.push(email);
    params.push(phone);

    db.query(sql, params, (error, results) => {
        if(error){
            console.log("Failed to create new contact", error);
            res.sendStatus(500);
        } else {
            console.log("Contact successfully created!");
            res.status(201).send(results);
        }
    })
}

const updateContact = (req, res) => {
    console.log("Update contact", req.body);

    let id = req.params.id;

    //Get values from the request 
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let phone = req.body.phone;

    let sql = `UPDATE Contacts SET firstname = ?, lastname = ? , email = ?, phone = ? WHERE id = ? `;

    let params = [];
    params.push(firstname);
    params.push(lastname);
    params.push(email);
    params.push(phone);

    db.query(sql, params, (error, rows) => {
        if(error){
            console.log(`Could not update contact with id ${id}.`, error);
            res.sendStatus(500);
        } else {
            console.log("Contatc successfully updated contact");
            res.sendStatus(204);
        }
    })
}
const deleteContact = (req, res) => {
    console.log("DELETE CONTACT BY id", req.params.id);

    let id = req.params.id;

    let sql = `DELETE FROM Contacts WHERE id = ?`;


    db.query(sql, id, (error, results) => {
        if(error){
            console.log(`Could not delete contact with id: ${id}`, error);
            res.sendStatus(500);
        } else {
            console.log("Successfully deleted contact");
            res.sendStatus(204);
        }
    })


}

module.exports ={ getContacts, getContactById, createContact, updateContact, deleteContact }