
var data;


class frontpage {
  renderBtnsTop(){
    let allMenu = document.querySelectorAll(".list_item");

      data.basket.forEach((itemCard) => {
        for (let itemMenu of allMenu) {
          if (itemMenu.dataset.id === "dish" + itemCard.id) {
            itemMenu.querySelector(".card__button").style.display = "none";
            const btnCount = itemMenu.querySelector(".button__count");
            btnCount.style.display = "flex";
            btnCount.querySelector(".input_text").value =
              itemCard.card.quantity;
          }
        }
      });
  }
  load() {
    fetch("order.json" /*, "GET"*/)
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((order) => {
        data = order;
        this.renderBtnsTop();
      })
      .catch((err) => console.error(err));
  }
}

window.onload = init;
function init() {
  function renderModal(dishId, target) {
    let { meals, toppings } = menuData;
  
    let toppPrice = 0;
    meals.forEach((dish) => {
      const card = dish.products.find(
        (product) => "dish" + product.id === dishId
      );
      if (card) {
        const modalWindow = document.querySelector(".modal");
        console.log(modalWindow);
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
  
        modalWindow.querySelector(".modal__desc").textContent =
          card.description + " " + card.contents;
        const fragmentTopping = document.createDocumentFragment();
        const toppingCardTemp = document.querySelector(".toppingCardTemp");
        const toppingList = modalWindow.querySelector(".topping__list");
        card.toppings.forEach((toppItem) => {
          const cardTopp = toppings.find((item) => item.id === toppItem);
          toppingClone = toppingCardTemp.content.cloneNode(true);
          console.log(toppingClone);
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
  
        const footerBJU = document.querySelector(".footer__BJU");
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
  
        let priceAfterDiscount;
        if (parseInt(card.sale_price) === 0) {
          priceAfterDiscount = card.price;
        } else {
          priceAfterDiscount = parseInt(card.sale_price);
        }
        modalFooter.querySelector(".modal__old_number").textContent =
          (card.price + toppPrice) * currentValue;
        modalFooter.querySelector(".modal__total_number").textContent =
          (priceAfterDiscount + toppPrice) * currentValue;
      }
      
    });
    changeModalPrice(dishId);
  }

  let front = new frontpage();
  front.load();
  let toppingActive = [];
  const header = document.querySelector(".header");
  const asideMenuUl = document.querySelector(".asideMenu__ul");
  const modalFooter = document.querySelector(".modal__footer");
  const main = document.querySelector(".main");
  const btnCloseModal = document.querySelector(".modal__close");
  const modal = document.querySelector(".modal");
  const divBlock = document.querySelector(".block");
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
      renderModal(dishId, e.currentTarget);
      modalTrue = true;
      modal.style.display = "flex";
      divBlock.style.display = "block";
      modal.style.overflow = "auto";
      if (window.innerWidth < 800) {
        btnCloseModal.style.display = "block";
        modal.style.animation = "modal 0.7s forwards";
        btnCloseModal.style.animation = "modal 0.7s forwards";
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
      /*
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
      }*/
      main.style.overflow = "hidden";
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
              e.currentTarget.querySelector(".topping__price_number")
                .textContent
            );
            indexTopping = dataCard.card.toppings.indexOf(indexTopping);
            const topping = dataCard.card.toppings;
            if (
              currentToppingCheck.classList.contains("topping__check_active")
            ) {
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
            changeModalPrice(dishId);
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
    modal.style.overflow = "unset";
    main.style.overflow = "unset";
    document.body.style.overflow = "unset";
    //modalFooter.style.display = "none";
    if (window.innerWidth < 800) {
      modal.style.animation = "modalBack 0.7s forwards";
      btnCloseModal.style.animation = "modalBack 0.7s forwards";
      header.style.position = "sticky";
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
    closeModal();
  });
  const modalClose = document.querySelector(".modal__close");

  modalClose.addEventListener("click", () => {
    closeModal();
  });

  function addToBasket(dishId, target) {
    let { basket } = data;
    let currentCard = target.closest(".list_item");
    let currentId = parseInt(dishId.split("").splice(4).join(""));
    let currentPriceAfterDiscount;
    for (let i = 0; i < menuData.meals.length; i++) {
      currentPriceAfterDiscount = menuData.meals[i].products.find(
        (point) => point.id === currentId
      );
      if (currentPriceAfterDiscount) {
        break;
      }
    }
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
        price: currentPriceAfterDiscount,
        priceBeforeDiscount: currentPrice,
        quantity: 1,
        toppings: toppingActive,
      },
    };
    basket.push(elem);
    console.log(data);
    // renderData("dish" + elem.id);
    toppingActive = [];
  }
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

    addToBasket(modalID, cards[0]);
    console.log(cards);
    cards.forEach((card) => {
      let currentCard = card.closest(".list_item");
      currentCard.querySelector(".card__button").style.display = "none";
      currentCard.querySelector(".button__count").style.display = "flex";
    });
    document.querySelector(".modal__order_button").style.display = "none";    
    let modalButton = document.querySelector(".modal__button_count");
    modalButton.style.display = "flex"
    modalButton.querySelector(".input_text").value = 1;
  }

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

        changeModalPrice(count.dataset.id);
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
      }
      changeModalPrice(count.dataset.id);
    };
  }
  let buttonsCount = document.querySelectorAll(".button__count");
  for (let buttonCount of buttonsCount) {
    let minus = buttonCount.querySelector(".count_minus");
    let plus = buttonCount.querySelector(".count_plus");
    let count = buttonCount.querySelector(".input_text");
    minus.addEventListener("click", countMinus(count));
    plus.addEventListener("click", countPlus(count));
  }

  function changeModalPrice(itemID) {
    let { basket } = data;
    console.log(basket.length);
    const cardID = parseInt(itemID.split("").splice(4).join(""));
    const dataCard = basket.find((item) => item.id === cardID);
    let toppPrice = 0;
    if (dataCard) {
      dataCard.card.toppings.forEach((topping) => {
        toppPrice += parseInt(topping.price);
      });
      modalFooter.querySelector(".modal__old_number").textContent =
        (dataCard.card.priceBeforeDiscount + toppPrice) *
        dataCard.card.quantity;
      modalFooter.querySelector(".modal__total_number").textContent =
        (dataCard.card.price + toppPrice) * dataCard.card.quantity;
    }
   
  }
  const inputs = document.querySelectorAll(".input_text");
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
      changeModalPrice(dishID);
    }
  }
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
  const buttonAdd = document.querySelectorAll(".card__button");
  const cardCount = document.querySelectorAll(".card__button_count");

  for (let i = 0; i < buttonAdd.length; i++) {
    buttonAdd[i].addEventListener("click", (e) => {
      let currentCard = e.currentTarget.closest(".list_item");
      //renderHeaderBasket(currentCard);
      let dishId = e.currentTarget.closest(".list_item").dataset.id;
      addToBasket(dishId, e.currentTarget);
      currentCard.querySelector(".card__button").style.display = "none";
      currentCard.querySelector(".card__button_count").style.display = "flex";
      /* buttonAdd[i].style.display = "none";
    cardCount[i].style.display = "flex";*/
    });
  }
  const asideMenuDivs = document.querySelectorAll(".asideMenu__div");
  for (let asideMenuDiv of asideMenuDivs) {
    asideMenuDiv.addEventListener("click", () => {
      window.location = asideMenuDiv.dataset.catHref;
    });
  }
}
