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
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const menu = document.querySelector(".menu");
const modal = document.querySelector(".modal");
const main = document.querySelector(".main");
const menu__h2 = document.querySelector(".menu__h2");
const burger = document.querySelector(".burgerMenu");
const mobileBasketSticky = document.querySelector(".mobileBasket_sticky");
const footer = document.querySelector(".footer__copyright");



//--------------------  Плюс/минус в меню-------------------//
let count = document.querySelector(".input_text");
console.log(count);
let minus = document.getElementById("left");
let plus = document.getElementById("right");
minus.addEventListener("click", () => {
  if (count.value > 0) {
    count.value--;
  }
});
plus.addEventListener("click", () => {
  if (count.value < 999) {
    count.value++;
  }
});

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
setTimeout(()=>{
  truncateNames();
});
addEventListener("resize", truncateNames);

/*---------------------Modal window-------------------------------------*/
var timerId = null;
const imgsClick = document.querySelectorAll(".card__img");
for (let imgClick of imgsClick) {
  imgClick.addEventListener("click", () => {
    clearTimeout(timerId);
    modal.style.display = "flex";
    //document.querySelector(".asideModal").style.display = "flex";
    if (window.innerWidth < 800) {
      modal.style.animation = "modal 0.7s forwards";
    } else {
      modal.style.animation = "zoom 0.7s forwards";
    }
    document.querySelector(".modal__footer").style.display = "flex";
    document.querySelector(".header").style.filter = "blur(2.5px)";
    main.style.filter = "blur(2.5px)";
    main.style.overflow = "hidden";
    document.querySelector(".menu").style.overflow = "hidden";
    modal.style.overflow = "auto";
    document.body.style.overflow = "hidden";
  });}/*
    document.querySelector(".modal__card").style.overflow = "auto";
    document.querySelector(".modal__gallery").style.overflow = "auto";
    
*/

const modalsCloses = document.querySelectorAll(".modal__close");
for (let modalClose of modalsCloses) {
  modalClose.addEventListener("click", () => {
    console.log(window.innerWidth);
    if (window.innerWidth < 1400) {
      document.querySelector(".modal").style.animation =
        "modalBack 0.7s forwards";
    } else {
      document.querySelector(".modal").style.animation =
        "zoomBack 0.7s forwards";
    }
    timerId = setTimeout(() => {
      document.querySelector(".modal").style.display = "none";
    }, 800);
    document.querySelector("header").style.filter = "none";
    document.querySelector(".main").style.filter = "none";
    document.querySelector(".modal__footer").style.display = "none";
    document.querySelector(".menu").style.overflow = "unset";
    document.querySelector(".main").style.overflow = "unset";
    document.body.style.overflow = "unset";
  });
}

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
const toBasket = document.querySelector(".add__order");
const mobileBasket = document.querySelector(".mobileBasket");
const buttonAdd = document.querySelectorAll(".card__button");
const buttonCount = document.querySelectorAll(".card__button_count");
for (let i = 0; i < buttonAdd.length; i++) {
  buttonAdd[i].addEventListener("click", (e) => {
    if (window.innerWidth < 800) {
      //document.querySelector(".add__order").style.display = "block";
      ///document.querySelector(".add__order_tablet").style.display = "flex";
      document.querySelector(".mobileBasket__main").style.display = "none";
      document.querySelector(".mobileBasket__footer").style.display = "none";
      mobileBasketSticky.style.position = "sticky";
      mobileBasketSticky.style.display = "block";
      mobileBasket.style.top = "calc((var(--vh, 1vh) * 100) - 60px)";
      console.log(mobileBasketSticky.getBoundingClientRect().top);
      mobileBasketTrue = true;
      //mobileBasketSticky.style.top = (window.innerHeight - 60) + "px";
      mobileBasket.style.display = "flex";
    } else if (window.innerWidth < 1400) {
      document.querySelector(".add__order_tablet").style.display = "flex";
    }
    buttonAdd[i].style.display = "none";
    buttonCount[i].style.display = "flex";
  });
}

//-------------------------Open basket-----------------------------------------//
// const toBasket = document.querySelector(".add__order");

mobileBasket.addEventListener("click", () => {});

// document.querySelector(".add__order").style.display = "block";
// document.querySelector(".add__order_tablet").style.display = "flex";

//--------------Добавление/снятие прозрачности у мобильного меню-------------------//

window.addEventListener("scroll", function () {
  const h2top = menu__h2.getBoundingClientRect().top;
  const footerTop = footer.getBoundingClientRect().top;
  const mobileBasketTop = mobileBasketSticky.getBoundingClientRect().top;
  console.log(footerTop);
  console.log(mobileBasketTop);
  if (h2top >= 149) {
    document.querySelector(".menu__mobile_nav").style.backgroundColor = "white";
  } else {
    document.querySelector(".menu__mobile_nav").style.backgroundColor =
      "rgb(255, 255, 255, 0.7)";
  }
  /*if (mobileBasketTrue) {
    if (footerTop < mobileBasketTop) {
      mobileBasketSticky.style.position = "sticky";
      mobileBasket.style.top = "calc((var(--vh, 1vh) * 100) - 120px)";
      mobileBasketTrue = false;
    }
  }
 */
});
/*---------------All parameters------------------------

totalCount  //Общее количество заказанных позиций*/
