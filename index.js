window.onload = init;
function init() {
  let toppingActive = [];
  let mobileBasketTrue = false;
  var basketOpen = true;
  var data;
  let x1 = null;
  let y1 = null;
  let xDiff = 0;
  let yDiff = 0;
  let full = 0;
  let touchTrue = false;

  const auxiliary = document.querySelector(".auxiliary");
  const header = document.querySelector(".header");
  const footer = document.querySelector(".footer");
  const menu = document.querySelector(".menu");
  const menuMobileNav = document.querySelector(".menu__mobile_nav");
  const modal = document.querySelector(".modal");
  const main = document.querySelector(".main");
  const menuH2 = document.querySelector(".menu__h2");
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
  let toppingLabels;
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
  const mobileBasketHeaderWr = document.querySelector(
    ".mobileBasket__header_wr"
  );
  const divBlock = document.querySelector(".block");
  const inputs = document.querySelectorAll(".input_text");
  console.log(inputs);
  let modalTrue = false;
  let basketTrue = false;
  let scrollTrue = true;
  let startPosition =
    window.innerHeight - parseInt(mobileBasketSticky.style.bottom) + "px";

  function renderButton() {
    for (let itemMenu of allMenu) {
      if (itemMenu.id === "dish" + itemCard.id) {
      }
    }
  }
  inputs.forEach((input) => {
    input.addEventListener("change", inputChange);
  });

  function inputChange(e) {
    console.log(e);
    let dishID = e.currentTarget.dataset.id;
    currentElementId = parseInt(dishID.split("").splice(4).join(""));
    console.log(dishID);
    console.log(currentElementId);
    console.log(data.basket);
    const currentCard = data.basket.find(
      (card) => card.id === parseInt(currentElementId)
    );
    if (e.currentTarget.value < 1) {
      e.currentTarget.value = 1;
      let minus = e.currentTarget.closest(".button__count").querySelector(".count_minus");
      console.log(minus);
      minus.click();
    } else {
      currentCard.card.quantity = e.currentTarget.value;
      renderData(dishID);
    }
  }
  // input change
  /*
function inputOnchange(count) {
  console.log(data);
 let dishID = count.dataset.id;
 currentElementId = parseInt(
  dishID.split("").splice(4).join("")
);
console.log(dishID);
console.log(currentElementId);
console.log(data.basket);
 const currentCard = data.basket.find(
  (card) => card.id === parseInt(currentElementId)
);
currentCard.card.quantity = count.value;
renderData(dishID);
}
inputs.forEach((input) => {
input.onchange = inputOnchange(input);
});

/*
inputs.forEach((input) => {
  input.addEventListener("onchange", inputOnchange(input));
})
*/

  //--------------------  Плюс/минус в меню-------------------//

  function countPlus(count) {
    return function () {
      if (count.value < 999) {
        let currentElementId = count.dataset.id;
        console.log(count);
        let cards = document.querySelectorAll(
          '.input_text[data-id="' + currentElementId + '"]'
        );

        currentElementId = parseInt(
          currentElementId.split("").splice(4).join("")
        );
        console.log(currentElementId);
        const card = data.basket.find(
          (card) => card.id === parseInt(currentElementId)
        );
        console.log(card);
        card.card.quantity++;
        cards.forEach((item) => {
          item.value = card.card.quantity;
        });
        console.log(card.card.quantity);

        renderData(count.dataset.id);
      }
    };
  }

  function countMinus(count) {
    return function () {
      let currentElementId = count.dataset.id;
      currentElementId = parseInt(
        currentElementId.split("").splice(4).join("")
      );
      let currCard;
      // if (count.closest(".basket__card")) {
      currCard = data.basket.find(
        (card) => card.id === parseInt(currentElementId)
      );

      console.log(count);
      console.log(currCard);
      // }
      let indexCard = data.basket.indexOf(currCard);
      console.log(indexCard);
      if (count.value > 1) {
        let cards = document.querySelectorAll(
          '.input_text[data-id="' + count.dataset.id + '"]'
        );
        currCard.card.quantity--;
        cards.forEach((item) => {
          item.value = currCard.card.quantity;
        });
      } else if (count.value === "1") {
        data.basket.splice(indexCard, 1);
        console.log(data.basket);
        let currentCards = document.querySelectorAll(
          '.list_item[data-id="' + count.dataset.id + '"]'
        );
        currentCards.forEach((currentCard) => {
          currentCard.querySelector(".card__button").style.display = "block";
          currentCard.querySelector(".card__button_count").style.display =
            "none";
        });
        if (modalTrue) {
          modalFooter.querySelector(".modal__order_button").style.display =
            "block";
          modalFooter.querySelector(".modal__button_count").style.display =
            "none";
        }
        let currentCard = document.querySelector(
          '.basket__card[data-id="' + count.dataset.id + '"]'
        );
        currentCard.remove();
        //проверка на пустую корзину
      }
      renderData(count.dataset.id);
    };
  }

  for (let buttonCount of buttonsCount) {
    console.log(buttonCount);
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
      let dishId;
      dishId = imgClick.closest(".list_item").dataset.id;
      renderModal(menuData, dishId, e.currentTarget);
      modalTrue = true;
      modal.style.display = "flex";
      divBlock.style.display = "block";

      if (window.innerWidth < 800) {
        btnCloseModal.style.display = "block";
        modal.style.animation = "modal 0.7s forwards";
        auxiliary.style.display = "block";
        btnCloseModal.style.animation = "modal 0.7s forwards";
        modal.style.overflow = "auto";
        modalFooter.style.display = "flex";
      } else {
        modal.style.animation = "zoom 0.7s forwards";
        setTimeout(() => {
          btnCloseModal.style.display = "block";
          modalFooter.style.display = "flex";
          btnCloseModal.style.animation = "zoom 0.3s forwards";
          modalFooter.style.animation = "zoom 0.3s forwards";
        }, 400);
        //document.querySelector(".asideMenu__ul").style.position = "fixed";
        //document.querySelector(".asideMenu__ul").style.top = ;
      }

      if (data.basket.length !== 0) {
        if (window.innerWidth < 1400) {
          mobileBasket.style.display = "flex";
          mobileBasketSticky.style.position = "fixed";
          footer.style.paddingBottom = "60px";
          mobileBasketSticky.style.display = "block";
          btnCloseMobileBasket.style.display = "none";
          startPosition = window.innerHeight - 60 + "px";
          mobileBasketSticky.style.bottom = "60px";
          mobileBasketHeaderWr.style.width = "100%";
          mobileBasketHeaderImg.style.display = "none";
          mobileBasketTrue = true;
        }
      }
      main.style.overflow = "hidden";
      menu.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      console.log(toppingLabels);

      //toggle toppings
      for (let toppingLabel of toppingLabels) {
        console.log(toppingLabel);
        toppingLabel.addEventListener("click", (e) => {
          console.log(e.currentTarget);
          console.log(e.currentTarget.closest(".modal").dataset.id);
          let currentTopping = e.currentTarget.closest(".topping__card");
          let currentToppingCheck = currentTopping.querySelector(
            ".topping__check_img"
          );
          let toppingID = toppingLabel.getAttribute("for");
          toppingID = parseInt(toppingID.split("").splice(7).join(""));
          console.log(toppingID);
          const cardID = parseInt(dishId.split("").splice(4).join(""));

          const dataCard = data.basket.find((item) => item.id === cardID);
          if (dataCard) {
            let indexTopping = dataCard.card.toppings.find(
              (item) => item.id === toppingID
            );
            let toppingPrice = parseInt(
              e.currentTarget.querySelector(".topping__price_number")
                .textContent
            );
            indexTopping = dataCard.card.toppings.indexOf(indexTopping);
            console.log(indexTopping);
            const topping = dataCard.card.toppings;
            console.log(topping);
            if (
              currentToppingCheck.classList.contains("topping__check_active")
            ) {
              currentToppingCheck.classList.remove("topping__check_active");
              console.log(dataCard.card.toppings);
              dataCard.card.toppings.splice(indexTopping, 1);
              console.log(dataCard.card.toppings);
            } else {
              currentToppingCheck.classList.add("topping__check_active");
              console.log(dataCard.card.toppings);
              let newTopping = {
                id: toppingID,
                price: toppingPrice,
              };
              dataCard.card.toppings.push(newTopping);
              console.log(dataCard.card.toppings);
            }
            renderData(dishId);
          } else {
            currentToppingCheck.classList.toggle("topping__check_active");
          }

          /* currentToppingCheck.classList.toggle("topping__check_active");
          const cardID = parseInt(itemID.split("").splice(4).join());
        */
        });
      }
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
  const modalClose = document.querySelector(".modal__close");

  modalClose.addEventListener("click", () => {
    closeModal();
  });

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
    if (data.basket.length === 0) {
      startPosition = window.innerHeight + "px";
    } else {
      startPosition = window.innerHeight - 60 + "px";
    }

    console.log(mobileBasketSticky.style.top);

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
      //mobileBasketSticky.style.bottom = "60px";
      console.log(data.basket);
      if (data.basket.length === 0) {
        mobileBasketSticky.style.bottom = 0;
      } else {
        mobileBasketSticky.style.bottom = "60px";
      }
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
      let currentCard = e.currentTarget.closest(".list_item");
      renderHeaderBasket(currentCard);
      let dishId = e.currentTarget.closest(".list_item").dataset.id;
      orderBasket.addToBasket(dishId, e.currentTarget);
      /* buttonAdd[i].style.display = "none";
    cardCount[i].style.display = "flex";*/
    });
  }

  function renderHeaderBasket(currentCard) {
    if (window.innerWidth < 1400) {
      mobileBasket.style.display = "flex";
      mobileBasketSticky.style.position = "fixed";
      footer.style.paddingBottom = "60px";
      mobileBasketSticky.style.display = "block";
      btnCloseMobileBasket.style.display = "none";
      startPosition = window.innerHeight - 60 + "px";
      mobileBasketSticky.style.bottom = "60px";
      mobileBasketHeaderWr.style.width = "100%";
      mobileBasketHeaderImg.style.display = "none";
      mobileBasketTrue = true;
    } /*else if (window.innerWidth < 1400) {
      document.querySelector(".add__order_tablet").style.display = "flex";
    }*/
    //let currentCard = e.currentTarget.closest(".list_item");
    let currentBtnAdd = currentCard.querySelector(".card__button");
    let currentBtnCount = currentCard.querySelector(".card__button_count");
    currentBtnAdd.style.display = "none";
    currentBtnCount.style.display = "flex";
  }

  //--------------------------Add to basket from modal window-------------------//
  const btnAddOnModal = document.querySelector(".modal__order_button");
  btnAddOnModal.addEventListener("click", toggleBtnAdd);
  function toggleBtnAdd() {
    const modalID = btnAddOnModal.dataset.id;
    console.log(modalID);
    let cards = document.querySelectorAll(
      '.list_item .input_text[data-id="' + modalID + '"]'
    );
    console.log(modalTrue);
    let toppings = document.querySelectorAll(".topping__check_active");
    if (toppings) {
      toppings.forEach((item) => {
        console.log(item.closest(".topping__label"));
        let toppingID = item.closest(".topping__label").getAttribute("for");
        toppingID = parseInt(toppingID.split("").splice(7).join(""));
        let toppingPrice = parseInt(
          item
            .closest(".topping__label")
            .querySelector(".topping__price_number").textContent
        );
        toppingActive.push({
          id: toppingID,
          price: toppingPrice,
        });
      });
    }
    // let card = cards.find((item) => item.dataset.id === modalID
    orderBasket.addToBasket(modalID, cards[0]);
    renderData(modalID);
    console.log(cards[0]);
    btnAddOnModal.style.display = "none";
    const btnCountModal = document.querySelector(".modal__button_count");
    btnCountModal.style.display = "flex";
    cards.forEach((card) => {
      let currentCard = card.closest(".list_item");
      currentCard.querySelector(".card__button").style.display = "none";
      currentCard.querySelector(".button__count").style.display = "flex";
    });
  }

  //-------------------------Open basket-----------------------------------------//
  // const toBasket = document.querySelector(".add__order");

  //mobileBasket.addEventListener("click", () => {});

  // document.querySelector(".add__order").style.display = "block";
  // document.querySelector(".add__order_tablet").style.display = "flex";

  //--------------Добавление/снятие прозрачности у мобильного меню-------------------//

  window.addEventListener("scroll", function () {
    const menu_h2top = menuH2.getBoundingClientRect().top;
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
    });
  });

  function btnDeliveryClick(e) {
    let wrapp;
    console.log(e);
    let currentBtn = e.currentTarget.closest(".basket__delivery__item");
    console.log(currentBtn);
    if (window.innerWidth < 1400) {
      wrapp = currentBtn.closest(".mobileBasket__delivery__wrapper");
      console.log("mobile");
    } else {
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
    delivery(e.currentTarget);
  }

  function delivery(target) {
    let { deliveries } = menuData;
    console.log(target);
    let currentID = 0;
    const typeDelivery = target.querySelector(".basket__delivery_input").id;
    if (data.delivery.typeDelivery !== typeDelivery) {
      const card = deliveries.find(
        (item) => item.typeDelivery === typeDelivery
      );
      data.delivery.typeDelivery = typeDelivery;
      data.delivery.priceDelivery = card.priceDelivery;
      data.delivery.orderPriceForFree = card.orderPriceForFree;
      console.log(data.basket);
      if (data.basket.length !== 0) {
        currentID = "dish" + data.basket[0].id;
        console.log(currentID);
      }
      renderData(currentID);
      console.log(card);
    }
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
        let scrollMenuRight =
          currentLabelMobileNav.getBoundingClientRect().left;
        let scrollMenuLeft =
          currentLabelMobileNav.getBoundingClientRect().right;
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

  /*---------------All parameters------------------------*/

  function renderData(itemID) {
    let totalCheck = 0;
    let { basket, delivery } = data;
    let { typeDelivery, priceDelivery, orderPriceForFree } = delivery;
    if (basket.length !== 0) {
      let cards = document.querySelectorAll(
        '.input_text[data-id="' + itemID + '"]'
      );

      const cardID = parseInt(itemID.split("").splice(4).join(""));
      const dataCard = basket.find((item) => item.id === cardID);
      if (dataCard) {
        cards.forEach((item) => {
          if (!modalTrue) {
            item.value = dataCard.card.quantity; // изменение value в input
            //let card = item.querySelector(".list_item");
          }
          if (modalTrue) {
            let toppPrice = 0;
            dataCard.card.toppings.forEach((topping) => {
              toppPrice += topping.price;
            });
            modalFooter.querySelector(".modal__old_number").textContent =
              (dataCard.card.priceBeforeDiscount + toppPrice) *
              dataCard.card.quantity;
            modalFooter.querySelector(".modal__total_number").textContent =
              (dataCard.card.price + toppPrice) * dataCard.card.quantity;
            //renderModal(menuData, count.dataset.id, card);
          }

          //modal
          /*
      modalFooter.querySelector(".modal__old_number").textContent =
        (card.priceBeforeDiscount + toppPrice) * currentValue;
      modalFooter.querySelector(".modal__total_number").textContent =
        (card.price + toppPrice) * currentValue;

      //basket

      

     
      currentBasket.querySelector(".totalCheck").textContent =
        totalCheck + priceDelivery;*/
        });
      }

      basket.forEach((element) => {
        console.log(element);
        let toppingPrice = 0;
        element.card.toppings.forEach((topping) => {
          toppingPrice += topping.price;
        });
        console.log(toppingPrice);
        totalCheck +=
          element.card.quantity * (element.card.price + toppingPrice);
        console.log(totalCheck);
      });
    }

    document.querySelector(".mobileBasket__header_price").textContent =
      totalCheck;

    if (window.innerWidth < 1400) {
      currentBasket = document.querySelector(".mobileBasket");
    } else {
      currentBasket = document.querySelector(".deskBasket");
    }
    let deliveryPrice = currentBasket.querySelector(".priceDelivery");
    let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
    console.log(data.delivery);
    if (totalCheck >= orderPriceForFree) {
      deliveryPrice.textContent = 0;
      checKForFree.textContent = 0;
      priceDelivery = 0;
    } else {
      deliveryPrice.textContent = priceDelivery;
      checKForFree.textContent = orderPriceForFree - totalCheck;
    }
    console.log(totalCheck);
    console.log(priceDelivery);
    document.querySelectorAll(".totalCheck").forEach((elem) => {
      elem.textContent = totalCheck + priceDelivery;
    });
  }

  function renderModal(dataLocal, dishId, target) {
    let { dishes, toppings } = dataLocal;
    let toppPrice = 0;
    dishes.forEach((dish) => {
      const card = dish.products.find(
        (product) => "dish" + product.id === dishId
      );
      if (card) {
        const modalWindow = document.querySelector(".modal");
        const modalFav = document.querySelector(".modal__fav");
        const fragmentFav = document.createDocumentFragment();
        const modalFavTemp = document.querySelector(".modalFavTemp");
        modalWindow.dataset.id = "dish" + card.id;
        card.typeDishFav.forEach((itemFav) => {
          const favClone = modalFavTemp.content.cloneNode(true);
          favClone.querySelector(".modal__fav_img").src = itemFav;
          fragmentFav.append(favClone);
        });
        modalFav.innerHTML = "";
        modalFav.appendChild(fragmentFav);
        modalWindow.querySelector(".modal__h2").textContent = card.name;
        const fragmentSwiperModal = document.createDocumentFragment();
        const swiperGalleryModalTemp = document.querySelector(
          ".swiperGalleryModalTemp"
        );
        card.img.forEach((itemimg) => {
          const imgClone = swiperGalleryModalTemp.content.cloneNode(true);
          imgClone.querySelector(".modal__card_img").src = itemimg;
          fragmentSwiperModal.append(imgClone);
        });
        const mySwiperModal = modalWindow.querySelector(
          ".mySwiperModal .swiper-wrapper"
        );
        mySwiperModal.innerHTML = "";
        mySwiperModal.appendChild(fragmentSwiperModal);

        modalWindow.querySelector(".modal__desc").textContent = card.desc;

        const fragmentTopping = document.createDocumentFragment();
        const toppingCardTemp = document.querySelector(".toppingCardTemp");
        const toppingList = modalWindow.querySelector(".topping__list");
        card.toppings.forEach((toppItem) => {
          const cardTopp = toppings.find((item) => item.id === toppItem);
          console.log(cardTopp);
          toppingClone = toppingCardTemp.content.cloneNode(true);
          toppingClone.querySelector(".topping__img").src = cardTopp.img;
          toppingClone.querySelector(".topping__name").textContent =
            cardTopp.name;
          toppingClone.querySelector(".topping__modal_check").id =
            "topping" + cardTopp.id;
          toppingClone
            .querySelector(".topping__label")
            .setAttribute("for", "topping" + cardTopp.id);
          toppingClone.querySelector(".topping__weight_number").textContent =
            cardTopp.weight;
          toppingClone.querySelector(".topping__price_number").textContent =
            cardTopp.price;
          const cardBasket = data.basket.find(
            (cardBasketL) => "dish" + cardBasketL.id === dishId
          );
          console.log(cardBasket);
          if (cardBasket) {
            cardBasket.card.toppings.forEach((cardTopping) => {
              console.log(cardTopping.id);
              if (cardTopping.id === cardTopp.id) {
                toppPrice += cardTopp.price;
                toppingClone
                  .querySelector(".topping__check_img")
                  .classList.add("topping__check_active");
              }
            });
          }

          fragmentTopping.append(toppingClone);
        });
        toppingList.innerHTML = "";
        toppingList.appendChild(fragmentTopping);

        const footerBJU = modalWindow.querySelector(".footer__BJU");
        footerBJU.querySelector(".modal__weight").textContent = card.weight;
        footerBJU.querySelector(
          ".modal__total_energy .modal__BJU_number"
        ).textContent = card.BJU.totalEnergy;
        footerBJU.querySelector(
          ".modal__squirreLS .modal__BJU_number"
        ).textContent = card.BJU.protein;
        footerBJU.querySelector(".modal__fats .modal__BJU_number").textContent =
          card.BJU.fat;
        footerBJU.querySelector(
          ".modal__carbohydrates .modal__BJU_number"
        ).textContent = card.BJU.carbohydrates;
        const modalFooter = document.querySelector(".modal__footer");
        toppingLabels = document.querySelectorAll(".topping__label");
        const currentBTN = target
          .closest(".list_item")
          .querySelector(".card__button");
        const currentValue = target
          .closest(".list_item")
          .querySelector(".input_text").value;
        const btnCount = modalFooter.querySelector(".button__count");
        const modalOrderBtn = modalFooter.querySelector(".modal__order_button");
        const count = modalFooter.querySelector(".input_text");
        const btnMinus = modalFooter.querySelector(".count_minus");
        const btnPlus = modalFooter.querySelector(".count_plus");
        if (currentBTN.style.display === "none") {
          modalFooter.querySelector(".modal__order_button").style.display =
            "none";
          btnCount.style.display = "flex";
          btnCount.querySelector(".input_text").value = currentValue;
          buttonsCount = document.querySelectorAll(".button__count");
        } else {
          modalFooter.querySelector(".modal__order_button").style.display =
            "block";
          btnCount.style.display = "none";
        }
        modalOrderBtn.dataset.id = "dish" + card.id;
        count.dataset.id = "dish" + card.id;
        // count.addEventListener("onchange", inputOnchange(count));
        btnCount.dataset.id = "dish" + card.id;
        btnMinus.dataset.id = "dish" + card.id;
        btnPlus.dataset.id = "dish" + card.id;
        // прорисовываем топпинги

        const cardTopping = data.basket.find(
          (cardBasket) => "dish" + cardBasket.id === dishId
        );
        // прибавляем топпинги

        const cardBasket = data.basket.find(
          (cardBasketL) => "dish" + cardBasketL.id === dishId
        );

        console.log(toppPrice);
        modalFooter.querySelector(".modal__old_number").textContent =
          (card.priceBeforeDiscount + toppPrice) * currentValue;
        modalFooter.querySelector(".modal__total_number").textContent =
          (card.price + toppPrice) * currentValue;
      }
    });
  }

  class order {
    render(data) {
      let { basket, delivery, customerInfo } = data;
      let currentBasket;

      if (Object.keys(delivery).length === 0) {
        let item = menuData.deliveries.find(
          (delivery) => delivery.typeDelivery === "delivery"
        );
        console.log(menuData.deliveries);
        data.delivery.typeDelivery = item.typeDelivery;
        data.delivery.priceDelivery = item.priceDelivery;
        data.delivery.orderPriceForFree = item.orderPriceForFree;
      } else {
        console.log("here");
      }

      let { typeDelivery, priceDelivery, orderPriceForFree } = delivery;
      if (window.innerWidth < 1400) {
        currentBasket = document.querySelector(".mobileBasket");
      } else {
        currentBasket = document.querySelector(".deskBasket");
      }
      let currentDelivery = currentBasket.querySelector(".hovering_active");
      let deliveryItem = currentBasket.querySelectorAll(
        ".basket__delivery__item"
      );
      deliveryItem.forEach((delivery) => {
        delivery.classList.remove("basket__delivery_active");
      });
      if (typeDelivery === "takeaway") {
        currentDelivery.classList.add("hover__active_right");
        deliveryItem[1].classList.add("basket__delivery_active");
      } else {
        currentDelivery.classList.add("hover__active_left");
        deliveryItem[0].classList.add("basket__delivery_active");
      }

      let totalCheck = 0;
      const fragment = document.createDocumentFragment();
      console.log(currentBasket);
      const basketCard = document.querySelector(".basketTemp");
      console.log(basketCard);
      basket.forEach((item) => {
        console.log(basketCard);
        const cardClone = basketCard.content.cloneNode(true);
        console.log(cardClone);
        if (cardClone !== null) {
          cardClone.querySelector(".basket__card").dataset.id =
            "dish" + item.id;
          cardClone.querySelector(".basket__card_img").src = item.card.img;
          cardClone.querySelector(".basket__h3").textContent = item.card.name;
          cardClone.querySelector(".basket__weight").textContent =
            item.card.weight;
          cardClone.querySelector(".basket__price").textContent =
            item.card.price;
          let toppPrice = 0;
          console.log(item);
          if (item.card.toppings) {
            item.card.toppings.forEach((topping) => {
              toppPrice += topping.price;
            });
          }

          totalCheck += (item.card.price + toppPrice) * item.card.quantity;
          let currentMinus = cardClone.querySelector(".count_minus");
          let currentCount = cardClone.querySelector(".input_text");
          let currentPlus = cardClone.querySelector(".count_plus");
          currentCount.dataset.id = "dish" + item.id;
          currentPlus.addEventListener("click", countPlus(currentCount));
          currentCount.addEventListener("change", inputChange);
          currentMinus.addEventListener("click", countMinus(currentCount));
          // currentCount.addEventListener("onchange", inputOnchange(currentCount));
          cardClone.querySelector(".input_text").value = item.card.quantity;
          fragment.append(cardClone);
        }
      });
      let deliveryPrice = currentBasket.querySelector(".priceDelivery");
      let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
      if (totalCheck >= orderPriceForFree) {
        deliveryPrice.textContent = 0;
        checKForFree.textContent = 0;
        priceDelivery = 0;
      } else {
        deliveryPrice.textContent = priceDelivery;
        checKForFree.textContent = orderPriceForFree - totalCheck;
      }
      let currentBasketMenu = currentBasket.querySelector(".basket__menu");
      currentBasketMenu.innerHTML = "";
      currentBasketMenu.appendChild(fragment);
      document.querySelector(".mobileBasket__header_price").textContent =
        totalCheck;
      currentBasket.querySelector(".totalCheck").textContent =
        totalCheck + priceDelivery;
      let allMenu = document.querySelectorAll(".list_item");

      data.basket.forEach((itemCard) => {
        console.log(itemCard.id);
        for (let itemMenu of allMenu) {
          if (itemMenu.dataset.id === "dish" + itemCard.id) {
            if (basket && basketOpen) {
              renderHeaderBasket(itemMenu);
              basketOpen = false;
            }
            itemMenu.querySelector(".card__button").style.display = "none";
            const btnCount = itemMenu.querySelector(".button__count");
            btnCount.style.display = "flex";
            btnCount.querySelector(".input_text").value =
              itemCard.card.quantity;
          }
        }
      });
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
      fetch("orderFree.json" /*, "GET"*/)
        .then(this.errorHandler)
        .then((res) => res.json())
        .then((order) => {
          data = order;
          this.render(data);
        })
        .catch((err) => console.error(err));
    }

    save(data) {
      console.log(data);
    }

    addToBasket(dishId, target) {
      let { basket } = data;
      console.log(target);
      let currentCard = target.closest(".list_item");
      let currentId = parseInt(dishId.split("").splice(4).join(""));
      let currentPriceBeforeDiscount;
      console.log(currentId);
      for (let i = 0; i < menuData.dishes.length; i++) {
        currentPriceBeforeDiscount = menuData.dishes[i].products.find(
          (point) => point.id === parseInt(currentId)
        );
        console.log(currentPriceBeforeDiscount);
        if (currentPriceBeforeDiscount) {
          console.log("true");
          break;
        }
      }

      /*
      menuData.dishes.forEach((item) => {
        console.log(item.products);
          = item.
        
        console.log(currentPriceBeforeDiscount);
      
      });
    */
      console.log(currentPriceBeforeDiscount);
      let currentName =
        currentCard.querySelector(".card__desc_name").textContent;
      let currentImg = currentCard.querySelector(".card__img").src;
      let currentWeight = currentCard
        .querySelector(".card__desc_weight")
        .textContent.split(" ");
      currentWeight = parseInt(currentWeight[0]);
      let currentPrice = parseInt(
        currentCard.querySelector(".desc_price").textContent
      );
      let toppings = document.querySelectorAll(".topping__check_active");
      if (toppings) {
      }
      let elem = {
        id: currentId,
        card: {
          name: currentName,
          img: currentImg,
          weight: currentWeight,
          price: currentPrice,
          priceBeforeDiscount: currentPriceBeforeDiscount.priceBeforeDiscount,
          quantity: 1,
          toppings: toppingActive,
        },
      };
      basket.push(elem);
      // renderData("dish" + elem.id);
      this.render(data);
      toppingActive = [];
      /*
      let { dishes } = menuData;
    console.log(dishId);
        const card = dishes.find(
          (item) => "dish" + item.products.id === dishId
        );
        console.log(card);
  */
    }

    removeFromBasket(count) {
      this.save(data);
      this.render(data);

      if (modalTrue) {
        let cardC = document.querySelector(
          '.list_item[data-id="' + count.dataset.id + '"]'
        );
        renderModal(menuData, count.dataset.id, cardC);
      }
    }
  }

  let orderBasket = new order();
  orderBasket.load();
}
