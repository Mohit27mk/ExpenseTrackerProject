const myForm=document.querySelector('#my-form');
const expenseInput = document.querySelector('#price');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');
const showLeaderboard=document.createElement('button');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  const price=e.target.price.value;
  const description=e.target.description.value;
  const category=e.target.category.value;
  const token= localStorage.getItem('token');

    const myobj={
       price,description,category
    }
    
    axios.post("http://localhost:3000/expense/add-expense",myobj,{ headers: {"Authorization":token} })
    .then((res)=>{
        console.log(res);
        showExpense(res.data.expenseDetails);
    }).catch((err)=>{
     console.log(err);
    })
    expenseInput.value = '';
    descriptionInput.value = '';
    categoryInput.value=1;
    
   
}

window.addEventListener("DOMContentLoaded",()=>{
    const token=localStorage.getItem('token');
    axios.get("http://localhost:3000/expense/get-expenses",{ headers: {"Authorization":token} })
    .then((res)=>{
      
      for(var i=0;i<res.data.allExpense.length;i++){
        showExpense(res.data.allExpense[i]);
      }
    }).catch((err)=>{
      console.log(err);
    })
   })

function showExpense(myobj){
    const userList = document.querySelector('#users');

    const li = document.createElement('li');

    // Add text node with input values
    li.appendChild(document.createTextNode(`${myobj.price} - ${myobj.description}-${myobj.category}`));
    userList.appendChild(li);
    var deleteBtn=document.createElement('button');
    deleteBtn.className='btn btn-danger btn-sm  delete';
    deleteBtn.appendChild(document.createTextNode('delete'));
    li.appendChild(deleteBtn);

    var editBtn=document.createElement('button');
editBtn.className='btn btn-primary btn-sm  edit';
editBtn.appendChild(document.createTextNode('edit'));
    li.appendChild(editBtn);
    deleteBtn.onclick=()=>{
        userList.removeChild(li);
        const token=localStorage.getItem('token');
        axios.delete(`http://localhost:3000/expense/delete-expense/${myobj.id}`,{ headers: {"Authorization":token} });
    } 
    editBtn.onclick=()=>{ 
        axios.delete(`http://localhost:3000/expense/delete-expense/${myobj.id}`,{ headers: {"Authorization":token} });
        userList.removeChild(li);
        expenseInput.value = myobj.price;
    descriptionInput.value = myobj.description;
    categoryInput.value=myobj.category;
    } 
    expenseInput.value = '';
    descriptionInput.value = '';
    categoryInput.value=1;
}

document.getElementById('rzp-button1').onclick=async function(e){
const token=localStorage.getItem('token');
const response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}});
console.log(response);
var options={
"key":response.data.key_id,
"order_id":response.data.order.id,
"handler":async function(response){
  await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
order_id:options.order_id,
payment_id:response.razorpay_payment_id,
status1:true
  },
  {headers:{"Authorization":token}})
  if(response.data.ispremiumuser){
    const header1 = document.querySelector('.head');
    const h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode('You are a Premium User'));
    header1.appendChild(h1);
  const premiumButton=  document.getElementById('rzp-button1');
  premiumButton.style.display = 'none';
  showLeaderboard.className='btn btn-danger btn-sm  delete';
  showLeaderboard.appendChild(document.createTextNode('showLeaderbord'));
  header1.appendChild(showLeaderboard); 
}
  alert('You are premium user now')
  
}
};
const rzp1=new Razorpay(options);
rzp1.open();
e.preventDefault();

rzp1.on('payment.failed',async function(response){
  await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
    order_id:options.order_id,
    status1:false
      },
      {headers:{"Authorization":token}})
alert('Something went wrong');
})
}

window.addEventListener("DOMContentLoaded",()=>{
  const sendGetRequest = async () => {
    try {
      const token=localStorage.getItem('token');
      const response=await axios.get('http://localhost:3000/purchase/premiummembership',{headers:{"Authorization":token}});
      console.log(response);
      if(response.data.ispremiumuser){
        const header1 = document.querySelector('.head');
        const h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode('You are a Premium User'));
        header1.appendChild(h1);
      const premiumButton=  document.getElementById('rzp-button1');
      premiumButton.style.display = 'none';
      showLeaderboard.className='btn1 btn-danger btn-sm  ';
      showLeaderboard.appendChild(document.createTextNode('showLeaderbord'));
      header1.appendChild(showLeaderboard);  
    }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

sendGetRequest();
      });

     showLeaderboard.onclick=async()=>{
      const token=localStorage.getItem('token');
      const userLeaderBoardArray=await axios.get('http://localhost:3000/premium/showLeaderBoard',{headers:{"Authorization":token}});
      
      var leaderboardElement=document.getElementById('leaderboard');
      
      
      userLeaderBoardArray.data.forEach((userDetails)=>{
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`Name- ${userDetails.name} Total Expense- ${userDetails.total_cost}`));
        leaderboardElement.appendChild(li);
      })
     } 