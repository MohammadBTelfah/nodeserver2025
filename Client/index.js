var loginForm=document.getElementById('loginForm');
var API_URL = 'http://localhost:5050/api/login';
loginForm.addEventListener('sumbit', async (e) => {
    e.preventDefault();
    var Email= document.getElementById('Email').value;
    var Password= document.getElementById('Password').value;
    var user = {Email, Password}
    console.log(user)
    await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then (res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.Message=='User Logged in successfully'){
            alert("User Logged in successfully")
            sessionStorage.setItem('authToken', data.token)
        }
        else{
            alert('user not found')

        }
    })
});
