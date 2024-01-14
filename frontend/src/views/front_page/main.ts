const findTrainerBtn = document.getElementById(
  "findTrainerBtn"
) as HTMLButtonElement;
console.log("as3jda");

findTrainerBtn.addEventListener("click", async (e) => {
  console.log("clicked");
  e.preventDefault();
  window.location.href = "/views/login/";
});
