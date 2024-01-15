import axios from "axios";
const http = axios.create({
  baseURL: "http://localhost:3500",
});
interface Profile {
  profileId: number;
  fullname: string;
  address: string;
  specialization: string;
  description: string;
  photo: string;
  availableTime: string;
  minimumCharge: string;
  contactNumber: string;
}
let profileId: number;
let profiles: Profile[];
const accessToken = localStorage.getItem("accessToken");
window.onload = async function () {
  try {
    const response = await http({
      url: "/profile/",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    });
    profiles = response.data.profile;
    console.log(profiles);
    updateHtmlWithApiProfiles(profiles);
  } catch (error: any) {
    const showError = error.response.data.message;
    console.log(showError);
    confirm(showError);
  }
  const profileContainer = document.querySelector(".profile");
  if (!profileContainer) {
    console.error("Profile container or modal elements not found in the DOM");
    return;
  }
  profileContainer.addEventListener("click", function (event) {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      profileId = Number(target.getAttribute("data-profile-id"));

      if (target.classList.contains("view-more-btn")) {
        handleViewMoreClick(profileId);
      } else if (target.classList.contains("update-btn")) {
        handleUpdateClick(profileId);
      } else if (target.classList.contains("delete-btn")) {
        handleDeleteClick(profileId);
      }
    }
  });
};
async function handleViewMoreClick(profileId: number) {
  console.log("View More Clicked", profileId);
}
async function handleUpdateClick(profileId: number) {
  console.log("Update Clicked", profileId);
  const clickedProfile = profiles.find(
    (profile) => Number(profile.profileId) === Number(profileId)
  );
  openModal(clickedProfile);
}

function openModal(clickedProfile: any) {
  const modal = document.getElementById("updateProfileModal");
  console.log(clickedProfile);
  if (modal) {
    (
      document.getElementById("fullname-profileform") as HTMLInputElement
    ).value = clickedProfile.fullname || "";
    (
      document.getElementById("description-profileform") as HTMLTextAreaElement
    ).value = clickedProfile.description || "";
    (
      document.getElementById("minimumcharge-profileform") as HTMLInputElement
    ).value = clickedProfile.minimumCharge || "";
    (
      document.getElementById("availabletime-profileform") as HTMLInputElement
    ).value = clickedProfile.availableTime || "";
    (document.getElementById("address-profileform") as HTMLInputElement).value =
      clickedProfile.address || "";
    (
      document.getElementById("specialization-profileform") as HTMLSelectElement
    ).value = clickedProfile.specialization || "";
    (
      document.getElementById("experience-profileform") as HTMLInputElement
    ).value = clickedProfile.experience || "";
    (document.getElementById("contact-profileform") as HTMLInputElement).value =
      clickedProfile.contactNumber || "";

    modal.style.display = "block";
  }
}
const closeModalButton = document.getElementsByClassName("close-btn")[0];
closeModalButton.addEventListener("click", function () {
  const modal = document.getElementById("updateProfileModal");
  if (modal) {
    modal.style.display = "none";
  }
});
const updateButtonSubmit = document.getElementsByClassName("update-submit")[0];
updateButtonSubmit.addEventListener("click", function () {
  handleUpdateSubmit(profileId);
});

async function handleUpdateSubmit(profileId: number) {
  console.log("Update Clicked", profileId);

  const fullName = document.getElementById(
    "fullname-profileform"
  ) as HTMLInputElement;
  const description = document.getElementById(
    "description-profileform"
  ) as HTMLTextAreaElement;
  const minimumCharge = document.getElementById(
    "minimumcharge-profileform"
  ) as HTMLInputElement;
  const availableTime = document.getElementById(
    "availabletime-profileform"
  ) as HTMLInputElement;
  const address = document.getElementById(
    "address-profileform"
  ) as HTMLInputElement;
  const specialization = document.getElementById(
    "specialization-profileform"
  ) as HTMLSelectElement;
  const experience = document.getElementById(
    "experience-profileform"
  ) as HTMLInputElement;
  const contactNumber = document.getElementById(
    "contact-profileform"
  ) as HTMLInputElement;

  // Create an object with the retrieved values
  const formData = {
    fullName: fullName.value,
    description: description.value,
    minimumCharge: minimumCharge.value,
    availableTime: availableTime.value,
    address: address.value,
    specialization: specialization.value,
    experience: experience.value,
    contactNumber: contactNumber.value,
  };
  console.log(formData);
  try {
    const response = await http({
      url: `/profile/${profileId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "PUT",
      data: formData,
    });
    console.log(response);
  } catch (error: any) {
    const showError = error.response.data.message;
    console.log(showError);
    confirm(showError);
  }
}

async function handleDeleteClick(profileId: number) {
  console.log("Delete Clicked", profileId);
  try {
    const response = await http({
      url: `profile/${profileId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "DELETE",
    });
  } catch (error: any) {
    const showError = error.response.data.message;
    console.log(showError);
    confirm(showError);
  }
}

function updateHtmlWithApiProfiles(profiles: Profile[]) {
  const profileContainer = document.querySelector(".profile");
  if (!profileContainer) {
    console.error("Profile container not found in the DOM");
    return;
  }

  try {
    profiles.forEach((profile) => {
      const profileCard = document.createElement("div");
      profileCard.className = "profile__card";

      const divImage = document.createElement("div");
      divImage.className = "profile_image";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "profile__image--imagewrapper";

      const profileImage = document.createElement("img");
      profileImage.src = profile.photo;

      const profileContent = document.createElement("div");
      profileContent.className = "profile__content";

      const fullName = document.createElement("h3");
      fullName.className = "profile__content--fullname";
      fullName.innerText = profile.fullname;

      const location = document.createElement("h5");
      location.className = "profile__content--location";
      location.innerText = profile.address;

      const category = document.createElement("h5");
      category.className = "profile__content--category";
      category.innerText = `${profile.specialization} specialist`;

      const description = document.createElement("p");
      description.className = "profile__content--description";
      description.innerText = profile.description;

      const profileButton = document.createElement("div");
      profileButton.className = "profile__button";

      const viewMoreButton = document.createElement("button");
      viewMoreButton.className = "view-more-btn";
      viewMoreButton.innerText = "View More";
      viewMoreButton.setAttribute("data-profile-id", String(profile.profileId));

      const updateButton = document.createElement("button");
      updateButton.className = "update-btn";
      updateButton.innerText = "Update";
      updateButton.setAttribute("data-profile-id", String(profile.profileId));

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-btn";
      deleteButton.innerText = "Delete";
      deleteButton.setAttribute("data-profile-id", String(profile.profileId));

      imageWrapper.appendChild(profileImage);

      divImage.appendChild(imageWrapper);
      profileContent.appendChild(fullName);
      profileContent.appendChild(location);
      profileContent.appendChild(category);
      profileContent.appendChild(description);

      profileButton.appendChild(viewMoreButton);
      profileButton.appendChild(updateButton);
      profileButton.appendChild(deleteButton);

      profileCard.appendChild(divImage);
      profileCard.appendChild(profileContent);
      profileCard.appendChild(profileButton);

      profileContainer.appendChild(profileCard);
    });
  } catch (error) {
    // console.error(error, profiles);
    console.error(error, "error");
    return;
  }
}
