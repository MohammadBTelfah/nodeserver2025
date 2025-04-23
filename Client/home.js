const API_URL = "http://127.0.0.1:5050/api/users";
const CREATE_URL = "http://127.0.0.1:5050/api/createusers";
const UPDATE_URL = "http://127.0.0.1:5050/api/updateUser";
const DELETE_URL = "http://127.0.0.1:5050/api/deleteUser";

const token = sessionStorage.getItem("token");
if (!token) {
    window.location.href = "index.html";
}

//  Get all users and fill table
async function getUsers() {
    try {
        const res = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = ""; 

        data.forEach(user => {
            const tr = document.createElement('tr');

            const td1 = document.createElement('td');
            td1.textContent = user.Name;

            const td2 = document.createElement('td');
            td2.textContent = user.Role;

            const td3 = document.createElement('td');
            td3.textContent = user.Email;

            const td4 = document.createElement('td');
            const updateBtn = document.createElement('button');
            updateBtn.textContent = "Update";
            updateBtn.setAttribute('data-bs-toggle', 'modal');
            updateBtn.setAttribute('data-bs-target', '#exampleModal');
            updateBtn.onclick = () => update(user);
            td4.appendChild(updateBtn);

            const td5 = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteUser(user._id);
            td5.appendChild(deleteBtn);

            tr.append(td1, td2, td3, td4, td5);
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert('Error loading users.');
    }
}

// Create new user
async function createUser(e) {
    e.preventDefault();

    const name = document.getElementById("name1").value.trim();
    const email = document.getElementById("email1").value.trim();
    const password = document.getElementById("password1").value.trim();
    const role = document.getElementById("role1").value.trim();

    try {
        const res = await fetch(CREATE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                Name: name,
                Email: email,
                Password: password,
                Role: role
            })
        });

        const data = await res.json();
        console.log("Create response:", data);

        if (res.ok && (data.Message?.toLowerCase().includes("success") || data.success)) {
            alert("User created successfully!");
            document.getElementById('createUserForm').reset();
            getUsers();
        } else {
            alert("Error creating user: " + (data.Message || "Unknown error"));
        }
    } catch (error) {
        console.error("Create Error:", error);
        alert("Error creating user.");
    }
}

const createForm = document.getElementById('createUserForm');
createForm.addEventListener('submit', createUser);


// Update user
async function update(user) {
    const UpdateUserName = document.getElementById('UpdateUserName');
    const UpdateUserEmail = document.getElementById('UpdateUserEmail');
    const UpdateUserRole = document.getElementById('UpdateUserRole');

    UpdateUserName.value = user.Name;
    UpdateUserEmail.value = user.Email;
    UpdateUserRole.value = user.Role;

    const UpdateForm = document.getElementById('update');
    UpdateForm.onsubmit = async function (e) {
        e.preventDefault();
        console.log("Update user:", user._id, UpdateUserName.value, UpdateUserEmail.value, UpdateUserRole.value);
        try {
            const res = await fetch(`${UPDATE_URL}/${user._id}`, {
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

            const data = await res.json();

            if (res.ok && data.message === 'User updated successfully') {
                alert('User updated successfully');
                getUsers(); 
            } else {
                alert('User not updated');
            }
        } catch (error) {
            console.error(error);
            alert('Error updating user.');
        }
    };
}

//  Delete user
async function deleteUser(id) {
    const conf = confirm("Are you sure you want to delete this user?");
    if (conf) {
        try {
            const res = await fetch(`${DELETE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            const data = await res.json();

            if (res.ok && data.message === 'User deleted successfully') {
                alert('User deleted successfully');
                getUsers(); 
            } else {
                alert('Error deleting user: ' + (data.message || "Unknown error"));
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    }
}
getUsers();
