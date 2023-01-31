let data;
let modalTrue = false;
//window.onload = init;
//function init() {
  let buttonsCount = document.querySelectorAll(".button__count");
  for (let buttonCount of buttonsCount) {
    let minus = buttonCount.querySelector(".count_minus");
    let plus = buttonCount.querySelector(".count_plus");
    let count = buttonCount.querySelector(".input_text");
    minus.addEventListener("click", countMinus(count));
    plus.addEventListener("click", countPlus(count));
  }

  class order {
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
      let convertedData = {
        basket: convertedBasket,
        typeDelivery: currentTypeDelivery,
        refreshTime: currentRefreshTime,
      };
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
    loadFreeBasket() {
      data = {
        basket: [],
        delivery: { typeDelivery: "delivery" },
      };
    }

    renderExtra() {
      const extra = menuData.meals[menuData.meals.length - 1].products;
      const fragment = document.createDocumentFragment();
      const toppingCardTemp = document.querySelector(".extraCardTemp");
      const orderToppingList = document.querySelector(".order__topping_list");
      extra.forEach((item) => {
        const cardClone = toppingCardTemp.content.cloneNode(true);
        cardClone.querySelector(".order__topping_card").dataset.id =
          "dish" + item.id;
        cardClone.querySelector(".basket__h3").textContent = item.name || "";
        cardClone.querySelector(".basket__price").textContent = parseInt(
          item.price
        );
        let currentCount = cardClone.querySelector(".input_text");
        currentCount.dataset.id = "dish" + item.id;
        let currentMinus = cardClone.querySelector(".count_minus");
        let currentPlus = cardClone.querySelector(".count_plus");
        currentMinus.dataset.id = "dish" + item.id;
        currentPlus.dataset.id = "dish" + item.id;
        currentPlus.addEventListener("click", countPlus(currentCount));
        currentCount.addEventListener("change", inputCountChange);
        currentMinus.addEventListener("click", countMinus(currentCount));
        cardClone.querySelector(".order__topping_desc").textContent =
          item.description + " " + item.contents; //Заполнить когда появится новая структура
        for (let i = 0; i < data.basket.length; i++) {
          let card = data.basket[i];
          if (card.id !== item.id) {
            cardClone.querySelector(".input_text").value = 0;
          } else {
            cardClone.querySelector(".input_text").value = card.card.quantity;
            break;
          }
        }
        /*data.basket.forEach((card) => {
          
        });*/
        fragment.append(cardClone);
      });
      orderToppingList.innerHTML = "";
      orderToppingList.appendChild(fragment);
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

    renderAddress() {
      const { streets } = menuData.delivery_options;
      const fragment = document.createDocumentFragment();
      const optionTemp = document.querySelector(".optionTemp");
      const street = document.querySelector(".street");
      // const newElem = document.createElement("option");
      //fragment.append(newElem);
      streets.forEach((item) => {
        const cardClone = optionTemp.content.cloneNode(true);
        cardClone.querySelector(".street__item").textContent = item.street_name;
        fragment.append(cardClone);
      });
      street.innerHTML = "";
      street.appendChild(fragment);
    }

    renderDate() {
      /*var options = {
      month: "long",
      day: "numeric",
    };
    let date = new Date();*/
      moment.locale("ru");
      let today = document.querySelectorAll(".date option");
      today.item(0).textContent = "Сегодня, " + moment().format("D MMMM");
      today.item(1).textContent =
        "Завтра, " + moment().add(1, "days").format("D MMMM"); //date.toLocaleString("ru", options);
    }

    getCheck() {
      let totalCheck = 0;
      const { basket, delivery } = data;

      basket.forEach((item) => {
        let toppPrice = 0;
        item.card.toppings.forEach((topp) => {
          toppPrice += topp.price;
        });
        totalCheck += (item.card.price + toppPrice) * item.card.quantity;
      });

      return totalCheck;
    }

    renderPayment() {
      let totalCheck = this.getCheck();
      const { delivery } = data;
      if (delivery.typeDelivery === "takeaway") {
        document.querySelector(".order__address .order__item_h2").textContent =
          "Детали";
        document.querySelector(".address__main").style.display = "none";
        document.querySelector(".comments__textarea").style.marginTop = 0;
        document.querySelector(".shortChange").style.display = "none";
        document.getElementById("cashPay").style.display = "none";
        document.getElementById("courierPay").style.display = "none";
      } else {
        document.getElementById("restaurantPay").style.display = "none";
      }
      this.renderDelivery();
      //bonus
    }
    renderBonus() {
      let numberBonuses = 140;
      let writeOffPercent = 10;
      numberBonuses = parseInt(numberBonuses);
      writeOffPercent = parseInt(writeOffPercent);
      const bonusMax = document.querySelector(".bonus_max");
      const range = document.querySelector(".range");
      const bonusText = document.querySelector(".bonus__text");
      const numberBonusesText = document.querySelector(".numberBonuses");
      const writeOffBonuses = document.querySelector(".writeOffBonuses");
      if (numberBonuses !== 0) {
        bonusMax.textContent = Math.ceil(
          (numberBonuses * writeOffPercent) / 100
        );
        range.max = Math.ceil((numberBonuses * writeOffPercent) / 100);
        numberBonusesText.textContent = numberBonuses + " бонусов";
        writeOffBonuses.textContent = Math.ceil(
          (numberBonuses * writeOffPercent) / 100
        );
      } else {
        range.max = 0;
        bonusMax.textContent = "0";
        bonusText.textContent = "У вас нет бонусов, доступных к списанию";
      }
    }

    renderDelivery() {
      this.renderBonus();
      let { delivery } = data;
      let totalCheck = this.getCheck();
      let priceDelivery = parseInt(menuData.delivery_options.delivery_price);
      let currentBasket = document.querySelector(".footer__orderPayment");
      let deliveryPrice = currentBasket.querySelector(".priceDelivery");
      let checKForFree = currentBasket.querySelector(".check_forFreeDelivery");
      let otherText = currentBasket.querySelector(".other__text");
      let free_delivery_order_total = parseInt(
        menuData.delivery_options.free_delivery_order_total
      );
      let delivery_price = parseInt(menuData.delivery_options.delivery_price);
      let takeaway_discount_order_total = parseInt(
        menuData.delivery_options.takeaway_discount_order_total
      );
      let takeaway_discount = parseInt(
        menuData.delivery_options.takeaway_discount
      );

      if (delivery.typeDelivery === "takeaway") {
        deliveryPrice.textContent = 0;
        if (totalCheck >= takeaway_discount_order_total) {
          otherText.textContent = " для скидки " + takeaway_discount + "%.";

          checKForFree.textContent = 0;
          totalCheck = Math.ceil(
            (totalCheck * (100 - takeaway_discount)) / 100
          );
        } else {
          checKForFree.textContent =
            parseInt(takeaway_discount_order_total) - totalCheck;
        }
      } else {
        otherText.textContent = " для бесплатной доставки!";
        if (totalCheck < free_delivery_order_total) {
          checKForFree.textContent =
            parseInt(free_delivery_order_total) - totalCheck;
          deliveryPrice.textContent = priceDelivery;
          totalCheck += delivery_price;
        } else {
          deliveryPrice.textContent = 0;
          checKForFree.textContent = 0;
        }
      }
      document.querySelector(".orderPrice__price").textContent =
        totalCheck - range.value;
    }

    /* load() {
      fetch("order.json" )
        .then(this.errorHandler)
        .then((res) => res.json())
        .then((order) => {
          data = order;
          this.renderAddress();
          this.renderPayment();
          this.renderBasket();
          this.renderExtra();
          this.renderDate();
        })
        .catch((err) => console.error(err));
    }

    save() {}
  }
*/

    renderBasket() {
      const { basket } = data;
      const fragment = document.createDocumentFragment();
      const basketCard = document.querySelector(".basketCardTemp");
      const orderList = document.querySelector(".order__list");
      basket.forEach((item) => {
        const cardClone = basketCard.content.cloneNode(true);
        cardClone.querySelector(".basket__card").dataset.id = "dish" + item.id;
        cardClone.querySelector(".basket__card_img").src = item.card.img;
        cardClone.querySelector(".basket__h3").textContent = item.card.name;
        cardClone.querySelector(".basket__weight").textContent =
          item.card.weight;
        cardClone.querySelector(".basket__price").textContent = item.card.price;
        cardClone.querySelector(".input_text").value = item.card.quantity;
        let currentCount = cardClone.querySelector(".input_text");
        currentCount.dataset.id = "dish" + item.id;
        let currentMinus = cardClone.querySelector(".count_minus");
        let currentPlus = cardClone.querySelector(".count_plus");
        currentMinus.dataset.id = "dish" + item.id;
        currentPlus.dataset.id = "dish" + item.id;
        currentPlus.addEventListener("click", countPlus(currentCount));
        currentCount.addEventListener("change", inputCountChange);
        currentMinus.addEventListener("click", countMinus(currentCount));
        const range = document.querySelector(".range");
        range.addEventListener("input", function () {
          orderNew.renderDelivery();
        });
        fragment.append(cardClone);
      });
      orderList.innerHTML = "";
      orderList.appendChild(fragment);
    }
    load() {
      // localStorage.removeItem("basket");
      let currentBasket = localStorage.getItem("basket");
      if (currentBasket) {
        let currentData = JSON.parse(currentBasket);
        console.log(currentData);
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
      console.log(data);
      // this.render(data);
      this.renderAddress();
      this.renderPayment();
      this.renderBasket();
      this.renderExtra();
      this.renderDate();
    }
  }
  let orderNew = new order();
  orderNew.load();

  //-------------------------------------------------------------------

  function renderModal(dishId, target) {
    let { meals, toppings } = menuData;

    let toppPrice = 0;
    meals.forEach((dish) => {
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

        modalWindow.querySelector(".modal__desc").textContent =
          card.description + " " + card.contents;
        const fragmentTopping = document.createDocumentFragment();
        const toppingCardTemp = document.querySelector(".toppingCardTemp");
        console.log(toppingCardTemp);
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
        console.log(target.closest(".list_item"));
        const currentValue = target
          .closest(".list_item")
          .querySelector(".input_text").value;
        console.log(currentValue);
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

      changeModalPrice(dishId);
    });
  }

  const confirmLabel = document.querySelector(".confirm__label");
  const confirmCheck = document.querySelector(".confirm_img");
  confirmLabel.addEventListener("click", () => {
    confirmCheck.classList.toggle("confirm__active");
  });

  const selectDate = document.getElementById("date");
  const selectTime = document.getElementById("time");
  /*selectDate.addEventListener("change", function () {
  let getDateValue = this.value;
});


selectTime.addEventListener("input", function () {
  let getTimeValue = this.value;
});
*/
  const finalOrder = document.querySelector(".finalOrder");
  finalOrder.addEventListener("click", () => {
    console.log(selectTime.value);
  });

  /*const cardsGalleryClick = document.querySelectorAll(".menu__card");
cardsGalleryClick.forEach((cardClick) => {
  cardClick.addEventListener("click", (e) => {
    const dishId = e.currentTarget.closest(".list_item").dataset.id;
    renderModal(dishId, e.currentTarget);
  });
});*/

  const header = document.querySelector(".header");
  const asideMenuUl = document.querySelector(".asideMenu__ul");
  const modalFooter = document.querySelector(".modal__footer");
  const main = document.querySelector(".main");
  const btnCloseModal = document.querySelector(".modal__close");
  const modal = document.querySelector(".modal");
  const divBlock = document.querySelector(".block");
  var timerId = null;
  let toppingActive = [];
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
            orderNew.save();
            orderNew.renderPayment();
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

  const btnsShortChange = document.querySelectorAll(".shortChange__item");

  btnsShortChange.forEach((btnShortChange) => {
    btnShortChange.addEventListener("click", () => {
      console.log(btnShortChange.classList.contains("noShortChange"));
      if (btnShortChange.classList.contains("noShortChange")) {
        document.querySelector(".shortChange__input").value =
          btnShortChange.textContent.trim();
      } else {
        document.querySelector(".shortChange__input").value =
          "сдача с " + btnShortChange.textContent.trim();
      }
    });
  });

  function countPlus(count) {
    return function () {
      console.log(count);

      if (count.closest(".cutlery")) {
        count.value++;
        console.log("here");
      } else {
        if (parseInt(count.value) === 0) {
          count.value++;
          console.log("here1");
          addToBasket(count.dataset.id, count);
        } else if (count.value < 999) {
          console.log("here1");
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

          console.log(card.card.quantity);
          cards.forEach((item) => {
            item.value = card.card.quantity;
            console.log(item.value);
          });
          changeModalPrice(count.dataset.id);
        }
        orderNew.save();
        orderNew.renderPayment();
      }
    };
  }

  function countMinus(count) {
    return function () {
      if (count.closest(".cutlery")) {
        if (parseInt(count.value) !== 0) {
          count.value--;
        }
      } else {
        if (parseInt(count.value) !== 0) {
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
              currentCard.querySelector(".card__button").style.display =
                "block";
              currentCard.querySelector(".card__button_count").style.display =
                "none";
            });
            let currentExtra = menuData.meals[menuData.meals.length - 1];
            currentExtra = currentExtra.products.find(
              (item) => item.id === currentElementId
            );

            let extra = document.querySelector(".order__topping");
            let extraList = extra.querySelectorAll(".item");

            extraList.forEach((item) => {
              if (item.dataset.id === count.dataset.id) {
                item.querySelector(".input_text").value = 0;
              }
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
          }
        }
      }
      orderNew.save();
      changeModalPrice(count.dataset.id);
      orderNew.renderPayment();
    };
  }

  function changeModalPrice(itemID) {
    let { basket } = data;
    console.log(itemID);
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
    let cardTrue = data.basket.find((item) => item.id === currentElementId);
    this.value = this.value.replace(/[^\d.]/g, "");
    if (cardTrue) {
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
    } else {
      addToBasket(dishID, e.currentTarget);
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

  function addToBasket(dishId, target) {
    let { basket } = data;
    let currentInputValue = parseInt(target.value);
    console.log(target);
    console.log(currentInputValue);
    if (!currentInputValue) {
      currentInputValue = 1;
    }
    let currentCard = target.closest(".item");
    let currentId = parseInt(dishId.split("").splice(4).join(""));
    let currentDish;
    let currentPriceAfterDiscount;
    for (let i = 1; i < menuData.meals.length; i++) {
      currentDish = menuData.meals[i].products.find(
        (point) => point.id === currentId
      );
      if (currentDish) {
        break;
      }
    }
    if (currentDish.sale_price === 0) {
      currentPriceAfterDiscount = currentDish.price;
    } else {
      currentPriceAfterDiscount = currentDish.sale_price;
    }
    let currentName = currentDish.name;
    let currentImg = currentDish.img[0];
    let currentWeight = currentDish.weight + " г.";
    let currentPrice = currentDish.price;
    console.log(currentInputValue);
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
        quantity: currentInputValue,
        toppings: toppingActive,
      },
    };
    basket.push(elem);
    toppingActive = [];
    changeModalPrice(dishId);
    orderNew.save();
    orderNew.renderBasket();
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
    orderNew.renderPayment();
    cards.forEach((card) => {
      let currentCard = card.closest(".list_item");
      currentCard.querySelector(".card__button").style.display = "none";
      console.log(currentCard);

      currentCard.querySelector(".button__count").style.display = "flex";
    });
    document.querySelector(".modal__order_button").style.display = "none";
    let modalButton = document.querySelector(".modal__button_count");
    modalButton.style.display = "flex";
    modalButton.querySelector(".input_text").value = 1;
  }

  const buttonAdd = document.querySelectorAll(".card__button");
  const cardCount = document.querySelectorAll(".card__button_count");

  for (let i = 0; i < buttonAdd.length; i++) {
    buttonAdd[i].addEventListener("click", (e) => {
      let currentCard = e.currentTarget.closest(".list_item");
      //renderHeaderBasket(currentCard);
      let dishId = e.currentTarget.closest(".list_item").dataset.id;
      addToBasket(dishId, e.currentTarget);
      orderNew.renderPayment();
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
//}
