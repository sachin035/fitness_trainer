import axios, { HttpStatusCode } from "axios";
const profileForm = document.getElementById("profileData-form") as HTMLElement;
//const photoInput = document.getElementById("photoInput") as HTMLElement;

//let imageData = "";
// photoInput?.addEventListener("change", handleFileSelect);
// function handleFileSelect(event: any) {
//   const fileInput = event.target;
//   const selectedFile = fileInput?.files[0];
//   if (selectedFile) {
//     // const file = photoInput.files && photoInput.files[0];
//     // if(file){
//     const reader = new FileReader();
//     reader.readAsDataURL(selectedFile);
//     reader.onload = () => {
//       imageData = reader.result as string;
//     };
//     // }
//     console.log("File selected:", selectedFile);
//     // You can perform additional actions with the selected file here
//   } else {
//     console.log("No file selected");
//   }
// }
// console.log(imageData);
// console.log("ndana");

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
  // const photo: string = imageData;
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
    // photo,
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
          // photo,
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

      if (response.status === HttpStatusCode.Created) {
        console.log("Profile Created Successfully");
        confirm("Profile created Successfully");
        profileForm.style.display = "none";
        const submitContainer = document.createElement("div");
        submitContainer.className = "submit-container";
        const information = document.createElement("p");
        information.innerHTML =
          "Thank You. <br>Profile form submitted successfully.";
        submitContainer.appendChild(information);
        const returnBtn = document.createElement("button");
        returnBtn.className = "return-btn";
        returnBtn.innerText = "Return to MainPage";
        returnBtn.addEventListener("click", function () {
          window.location.href = "../landing_page/";
        });

        const successContainer = document.querySelector(
          ".successContainer"
        ) as HTMLElement;
        submitContainer.appendChild(returnBtn);
        successContainer.appendChild(submitContainer);
      }
    }
  } catch (error: any) {
    const showError = error.response.data.message;
    console.log(showError);
    profileForm.style.display = "none";
    const submitContainer = document.createElement("div");
    submitContainer.className = "submit-container";
    const information = document.createElement("p");
    information.innerHTML = `${showError}`;
    information.style.color = "red";
    submitContainer.appendChild(information);
    const returnBtn = document.createElement("button");
    returnBtn.className = "return-btn";
    returnBtn.innerText = "Return to MainPage";
    returnBtn.addEventListener("click", function () {
      window.location.href = "../landing_page/";
    });
    submitContainer.appendChild(returnBtn);
    const returnFormBtn = document.createElement("button");
    returnFormBtn.className = "return-formbtn";
    returnFormBtn.innerText = "Refill form";
    returnFormBtn.addEventListener("click", function () {
      window.location.href = "../profileForm/profile.html";
    });

    const successContainer = document.querySelector(
      ".successContainer"
    ) as HTMLElement;
    submitContainer.appendChild(returnFormBtn);
    successContainer.appendChild(submitContainer);
  }
});
