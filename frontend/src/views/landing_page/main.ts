import axios from "axios";
const logoutBtn = document.querySelector(".btn-logout") as HTMLButtonElement;
const searchBtn = document.querySelector(".btn") as HTMLButtonElement;
const accessToken = localStorage.getItem("accessToken");

const categorySelect = document.getElementById(
  "categorySelect"
) as HTMLSelectElement | null;
const selectedCategory = document.getElementById(
  "selectedCategory"
) as HTMLInputElement | null;

if (categorySelect && selectedCategory) {
  categorySelect.addEventListener("change", function () {
    selectedCategory.value = this.value;
  });
}
const http = axios.create({
  baseURL: "http://localhost:3500",
});

logoutBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  localStorage.clear();
  window.location.href = "/views/front_page/";
});
searchBtn?.addEventListener("click", async function (e) {
  e.preventDefault();
  const category = (
    document.getElementById("categorySelect") as HTMLInputElement
  ).value;
  const location = (
    document.getElementById("selectedLocation") as HTMLInputElement
  ).value;
  // console.log("esma", category, location);

  let profiles: Profile[];
  try {
    if (accessToken) {
      const response = await http({
        url: "/profile/all/search",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          category,
          location,
        },
        method: "GET",
      });

      console.log(response);
      profiles = [];
      if (response.data) {
        profiles = await response.data;
        console.log(profiles);
        console.log("akjnda");
        updateHtmlWithApiProfiles(profiles);
      } else {
        console.error(
          "API request failed:",
          response.status,
          response.statusText
        );
      }
    }
  } catch (error: any) {
    console.log(error);
    //   const showError = error.response.message;
    //   console.log(showError);
    //   confirm(showError);
  }
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

window.onload = async function () {
  // const accessToken = localStorage.getItem("accessToken");
  let profiles: Profile[];
  try {
    const response = await fetch("http://127.0.0.1:3500/profile/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      profiles = await response.json();
      console.log(profiles);
      updateHtmlWithApiProfiles(profiles);
    } else {
      console.error(
        "API request failed:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("An error occurred during the API request:", error);
  }
  const profileContainer = document.querySelector(".profile");
  const modal = document.getElementById("myModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");

  if (!profileContainer || !modal || !modalTitle || !modalContent) {
    console.error("Profile container or modal elements not found in the DOM");
    return;
  }
  profileContainer.addEventListener("click", function (event) {
    const target = event.target as HTMLElement;
    console.log({ target });
    const isViewMoreButton =
      target.tagName === "BUTTON" && target.classList.contains("view-more-btn");

    if (isViewMoreButton) {
      // Display the modal
      modal.style.display = "block";

      // You can add logic here to update the modal content based on the clicked profile
      const clickedProfileId = target.getAttribute("data-profile-id");
      console.log({ clickedProfileId });
      const clickedProfile = profiles.find(
        (profile) => Number(profile.profileId) === Number(clickedProfileId)
      );

      if (clickedProfile) {
        console.log({ clickedProfile });
        updateModalContent(clickedProfile);
      }
    }
  });

  // Add click event listener to close the modal
  const closeModalButton = document.getElementsByClassName("close")[0];
  closeModalButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
  function updateModalContent(profile: Profile) {
    if (!modalContent || !modalTitle) {
      console.error("No dom completes");
      return;
    }
    // const imageURL = "../../assets/images/download.jpg";

    modalTitle.innerText = `Details for ${profile.fullname}`;

    // Create a container for the profile details
    const detailsContainer = document.createElement("div");

    // Add profile details
    const fullName = document.createElement("p");
    fullName.innerText = `Name: ${profile.fullname}`;
    detailsContainer.appendChild(fullName);
    const description = document.createElement("p");
    description.innerText = `Description: ${profile.description}`;
    detailsContainer.appendChild(description);

    const address = document.createElement("p");
    address.innerText = `Location: ${profile.address}`;
    detailsContainer.appendChild(address);

    const category = document.createElement("p");
    category.innerText = `Category: ${profile.specialization}`;
    detailsContainer.appendChild(category);

    const availableTime = document.createElement("p");
    availableTime.innerText = `Available Time: ${profile.availableTime}`;
    detailsContainer.appendChild(availableTime);

    const minimumCharge = document.createElement("p");
    minimumCharge.innerText = `Minimum Charge: ${profile.minimumCharge}`;
    detailsContainer.appendChild(minimumCharge);

    const contactNumber = document.createElement("p");
    contactNumber.innerText = `Contact Number: ${profile.contactNumber}`;
    detailsContainer.appendChild(contactNumber);

    // Add the details container to the modal content
    modalContent.innerHTML = ""; // Clear existing content
    const profileImage = document.createElement("img");
    profileImage.src = profile.photo;
    profileImage.alt = profile.fullname;
    profileImage.className = "profile-image";

    // Add the image to the modal content
    modalContent.appendChild(profileImage);

    modalContent.appendChild(detailsContainer);

    // Create an image element for the profile image
  }

  // function updateModalContent(profile: Profile) {
  //   if(!modalTitle || !modalContent){
  //     console.error('Profile container not found in the DOM');
  //     return;
  //
  //   }
  //   modalTitle.innerText = `Details for ${profile.fullname}`;
  //   modalContent.innerText = `Address: ${profile.address}\nSpecialization: ${profile.specialization}\nDescription: ${profile.description}`;
  // }

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

function updateHtmlWithApiProfiles(profiles: Profile[]) {
  const profileContainer = document.querySelector(".profile");
  if (!profileContainer) {
    console.error("Profile container not found in the DOM");
    return;
  }
  // const imageURL = "../../assets/images/download.jpg";

  profiles.forEach((profile) => {
    // Create HTML elements
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

    imageWrapper.appendChild(profileImage);

    divImage.appendChild(imageWrapper);
    profileContent.appendChild(fullName);
    profileContent.appendChild(location);
    profileContent.appendChild(category);
    profileContent.appendChild(description);

    profileButton.appendChild(viewMoreButton);

    profileCard.appendChild(divImage);
    profileCard.appendChild(profileContent);
    profileCard.appendChild(profileButton);

    profileContainer.appendChild(profileCard);
  });
}
