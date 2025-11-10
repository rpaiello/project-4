const express = require('express');
const app  = express();
const PORT = 3000;
const pool = require('./db');
app.use(express.json());
const cors = require('cors');
app.use(cors());

async function startServer() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected');
    } catch (error) {
        console.error(`Flagrant system error: ${error}`)
    }

    app.listen(PORT, () => {
        console.log(`Server started listening on port ${PORT}`)
    });
}

startServer();

app.get('/', async (request, response) => {
    console.log(`request is coming, ${request.method} made to ${request.url}`)

    response.send('Hi');
})

app.get('/api/Users', async (request, response) => {
    try {
        const [overview] = await pool.query('select * from users');
        response.json(overview);
    } catch (error) {
        console.error(`Flagrant database error: ${error}`);
    }
});

app.post('/api/register', async (request, response) => {
    const {uname, upass} = request.body;
    const [users] = await pool.query("select * from users");

    if (!uname || !upass) {
        return response.status(400).json({error: 'All fields required!'})
    } try {
        const qry = `insert into users (uname, upass) values (?, ?)`;
        const [result] = await pool.query(qry, [uname, upass]);

        response.status(200).json({
            message: 'Worked'
        });
    } catch (error) {
        console.log('Flagrant database error');
        response.status(500).json({error: error});
    }
})