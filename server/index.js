const app = require('express')();
const http = require('http').Server(app);
const responses = require('./responses');
const io = require('socket.io')(http);
const fetch   = require('node-fetch');

const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// app.get('/api/responses', (req, res) => {
//     res.send(responses.seattleFireResponses);
// });

app.get('/api/responses', (req, res) => {
    const url = 'https://data.seattle.gov/resource/fire-911.json';
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.send({ data });
    })
    .catch(err => {
        res.send(err);
    });
});

// Limit data to only 20 entries
// Show only most recent (need to use Moment?)


// Use socket.io to get URL again and update


http.listen(port, () => {
    console.log(`Listening on *:${port}`)
})
