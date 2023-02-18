const express=require('express');
const bodyParser = require('body-parser');


const sequelize=require('./util/database');

var cors=require('cors');
const app=express();

app.use(cors());

const Expense=require('./models/expense');
const User=require('./models/user');
const ForgotPassword = require('./models/forgotpassword');
const DownloadUrl = require('./models/downloadUrl');


const userRoutes=require('./routes/user');
const expenseRoutes=require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
const premiumFeatureRoutes=require('./routes/premiumFeature');
const passwordRoutes=require('./routes/password');

const Order = require('./models/orders');

app.use(bodyParser.json({ extended: false }));

app.use('/user',userRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase',purchaseRoutes);
app.use('/premium',premiumFeatureRoutes);
app.use('/password',passwordRoutes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);

User.hasMany(DownloadUrl)
DownloadUrl.belongsTo(User)

require('dotenv').config();

sequelize.sync()
.then(result=>{
    app.listen(3000);
}).catch(err=>{
    console.log(err);
});

