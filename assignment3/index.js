const express = require('express');
const app = express();
const fs = require('fs');
const axios = require('axios');

app.use(express.json());

app.get('/', function (req, res) {
    res.send('<p>App started.</p>');
});

app.post('/calculate', function (req, res) {
    // checking the request
    if (!req.body.hasOwnProperty('file') || !req.body.hasOwnProperty('product')) {
        res.json({
            'file': null,
            'error': 'Invalid JSON input.'
        });
    }
    // checking for Invalid JSON
    if (!req.body.file || !req.body.product) {
        res.json({
            'file': null,
            'error': 'Invalid JSON input.'
        });
    } else {
        const path = '/Mayankkumar_PV_dir/' + req.body.file;
        // checking if file exists
        // https://nodejs.org/api/fs.html#fsaccesspath-mode-callback
        fs.access(path, (err) => {
            if (err) {
                res.json({
                    'file': req.body.file,
                    'error': 'File not found.'
                });
            } else {
                axios
                    .post('http://as3-c2-service:8000/product', {
                        'file': req.body.file,
                        'product': req.body.product
                    })
                    .then(function (response) {
                        res.json(response.data);
                    });
            }
        });
    }
});

app.post('/store-file', function (req, res) {
    const filePath = '/Mayankkumar_PV_dir/' + req.body.file;
    if (!req.body.hasOwnProperty('file') || !req.body.hasOwnProperty('data')) {
        res.json({
            'file': null,
            'error': 'Invalid JSON input.'
        });
    } else {
        const fileName = req.body.file;
        const fileContent = req.body.data.replaceAll(' ', '');
        console.log(fileContent);
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
                console.log(`Error creating file ${err}`);
                res.json({
                    'file': fileName,
                    'error': 'Error while storing the file to the storage.'
                });
            }
            res.json({
                'file': fileName,
                'message': 'Success.'
            });
        });
    }
});

app.listen(6000, () => {
    console.log('App started!!');
});