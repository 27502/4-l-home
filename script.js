const userTableBody = document.querySelector("#userTable tbody");
const addUserBtn = document.getElementById("addUserBtn");

// Foydalanuvchilarni localStorage-dan olish
function getUsersFromStorage() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Foydalanuvchilarni localStorage-ga saqlash
function saveUsersToStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Jadvalni yangilash
function renderTable() {
  userTableBody.innerHTML = ""; // Jadvalni tozalash
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

  // O'chirish tugmalariga hodisalarni ulash
  document.querySelectorAll(".delete-btn").forEach((btn) =>
    btn.addEventListener("click", deleteUser)
  );

  // Tahrirlash tugmalariga hodisalarni ulash
  document.querySelectorAll(".edit-btn").forEach((btn) =>
    btn.addEventListener("click", editUser)
  );
}

// Yangi foydalanuvchi qo'shish
function addUserHandler() {
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

  // Input maydonlarini tozalash
  document.getElementById("userName").value = "";
  document.getElementById("userAge").value = "";
  document.getElementById("userGender").value = "";
  document.getElementById("userCity").value = "";
}

// Foydalanuvchini o'chirish
function deleteUser(event) {
  const index = event.target.getAttribute("data-index");
  const users = getUsersFromStorage();
  users.splice(index, 1); // Indeks bo'yicha foydalanuvchini o'chirish
  saveUsersToStorage(users);
  renderTable(); // Jadvalni qayta chizish
}

// Foydalanuvchini tahrirlash
function editUser(event) {
  const index = event.target.getAttribute("data-index");
  const users = getUsersFromStorage();
  const user = users[index];

  // Ma'lumotlarni input maydonlariga joylashtirish
  document.getElementById("userName").value = user.name;
  document.getElementById("userAge").value = user.age;
  document.getElementById("userGender").value = user.gender;
  document.getElementById("userCity").value = user.city;

  // "Qo'shish" tugmachasini "Yangilash"ga o'zgartirish
  addUserBtn.textContent = "Yangilash";

  // Yangi tahrirlash funksiyasini ulash
  const saveChanges = () => {
    users[index] = {
      name: document.getElementById("userName").value.trim(),
      age: document.getElementById("userAge").value.trim(),
      gender: document.getElementById("userGender").value,
      city: document.getElementById("userCity").value.trim(),
    };

    saveUsersToStorage(users);
    renderTable();

    // Tugmachani yana "Qo'shish"ga o'zgartirish
    addUserBtn.textContent = "Qo'shish";
    addUserBtn.removeEventListener("click", saveChanges); // Yangilash funksiyasini olib tashlash
    addUserBtn.addEventListener("click", addUserHandler); // Asl funksiyani qaytarish

    // Input maydonlarini tozalash
    document.getElementById("userName").value = "";
    document.getElementById("userAge").value = "";
    document.getElementById("userGender").value = "";
    document.getElementById("userCity").value = "";
  };

  // Tugmachaga yangi tahrirlash funksiyasini ulash
  addUserBtn.removeEventListener("click", addUserHandler);
  addUserBtn.addEventListener("click", saveChanges);
}

// Dastur yuklanganida jadvalni chizish va tugmachalarni ulash
document.addEventListener("DOMContentLoaded", () => {
  renderTable();
  addUserBtn.addEventListener("click", addUserHandler);
});
