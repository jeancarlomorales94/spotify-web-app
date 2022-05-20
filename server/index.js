import express from 'express';
import { spotifyAuthUrl, stateKey } from './utils/spotifyAuth.js';
import { generateRandomString } from './utils/randomStringGenerator.js';
import axios from 'axios';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

dotenv.config();
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

const app = express();
app.use(cookieParser())

const port = 8888;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    res.redirect(spotifyAuthUrl(state));
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    var state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/' + new URLSearchParams({
            error: 'state_mismatch'
        }));
    }
    else {
        res.clearCookie(stateKey);
        const data = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: REDIRECT_URI,
        });
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
            }
        };
        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', data, config);
            if (response.status === 200) {
                // const { access_token, token_type } = response.data;
                // const userInfo = await axios.get('https://api.spotify.com/v1/me', {
                //     headers: {
                //         'Authorization': `${token_type} ${access_token}`
                //     }
                // });
                // res.send(`<pre>${JSON.stringify(userInfo.data, null, 2)}</pre>`);
                const { refresh_token } = response.data;
                const token = await axios.get(`http://localhost:8888/refresh_token?refresh_token=${refresh_token}`);
                res.send(`<pre>${JSON.stringify(token.data, null, 2)}</pre>`);

            } else {
                res.send(response);
            }
        } catch (error) {
            res.send(error);
        }
    }
});

app.get('/refresh_token', async (req, res) => {
    const { refresh_token } = req.query;
    const data = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
    });
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        }
    }
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', data, config)
        res.send(response.data);
    } catch (error) {
        res.send(error);
    }

});

app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`);
});


