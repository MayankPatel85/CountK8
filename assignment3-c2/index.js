const express = require('express');
const app = express();
const fs = require('fs');
const { parse } = require('csv-parse');

app.use(express.json());

// count the sum of product
app.post('/product', function (req, res) {
    var productCount = 0;
    var isFirstLine = true;
    const filePath = '/Mayankkumar_PV_dir/'+req.body.file;
    const parser = parse({
        delimiter: ',',
        from_line: 1
    });
    fs.createReadStream(filePath)
        .pipe(parser)
        .on('readable', function () {
            let product;
            while ((product = parser.read()) !== null) {
                if(isFirstLine) {
                    // checking if file is in correct CSV format
                    if(product.length < 1 || product[0] !== 'product' || product[1] !== 'amount') {
                        res.json({
                            'file': req.body.file,
                            'error': 'Input file not in CSV format.'
                        });
                        return;
                    }
                    isFirstLine = false;
                }
                // counting product
                if (product[0] === req.body.product) {
                    productCount = productCount + parseInt(product[1]);
                }
            }
        })
        .on('end', function () {
            parser.end();
            res.json({
                'file': req.body.file,
                'sum': productCount.toString()
            });
        })
        .on('error', function (error) {
            if(error) {
                res.json({
                    'file': req.body.file,
                    'error': 'Input file not in CSV format.'
                })
            }
        });
})

app.listen(8000);