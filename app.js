const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const dotenv = require('dotenv');
const https = require('https');
const loginRouter = require('./routes/login');
const otpRouter = require('./routes/otp');
const productsRouter = require('./routes/product');
const verifyToken = require('./middlewares/verifyToken');
const path = require('path');
const cert = fs.readFileSync(path.join(__dirname,"./cert.pem"));
const key  = fs.readFileSync(path.join(__dirname,"./key.pem"));
const httpsOptions = {
    key,cert
}

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/login", loginRouter);
app.use(verifyToken);
app.use("/otp", otpRouter)
app.use("/products", productsRouter)

https.createServer(httpsOptions, app).listen(process.env.PORT, function(){
    console.log("Listening at", process.env.PORT);
})