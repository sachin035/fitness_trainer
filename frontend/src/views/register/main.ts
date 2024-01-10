import axios from "axios";

const signupForm = document.getElementById("signup-form");

const http = axios.create({
  baseURL: "http://localhost:3500",
});

signupForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = (
    document.getElementById("username-signup") as HTMLInputElement
  ).value;
  const email = (document.getElementById("email-signup") as HTMLInputElement)
    .value;
  const password = (
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
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});
