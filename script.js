const userTableBody = document.querySelector("#userTable tbody");
const addUserBtn = document.getElementById("addUserBtn");

function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsersToStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderTable() {
  userTableBody.innerHTML = "";
  const users = getUsersFromStorage();

  users.forEach((user, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${user.name}</td>
      <td>${user.age}</td>
      <td>${user.gender}</td>
      <td>${user.city}</td>
      <td><button class="edit-btn" data-index="${index}">Tahrirlash</button></td>
      <td><button class="delete-btn" data-index="${index}">O'chirish</button></td>
    `;
    userTableBody.appendChild(newRow);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", deleteUser)
  );

  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", editUser)
  );
}

addUserBtn.addEventListener("click", () => {
  const name = document.getElementById("userName").value.trim();
  const age = document.getElementById("userAge").value.trim();
  const gender = document.getElementById("userGender").value;
  const city = document.getElementById("userCity").value.trim();

  if (!name || !age || !gender || !city) {
    alert("Barcha maydonlarni to'ldiring!");
    return;
  }

  const users = getUsersFromStorage();
  users.push({ name, age, gender, city });
  saveUsersToStorage(users);
  renderTable();

  document.getElementById("userName").value = "";
  document.getElementById("userAge").value = "";
  document.getElementById("userGender").value = "";
  document.getElementById("userCity").value = "";
});

function deleteUser(event) {
  const index = event.target.getAttribute("data-index");
  const users = getUsersFromStorage();
  users.splice(index, 1);
  saveUsersToStorage(users);
  renderTable();
}

function editUser(event) {
  const index = event.target.getAttribute("data-index");
  const users = getUsersFromStorage();
  const user = users[index];

  document.getElementById("userName").value = user.name;
  document.getElementById("userAge").value = user.age;
  document.getElementById("userGender").value = user.gender;
  document.getElementById("userCity").value = user.city;

  addUserBtn.textContent = "Yangilash";
  addUserBtn.onclick = () => {
    users[index] = {
      name: document.getElementById("userName").value.trim(),
      age: document.getElementById("userAge").value.trim(),
      gender: document.getElementById("userGender").value,
      city: document.getElementById("userCity").value.trim(),
    };

    saveUsersToStorage(users);
    renderTable();
    addUserBtn.textContent = "Qo'shish";
    addUserBtn.onclick = null; 
  };
}

document.addEventListener("DOMContentLoaded", renderTable);
