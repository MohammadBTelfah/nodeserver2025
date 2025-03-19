var registerForm = document.getElementById('registerForm');
var API_URL="http://127.0.0.1:5050/api/createusers";
registerForm.addEventListener('submit', async function (e){
    e.preventDefault();
    var Name=document.getElementById('Rname').value;
    var Email=document.getElementById('Remail').value;
    var Password=document.getElementById('Rpassword').value;
    var rrPassword=document.getElementById('rrPassword').value;
    var Ruser={Name,Email,Password,rrPassword};
    console.log(Ruser);
    var response = await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Ruser),
    });
    var data = await response.json();
        console.log(data);
        if (data.Message == 'User created successfully') {
            alert('User created successfully');
            window.location.href = 'index.html';
        } else {
            alert('User not created');
        }
        
        console.log(response);
    });
