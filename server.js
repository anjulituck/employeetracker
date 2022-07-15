const express = require('express');
const db =require('.db/connection');
const routes = require('./routes');

//middleware for express
app.use(express.urlencoded({extended:flase}));
app.use(express.json());

// 404 request for other request
app.use((req,res) =>{
    res.status(404).end();
});

//start server after database connection 
db.connect(er => {
    if (err) throw err;
    console.log('DB connected.');
    app.listen(PORT,() =>{
        console.log(`Server running on port ${PORT}`);
    });
});

