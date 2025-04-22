const API_URL = "http://127.0.0.1:5050/api/users";
const UPDATE_URL = "http://127.0.0.1:5050/api/updateUser";
const DELETE_URL = "http://127.0.0.1:5050/api/deleteUser";

var token = sessionStorage.getItem("token");
if (!token) {
    window.location.href = "index.html";
}

async function update(user) {
    console.log(user);

    const UpdateUserName = document.getElementById('UpdateUserName');
    const UpdateUserEmail = document.getElementById('UpdateUserEmail');
    const UpdateUserRole = document.getElementById('UpdateUserRole');

    UpdateUserName.value = user.Name;
    UpdateUserEmail.value = user.Email;
    UpdateUserRole.value = user.Role;

    const UpdateForm = document.getElementById('update');
    UpdateForm.onsubmit = async function (e) {
        e.preventDefault();
        try {
            const response = await fetch(`${UPDATE_URL}/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: UpdateUserName.value,
                    Email: UpdateUserEmail.value,
                    Role: UpdateUserRole.value
                })
            });

            const data = await response.json();
            console.log(data);

            if (data.message === 'User updated successfully') {
                alert('User updated successfully');
                window.location.reload();
            } else {
                alert('User not updated');
            }

        } catch (error) {
            console.error(error);
            alert('Error updating user.');
        }
    };
}

async function deleteUser(id) {
    const conf = confirm("Are you sure you want to delete this user?");
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

            if (data.message === 'User deleted successfully') {
                alert('User deleted successfully');
                window.location.reload();
            } else {
                alert('User not deleted');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    }
}

async function getUsers() {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);

        const tbody = document.getElementById('tbody');
        data.forEach(user => {
            const tr = document.createElement('tr');

            const td1 = document.createElement('td');
            td1.innerHTML = user.Name;
            tr.appendChild(td1);

            const td2 = document.createElement('td');
            td2.innerHTML = user.Role;
            tr.appendChild(td2);

            const td3 = document.createElement('td');
            td3.innerHTML = user.Email;
            tr.appendChild(td3);

            const td4 = document.createElement('td');
            const updateBtn = document.createElement('button');
            updateBtn.innerHTML = "Update";
            updateBtn.setAttribute('data-bs-toggle', 'modal');
            updateBtn.setAttribute('data-bs-target', '#exampleModal');
            updateBtn.onclick = () => update(user);
            td4.appendChild(updateBtn);
            tr.appendChild(td4);

            const td5 = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = "Delete";
            deleteBtn.onclick = () => deleteUser(user._id);
            td5.appendChild(deleteBtn);
            tr.appendChild(td5);

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error(error);
        alert('User not found');
        window.location.href = "index.html";
    }
}

getUsers();
