

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

////////// require routes api ////////
require('./routes/api')(app);


app.listen(PORT,()=>{
    console.log(`app is listening on port : ${PORT}`);
})
