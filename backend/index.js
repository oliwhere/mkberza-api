const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 4000;

const mkBerzaToken = 'c409046d-070e-4c71-b08a-b5f72c5a16d9';
const mkBerzaUrl = `http://feeds.mse.mk/service/FreeMSEFeeds.svc/ticker/JSON/${mkBerzaToken}`;

app.use(cors());

let Data;
fetch(mkBerzaUrl)
    .then(response => response.json())
    .then(result => Data = result);

app.get('/', (req, res) => {
    let berza = new Array();
    let i = 0;
    // Gets the data I need from mk berza
    Object.values(Data.GetTickerJSONResult).forEach((val) => {
        console.log(val);
        berza[i++] = val;
    });
    res.send(berza);
});

app.listen(port, () => console.log(`listening on port ${port}`));
