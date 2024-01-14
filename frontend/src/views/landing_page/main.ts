const logoutBtn = document.querySelector(".btn-logout") as HTMLButtonElement;
logoutBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "/views/front_page/";
});
