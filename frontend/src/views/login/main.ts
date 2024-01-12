import axios, { HttpStatusCode } from "axios";

const loginForm = document.getElementById("login-form");
const loginSuccessMessage = document.getElementById(
  "login-success-message"
) as HTMLElement;
// const loginValidationError = document.getElementById(
//   "login-error-message"
// ) as HTMLElement;

const http = axios.create({
  baseURL: "http://localhost:3500",
});

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  console.log(email, password);

  try {
    const response = await http({
      url: "/auth/login",
      data: {
        email,
        password,
      },
      method: "POST",
    });
    console.log(response);
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    const message = response.data.message;
    if (response.status === HttpStatusCode.Accepted) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      loginSuccessMessage.classList.remove("d-none");
      loginSuccessMessage.innerHTML = message;
      window.location.href = "/views/landing_page/";
    }
  } catch (error: any) {
    console.log(error.response.data);
    const showError = error.response.data.message;
    // if (error.response.data == HttpStatusCode.Unauthorized) {
    // loginValidationError.classList.remove("d-none");
    // loginValidationError.innerHTML = error.response.data;
    loginSuccessMessage.classList.remove("d-none");
    loginSuccessMessage.innerHTML = showError;
    // }
  }
});
