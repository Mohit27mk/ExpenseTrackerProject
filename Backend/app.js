const express=require('express');
const bodyParser = require('body-parser');
const helmet=require('helmet');
const morgan=require('morgan');
const fs=require('fs');
const path=require('path');

const mongoose = require('mongoose')

var cors=require('cors');
const app=express();

// const accessLogStream=fs.createWriteStream(path.join(__dirname,'access.log'),
// {flag:'a'}
// );

app.use(cors());
// app.use(helmet());
// app.use(morgan('combined',{stream:accessLogStream}));



const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
const premiumFeatureRoutes=require('./routes/premiumFeature');
const passwordRoutes=require('./routes/password');


app.use(bodyParser.json({ extended: false }));

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumFeatureRoutes);
app.use('/password',passwordRoutes);




mongoose.connect('mongodb+srv://mohit:27mk2002@cluster0.wzw3ecy.mongodb.net/expenseTracker?retryWrites=true&w=majority')
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})