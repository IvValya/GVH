//window.onload = init;
//function init() {
let customerInfo = undefined;
let typeDeliveryFromBasket = undefined;
const logo = document.querySelector(".logo");
logo.href = linkToFrontpage;
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
const linkToOrderMob = document.querySelector(".mobileBasket__button_order");
const linkToOrderDesk = document.querySelector(".deskBasket__button_order");
linkToOrderMob.href = linkToOrder;
linkToOrderDesk.href = linkToOrder;
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
const buttonOrder = document.querySelectorAll(".button_order");
const mobileBasketHeader = document.querySelector(".mobileBasket__header");
const mobileBasketFooter = document.querySelector(".mobileBasket__footer");
const mobileBasketOpen = document.querySelector(".mobileBasket_open");
const asideMenuUl = document.querySelector(".asideMenu__ul");
const mobileBasketHeaderImg = document.querySelector(
  ".mobileBasket__header_img"
);
const mobileBasketHeaderWr = document.querySelector(".mobileBasket__header_wr");
const divBlock = document.querySelector(".block");
const inputs = document.querySelectorAll(".input_text");
let modalTrue = false;
let basketTrue = false;
let scrollTrue = true;
let startPosition = window.innerHeight;
profileData = {
  isAuth: true,
  name: "Андрей",
  bonus: 500,
  street: 628,
  building: "15",
  corp: "5",
  apt: "168",
  entrance: "2",
  floor: "15",
  intercom: "2304",
};
class basket {
  renderPriceCard() {
    if (data.basket.length !== 0) {
      let allMenu = document.querySelectorAll(".list_item");
      data.basket.forEach((itemCard) => {
        for (let itemMenu of allMenu) {
          let toppPrice = 0;
          if (itemMenu.dataset.id === "dish" + itemCard.id) {
            let currentCard = itemMenu;
            itemCard.card.toppings.forEach((topp) => {
              toppPrice += topp.price;
            });
            currentCard.querySelector(".desc_price").textContent =
              itemCard.card.price + toppPrice;
          }
        }
      });
    }
  }

  convertFromBasket() {
    console.log(data);
    let convertedBasket = [];
    let currentRefreshTime = Date.now();
    let currentTypeDelivery = data.delivery.typeDelivery;
    data.basket.forEach((item) => {
      let currentId = item.id;
      let currentQuantity = item.card.quantity;
      let currentToppingsId = [];
      item.card.toppings.forEach((topping) => {
        currentToppingsId.push(topping.id);
      });
      convertedBasket.push({
        id: currentId,
        quantity: currentQuantity,
        toppingsId: currentToppingsId,
      });
    });
    let convertedData;
    if (customerInfo && typeDeliveryFromBasket === customerInfo.typeDelivery) {
      convertedData = {
        basket: convertedBasket,
        typeDelivery: currentTypeDelivery,
        customerInfo: customerInfo,
        refreshTime: currentRefreshTime,
      };
    } else {
      convertedData = {
        basket: convertedBasket,
        typeDelivery: currentTypeDelivery,
        refreshTime: currentRefreshTime,
      };
    }

    console.log(convertedData);
    return convertedData;
  }

  convertToBasket(currentData) {
    let currBasket = [];
    let currentImg;
    let currentName;
    let currentWeight;
    let currentPrice;
    let currentPriceBeforeDiscount;
    let currentToppings = [];
    for (let t = 1; t < menuData.meals.length; t++) {
      let dish = menuData.meals[t];
      dish.products.forEach((item) => {
        let currentBasketItem = currentData.basket.find(
          (elem) => elem.id === item.id
        );

        if (currentBasketItem) {
          console.log(currentBasketItem);
          currentName = item.name;
          currentImg = item.img[0];
          currentWeight = item.weight;
          if (item.sale_price === 0) {
            currentPrice = item.price;
            currentPriceBeforeDiscount = item.price;
          } else {
            currentPrice = item.sale_price;
            currentPriceBeforeDiscount = item.price;
          }
          if (currentBasketItem.toppingsId.length !== 0) {
            currentBasketItem.toppingsId.forEach((topping) => {
              let currentTopping = menuData.toppings.find(
                (elem) => elem.id === topping
              );
              if (currentTopping) {
                currentToppings.push({
                  id: topping,
                  price: parseInt(currentTopping.price),
                });
              }
            });
          }
          currBasket.push({
            id: currentBasketItem.id,
            card: {
              name: currentName,
              img: currentImg,
              weight: currentWeight,
              price: parseInt(currentPrice),
              priceBeforeDiscount: parseInt(currentPriceBeforeDiscount),
              quantity: currentBasketItem.quantity,
              toppings: currentToppings,
            },
          });
          currentToppings = [];
        }
      });
    }

    data = {
      basket: currBasket,
      delivery: {
        typeDelivery: currentData.typeDelivery,
      },
    };
    console.log(data);
  }

  save() {
    let order = JSON.stringify(this.convertFromBasket());
    console.log(order);
    localStorage.setItem("basket", order);
  }

  render(data) {
    let { basket, delivery } = data;
    let currentBasket;
    if (Object.keys(delivery).length === 0) {
      data.delivery.typeDelivery = "delivery";
    }
    let { typeDelivery } = delivery;
    let priceDelivery;
    if (window.innerWidth < 1450) {
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

    let totalCheck = 0;
    const fragment = document.createDocumentFragment();
    const basketCard = document.querySelector(".basketTemp");
    basket.forEach((item) => {
      const cardClone = basketCard.content.cloneNode(true);
      if (cardClone !== null) {
        cardClone.querySelector(".basket__card").dataset.id = "dish" + item.id;
        cardClone.querySelector(".basket__card_img").src = item.card.img;
        cardClone.querySelector(".basket__h3").textContent = item.card.name;
        cardClone.querySelector(".basket__weight").textContent =
          item.card.weight + " гр.";

        let toppPrice = 0;
        if (item.card.toppings) {
          item.card.toppings.forEach((topping) => {
            toppPrice += topping.price;
          });
        }
        totalCheck += (item.card.price + toppPrice) * item.card.quantity;
        cardClone.querySelector(".basket__price").textContent =
          item.card.price + toppPrice;
        let currentMinus = cardClone.querySelector(".count_minus");
        let currentCount = cardClone.querySelector(".input_text");
        let currentPlus = cardClone.querySelector(".count_plus");
        currentCount.dataset.id = "dish" + item.id;
        currentPlus.addEventListener("click", countPlus(currentCount));
        currentCount.addEventListener("change", inputCountChange);
        currentMinus.addEventListener("click", countMinus(currentCount));
        cardClone.querySelector(".input_text").value = item.card.quantity;
        fragment.append(cardClone);
      }
    });
    let deliveryPrice = currentBasket.querySelector(".priceDelivery");
    let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
    let otherText = currentBasket.querySelector(".other__text");
    if (typeDelivery === "takeaway") {
      currentDelivery.classList.add("hover__active_right");
      deliveryItem[1].classList.add("basket__delivery_active");
      deliveryPrice.textContent = 0;
      priceDelivery = 0;
      otherText.textContent =
        " для скидки " + menuData.delivery_options.takeaway_discount + "%.";
      if (
        totalCheck >=
        parseInt(menuData.delivery_options.takeaway_discount_order_total)
      ) {
        checKForFree.textContent = 0;
        totalCheck =
          (totalCheck *
            (100 - parseInt(menuData.delivery_options.takeaway_discount))) /
          100;
      } else {
        checKForFree.textContent = parseInt(
          menuData.delivery_options.takeaway_discount_order_total - totalCheck
        );
      }
    } else {
      currentDelivery.classList.add("hover__active_left");
      deliveryItem[0].classList.add("basket__delivery_active");
      otherText.textContent = " для бесплатной доставки!";
      if (totalCheck >= menuData.delivery_options.free_delivery_order_total) {
        deliveryPrice.textContent = 0;
        checKForFree.textContent = 0;
        priceDelivery = 0;
      } else {
        priceDelivery = parseInt(menuData.delivery_options.delivery_price);
        deliveryPrice.textContent = priceDelivery;
        checKForFree.textContent =
          parseInt(menuData.delivery_options.free_delivery_order_total) -
          totalCheck;
      }
    }
    totalCheck = Math.ceil(totalCheck);
    let currentBasketMenu = currentBasket.querySelector(".basket__menu");
    currentBasketMenu.innerHTML = "";
    currentBasketMenu.appendChild(fragment);
    document.querySelector(".mobileBasket__header_price").textContent =
      totalCheck;
    currentBasket.querySelector(".totalCheck").textContent =
      totalCheck + priceDelivery;
    let allMenu = document.querySelectorAll(".list_item");
    data.basket.forEach((itemCard) => {
      for (let itemMenu of allMenu) {
        if (itemMenu.dataset.id === "dish" + itemCard.id) {
          if (basket && basketOpen) {
            renderHeaderBasket(itemMenu);
            basketOpen = false;
          }
          itemMenu.querySelector(".card__button").style.display = "none";
          const btnCount = itemMenu.querySelector(".button__count");
          btnCount.style.display = "flex";
          btnCount.querySelector(".input_text").value = itemCard.card.quantity;
        }
      }
    });
    let btnsClear = document.querySelectorAll(".clear");
    btnsClear.forEach((clear) => {
      clear.addEventListener("click", clearFunc);
    });
  }

  loadFreeBasket() {
    data = {
      basket: [],
      delivery: { typeDelivery: "delivery" },
    };
  }

  load() {
    //localStorage.removeItem("basket");
    let currentBasket = localStorage.getItem("basket");
    if (currentBasket) {
      let currentData = JSON.parse(currentBasket);
      console.log(currentData);
      if (currentData.customerInfo !== "undefined") {
        customerInfo = currentData.customerInfo;
      }
      typeDeliveryFromBasket = currentData.typeDelivery;
      let currentTime = Date.now();
      if (currentTime - currentData.refreshTime > 2 * 3600 * 1000) {
        localStorage.removeItem("basket");
        this.loadFreeBasket();
        console.log("Больше двух часов");
      } else {
        console.log(currentData);
        if (currentData.basket.length === 0) {
          this.loadFreeBasket();
        } else {
          this.convertToBasket(currentData);
        }
      }
    } else {
      this.loadFreeBasket();
    }

    this.render(data);
    this.renderPriceCard();
  }

  addToBasket(dishId, target) {
    let { basket } = data;
    let currentCard = target.closest(".list_item");
    let currentId = parseInt(dishId.split("").splice(4).join(""));
    let currentPriceAfterDiscount;
    for (let i = 1; i < menuData.meals.length; i++) {
      currentPriceAfterDiscount = menuData.meals[i].products.find(
        (point) => point.id === currentId
      );
      if (currentPriceAfterDiscount) {
        break;
      }
    }
    let currentPrice = currentPriceAfterDiscount.price;
    if (currentPriceAfterDiscount.sale_price === 0) {
      currentPriceAfterDiscount = currentPriceAfterDiscount.price;
    } else {
      currentPriceAfterDiscount = currentPriceAfterDiscount.sale_price;
    }
    let currentName = currentCard.querySelector(".card__desc_name").textContent;
    let currentImg = currentCard.querySelector(".card__img").src;
    let currentWeight = currentCard
      .querySelector(".card__desc_weight")
      .textContent.split(" ");
    currentWeight = currentWeight[0];
    let toppings = document.querySelectorAll(".topping__check_active");
    if (toppings) {
    }
    let elem = {
      id: currentId,
      card: {
        name: currentName,
        img: currentImg,
        weight: currentWeight,
        price: currentPriceAfterDiscount,
        priceBeforeDiscount: currentPrice,
        quantity: 1,
        toppings: toppingActive,
      },
    };
    basket.push(elem);
    // renderData("dish" + elem.id);
    this.render(data);
    this.save(data);
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
}

let orderBasket = new basket();
orderBasket.load();

// - parseInt(mobileBasketSticky.style.bottom) + "px";

buttonOrder.forEach((item) => {
  item.addEventListener("click", renderFullOrder);
});

function renderFullOrder() {
  console.log("Full Order");
}

inputs.forEach((input) => {
  input.addEventListener("change", inputCountChange);
});

function inputCountChange(e) {
  let dishID = e.currentTarget.dataset.id;
  currentElementId = parseInt(dishID.split("").splice(4).join(""));
  this.value = this.value.replace(/[^\d.]/g, "");
  const currentCard = data.basket.find(
    (card) => card.id === parseInt(currentElementId)
  );
  if (e.currentTarget.value < 1) {
    e.currentTarget.value = 1;
    let minus = e.currentTarget
      .closest(".button__count")
      .querySelector(".count_minus");
    minus.click();
  } else {
    currentCard.card.quantity = e.currentTarget.value;
    renderData(dishID);
  }
}

//--------------------  Плюс/минус в меню-------------------//

function countPlus(count) {
  return function () {
    if (count.value < 999) {
      let currentElementId = count.dataset.id;
      let cards = document.querySelectorAll(
        '.input_text[data-id="' + currentElementId + '"]'
      );

      currentElementId = parseInt(
        currentElementId.split("").splice(4).join("")
      );
      const card = data.basket.find(
        (card) => card.id === parseInt(currentElementId)
      );
      card.card.quantity++;
      cards.forEach((item) => {
        item.value = card.card.quantity;
      });

      renderData(count.dataset.id);
      orderBasket.save();
    }
  };
}

function countMinus(count) {
  return function () {
    let currentElementId = count.dataset.id;
    currentElementId = parseInt(currentElementId.split("").splice(4).join(""));
    let currCard;
    // if (count.closest(".basket__card")) {
    currCard = data.basket.find(
      (card) => card.id === parseInt(currentElementId)
    );

    // }
    let indexCard = data.basket.indexOf(currCard);
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
      orderBasket.renderPriceCard();
      let currentCards = document.querySelectorAll(
        '.list_item[data-id="' + count.dataset.id + '"]'
      );
      currentCards.forEach((currentCard) => {
        currentCard.querySelector(".desc_price").textContent =
          currCard.card.price;
        currentCard.querySelector(".card__button").style.display = "block";
        currentCard.querySelector(".card__button_count").style.display = "none";
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
    orderBasket.save(data);
    renderData(count.dataset.id);
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
    var swiperMod = new Swiper(".mySwiperModal", {
      zoom: true,
      navigation: {
        nextEl: ".swiper-button-next-mod",
        prevEl: ".swiper-button-prev-mod",
      },
    });
    /* let currentCard = e.currentTarget.closest(".list_item");
    let currentBtnAdd = currentCard.querySelector(".card__button");
    let currentBtnCount = currentCard.querySelector(".card__button_count");
    currentBtnAdd.style.display = "none";
    currentBtnCount.style.display = "flex";*/
    let dishId;
    dishId = imgClick.closest(".list_item").dataset.id;
    renderModal(dishId, e.currentTarget);
    swiperDesc = new Swiper(".mySwiperDesc", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
    });
    var nextSlide = function () {
      swiperDesc.slideNext();
    };

    var prevSlide = function () {
      swiperDesc.slidePrev();
    };

    let next = document.querySelectorAll(".button_next");
    let prev = document.querySelectorAll(".button_prev");

    next.forEach((elem) => {
      elem.addEventListener("click", nextSlide);
    });
    prev.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (window.innerWidth < 800) {
          nextSlide();
        } else {
          prevSlide();
        }
      });
    });

    swiperDesc.on("slideChange", function () {
      let next = document.querySelectorAll(".button_next");
      let prev = document.querySelectorAll(".button_prev");
      next.forEach((elem) => {
        elem.removeEventListener("click", nextSlide);
      });
      next.forEach((elem) => {
        elem.addEventListener("click", nextSlide);
      });
      prev.forEach((elem) => {
        elem.removeEventListener("click", prevSlide);
      });
      prev.forEach((elem) => {
        elem.addEventListener("click", prevSlide);
      });
    });
    modalTrue = true;
    modal.style.display = "flex";
    divBlock.style.display = "block";
    if (window.innerWidth < 800) {
      btnCloseModal.style.display = "block";
      modal.style.animation = "modal 0.7s forwards";
      auxiliary.style.display = "block";
      btnCloseModal.style.animation = "modal 0.7s forwards";
      // modal.style.overflow = "auto";
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
      if (window.innerWidth < 1450) {
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

    //toggle toppings
    for (let toppingLabel of toppingLabels) {
      toppingLabel.addEventListener("click", (e) => {
        let currentTopping = e.currentTarget.closest(".topping__card");
        let currentToppingCheck = currentTopping.querySelector(
          ".topping__check_img"
        );
        let toppingID = toppingLabel.getAttribute("for");
        toppingID = parseInt(toppingID.split("").splice(7).join(""));
        const cardID = parseInt(dishId.split("").splice(4).join(""));

        const dataCard = data.basket.find((item) => item.id === cardID);
        if (dataCard) {
          let indexTopping = dataCard.card.toppings.find(
            (item) => item.id === toppingID
          );
          let toppingPrice = parseInt(
            e.currentTarget.querySelector(".topping__price_number").textContent
          );
          indexTopping = dataCard.card.toppings.indexOf(indexTopping);
          const topping = dataCard.card.toppings;
          if (currentToppingCheck.classList.contains("topping__check_active")) {
            currentToppingCheck.classList.remove("topping__check_active");
            dataCard.card.toppings.splice(indexTopping, 1);
          } else {
            currentToppingCheck.classList.add("topping__check_active");
            let newTopping = {
              id: toppingID,
              price: toppingPrice,
            };
            dataCard.card.toppings.push(newTopping);
          }
          renderData(dishId);
          orderBasket.save();
        } else {
          currentToppingCheck.classList.toggle("topping__check_active");
        }
        changeModalPrice(dishId);

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
  menu.style.overflow = "unset";
  main.style.overflow = "unset";
  document.body.style.overflow = "unset";
  //modalFooter.style.display = "none";
  if (window.innerWidth < 800) {
    modal.style.animation = "modalBack 0.7s forwards";
    btnCloseModal.style.animation = "modalBack 0.7s forwards";
    header.style.position = "sticky";
    menuMobileNav.style.position = "sticky";
  } else if (window.innerWidth < 1450) {
    asideMenuUl.style.position = "sticky";
    header.style.top = 0;
    header.style.position = "sticky";
    modal.style.animation = "zoomBack 0.7s forwards";
  } else {
    modal.style.animation = "zoomBack 0.7s forwards";
    asideMenuUl.style.position = "sticky";
  }
  timerId = setTimeout(() => {
    document.querySelector(".modal__topping").style.display = "flex";
    modal.style.display = "none";
    swiperDesc.destroy(true, true);

    if (window.innerWidth > 800) {
      document.querySelector(".modal__footer").style.top = "calc(50% + 301px)";
      document.querySelector(".modal").style.height = "718px";
    } else {
      document.querySelector(".modal").style.top = "130px";
      document.querySelector(".modal").style.height = "calc(100vh - 130px)";
      document.querySelector(".modal__close").style.top = "145px";
    }
  }, 800);
}

divBlock.addEventListener("click", (e) => {
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
  mobileBasketFooter.style.top = "unset";
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

  mobileBasketSticky.style.top = startPosition;

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
  mobileBasketFooter.style.top = "unset";
  //mobileBasketFooter.classList.add("transition");
  mobileBasketSticky.classList.add("transition");
  mobileBasketSticky.classList.remove("opened");

  setTimeout(() => {
    mobileBasketSticky.style.top = "unset";
    unsetOverflow();
    openMobileBasket.addEventListener("click", openMobileBasketFunc);
    mobileBasketSticky.classList.remove("transition");
    //mobileBasketSticky.style.bottom = "60px";
    if (data.basket.length === 0) {
      mobileBasketSticky.style.bottom = 0;
      footer.style.paddingBottom = 0;
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
  if (window.innerWidth < 1450) {
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
  } /*else if (window.innerWidth < 1450) {
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
  let cards = document.querySelectorAll(
    '.list_item .input_text[data-id="' + modalID + '"]'
  );
  let toppings = document.querySelectorAll(".topping__check_active");
  if (toppings) {
    toppings.forEach((item) => {
      let toppingID = item.closest(".topping__label").getAttribute("for");
      toppingID = parseInt(toppingID.split("").splice(7).join(""));
      let toppingPrice = parseInt(
        item.closest(".topping__label").querySelector(".topping__price_number")
          .textContent
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
  btnAddOnModal.style.display = "none";
  const btnCountModal = document.querySelector(".modal__button_count");
  btnCountModal.style.display = "flex";
  cards.forEach((card) => {
    let currentCard = card.closest(".list_item");
    currentCard.querySelector(".card__button").style.display = "none";
    currentCard.querySelector(".button__count").style.display = "flex";
  });
  let modalButton = document.querySelector(".modal__button_count");
  modalButton.style.display = "flex";
  modalButton.querySelector(".input_text").value = 1;
}

//-------------------------Open basket-----------------------------------------//
// const toBasket = document.querySelector(".add__order");

//mobileBasket.addEventListener("click", () => {});

// document.querySelector(".add__order").style.display = "block";
// document.querySelector(".add__order_tablet").style.display = "flex";

//--------------Добавление/снятие прозрачности у мобильного меню-------------------//

window.addEventListener("scroll", function () {
  if (window.innerWidth < 800) {
    const menu_h2top = menuH2.getBoundingClientRect().top;
    const footerCopTop = footerCopyright.getBoundingClientRect().top;
    const mobileBasketTop = mobileBasketSticky.getBoundingClientRect().top;
    if (menu_h2top >= 149) {
      menuMobileNav.style.backgroundColor = "white";
    } else {
      menuMobileNav.style.backgroundColor = "rgb(255, 255, 255, 0.7)";
    }
    if (data && data.basket && data.basket.length !== 0) {
      if (footerCopTop < mobileBasketTop) {
        footer.style.paddingBottom = "60px";
        mobileBasketTrue = false;
      }
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
  let currentBtn = e.currentTarget.closest(".basket__delivery__item");
  if (window.innerWidth < 1450) {
    wrapp = currentBtn.closest(".mobileBasket__delivery__wrapper");
  } else {
    wrapp = currentBtn.closest(".deskBasket__delivery__wrapper");
  }
  let hoverActive = wrapp.querySelector(".hovering_active");
  let currentTypeDelivery = currentBtn.querySelector(
    ".basket__delivery_input"
  ).id;
  if (currentTypeDelivery === "takeaway") {
    hoverActive.classList.remove("hover__active_left");
    hoverActive.classList.add("hover__active_right");
    data.delivery.typeDelivery = "takeaway";
  } else {
    hoverActive.classList.remove("hover__active_right");
    hoverActive.classList.add("hover__active_left");
    data.delivery.typeDelivery = "delivery";
  }
  document.querySelectorAll(".basket__delivery__item").forEach((el) => {
    el.classList.remove("basket__delivery_active");
  });
  currentBtn.classList.add("basket__delivery_active");
  if (data.basket.length !== 0) {
    currentID = "dish" + data.basket[0].id;
  } else {
    currentID = 0;
  }
  orderBasket.save();
  renderData(currentID);
}
//
/* function delivery(target) {
    let { delivery_options } = menuData;
    console.log(target);
    let currentID = 0;
    const typeDelivery = target.querySelector(".basket__delivery_input").id;
   // renderDelivery(typeDelivery);

   /*if (window.innerWidth < 1400) {
      currentBasket = document.querySelector(".mobileBasket");
    } else {
      currentBasket = document.querySelector(".deskBasket");
    }
    let deliveryPrice = currentBasket.querySelector(".priceDelivery");
    let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
    let otherText = currentBasket.querySelector(".other__text");

    if (typeDelivery === "takeaway") {
      deliveryPrice.textContent = 0;
      otherText.textContent = " для скидки " + menuData.delivery_options.takeaway_discount + "%." 
      if (totalCheck > parseInt(menuData.delivery_options.takeaway_discount_order_total)) {
        checKForFree.textContent = 0;
        priceDelivery = 0;
      } else {
        checKForFree.textContent = parseInt(menuData.delivery_options.takeaway_discount_order_total - totalCheck);  
      }
    } else {
      otherText.textContent = " для бесплатной доставки!" 
      if (totalCheck >= menuData.delivery_options.free_delivery_order_total) {
        deliveryPrice.textContent = 0;
        checKForFree.textContent = 0;
        priceDelivery = 0;
      } else {
        deliveryPrice.textContent = parseInt(menuData.delivery_options.delivery_price);
        checKForFree.textContent = parseInt(menuData.delivery_options.free_delivery_order_total) - totalCheck;  
      }
    }
*/
/*
    if (typeDelivery === "delivery") {
      data.delivery.priceDelivery = parseInt(delivery_options.delivery_price);
    }
    else {
      data.delivery.priceDelivery = 0;
    }

    if (data.delivery.typeDelivery !== typeDelivery) {
      const card = deliveries.find(
        (item) => item.typeDelivery === typeDelivery
      );
      data.delivery.typeDelivery = typeDelivery;
      data.delivery.priceDelivery = card.priceDelivery;
      data.delivery.orderPriceForFree = card.orderPriceForFree;

      
      console.log(data.basket);
     
      }
      
      console.log(card);
    }*/

/*}


  function renderDelivery(typeDelivery) {
    document.querySelector(".mobileBasket__header_price").textContent =
    totalCheck;
    if (window.innerWidth < 1400) {
      currentBasket = document.querySelector(".mobileBasket");
    } else {
      currentBasket = document.querySelector(".deskBasket");
    }
    let deliveryPrice = currentBasket.querySelector(".priceDelivery");
    let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
    let otherText = currentBasket.querySelector(".other__text");

    if (typeDelivery === "takeaway") {
      deliveryPrice.textContent = 0;
      otherText.textContent = " для скидки " + menuData.delivery_options.takeaway_discount + "%." 
      if (totalCheck > parseInt(menuData.delivery_options.takeaway_discount_order_total)) {
        checKForFree.textContent = 0;
        priceDelivery = 0;
      } else {
        checKForFree.textContent = parseInt(menuData.delivery_options.takeaway_discount_order_total - totalCheck);  
      }
    } else {
      otherText.textContent = " для бесплатной доставки!" 
      if (totalCheck >= menuData.delivery_options.free_delivery_order_total) {
        deliveryPrice.textContent = 0;
        checKForFree.textContent = 0;
        priceDelivery = 0;
      } else {
        deliveryPrice.textContent = parseInt(menuData.delivery_options.delivery_price);
        checKForFree.textContent = parseInt(menuData.delivery_options.free_delivery_order_total) - totalCheck;  
      }
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
    let currentMenuCat = document.querySelector(
      '.menu__cat[data-name="' + currentId + '"]'
    );
    let topCurrentMenuCat = currentMenuCat.getBoundingClientRect().top;
    if (window.innerWidth > 1450) {
      topCurrentMenuCat = topCurrentMenuCat;
    } else {
      topCurrentMenuCat = topCurrentMenuCat - 124;
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
  if (window.innerHeight - 60 > y2 && y2 > 0) {
    mobileBasketSticky.style.top = y2 + "px";
    mobileBasketFooter.style.top = window.innerHeight - 125 + y2 + "px";
  }
}
/*
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
function clearFunc() {
  data.basket = [];
  let btnsAdd = document.querySelectorAll(".card__button");
  let btnsCount = document.querySelectorAll(".button__count");
  let inputsClear = document.querySelectorAll(".input_text");
  inputsClear.forEach((item) => {
    item.value = 1;
  });
  btnsAdd.forEach((item) => {
    item.style.display = "block";
  });
  btnsCount.forEach((item) => {
    item.style.display = "none";
  });
  orderBasket.render(data);
  orderBasket.save();
}

function changeModalPrice(itemID) {
  let { basket } = data;
  const cardID = parseInt(itemID.split("").splice(4).join(""));
  const dataCard = basket.find((item) => item.id === cardID);
  let toppPrice = 0;
  let currentCard = null;
  for (let t = 0; t < menuData.meals.length; t++) {
    let dish = menuData.meals[t];
    console.log(dish);
    for (k = 0; k < dish.products.length; k++) {
      if (dish.products[k].id === cardID) {
        currentCard = dish.products[k];
        break;
      }
    }
    if (currentCard) {
      break;
    }
  }
  if (!dataCard) {
    const modalToppingList = document.querySelector(".modal__topping");
    const modalToppings = modalToppingList.querySelectorAll(".topping__card");
    modalToppings.forEach((item) => {
      if (
        item
          .querySelector(".topping__check_img")
          .classList.contains("topping__check_active")
      ) {
        toppPrice += parseInt(
          item.querySelector(".topping__price_number").textContent
        );
        if (currentCard.sale_price === 0) {
          modalFooter.querySelector(".modal__total_number").textContent =
            currentCard.price + toppPrice;
        } else {
          modalFooter.querySelector(".modal__old_number").textContent =
            currentCard.price + toppPrice;
          modalFooter.querySelector(".modal__total_number").textContent =
            currentCard.sale_price + toppPrice;
        }
      }
    });
  } else {
    dataCard.card.toppings.forEach((topping) => {
      toppPrice += parseInt(topping.price);
    });
    modalFooter.querySelector(".modal__old_number").textContent =
      (dataCard.card.priceBeforeDiscount + toppPrice) * dataCard.card.quantity;
    modalFooter.querySelector(".modal__total_number").textContent =
      (dataCard.card.price + toppPrice) * dataCard.card.quantity;
    const listCards = document.querySelectorAll(".list_item");
    for (t = 0; t < listCards.length; t++) {
      if (listCards[t].dataset.id === itemID) {
        listCards[t].querySelector(".desc_price").textContent =
          dataCard.card.price + toppPrice;
      }
    }
    if (window.innerWidth < 1450) {
      currentBasket = document.querySelector(".mobileBasket");
    } else {
      currentBasket = document.querySelector(".deskBasket");
    }
    const basketCardList = currentBasket.querySelectorAll(".basket__card");
    for (t = 0; t < basketCardList.length; t++) {
      if (basketCardList[t].dataset.id === itemID) {
        basketCardList[t].querySelector(".basket__price").textContent =
          dataCard.card.price + toppPrice;
      }
    }
  }
}

function renderData(itemID) {
  let totalCheck = 0;
  let { basket, delivery } = data;
  let { priceDelivery } = delivery;
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
        }
        /* if (modalTrue) {
          let toppPrice = 0;
          dataCard.card.toppings.forEach((topping) => {
            toppPrice += parseInt(topping.price);
          });
          modalFooter.querySelector(".modal__old_number").textContent =
            (dataCard.card.priceBeforeDiscount + toppPrice) *
            dataCard.card.quantity;
          modalFooter.querySelector(".modal__total_number").textContent =
            (dataCard.card.price + toppPrice) * dataCard.card.quantity;
          //renderModal(count.dataset.id, card);
        }
*/
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
      changeModalPrice(itemID);
    }

    basket.forEach((element) => {
      let toppingPrice = 0;
      element.card.toppings.forEach((topping) => {
        toppingPrice += topping.price;
      });
      totalCheck += element.card.quantity * (element.card.price + toppingPrice);
    });
  }

  document.querySelector(".mobileBasket__header_price").textContent =
    totalCheck;

  if (window.innerWidth < 1450) {
    currentBasket = document.querySelector(".mobileBasket");
  } else {
    currentBasket = document.querySelector(".deskBasket");
  }

  // Delivery

  let deliveryPrice = currentBasket.querySelector(".priceDelivery");
  let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
  let otherText = currentBasket.querySelector(".other__text");
  if (data.delivery.typeDelivery === "takeaway") {
    deliveryPrice.textContent = 0;
    priceDelivery = 0;
    otherText.textContent =
      " для скидки " + menuData.delivery_options.takeaway_discount + "%.";
    if (
      totalCheck >=
      parseInt(menuData.delivery_options.takeaway_discount_order_total)
    ) {
      checKForFree.textContent = 0;
      totalCheck =
        (totalCheck *
          (100 - parseInt(menuData.delivery_options.takeaway_discount))) /
        100;
    } else {
      checKForFree.textContent = parseInt(
        menuData.delivery_options.takeaway_discount_order_total - totalCheck
      );
    }
  } else {
    otherText.textContent = " для бесплатной доставки!";
    if (totalCheck >= menuData.delivery_options.free_delivery_order_total) {
      deliveryPrice.textContent = 0;
      checKForFree.textContent = 0;
      priceDelivery = 0;
    } else {
      priceDelivery = parseInt(menuData.delivery_options.delivery_price);
      deliveryPrice.textContent = priceDelivery;
      checKForFree.textContent =
        parseInt(menuData.delivery_options.free_delivery_order_total) -
        totalCheck;
    }
  }

  /*console.log(data.delivery);
    if (totalCheck >= orderPriceForFree) {
      deliveryPrice.textContent = 0;
      checKForFree.textContent = 0;
      priceDelivery = 0;
    } else {
      deliveryPrice.textContent = priceDelivery;
      checKForFree.textContent = orderPriceForFree - totalCheck;
    }
    console.log(totalCheck);
    console.log(priceDelivery);*/
  document.querySelectorAll(".totalCheck").forEach((elem) => {
    elem.textContent = totalCheck + priceDelivery;
  });
}

function renderModal(dishId, target) {
  let { meals, toppings } = menuData;
  modalFooter.querySelector(".modal__old_number").style.display = "inline";
  modalFooter.querySelector(".modal__old_letter").style.display = "inline";
  let toppPrice = 0;
  let card;
  for (let t = 0; t < meals.length; t++) {
    for (let i = 0; i < meals[t].products.length; i++) {
      if ("dish" + meals[t].products[i].id === dishId) {
        card = meals[t].products[i];
        break;
      }
    }
  }
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

    if (card.toppings.length !== 0) {
      const fragmentTopping = document.createDocumentFragment();
      const toppingCardTemp = document.querySelector(".toppingCardTemp");
      const toppingList = modalWindow.querySelector(".topping__list");
      card.toppings.forEach((toppItem) => {
        const cardTopp = toppings.find((item) => item.id === toppItem);
        toppingClone = toppingCardTemp.content.cloneNode(true);
        toppingClone.querySelector(".topping__img").src = cardTopp.image;
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
          parseInt(cardTopp.price);
        const cardBasket = data.basket.find(
          (cardBasketL) => "dish" + cardBasketL.id === dishId
        );
        if (cardBasket) {
          cardBasket.card.toppings.forEach((cardTopping) => {
            if (cardTopping.id === cardTopp.id) {
              toppPrice += parseInt(cardTopp.price);
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
    } else {
      document.querySelector(".modal__topping").style.display = "none";
      if (window.innerWidth > 800) {
        document.querySelector(".modal").style.height = "562px";
        document.querySelector(".modal__footer").style.top =
          "calc(50% + 145px)";
      } else {
        document.querySelector(".modal").style.top = "304px";
        document.querySelector(".modal").style.height = "calc(100vh - 304px)";
        document.querySelector(".modal__close").style.top = "319px";
      }
    }

    if (window.innerWidth < 800) {
      document.querySelector(".button_prev .modal__desc_next").textContent =
        "описание";
      document.querySelector(".modal__desc_arrowLeft").src =
        "/assets/img/arrowRight.svg";
    } else {
      document.querySelector(".button_prev .modal__desc_next").style.display =
        "none";
    }
    modalWindow.querySelector(".modal__desc").textContent = card.description;
    modalWindow.querySelector(".modal__consist").textContent = card.contents;

    const footerBJU = modalWindow.querySelector(".footer__BJU");
    footerBJU.querySelector(".modal__weight").textContent = card.weight;
    footerBJU.querySelector(
      ".modal__total_energy .modal__BJU_number"
    ).textContent = card.nutrition_cal;
    footerBJU.querySelector(
      ".modal__squirreLS .modal__BJU_number"
    ).textContent = card.nutrition_protein;
    footerBJU.querySelector(".modal__fats .modal__BJU_number").textContent =
      card.nutrition_fat;
    footerBJU.querySelector(
      ".modal__carbohydrates .modal__BJU_number"
    ).textContent = card.nutrition_carbo;
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
      modalFooter.querySelector(".modal__order_button").style.display = "none";
      btnCount.style.display = "flex";
      btnCount.querySelector(".input_text").value = currentValue;
      buttonsCount = document.querySelectorAll(".button__count");
    } else {
      modalFooter.querySelector(".modal__order_button").style.display = "block";
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
    let priceAfterDiscount;
    if (parseInt(card.sale_price) === 0) {
      priceAfterDiscount = card.price;
      modalFooter.querySelector(".modal__old_number").style.display = "none";
      modalFooter.querySelector(".modal__old_letter").style.display = "none";
    } else {
      priceAfterDiscount = parseInt(card.sale_price);
      modalFooter.querySelector(".modal__old_number").textContent =
        (card.price + toppPrice) * currentValue;
    }
    modalFooter.querySelector(".modal__total_number").textContent =
      (priceAfterDiscount + toppPrice) * currentValue;
  }
}

if (location.hash) {
  let nameCat = decodeURI(location.hash).slice(1);
  if (window.innerWidth < 800) {
    let categories = document.querySelectorAll(".nav__label");
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].textContent === nameCat) {
        categories[i].click();
        break;
      }
    }
  } else {
    let categories = document.querySelectorAll(".asideMenu__label");
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].textContent === nameCat) {
        categories[i].click();
        break;
      }
    }
  }
}
/* let currentCategory;
    console.log(categories);
  
    for ( let i = 0; i<categories.length; i++)
    {      
     if (categories[i].id === nameCat) {
     currentCategory = categories[i];
      break;
     }
   }
   let coordsScroll = currentCategory.getBoundingClientRect().top;
   if (window.innerWidth < 800) {

   }
  
   window.scrollTo( {
    top: coordsScroll,
    behavior: 'smooth'
   })*/
//let currentCategory = categories.find( (item) => item.textContent === nameCat);

// console.log(currentCategory);
//}
