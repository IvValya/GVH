/*window.addEventListener("load",()=> {
  console.log(window.innerHeight);
  console.log(window.visualViewport.height);
  console.log(window.height);

  document.querySelector(".mobileBasket").style.height = (window.innerHeight-5) +"px"; })
  window.onresize = ()=> {
    console.log(window.innerHeight+"px");
    console.log(window.visualViewport.height);
    document.querySelector(".mobileBasket").style.height = (window.innerHeight) +"px";
    console.log(window.innerHeight-357);
  document.querySelector(".mobileBasket__menu").style.height = (window.innerHeight-360) + "px" };
*/

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
let mobileBasketTrue = false;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
const auxiliary = document.querySelector(".auxiliary");
const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const menu = document.querySelector(".menu");
const menuMobileNav = document.querySelector(".menu__mobile_nav");
const modal = document.querySelector(".modal");
const main = document.querySelector(".main");
const menu__h2 = document.querySelector(".menu__h2");
const burger = document.querySelector(".burgerMenu");
const mobileBasketSticky = document.querySelector(".mobileBasket_sticky");
const toBasket = document.querySelector(".add__order");
const mobileBasket = document.querySelector(".mobileBasket");
const buttonAdd = document.querySelectorAll(".card__button");
const cardCount = document.querySelectorAll(".card__button_count");
const footerCopyright = document.querySelector(".footer__copyright");
const buttonsCount = document.querySelectorAll(".button__count");
const btnCloseModal = document.querySelector(".modal__close");
const btnCloseMobileBasket = document.querySelector(".mobileBasket__close");
const modalFooter = document.querySelector(".modal__footer");
const toppingLabels = document.querySelectorAll(".topping__label");
const asideModal = document.querySelector(".asideModal");
const mobileBasketHeaderPrice = document.querySelector(
  ".mobileBasket__header_price"
);
const mobileBasketHeader = document.querySelector(".mobileBasket__header");
const mobileBasketFooter = document.querySelector(".mobileBasket__footer");
const mobileBasketOpen = document.querySelector(".mobileBasket_open");

//--------------------  Плюс/минус в меню-------------------//

function countPlus(count) {
  return function () {
    if (count.value < 999) {
      count.value++;
    }
  };
}

function countMinus(count) {
  return function () {
    if (count.value > 0) {
      count.value--;
    }
  };
}

for (let buttonCount of buttonsCount) {
  let minus = buttonCount.querySelector(".count_minus");
  let plus = buttonCount.querySelector(".count_plus");
  let count = buttonCount.querySelector(".input_text");
  minus.addEventListener("click", countMinus(count));
  plus.addEventListener("click", countPlus(count));
}

//----------------------Вызов бургер-меню-----------------//
/*burger.addEventListener("click", () => {
  console.log("here");
  document.querySelector(".mobile").classList.toggle("hidden");
})*/

/*----------------------------многоточие в конце строки-----------------*/

function truncateNames() {
  let cards = document.querySelectorAll(".card");
  for (let n = 0; n < cards.length; n++) {
    let card = cards[n];
    let cardName = card.querySelector(".card__desc_name");
    let text = cardName.innerText;
    let initialValue = card.getAttribute("data-initial_value");
    if (!initialValue) {
      card.setAttribute("data-initial_value", text);
    } else {
      text = initialValue;
      cardName.innerText = text;
    }
    let maxI = 1000;
    let i = 0;
    while (card.scrollHeight > card.offsetHeight) {
      if (i > maxI) {
        //на всякий случай
        break;
      }
      i++;
      text = text.substr(0, text.length - 1);
      cardName.innerText = text + "...";
    }
  }
}
setTimeout(() => {
  truncateNames();
});
addEventListener("resize", truncateNames);
addEventListener("DOMContentLoaded", truncateNames);

/*---------------------Modal window-------------------------------------*/
var timerId = null;
const imgsClick = document.querySelectorAll(".menu__card");
for (let imgClick of imgsClick) {
  console.log(
    document.querySelector(".asideMenu__label").getBoundingClientRect().top
  );
  imgClick.addEventListener("click", () => {
    clearTimeout(timerId);
    modal.style.display = "flex";
    btnCloseModal.style.display = "block";
    if (window.innerWidth < 800) {
      modal.style.animation = "modal 0.7s forwards";
      auxiliary.style.display = "block";
      btnCloseModal.style.animation = "modal 0.7s forwards";
      modal.style.overflow = "auto";
    } else {
      modal.style.animation = "zoom 0.7s forwards";
      btnCloseModal.style.animation = "zoom 0.7s forwards";

      //document.querySelector(".asideMenu__ul").style.position = "fixed";
      //document.querySelector(".asideMenu__ul").style.top = ;
    }
    modalFooter.style.display = "flex";
    main.style.overflow = "hidden";
    menu.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    menuMobileNav.style.filter = "blur(2.5px)";
    main.style.filter = "blur(2.5px)";
    header.style.filter = "blur(2.5px)";
  });
}
/*----------------------Close modal window------------------------*/

function closeModal() {
  header.style.filter = "none";
  btnCloseModal.style.display = "none";
  main.style.filter = "none";
  menuMobileNav.style.filter = "none";
  modalFooter.style.display = "none";
  auxiliary.style.display = "none";
  modal.style.overflow = "unset";
  menu.style.overflow = "unset";
  main.style.overflow = "unset";
  document.body.style.overflow = "unset";
  //modalFooter.style.display = "none";
  if (window.innerWidth < 800) {
    modal.style.animation = "modalBack 0.7s forwards";
    btnCloseModal.style.animation = "modalBack 0.7s forwards";
    header.style.position = "sticky";
    menuMobileNav.style.position = "sticky";
  } else {
    modal.style.animation = "zoomBack 0.7s forwards";
  }
  timerId = setTimeout(() => {
    modal.style.display = "none";
  }, 800);
}

const modalsCloses = document.querySelectorAll(".modal__close");
for (let modalClose of modalsCloses) {
  modalClose.addEventListener("click", closeModal);
}
/*-----------------------Add topping---------------------------------*/
const btnModalOrder = document.querySelector(".modal__order_button");
btnModalOrder.addEventListener("click", closeModal);

/*-------------------------Open mobile basket-------------------------------*/
function openMobileBasketFunc() {
  document.body.style.overflow = "hidden";
  mobileBasket.style.display = "flex";
  mobileBasketHeaderPrice.style.display = "none";
  btnCloseMobileBasket.style.display = "block";
  mobileBasketSticky.style.animation = "mobileBasket 0.7s forwards";
  //mobileBasketSticky.style.top = 0;
  mobileBasketOpen.style.position = "fixed";
  mobileBasketFooter.style.position = "fixed";
  mobileBasketFooter.style.bottom = 0;
  mobileBasketOpen.style.top = "-100vh";
  openMobileBasket.removeEventListener("click", openMobileBasketFunc);
  btnCloseMobileBasket.addEventListener("click", (e) => {
    console.log(e.target);
    closeMobileBasketFunc();
  })
};

function closeMobileBasketFunc() {  
  document.body.style.overflow = "unset";
 // mobileBasket.style.display = "none";
  mobileBasketHeaderPrice.style.display = "block";
  btnCloseMobileBasket.style.display = "none";
  
  mobileBasketSticky.style.top = "unset";
  mobileBasketSticky.style.animation = "closeMobileBasket 0.7s forwards";
  setTimeout(() => {
    openMobileBasket.addEventListener("click", openMobileBasketFunc)}, 710);
}

const openMobileBasket = document.querySelector(".mobileBasket__header");
openMobileBasket.addEventListener("click", openMobileBasketFunc);

/*------------------------Close mobile basket----------------------------*/
btnCloseMobileBasket.addEventListener("click", (e) => {
  console.log(e.target);
  closeMobileBasketFunc;
})

/*--------------------------Resize windows------------------------------*/
/*addEventListener('DOMContentLoaded', () => {
  document.querySelector(".modal").style.height = (window.innerHeight-130) +"px";
});
window.addEventListener("load",()=> {
    document.querySelector(".modal").style.height = (window.innerHeight-130) +"px";
  window.onresize = ()=> {
        document.querySelector(".modal").style.height = (window.innerHeight-130) +"px";
    };
  })
*/

/*--------------------------Toggle button Add-------------------*/

for (let i = 0; i < buttonAdd.length; i++) {
  buttonAdd[i].addEventListener("click", (e) => {
    if (window.innerWidth < 800) {
      mobileBasket.style.display = "flex";
      mobileBasketSticky.style.position = "fixed";
      footer.style.paddingBottom = "60px";
      mobileBasketSticky.style.display = "block";
      btnCloseMobileBasket.style.display = "none";
      mobileBasketSticky.style.bottom = "60px";
      //mobileBasketSticky.style.top = "calc((var(--vh, 1vh) * 100) - 60px)";
      console.log(mobileBasketSticky.getBoundingClientRect().top);
      mobileBasketTrue = true;
    } else if (window.innerWidth < 1400) {
      document.querySelector(".add__order_tablet").style.display = "flex";
    }
    buttonAdd[i].style.display = "none";
    cardCount[i].style.display = "flex";
  });
}

//-------------------------Choose topping------------------------------------//
for (let toppingLabel of toppingLabels) {
  toppingLabel.addEventListener("click", (e) => {
    console.log(e.currentTarget.closest(".topping__card"));
    let currentTopping = e.currentTarget.closest(".topping__card");
    let currentToppingCheck = currentTopping.querySelector(
      ".topping__check_img"
    );
    currentToppingCheck.classList.toggle("topping__check_active");
  });
}

//--------------------------Add to basket from modal window-------------------//
const btnAddOnModal = document.querySelector(".modal__order_button");
btnAddOnModal.addEventListener("click", () => {});

//-------------------------Open basket-----------------------------------------//
// const toBasket = document.querySelector(".add__order");

mobileBasket.addEventListener("click", () => {});

// document.querySelector(".add__order").style.display = "block";
// document.querySelector(".add__order_tablet").style.display = "flex";

//--------------Добавление/снятие прозрачности у мобильного меню-------------------//

window.addEventListener("scroll", function () {
  const menu_h2top = menu__h2.getBoundingClientRect().top;
  const footerCopTop = footerCopyright.getBoundingClientRect().top;
  const mobileBasketTop = mobileBasketSticky.getBoundingClientRect().top;
  console.log(footerCopTop);
  console.log(mobileBasketTop);
  if (menu_h2top >= 149) {
    menuMobileNav.style.backgroundColor = "white";
  } else {
    menuMobileNav.style.backgroundColor = "rgb(255, 255, 255, 0.7)";
  }
  if (mobileBasketTrue) {
    if (footerCopTop < mobileBasketTop) {
      footer.style.paddingBottom = "60px";
      // mobileBasketSticky.style.position = "sticky";
      //mobileBasket.style.top = "calc((var(--vh, 1vh) * 100) - 120px)";
      mobileBasketTrue = false;
    }
  }
});
/*---------------All parameters------------------------

totalCount  //Общее количество заказанных позиций*/
