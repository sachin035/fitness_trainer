import axios, { HttpStatusCode } from "axios";

const signupForm = document.getElementById("signup-form");
const registerSuccessMessage = document.getElementById(
  "signup-success-message"
) as HTMLElement;
registerSuccessMessage.style.color = "red";
const http = axios.create({
  baseURL: "http://localhost:3500",
});

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  let username = (
    document.getElementById("username-signup") as HTMLInputElement
  ).value;
  let email = (document.getElementById("email-signup") as HTMLInputElement)
    .value;
  let password = (
    document.getElementById("password-signup") as HTMLInputElement
  ).value;
  console.log({ username, email, password });

  try {
    const response = await http({
      url: "/auth/signup",
      data: {
        username,
        email,
        password,
      },
      method: "POST",
    });
    console.log({ response });
    console.log("heram");
    const message = response.data.message;
    if (response.status === HttpStatusCode.Created) {
      registerSuccessMessage.classList.remove("d-none");
      registerSuccessMessage.innerHTML = message;
      window.location.href = "/views/login/";
    }
  } catch (error: any) {
    console.log(error.response.data);
    const showError = error.response.data.message;
    // if (error.response.data == HttpStatusCode.Unauthorized) {
    // loginValidationError.classList.remove("d-none");
    // loginValidationError.innerHTML = error.response.data;
    registerSuccessMessage.classList.remove("d-none");
    registerSuccessMessage.innerHTML = showError;
    username = "";
    email = "";
    password = "";
  }
});
