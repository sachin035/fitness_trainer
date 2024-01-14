import axios, { HttpStatusCode } from "axios";
const profileForm = document.getElementById("profile-form") as HTMLElement;

const accessToken = localStorage.getItem("accessToken");
const http = axios.create({
  baseURL: "http://localhost:3500",
});

profileForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = (
    document.getElementById("fullname-profileform") as HTMLInputElement
  ).value;
  const description = (
    document.getElementById("description-profileform") as HTMLInputElement
  ).value;
  const minimum_charge = (
    document.getElementById("minimumcharge-profileform") as HTMLInputElement
  ).value;
  const available_time = (
    document.getElementById("availabletime-profileform") as HTMLInputElement
  ).value;
  const address = (
    document.getElementById("address-profileform") as HTMLInputElement
  ).value;
  const specialization = (
    document.getElementById("specialization-profileform") as HTMLInputElement
  ).value;
  const experience = (
    document.getElementById("experience-profileform") as HTMLInputElement
  ).value;
  const contact_number = (
    document.getElementById("contact-profileform") as HTMLInputElement
  ).value;
  console.log(
    fullname,
    description,
    minimum_charge,
    available_time,
    contact_number
  );
  try {
    if (accessToken) {
      const response = await http({
        url: "/profile/",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          fullname,
          description,
          available_time,
          address,
          minimum_charge,
          specialization,
          experience,
          contact_number,
        },
        method: "POST",
      });

      console.log(response);

      if (response.status === HttpStatusCode.Accepted) {
        console.log("Profile Created Successfully");
        confirm("Profile created Successfully");
      }
    }
  } catch (error: any) {
    const showError = error.response.data.message;
    console.log(showError);
    confirm(showError);
  }
});
