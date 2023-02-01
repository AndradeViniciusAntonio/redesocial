require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
    });
    
    const express = require('express');
    const app = express();
    const cors = require('cors');
    
    app.use(express.json());
    app.use(cors());
    
    const router = express.Router();
    
    app.use(router.post('/create', (req, res) => {
    const { email, password, name } = req.body;
    
    if(email == null || password == null || name == null)
    return res.status(400).send({ error: "Insuficient data" });
    
    try {
    //create user
    const user = {
    email: email,
    name: name,
    password: password
    };
    return res.send({ user: user });
    }
    catch(err) {
    return res.status(500).send({ error: err });
    }
    }));
    
    const server = app.listen(process.env.PORT || 3333);
    module.exports = server;