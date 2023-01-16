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
const data = {
  basket: {
    idCategory: "popular",
    cards: [
      { 
        id: 1,
        card: {
          name: "newName",
          img: "assets/img/bigImg.jpg",
          weight: "360 г.",
          price: 400,
          quantity: 1,
        },        
      },
      { 
        id: 3,
        card: {
          name: "newName",
          img: "assets/img/kare.jpg",
          weight: "360 г.",
          price: 150,
          quantity: 2,
        },
        
      },
      {
        id: 4,
        card: {
          name: "newName",
          img: "assets/img/image_for_basket.jpg",
          weight: "360 г.",
          price: 400,
          quantity: 1,
        },
        
      },
    ],
  },
  delivery: {
    typeDelivery: "takeaway",
    priceDelivery: 500,
    orderPriceForFree: 1500
  },
  customerInfo: {
    address: {},
    payment: {},
  },
};

let x1 = null;
let y1 = null;
let xDiff = 0;
let yDiff = 0;
let full = 0;
let touchTrue = false;
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
let buttonsCount = document.querySelectorAll(".button__count");
const btnCloseModal = document.querySelector(".modal__close");
const btnCloseMobileBasket = document.querySelector(".mobileBasket__close");
const modalFooter = document.querySelector(".modal__footer");
const toppingLabels = document.querySelectorAll(".topping__label");
const asideModal = document.querySelector(".asideModal");
const mobileBasketHeaderPrice = document.querySelector(
  ".mobileBasket__header_totalPrice"
);
const mobileBasketHeader = document.querySelector(".mobileBasket__header");
const mobileBasketFooter = document.querySelector(".mobileBasket__footer");
const mobileBasketOpen = document.querySelector(".mobileBasket_open");
const asideMenuUl = document.querySelector(".asideMenu__ul");
const mobileBasketHeaderImg = document.querySelector(
  ".mobileBasket__header_img"
);
const mobileBasketHeaderWr = document.querySelector(".mobileBasket__header_wr");
const divBlock = document.querySelector(".block");
let modalTrue = false;
let basketTrue = false;
let scrollTrue = true;
let startPosition =
  window.innerHeight - parseInt(mobileBasketSticky.style.bottom) + "px";
//--------------------  Плюс/минус в меню-------------------//

function countPlus(count) {
  return function () {
    if (count.value < 999) {
      let currentElementId = count.dataset.id;

      const card = data.basket.cards.find((card) => card.id === parseInt(currentElementId));
      console.log(card);
      post.card.quantity ++;
      orderBasket.save(data);
      console.log(currentElementId);
      count.value++;
    }
  };
}

function countMinus(count) {
  return function () {
    if (count.value > 1) {
      count.value--;
    } else if (count.value === "1") {
      let currentCard;
      let currentBtnAdd;
      if (modalTrue) {
        currentCard = count.closest(".modal__order");
        currentBtnAdd = currentCard.querySelector(".modal__order_button");
      } else if (count.closest(".list_item")) {
        currentCard = count.closest(".list_item");
        currentBtnAdd = currentCard.querySelector(".card__button");
      }
      else {
        currentCard = count.closest(".basket__card");
        currentCard.remove();
        return;
      }
      let currentBtnCount = currentCard.querySelector(".card__button_count");
      currentBtnCount.style.display = "none";
      currentBtnAdd.style.display = "block";
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
  imgClick.addEventListener("click", (e) => {
    clearTimeout(timerId);
    /* let currentCard = e.currentTarget.closest(".list_item");
    let currentBtnAdd = currentCard.querySelector(".card__button");
    let currentBtnCount = currentCard.querySelector(".card__button_count");
    currentBtnAdd.style.display = "none";
    currentBtnCount.style.display = "flex";*/

    modalTrue = true;
    modal.style.display = "flex";
    divBlock.style.display = "block";
    if (window.innerWidth < 1400) {
      mobileBasket.style.display = "flex";
      mobileBasketSticky.style.position = "fixed";
      footer.style.paddingBottom = "60px";
      mobileBasketSticky.style.display = "block";
      btnCloseMobileBasket.style.display = "none";
      startPosition = window.innerHeight - 60 + "px";
      mobileBasketSticky.style.bottom = "60px";
      //mobileBasketSticky.style.top = "calc((var(--vh, 1vh) * 100) - 60px)";
      mobileBasketHeaderWr.style.width = "100%";
      mobileBasketHeaderImg.style.display = "none";
      console.log(mobileBasketSticky.getBoundingClientRect().top);
      mobileBasketTrue = true;
    }
    if (window.innerWidth < 800) {
      btnCloseModal.style.display = "block";
      modal.style.animation = "modal 0.7s forwards";
      auxiliary.style.display = "block";
      btnCloseModal.style.animation = "modal 0.7s forwards";
      modal.style.overflow = "auto";
      modalFooter.style.display = "flex";
    } else {
      modal.style.animation = "zoom 0.7s forwards";
      //btnCloseModal.style.animationDelay = "0.7s";
      setTimeout(() => {
        btnCloseModal.style.display = "block";
        modalFooter.style.display = "flex";
        btnCloseModal.style.animation = "zoom 0.3s forwards";
        modalFooter.style.animation = "zoom 0.3s forwards";
      }, 400);
      //document.querySelector(".asideMenu__ul").style.position = "fixed";
      //document.querySelector(".asideMenu__ul").style.top = ;
    }

    main.style.overflow = "hidden";
    menu.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  });
}
/*----------------------Close modal window------------------------*/

function closeModal() {
  modalTrue = false;
  divBlock.style.display = "none";
  btnCloseModal.style.display = "none";
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
  } else if (window.innerWidth < 1400) {
    asideMenuUl.style.position = "sticky";
    header.style.top = 0;
    header.style.position = "sticky";
    modal.style.animation = "zoomBack 0.7s forwards";
  } else {
    modal.style.animation = "zoomBack 0.7s forwards";
    asideMenuUl.style.position = "sticky";
  }
  timerId = setTimeout(() => {
    modal.style.display = "none";
  }, 800);
}

divBlock.addEventListener("click", (e) => {
  console.log(e.target);
  closeModal();
});
const modalsCloses = document.querySelectorAll(".modal__close");
for (let modalClose of modalsCloses) {
  modalClose.addEventListener("click", () => {
    closeModal();
  });
}
/*-----------------------Add topping--------------------------------
const btnModalOrder = document.querySelector(".modal__order_button");
btnModalOrder.addEventListener("click", () => {
  closeModal();
});
-*/
function hiddenOverflow() {
  main.style.overflow = "hidden";
  menu.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}
function unsetOverflow() {
  main.style.overflow = "unset";
  menu.style.overflow = "unset";
  document.body.style.overflow = "unset";
}
/*-------------------------Open mobile basket-------------------------------*/
function openMobileBasketFunc() {
  /*document.body.style.overflow = "hidden";
  mobileBasket.style.display = "flex";*/
  if (!touchTrue) {
    mobileBasketSticky.style.top = window.innerHeight - 60 + "px";
  }
  yDiff = 0;
  full = 0;
  hiddenOverflow();
  mobileBasketHeaderPrice.style.display = "none";
  btnCloseMobileBasket.style.display = "block";
  console.log(mobileBasketSticky.style.bottom);
  console.log(mobileBasketSticky.style.top);
  console.log(startPosition);
  //mobileBasketSticky.style.position = "unset";
  /*mobileBasketOpen.style.animation = "mobileBasket 0.7s forwards";
  mobileBasketFooter.style.animation = "mobileBasket 0.7s forwards";
  mobileBasketSticky.style.top = 0;
  mobileBasketHeaderImg.style.display = "block";
  mobileBasketFooter.style.position = "fixed";
  mobileBasketFooter.style.bottom = 0;
  mobileBasketFooter.style.right = 0;*/
  if (window.innerWidth > 800) {
    mobileBasketHeaderWr.style.width = "50%";
    mobileBasketHeader.style.justifyContent = "end";
  }
  /*mobileBasketOpen.style.position = "fixed";
  mobileBasketOpen.style.top = 0;*/
  touchTrue = false;
  openMobileBasket.removeEventListener("click", openMobileBasketFunc);
  btnCloseMobileBasket.addEventListener("click", closeMobileBasketFunc);
  mobileBasketSticky.classList.add("transition");
  mobileBasketSticky.classList.add("opened");
  mobileBasketSticky.style.top = 0 + "px";
  startPosition = 0;
  setTimeout(() => {
    mobileBasketSticky.classList.remove("transition");
  }, 400);
}

function closeMobileBasketFunc() {
  //document.body.style.overflow = "unset";
  // mobileBasket.style.display = "none";
  yDiff = 0;
  full = 0;
  console.log(mobileBasketSticky.style.top);
  startPosition = window.innerHeight - 60 + "px";
  mobileBasketSticky.style.top = startPosition;

  console.log(mobileBasketSticky.style.top);
  mobileBasketHeaderPrice.style.display = "block";
  //mobileBasketHeaderImg.style.display = "none";
  mobileBasketHeaderWr.style.width = "100%";
  btnCloseMobileBasket.style.display = "none";
  /*mobileBasketSticky.style.position = "fixed";
  mobileBasketOpen.style.top = "unset";
  mobileBasketOpen.style.animation = "closeMobileBasket 0.7s linear";
  mobileBasketFooter.style.animation = "closeMobileBasketFooter 0.7s linear";
  mobileBasketSticky.style.top = "unset";
  mobileBasketSticky.style.bottom = "60px";*/
  //setTimeout(() => {
  //mobileBasketOpen.style.position = "unset";
  // mobileBasketFooter.style.position = "unset";
  //}, 700);

  mobileBasketSticky.classList.add("transition");
  mobileBasketSticky.classList.remove("opened");

  setTimeout(() => {
    mobileBasketSticky.style.top = "unset";
    unsetOverflow();
    openMobileBasket.addEventListener("click", openMobileBasketFunc);
    mobileBasketSticky.classList.remove("transition");
    mobileBasketSticky.style.bottom = "60px";
  }, 400);
}

const openMobileBasket = document.querySelector(".mobileBasket__header");
openMobileBasket.addEventListener("click", openMobileBasketFunc); /*
()=>{
  /*if(mobileBasketSticky.classList.contains("opened")){
    closeMobileBasketFunc();

  } else {
*/
//openMobileBasketFunc();
/*
  }*/
//});

/*------------------------Close mobile basket----------------------------*/
btnCloseMobileBasket.addEventListener("click", closeMobileBasketFunc);

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
    if (window.innerWidth < 1400) {
      mobileBasket.style.display = "flex";
      mobileBasketSticky.style.position = "fixed";
      footer.style.paddingBottom = "60px";
      mobileBasketSticky.style.display = "block";
      btnCloseMobileBasket.style.display = "none";
      startPosition = window.innerHeight - 60 + "px";
      mobileBasketSticky.style.bottom = "60px";
      //mobileBasketSticky.style.top = "calc((var(--vh, 1vh) * 100) - 60px)";
      mobileBasketHeaderWr.style.width = "100%";
      mobileBasketHeaderImg.style.display = "none";
      mobileBasketTrue = true;
    } /*else if (window.innerWidth < 1400) {
      document.querySelector(".add__order_tablet").style.display = "flex";
    }*/
    let currentCard = e.currentTarget.closest(".list_item");
    let currentBtnAdd = currentCard.querySelector(".card__button");
    let currentBtnCount = currentCard.querySelector(".card__button_count");
    currentBtnAdd.style.display = "none";
    currentBtnCount.style.display = "flex";

    /* buttonAdd[i].style.display = "none";
    cardCount[i].style.display = "flex";*/
  });
}

//-------------------------Choose topping------------------------------------//
for (let toppingLabel of toppingLabels) {
  toppingLabel.addEventListener("click", (e) => {
    let currentTopping = e.currentTarget.closest(".topping__card");
    let currentToppingCheck = currentTopping.querySelector(
      ".topping__check_img"
    );
    currentToppingCheck.classList.toggle("topping__check_active");
  });
}

//--------------------------Add to basket from modal window-------------------//
const btnAddOnModal = document.querySelector(".modal__order_button");
btnAddOnModal.addEventListener("click", () => {
  btnAddOnModal.style.display = "none";
  const btnCountModal = document.querySelector(".modal__button_count");
  btnCountModal.style.display = "flex";
});

//-------------------------Open basket-----------------------------------------//
// const toBasket = document.querySelector(".add__order");

//mobileBasket.addEventListener("click", () => {});

// document.querySelector(".add__order").style.display = "block";
// document.querySelector(".add__order_tablet").style.display = "flex";

//--------------Добавление/снятие прозрачности у мобильного меню-------------------//

window.addEventListener("scroll", function () {
  const menu_h2top = menu__h2.getBoundingClientRect().top;
  const footerCopTop = footerCopyright.getBoundingClientRect().top;
  const mobileBasketTop = mobileBasketSticky.getBoundingClientRect().top;
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

/*--------------------------Choose delivery/takeaway--------------------------*/


const btnDelivery = document.querySelectorAll(".basket__delivery__item");
btnDelivery.forEach((currentBtnDelivery) => {
  currentBtnDelivery.addEventListener("click", btnDeliveryClick);
});
const inputsDelivery = document.querySelectorAll(".basket__delivery_input");
inputsDelivery.forEach((inputDelivery) => {
  inputDelivery.addEventListener("click", (ev) => {
    ev.stopPropagation();
  })
})

  function btnDeliveryClick(e) {
    let wrapp;
    console.log(e);
    let currentBtn = e.currentTarget.closest(".basket__delivery__item");
    console.log(currentBtn);
    if (window.innerWidth < 1400) {
      wrapp = currentBtn.closest(".mobileBasket__delivery__wrapper");
      console.log("mobile");
    }
    else {
      wrapp = currentBtn.closest(".deskBasket__delivery__wrapper");
      console.log("desk");
    }
    console.log(wrapp);
    let hoverActive = wrapp.querySelector(".hovering_active");
    let currentTypeDelivery = currentBtn.querySelector(
      ".basket__delivery_input"
    ).id;
    if (currentTypeDelivery === "takeaway") {
      hoverActive.classList.remove("hover__active_left");
      hoverActive.classList.add("hover__active_right");
    } else {
      hoverActive.classList.remove("hover__active_right");
      hoverActive.classList.add("hover__active_left");
    }
    document.querySelectorAll(".basket__delivery__item").forEach((el) => {
      el.classList.remove("basket__delivery_active");
    });
    currentBtn.classList.add("basket__delivery_active");
  }


/*


for (let t = 0; t < btnDelivery.length; t++) {
  btnDelivery[t].addEventListener("click", (e) => {
    console.log(btnDelivery.length);
    console.log(t);
    let currentDeliveryBtn = e.currentTarget.closest(
      ".basket__delivery__item"
    );
      console.log(currentDeliveryBtn);
    let wrapp;
    if (window.innerWidth < 1400) {
      wrapp = currentDeliveryBtn.closest(".mobileBasket__delivery__wrapper");
      console.log("mobile");
    }
    else {
      wrapp = currentDeliveryBtn.closest(".deskBasket__delivery__wrapper");
      console.log("desk");
    }
    console.log(wrapp);
    let hoverActive = wrapp.querySelector(".hovering_active");
    let currentTypeDelivery = currentDeliveryBtn.querySelector(
      ".basket__delivery_input"
    ).id;
    if (currentTypeDelivery === "takeaway") {
      hoverActive.classList.remove("hover__active_left");
      hoverActive.classList.add("hover__active_right");
    } else {
      hoverActive.classList.remove("hover__active_right");
      hoverActive.classList.add("hover__active_left");
    }
    document.querySelectorAll(".basket__delivery__item").forEach((el) => {
      el.classList.remove("basket__delivery_active");
    });
    currentDeliveryBtn.classList.add("basket__delivery_active");
  });
}*/
/*
const btnDeliverys = document.querySelectorAll(
  ".desktopBasket__delivery__item"
);
for (let t = 0; t < btnDeliverys.length; t++) {
  btnDeliverys[t].addEventListener("click", (e) => {
    let currentDeliverys = e.currentTarget.closest(
      ".desktopBasket__delivery__item"
    );
    let wrapp = e.currentTarget.closest(".deskBasket__delivery__wrapper");
    let currentTypeDelivery = currentDeliverys.querySelector(
      ".deskBasket__delivery_input"
    ).id;
    let hoverActive = wrapp.querySelector(".hovering_active");
    if (currentTypeDelivery === "takeaway") {
      hoverActive.classList.remove("hover__active_left");
      hoverActive.classList.add("hover__active_right");
    } else {
      hoverActive.classList.remove("hover__active_right");
      hoverActive.classList.add("hover__active_left");
    }
    document
      .querySelectorAll(".desktopBasket__delivery__item")
      .forEach((el) => {
        el.classList.remove("basket__delivery_active");
      });
    e.currentTarget.classList.add("basket__delivery_active");
  });
}
*/
//---------------------------Scroll menu-------------------------------------------------

function scrollAsideMenu() {
  for (i = 0; i < menuCat.length; i++) {
    let menuCatTop = menuCat[i].getBoundingClientRect().top;
    if (menuCatTop < 151) {
      let currentLabelsAside = document.querySelectorAll(".asideMenu__label");
      currentLabelsAside.forEach((label) => {
        label.classList.remove("category_active");
      });
      let categoryId = menuCat[i].getAttribute("data-name");
      currentMenuCat = document.getElementById(categoryId);
      currentMenuCat.classList.add("category_active");

      let currentLabelAside = document.querySelector(
        "label.asideMenu__label[for=" + categoryId + "]"
      );
      currentLabelAside.classList.add("category_active");
      let currentLabelsMobileNav = document.querySelectorAll(".nav__label");
      currentLabelsMobileNav.forEach((label) => {
        label.classList.remove("nav__label_active");
      });
      let currentLabelMobileNav = document.querySelector(
        "label.nav__label[data-name=" + categoryId + "]"
      );
      currentLabelMobileNav.classList.add("nav__label_active");
      let scrollMenuRight = currentLabelMobileNav.getBoundingClientRect().left;
      let scrollMenuLeft = currentLabelMobileNav.getBoundingClientRect().right;
      let mobileNav = document.querySelector(".menu__mobile_nav");
      if (scrollMenuLeft > window.innerWidth) {
        mobileNav.scrollLeft += scrollMenuLeft - window.innerWidth + 10;
      }
      if (scrollMenuRight < 1) {
        mobileNav.scrollLeft = scrollMenuRight - 10;
      }
    }
  }
}

const menuList = document.querySelector(".menu__list");
const menuCat = document.querySelectorAll(".menu__cat");
window.addEventListener("scroll", scrollAsideMenu);

//------------------swipe basket delivery--------------------------
(function toggleDelivery() {
  let hoverActiveSwipe = document.querySelector(
    ".mobileBasket__delivery__wrapper .hovering_active"
  );
  let touch = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    moved: false,
  };

  hoverActiveSwipe.addEventListener("touchstart", (e) => {
    e.stopImmediatePropagation(); // Resolves error: [Intervention] Ignored attempt to cancel a touchend event with cancelable=false, for example because scrolling is in progress and cannot be interrupted.
    touch.start.x = e.touches[0].pageX;
    touch.start.y = e.touches[0].pageY;
  });

  hoverActiveSwipe.addEventListener("touchmove", (e) => {
    touch.end.x = e.touches[0].pageX;
    touch.end.y = e.touches[0].pageY;
    touch.moved = true;
  });

  hoverActiveSwipe.addEventListener("touchend", function (e) {
    e.preventDefault(); // Prevent click event since e.stopImmediatePropagation() doesn't affect it
    const x = touch.start.x - touch.end.x;
    const y = touch.start.y - touch.end.y;
    if (
      touch.end.x &&
      Math.abs(x) > this.offsetWidth / 2 &&
      Math.abs(x) / 2 > Math.abs(y)
    ) {
      // Angle is no more than 45 degrees off of swipe left/right
      this.checked = !!(x < 0);
      let items = document.querySelectorAll(".basket__delivery__item");
      if (
        (x < 0 && !items[1].classList.contains("basket__delivery_active")) ||
        (x > 0 && !items[0].classList.contains("basket__delivery_active"))
      ) {
        document
          .querySelector(
            ".basket__delivery__item:not(.basket__delivery_active)"
          )
          .click();
      }
    } else if (
      !touch.moved ||
      document.elementFromPoint(touch.end.x, touch.end.y) === this
    ) {
      // Simulate "click" with a "tap"
      this.checked = !this.checked;
    }

    // Reset
    touch = {
      start: { x: 0, y: 0 },
      end: { x: 0, y: 0 },
      moved: false,
    };
    //output.textContent = ~~this.checked;
  });

  // Click listener after touch to ensure touch and click aren't being fired;
  // hence the `e.preventDefault` (should have been e.stopImmediatePropagation()) on the touchend listener
  /*hoverActiveSwipe.addEventListener("click", (e) => {
    output.textContent = ~~e.target.checked;
  });*/
})();

//--------------------------choose category menu for mobile--------------------

let currentLiMobileNav = document.querySelectorAll(".nav__li");
let currentLabelsMobileNav = document.querySelectorAll(".nav__label");
currentLiMobileNav.forEach((elemLiAside) => {
  //снимать прослушку скролла для навигации
  let topCurrentMenuCat = 0;
  elemLiAside.addEventListener("click", () => {
    window.removeEventListener("scroll", scrollAsideMenu);
    currentLabelsMobileNav.forEach((label) => {
      label.classList.remove("nav__label_active");
    });

    let elemLabelAside = elemLiAside.querySelector(".nav__label");

    let elemLeft = elemLabelAside.getBoundingClientRect().right;
    let elemRight = elemLabelAside.getBoundingClientRect().left;
    let mobileNav = document.querySelector(".menu__mobile_nav");
    let previousScroll = window.scrollY;
    if (elemLeft > window.innerWidth) {
      mobileNav.scrollLeft += elemLeft - window.innerWidth + 10;
    }
    if (elemRight < 1) {
      mobileNav.scrollLeft = elemRight - 10;
    }
    elemLabelAside.classList.add("nav__label_active");
    elemLabelAside.classList.add("transition");
    let categoryId = elemLabelAside.getAttribute("data-name");
    let currentMenuCat = document.querySelector(
      '.menu__cat[data-name="' + categoryId + '"]'
    );
    topCurrentMenuCat = currentMenuCat.getBoundingClientRect().top;
    window.scrollBy({
      top: topCurrentMenuCat - 150,
      behavior: "smooth",
    });

    let timerId = setInterval(() => {
      console.log(previousScroll);
      let currentScroll = window.scrollY;
      if (previousScroll === currentScroll) {
        window.addEventListener("scroll", scrollAsideMenu);
        elemLabelAside.classList.remove("transition");
        clearInterval(timerId);
      } else {
        previousScroll = currentScroll;
      }
    }, 50);
  });
});

//--------------------------choose category menu for tablet/desktop--------------------
let currentLabelsAside = document.querySelectorAll(".asideMenu__label");
currentLabelsAside.forEach((label) => {
  label.addEventListener("click", () => {
    window.removeEventListener("scroll", scrollAsideMenu);
    currentLabelsAside.forEach((lbl) => {
      lbl.classList.remove("category_active");
    });
    label.classList.add("category_active");
    let currentId = label.getAttribute("for");
    console.log(currentId);
    let currentMenuCat = document.querySelector(
      '.menu__cat[data-name="' + currentId + '"]'
    );
    let topCurrentMenuCat = currentMenuCat.getBoundingClientRect().top;
    if (window.innerWidth > 1400) {
      topCurrentMenuCat = topCurrentMenuCat;
    } else {
      topCurrentMenuCat = topCurrentMenuCat - 75;
    }
    window.scrollBy({
      top: topCurrentMenuCat,
      behavior: "smooth",
    });
    setTimeout(() => {
      window.addEventListener("scroll", scrollAsideMenu);
    }, 1000);
  });
});

// обработка свайпов
mobileBasketHeader.addEventListener("touchstart", handleTouchStart, false);
mobileBasketHeader.addEventListener("touchmove", handleTouchMove, false);
mobileBasketHeader.addEventListener("touchend", handleTouchEnd, false);

function handleTouchStart(event) {
  touchTrue = true;
  hiddenOverflow();
  console.log(startPosition);
  mobileBasketSticky.style.top = startPosition;
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function handleTouchMove(event) {
  if (!x1 || !y1) {
    return false;
  }
  let x2 = event.touches[0].clientX;
  let y2 = event.touches[0].clientY;
  xDiff = x1 - x2;
  yDiff = y1 - y2;
  x1 = x2;
  y1 = y2;
  full += yDiff;
  let positionBasket = mobileBasketFooter.style.bottom;
  positionBasket = positionBasket.slice(0, -2);

  if (full > 10) {
    mobileBasketSticky.classList.remove("opened");
  }
  let newPosition = parseInt(mobileBasketSticky.style.top) - yDiff;
  console.log(newPosition);
  if (window.innerHeight - 60 > y2 && y2 > 0) {
    console.log(menu.style.overflow);
    console.log("here");
    mobileBasketSticky.style.top = y2 + "px";
  }
  console.log(mobileBasketSticky.style.bottom);
  console.log(mobileBasketSticky.style.top);
}
/*console.log(positionBasket);
  var currentBottom = -window.innerHeight + (60 - yDiff) + "px";
  if (positionBasket > window.innerHeight / 2) {
    var animation = mobileBasketOpen.animate(
      [
        {
          transform: "translateY(0)", //positionBasket - bottom open
        },

        {
          transform: `translateY(${currentBottom})`,
        },
      ],
      {
        duration: 1000,
      }
    );
    animation.addEventListener("finish", function () {
      mobileBasketOpen.style.transform = `translateY(${currentBottom})`;
    });*/
/* positionBasket = window.innerHeight - positionBasket;
    mobileBasketSticky.style.position = "unset";
    mobileBasketOpen.style.position = "fixed";
    mobileBasketOpen.style.bottom = positionBasket;

    mobileBasketOpen.classList.add("mobileBasket_open_open");*/
/*}
  console.log(mobileBasketSticky.style.bottom);
  mobileBasketSticky.style.bottom = 60 - yDiff + "px";
  console.log(60 + yDiff);
}*/

function handleTouchEnd(event) {
  if (Math.abs(full) < 5) {
    unsetOverflow();
    return;
  }

  /* mobileBasketSticky.classList.add("transition");
  setTimeout(()=>{
    mobileBasketSticky.classList.remove("transition");
  }, 700);
*/
  if (yDiff > 0) {
    hiddenOverflow();
    console.log("!!!!!");
    openMobileBasketFunc();
    /*  mobileBasketSticky.style.bottom = window.innerHeight + "px";
    mobileBasketSticky.classList.add("opened");*/
  } else {
    closeMobileBasketFunc();

    /*
    mobileBasketSticky.style.bottom = 60 + "px";
    mobileBasketSticky.classList.remove("opened");*/
  }
  /*let current = currentBottom;
  let positionBasket = mobileBasketSticky.style.bottom;
  positionBasket = positionBasket.slice(0, -2);
  console.log(positionBasket);
  if (positionBasket > 70) {
    var animation1 = mobileBasketOpen.animate(
      [
        {
          transform: "translateY(0)", //positionBasket - bottom open
        },

        {
          transform: `translateY(${current})`,
        },
      ],
      {
        duration: 1000,
      }
    );
    animation1.addEventListener("finish", function () {
      mobileBasketOpen.style.transform = `translateY(${currentBottom})`;
    });
    //mobileBasketSticky.style.position = "unset";
    /*positionBasket = window.innerHeight - positionBasket;
    mobileBasketSticky.style.position = "unset";
    mobileBasketOpen.style.top = positionBasket;
    mobileBasketOpen.classList.add("mobileBasket_open_open");*/
}

/*---------------All parameters------------------------

totalCount  //Общее количество заказанных позиций*/

function renderModal() {
  let modalH2 = modal.querySelector(".modal__h2");
  modalH2.textContent = "NewContent";
}

class order {
  render(data) {
    let {basket, delivery, customerInfo} = data;
    let {typeDelivery, priceDelivery, orderPriceForFree} = delivery;
    let currentBasket;

    //Прорисовка типа и цены доставки в корзине---------------------------------
    if (window.innerWidth < 1400) {
      currentBasket = document.querySelector(".mobileBasket");
    }
    else {
      currentBasket = document.querySelector(".deskBasket");
    }
    let currentDelivery = currentBasket.querySelector(".hovering_active");   
    let deliveryItem = currentBasket.querySelectorAll(".basket__delivery__item");
    deliveryItem.forEach((delivery) => {
      delivery.classList.remove("basket__delivery_active");
    });    
    if (typeDelivery === "takeaway") {
      currentDelivery.classList.add("hover__active_right");
      deliveryItem[1].classList.add("basket__delivery_active");
    } 
    else {
      currentDelivery.classList.add("hover__active_left");
      deliveryItem[0].classList.add("basket__delivery_active");
    }
    //-----------------------------------------------------------------------

    let {idCategory, cards} = basket;
    let totalCheck = 0;
    const fragment = document.createDocumentFragment();
    console.log(currentBasket);
    const basketCard = currentBasket.querySelector(".basketTemp");
    cards.forEach((item) => {
      const cardClone = basketCard.content.cloneNode(true);
      console.log(cardClone);
      if (cardClone !== null) {
        cardClone.querySelector(".basket__card").dataset.id = item.id;
        cardClone.querySelector(".basket__card_img").src = item.card.img;
        cardClone.querySelector(".basket__h3").textContent =
          item.card.name;
        cardClone.querySelector(".basket__weight").textContent =
          item.card.weight;
        cardClone.querySelector(".basket__price").textContent = item.card.price;
        totalCheck += item.card.price * item.card.quantity;
        let currentMinus = cardClone.querySelector(".count_minus");
        let currentCount = cardClone.querySelector(".input_text");
        let currentPlus = cardClone.querySelector(".count_plus");
        currentCount.dataset.id = item.id;
        currentMinus.dataset.id = item.id;
        currentPlus.dataset.id = item.id;
        currentPlus.addEventListener("click", countPlus(currentCount));
        currentMinus.addEventListener("click", countMinus(currentCount));
        cardClone.querySelector(".input_text").value = item.card.quantity;
        fragment.append(cardClone);
      }
    });
    
    let deliveryPrice = currentBasket.querySelector(".priceDelivery");
    let checKForFree = currentBasket.querySelector(".check_forFreeDelivery")
    if (totalCheck >= orderPriceForFree) {
      deliveryPrice.textContent = 0;
      checKForFree.textContent = 0;
      priceDelivery = 0;
    }
    else {
      deliveryPrice.textContent = priceDelivery;
      checKForFree.textContent = orderPriceForFree - totalCheck;
    }
    let currentBasketMenu = currentBasket.querySelector(".basket__menu");
    currentBasketMenu.innerHTML = "";
    currentBasketMenu.appendChild(fragment);
    document.querySelector(".mobileBasket__header_price").textContent =
      totalCheck ;
      currentBasket.querySelector(".totalCheck").textContent = totalCheck + priceDelivery;
  }

  load() {
    class Loader {
      constructor(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
      }

      errorHandler(res) {
        if (!res.ok) {
          if (res.status === 401 || res.status === 404)
            console.log(
              `Sorry, but there is ${res.status} error: ${res.statusText}`
            );
          throw Error(res.statusText);
        }
        return res;
      }

      load() {
        fetch(url, "GET")
          .then(this.errorHandler)
          .then((res) => res.json())
          .then((data) => () => {
            const basket = JSON.parse(data);
            render(basket);
          })
          .catch((err) => console.error(err));
      }
    }
  }

  save(data) {
    console.log(data);
  }
}
