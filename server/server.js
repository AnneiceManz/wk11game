const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const db = require('./db/db-connection.js');


const app = express();
const PORT = process.env.PORT || 8081;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get('/', (req, res) => {
    res.json({ message: 'Hola, from My template ExpressJS with React-Vite' });
});

// create the get request for scores in the endpoint '/api/scoreboard'
app.get('/api/scoreboard', async (req, res) => {
    try {
        const { rows: scoreboard } = await db.query('SELECT * FROM scoreboard ORDER BY score ASC');
        res.send(scoreboard);
    } catch (e) {
        return res.status(400).json({ e });
    }
});

// create the POST request
app.post('/api/scoreboard', async (req, res) => {
    try {
        const newScore = {
            gamertag: req.body.gamertag,
            score: req.body.score,
        };
        const result = await db.query(
            'INSERT INTO scoreboard(gamertag, score) VALUES($1, $2) RETURNING *',
            [newScore.gamertag, newScore.score],
        );
        console.log(result.rows[0]);
        res.json(result.rows[0]);

    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });
    }

});

// delete request for player score
app.delete('/api/scoreboard/:player_id', async (req, res) => {
    try {
        const player_id = req.params.player_id;
        await db.query('DELETE FROM scoreboard WHERE player_id=$1', [player_id]);
        console.log("From the delete request-url", player_id);
        res.status(200).end();
    } catch (e) {
        console.log(e);
        return res.status(400).json({ e });

    }
});


// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Hola, Server listening on ${PORT}`);
});