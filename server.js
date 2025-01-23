const express = require('express');

const app = express()


app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: "LFM BackEnd - Update Test"
    })
})

app.listen(8080, () => {
    console.log('server running on port 8080');
    
})