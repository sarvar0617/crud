const add = document.querySelector(".add");
const addSection = document.querySelector(".contact-form");
const container = document.querySelector(".container");
const usersWrapper = document.querySelector(".users-wrapper");
const base_url = "https://67ff733858f18d7209f13d82.mockapi.io/users_num";
const change = document.querySelector(".change");
const del = document.querySelector(".del");
add.addEventListener("click", () => {
  addSection.classList.toggle("open");
});
window.addEventListener("DOMContentLoaded", async () => {
  const users = await fetchData();
  console.log(users);
  userCard();
  displayUsers(users);
});
async function fetchData() {
  const data = await fetch(base_url);
  const res = await data.json();
  displayUsers(res);
  return res;
}
async function postData(data) {
  await fetch(base_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", () => {
  addSection.classList.remove("open");
  const newUser = {
    phone: document.querySelector(".phone").value,
    name: document.querySelector(".name").value,
  };

  postData(newUser)
    .then(() => {
      document.querySelector(".phone").value = "";
      document.querySelector(".name").value = "";
      console.log("Foydalanuvchi qo'shildi!");
      fetchData();
    })
    .catch((error) => {
      console.error("Xatolik:", error);
    });
});
function displayUsers(users) {
  usersWrapper.innerHTML = "";
  users.forEach((user) => {
    userCard(user);
  });
}
function userCard(data) {
  const div = document.createElement("div");
  div.className = "users";
  div.innerHTML = `
 <h1 class="name-text">
       ${data.name}
        </h1>
        <p class="number-text">
           ${data.phone} 
        </p>
         <img class="del"  data-id="${data.id}" src="./627249-delete3-1024.webp" alt="" />
        <img class="change" src="pen.png" alt="">
  `;
  usersWrapper.appendChild(div);
}

async function updateUser(id, updatedData) {
  try {
    const response = await fetch(`${base_url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    console.log("Updated:", data);
    fetchData();
  } catch (error) {
    console.error("Xatolik:", error);
  }
}

usersWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const userId = e.target.dataset.id;
    deleteUser(userId);
  }
});
async function deleteUser(id) {
  try {
    const response = await fetch(`${base_url}/${id}`, {
      method: "DELETE",
    });
    fetchData();
    const data = await response.json();
    console.log("Updated:", data);
    fetchData();
  } catch (error) {
    console.error("Xatolik:", error);
  }
}
console.log(true);
