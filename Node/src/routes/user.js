const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', async(req, res) => {
    let listUser = await pool.query('SELECT * FROM user');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listUser: listUser
    });
});


router.get('/:id', async(req, res) => {
    const { id } = req.params;
    let user = await pool.query('Select * from user where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        user: user
    });
});



module.exports = router;