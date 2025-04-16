const add = document.querySelector(".add");
const addSection = document.querySelector(".contact-form");
const container = document.querySelector(".container");
const usersWrapper = document.querySelector(".users-wrapper");
const base_url = "https://67ff733858f18d7209f13d82.mockapi.io/users_num";
add.addEventListener("click", () => {
  addSection.classList.toggle("open");
});
window.addEventListener("DOMContentLoaded", async () => {
  const users = await fetchData();
  console.log(users);
  userCard(users);
  displayUsers(users);
});
async function fetchData() {
  const data = await fetch(base_url);
  const res = await data.json();
  displayUsers(res);
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
  const newUser = {
    phone: document.querySelector(".phone").value,
    name: document.querySelector(".name").value,
  };

  postData(newUser)
    .then(() => {
      document.querySelector(".phone").value = "";
      document.querySelector(".name").value = "";
      console.log("Foydalanuvchi qo'shildi!");
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
  `;
  usersWrapper.appendChild(div);
}
