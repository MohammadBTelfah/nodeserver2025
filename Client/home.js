const API_URL="http://127.0.0.1:5050/api/users";
var token= sessionStorage.getItem("token");
if(!token){
    window.location.href="index.html";
}
async function update(id){
console.log(id);
}
async function deleteUser(id) {
    const conf = confirm("Are you sure you want to delete this user?");
    const DELETE_URL = "http://127.0.0.1:5050/api/deleteUser";
    
    if (conf) {
        try {
            const response = await fetch(`${DELETE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            const data = await response.json();
            console.log(data);

            if (data.message == 'User deleted successfully') {
                alert('User deleted successfully');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    }
}



async function getUsers(){
try {
   var response= await fetch(API_URL, {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        method: 'GET',
    
    }).then(res=>res.json()).then(data=>{
        console.log(data);
        var tbody=document.getElementById('tbody');
        data.map(user=>{
            console.log(user);
            var tr=document.createElement('tr');
            var td1=document.createElement('td');
            td1.innerHTML=user.Name;
            tr.appendChild(td1);
            var td2=document.createElement('td');
            tr.appendChild(td2);
            td2.innerHTML=user.Role;
            var td3=document.createElement('td');
            td3.innerHTML=user.Email;
            var td4=document.createElement('td');
            var updateBtn=document.createElement('button');
            updateBtn.innerHTML="Update";
            updateBtn.onclick= ()=> update(user._id);
            var deleteBtn=document.createElement('button');
            deleteBtn.innerHTML="Delete";
            deleteBtn.onclick= ()=> deleteUser(user._id);
            var td5=document.createElement('td');
            td5.appendChild(deleteBtn);
            td4.appendChild(updateBtn);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);
            
        })
        if(data){
            //alert('User logged in successfully');
        }
        else{
            alert('User not allowed');
            window.location.href="index.html";
        }
    });
} catch (error) {
    console.log(error);
    alert('User not found');
    window.location.href="index.html";
}
}
getUsers();