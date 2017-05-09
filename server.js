const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser')

const app = express();
const port = 8080;
const base64encodedData = new Buffer('u9-0jmBsXJw4tQ:5QmDB8DnsCyONWMZMQHkO12gjSA').toString('base64');

app.use(cookieParser());
app.use(express.static('build'));
app.use(express.static('static'));

app.get('/auth', (req, res) => {
    fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64encodedData}`
        },
        body: `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http%3A%2F%2Fpwa-for-reddit.herokuapp.com%2Fauth`
    })
    .then(response => response.json())
    .then(json => {
        if(json.error) return Promise.reject(json.error);
        if(json.access_token && json.refresh_token) res.cookie('access_token', json.access_token, {secure: true, maxAge: json.expires_in}).cookie('refresh_token', json.refresh_token, {secure: true, maxAge: 604800}).redirect(`/`);
    })
    .catch(err => { res.status(401).send('Auth failure!'); })
});

app.get('*', (req, res) => {
    const ignoreAuthOnPaths = ['.map', '.ico'];

    if(ignoreAuthOnPaths.indexOf(req.path.substr(-4)) < 0 && req.cookies.refresh_token && !req.cookies.access_token) {
        console.log('revalidating');
        fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${base64encodedData}`
            },
            body: `grant_type=refresh_token&refresh_token=${req.cookies.refresh_token}&redirect_uri=http%3A%2F%2Fpwa-for-reddit.herokuapp.com%2Fauth`
        })
        .then(response => response.json())
        .then(json => {
            if(json.error) return Promise.reject(json.error);
            if(json.access_token && json.refresh_token) {
                res.cookie('access_token', json.access_token, {secure: true, maxAge: json.expires_in}).type('html').set({'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'}).sendFile(path.join(__dirname, 'index.html'));
            } else {
                return Promise.reject('No token received');
            }
        })
        .catch(err => { res.status(401).send('Auth failure!'); })
    } else {
        res.type('html').set({'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'}).sendFile(path.join(__dirname, 'index.html'));
    }
});

app.listen(process.env.PORT || port);
console.log('Server listening on port', process.env.PORT || port);
