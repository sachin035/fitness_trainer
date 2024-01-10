import axios from "axios";

const loginForm = document.getElementById("login-form");

const http = axios.create({
  baseURL: "http://localhost:8000/auth",
});

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;
  console.log(typeof password);

  try {
    const response = await http({
      url: "/login",
      data: {
        email,
        password,
      },
      method: "POST",
    });
    console.log(response);
    console.log(response.data.accessToken);
  } catch (error) {
    console.error(error);
  }
});
