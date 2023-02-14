const express=require('express');
const bodyParser = require('body-parser');

const sequelize=require('./util/database');

var cors=require('cors');
const app=express();

app.use(cors());

const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');

app.use(bodyParser.json({ extended: false }));

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);

sequelize.sync()
.then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});

