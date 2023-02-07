const buttonForward = document.querySelector(".button__forward");
const authCloseBtn = document.querySelectorAll(".auth__close");
const profile = document.querySelectorAll(".profile__item");
const modalAuthFull = document.querySelector(".modalAuth");
const modalAuth = document.querySelector(".auth__main");
const modalAuthPhone = document.querySelector(".auth__main_phone");
const mainM = document.querySelector(".main");
const authH2 = document.querySelector(".auth__h2");
const auth = document.querySelector(".auth__main_code");
const buttonEnter = document.querySelector(".auth__enter");
let authPhone = document.querySelector(".auth__phone");
let authTel = document.querySelector(".auth__tel");
let spanTimer = document.querySelector(".timer");
let element = document.getElementById("auth__phone");
const authError = document.querySelector(".auth__error");
const btnCorrectPhone = document.querySelector(".auth__phone_correct");
let valid = false;
let codeError = document.querySelector(".code__error");
let maskOptions = {
  mask: "+7(000)000-00-00",
  lazy: false,
};
let newSMS = document.querySelector(".newSMS");
let mask = new IMask(element, maskOptions);

let timer = null;

function openAuthWindow() {
  modalAuthFull.style.display = "block";
  document.body.style.overflow = "hidden";
  mainM.style.overflow = "hidden";
  if (window.innerWidth < 800) {
    modalAuthFull.style.animation = "modal 0.7s forwards";
  } else {
    modalAuth.style.animation = "zoom 0.7s forwards";
  }
}
function closeAuthWindow() {
  if (window.innerWidth < 800) {
    modalAuthFull.style.animation = "modalBack 0.7s forwards";
  } else {
    modalAuth.style.animation = "zoomBack 0.7s forwards";
  }
  setTimeout(() => {
    document.body.style.overflow = "unset";
    mainM.style.overflow = "unset";
    modalAuthFull.style.display = "none";
  }, 700);
}
profile.forEach((item) => {
  item.addEventListener("click", openAuthWindow);
});
authCloseBtn.forEach((item) => {
  item.addEventListener("click", closeAuthWindow);
});

function errorPhone() {
  const authPhone = document.querySelector(".auth__phone");
  authError.style.display = "block";
  authPhone.style.borderColor = "var(--color-bordeaux)";
}
let SMSCodeInput = document.querySelector(".SMSCode");
SMSCodeInput.addEventListener("input", () => {
  SMSCodeInput.value = SMSCodeInput.value.slice(0, 4);
});
function startTimer(authPhone) {
  let time = timeForCode;
  timer = setInterval(() => {
    time--;
    let sec = time % 60 < 10 ? "0" + (time % 60) : time % 60;
    spanTimer.textContent = "00:" + sec;
    newCode(time, authPhone);
  }, 1000);
}
//-------------------------------------------------
function newCode(time, authPhone) {
  if (time === 0) {
    clearInterval(timer);
    timer = null;
    newSMS.style.display = "inline-block";
    newSMS.addEventListener("click", () => {
      sentSMS(authPhone);
    });
  }
}

function enterToProfile() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  codeError.style.display = "none";
  let currentCode = document.querySelector(".SMSCode").value;
  currentCode = parseInt(currentCode.replace(/[^0-9]/g, ""));
  currentCode = {
    code: currentCode,
  };
  console.log(JSON.stringify(currentCode));
  let formData = new FormData();
  formData.append("code", currentCode);
  fetch("http://new.grillvino.ru/checkCode", {
    body: formData,
    method: "post",
  })
    .then((response) => response.json)
    .then((response) => {
      if (response.status === "Wrong code") {
        console.log(response.status);
        console.log("Wrong");
      } else {
        console.log(response.status);
        console.log("Ok");
      }
    });
  /*fetch(urlForPost, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // отправляемые данные
    },
    body: JSON.stringify(currentCode),
  })
  .then(res => res.json())
  .then(result => testCode(parseInt(result.valid)))
  .catch((error) => console.error(error));*/
  // let valid = JSON.parse(urlForPost);
  //valid = valid.valid;
  console.log(valid);
  if (valid) {
    console.log("true");
    window.location = linkToProfile;
  } else {
    console.log(valid);
    spanTimer.textContent = "00:00";
    codeError.style.display = "block";
    let currentPhone = authTel.textContent.replace(/[^0-9+]/g, "");
    newCode(0, currentPhone);
  }
}
function testCode(code) {
  if (currentCode === code) {
    window.location = linkToProfile;
  }
}

function sentSMS(authPhone) {
  codeError.style.display = "none";
  let SMSCode = document.querySelector(".SMSCode");
  SMSCode.value = "";
  newSMS.style.display = "none";
  let checkPhone = {
    phone: authPhone,
  };
  console.log(JSON.stringify(checkPhone));
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  console.log(authPhone);
  startTimer(authPhone);
}
/* fetch("/checkPhone", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // отправляемые данные
    },
    body: JSON.stringify(checkPhone),
  })
  .then(res => res.json())
  .then(result => testCode(parseInt(result.code)))
  .catch((error) => console.error(error));
}*/
let formData = new FormData();
formData.append("phone", authPhone);
fetch("http://new.grillvino.ru/checkPhone", {
  body: formData,
  method: "post",
});

function forwardFunc() {
  authError.style.display = "none";
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  let authPhoneReg = authPhone.value.replace(/[^0-9+]/g, "");
  if (authPhoneReg.length < 12) {
    errorPhone();
  } else {
    sentSMS(authPhoneReg);
    modalAuthPhone.style.display = "none";
    auth.style.display = "block";
    authTel.textContent = authPhone.value;
  }
}
function toEnterPhone() {
  spanTimer.textContent = "00:00";
  modalAuthPhone.style.animation = "unset";
  modalAuthPhone.style.display = "block";
  auth.style.display = "none";
}
buttonEnter.addEventListener("click", enterToProfile);
buttonForward.addEventListener("click", forwardFunc);
btnCorrectPhone.addEventListener("click", toEnterPhone);
