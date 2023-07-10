const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors')


const product = require('./routes/productRouter')
const user = require('./routes/userRouter')
const subCatagory = require ('./routes/SubcategoryRouter')
const Cagory = require('./routes/catagoryRouter')
const Cart = require('./routes/cartRouter')
const payment = require('./routes/paymentRoutes')


// middlewares
app.use(cors()) 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/product',product)
app.use( '/api/user',user)
app.use('/api/subCatagory',subCatagory)
app.use('/api/Catagory',Cagory)
app.use('/api/Cart',Cart)
app.use('/api/payment',payment)


// LISTEN THE SERVER
app.listen(port, () => console.log('Serving running on port 3000 '));