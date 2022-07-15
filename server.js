const express = require('express');
const db =require('.db/connection');
const routes = require('./routes');
const { appendFile } = require('fs');

//middleware for express
app.use(express.urlencoded({extended:flase}));
app.use(express.json());

app.use((req,res) =>{
    res.status(404).end();
});

db.connect(er => {
    if (err) throw err;
    console.log('DB connected.');
    app.listen(PORT,() =>{
        console.log(`Server running on port ${PORT}`);
    });
});

