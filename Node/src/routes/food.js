const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/status', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listFood = await pool.query('SELECT * FROM food order by status DESC');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listFood: listFood
    });
});

router.get('/', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listFood = await pool.query('SELECT * FROM food WHERE status = 1');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listFood: listFood
    });
});


router.get('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    let food = await pool.query('Select * from food where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        food: food
    });
});

router.post('/create', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { name, price } = req.body;

    const status = 1;

    const unitFood = {
        name,
        price, 
        status
    };

    await pool.query('INSERT INTO food set ?', [unitFood]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        unitFood: unitFood
    });
});

router.post('/update/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    const { name, price } = req.body;
    const food = {
        name,
        price
    };
    await pool.query('UPDATE food SET ? WHERE id = ?', [food, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado",
        food: food
    });
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const food = {
        status
    }
    pool.query('UPDATE food SET status = ? WHERE id = ?', [food,id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    }); 
    console.log("Status",food.status)
})
;

module.exports = router;