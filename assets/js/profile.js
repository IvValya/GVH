const buttonOnward = document.querySelector(".profile__button");
const profileCloseBtn = document.querySelector(".profile__close");
const profile = document.querySelector(".profile__item");
const modalProfileFull = document.querySelector(".modalProfile");
const modalProfile = document.querySelector(".profile__main");
const main = document.querySelector(".main");
function openProfile() {
  modalProfileFull.style.display = "block";
  document.body.style.overflow = "hidden";
  main.style.overflow = "hidden";
  if (window.innerWidth < 800) {
    modalProfile.style.animation = "modal 0.7s forwards";
  } else {
    modalProfile.style.animation = "zoom 0.7s forwards";
  }
}
function closeProfile() {
  if (window.innerWidth < 800) {
    modalProfile.style.animation = "modalBack 0.7s forwards";
  } else {
    modalProfile.style.animation = "zoomBack 0.7s forwards";
  }
  setTimeout(() => {
    document.body.style.overflow = "unset";
    main.style.overflow = "unset";
    modalProfileFull.style.display = "none";
  }, 700);
}
profile.addEventListener("click", openProfile);
profileCloseBtn.addEventListener("click", closeProfile);

var element = document.getElementById("profile__phone");
var maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false
} 
var mask = new IMask(element, maskOptions);
