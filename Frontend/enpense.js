const myForm=document.querySelector('#my-form');
const expenseInput = document.querySelector('#price');
const descriptionInput = document.querySelector('#description');
const categoryInput = document.querySelector('#category');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  const price=e.target.price.value;
  const description=e.target.description.value;
  const category=e.target.category.value;

    const myobj={
       price,description,category
    }
    
    axios.post("http://localhost:3000/expense/add-expense",myobj)
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
    axios.get("http://localhost:3000/expense/get-expenses")
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
        axios.delete(`http://localhost:3000/expense/delete-expense/${myobj.id}`)
    } 
    editBtn.onclick=()=>{ 
        axios.delete(`http://localhost:3000/expense/delete-expense/${myobj.id}`)
        userList.removeChild(li);
        expenseInput.value = myobj.price;
    descriptionInput.value = myobj.description;
    categoryInput.value=myobj.category;
    } 
    expenseInput.value = '';
    descriptionInput.value = '';
    categoryInput.value=1;
}