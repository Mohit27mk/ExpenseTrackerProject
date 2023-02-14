const signupForm=document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

signupForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  const email=e.target.email.value;
  const password=e.target.password.value;

    const myobj={
      email,password
    }
    
    axios.post("http://localhost:3000/user/login",myobj)
    .then((res)=>{
      if(res.data.login==='Login succesful'){
        alert("Login succesful");
        window.location.href='./expense.html';
      }
    }).catch((err)=>{
     console.log(err);
    })
   emailInput.value='';
   passwordInput.value='';
    
   
}
