let data;
let modalTrue = false;
let writeOffPercent = parseInt(menuData.delivery_options.bonus_percent);
const logo = document.querySelector(".logo");
logo.href = linkToFrontpage;
let buttonsCount = document.querySelectorAll(".button__count");
for (let buttonCount of buttonsCount) {
  let minus = buttonCount.querySelector(".count_minus");
  let plus = buttonCount.querySelector(".count_plus");
  let count = buttonCount.querySelector(".input_text");
  minus.addEventListener("click", countMinus(count));
  plus.addEventListener("click", countPlus(count));
}
/*
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
};*/
class order {
  getCustomerInfo(currentTypeDelivery) {
    let currentAddress = {};
    let currentStreet;
    console.log(currentTypeDelivery);
    if (currentTypeDelivery === "delivery") {
      if (window.innerWidth < 1450) {
        currentStreet = document.querySelector(".street").value;
      } else {
        currentStreet = document.querySelector(
          ".address__main .select__current"
        ).dataset.id;
      }
    }
    let currentBuilding = document.querySelector(".house").value;
    let currentCorp = document.querySelector(".housing").value;
    let currentApt = document.querySelector(".flat").value;
    let currentEntrance = document.querySelector(".entrance").value;
    let currentFloor = document.querySelector(".level").value;
    let currentIntercom = document.querySelector(".intercom").value;
    currentAddress = {
      street: parseInt(currentStreet),
      building: currentBuilding,
      corp: currentCorp,
      apt: currentApt,
      entrance: currentEntrance,
      floor: currentFloor,
      intercom: currentIntercom,
    };
    let currentKindPay;
    if (window.innerWidth > 1450) {
      currentKindPay = document.querySelector(
        ".paymentCardSelect .select__current"
      ).textContent;
    } else {
      currentKindPay = document.querySelector(".paymentCard").value;
    }
    let currentShortChange = document.querySelector(
      ".shortChange__input"
    ).value;
    console.log(currentShortChange);
    let currentBonusUse = document.querySelector(".range").value;
    let currentComments = document.querySelector(".comments__textarea").value;
    let currentConfirm = document
      .querySelector(".confirm_img")
      .classList.contains("confirm__active");
    let currentDate = document.querySelector(".date").value;
    let currentTime = document.querySelector(".time").value;
    let currentCutlery = document.querySelector(".cutlery .input_text").value;
    let currentPayment = {
      kindPay: currentKindPay,
      shortChange: currentShortChange,
      bonusUse: parseInt(currentBonusUse),
    };
    let customerInfo = {
      address: currentAddress,
      payment: currentPayment,
      comments: currentComments,
      doNotCall: currentConfirm,
      date: currentDate,
      time: currentTime,
      cutlery: parseInt(currentCutlery),
    };
    console.log(customerInfo);
    return customerInfo;
  }
  renderOrderFromBasket(currentData) {
    console.log(currentData.customerInfo.address.building);
    if (
      currentData.typeDelivery === "delivery" &&
      currentData.customerInfo.address !== undefined
    ) {
      let { street, building, corp, apt, entrance, floor, intercom } =
        currentData.customerInfo.address;
      if (window.innerWidth > 1450) {
        let nameStreet = menuData.streets.find((elem) => elem.id === street);
        document.querySelector(".select__current").textContent =
          nameStreet.name;
        document.querySelector(".select__current").dataset.id = nameStreet.id;
      } else {
        document.querySelector(".street").value = street;
      }
      document.querySelector(".house").value = building;
      document.querySelector(".housing").value = corp;
      document.querySelector(".flat").value = apt;
      document.querySelector(".entrance").value = entrance;
      document.querySelector(".level").value = floor;
      document.querySelector(".intercom").value = intercom;
    }

    if (currentData.customerInfo.payment !== undefined) {
      let currentKindPay = currentData.customerInfo.payment.kindPay;
      console.log(currentKindPay);
      if (window.innerWidth > 1450) {
        document.querySelector(
          ".paymentCardSelect .select__current"
        ).textContent = currentKindPay;
      } else {
        document.querySelector(".paymentCard").value = currentKindPay;
      }
    }
    let { shortChange, bonusUse } = currentData.customerInfo.payment;
    if (profileData.isAuth) {
      numberBonuses = profileData.bonus;
    }
    let maxBonus =
      (numberBonuses / 100) * parseInt(menuData.delivery_options.bonus_percent);
    document.querySelector(".bonus_max").textContent = maxBonus;

    document.querySelector(".range").max = maxBonus;
    document.querySelector(".range").value = bonusUse;
    document.querySelector("output").value = bonusUse;
    document.querySelector(".shortChange__input").value = shortChange;
    document.querySelector(".comments__textarea").value =
      currentData.customerInfo.comments;
    if (currentData.customerInfo.doNotCall) {
      document.querySelector(".confirm_img").classList.add("confirm__active");
    } else {
      document
        .querySelector(".confirm_img")
        .classList.remove("confirm__active");
    }
    document.querySelector(".cutlery .input_text").value =
      currentData.customerInfo.cutlery;
    document.querySelector(".date").value = currentData.customerInfo.date;
    document.querySelector(".time").value = currentData.customerInfo.time;
    this.renderDelivery();
  }
  sendOrder() {
    let finalOrderData;
    let currentBasket = localStorage.getItem("basket");
    currentBasket = JSON.parse(currentBasket);
    console.log(currentBasket);
    if (
      currentBasket !== undefined &&
      currentBasket !== null &&
      currentBasket.basket.length !== 0
    ) {
      let currentBuilding = document.querySelector(".house").value;
      if (currentBasket.typeDelivery === "delivery" && currentBuilding === "") {
        document.querySelector(".house").focus();
      } else {
        let totalCheckBasket = currentBasket.customerInfo.totalCheck;
        let convertedBasket = currentBasket.basket;
        console.log(convertedBasket);
        let currentTypeDelivery = currentBasket.typeDelivery;
        /*let lastElemBasket;
        if (currentTypeDelivery === "delivery") {
          if (
            totalCheckBasket <
            menuData.delivery_options.free_delivery_order_total
          ) {
            lastElemBasket = {
              id: "delivery",
              price: menuData.delivery_options.delivery_price,
            };
          } else {
            lastElemBasket = {
              id: "delivery",
              price: 0,
            };
          }
          convertedBasket.push(lastElemBasket);
        }*/
        delete currentBasket.customerInfo.totalCheck;
        finalOrderData = {
          basket: convertedBasket,
          typeDelivery: currentTypeDelivery,
          customerInfo: this.getCustomerInfo(currentTypeDelivery),
        };
        console.log(finalOrderData);
        let formDataOrder = new FormData();
        formDataOrder.append("order", finalOrderData);
          fetch(urlSendOrder, {
            body: formDataOrder,
            method: "post",
          })
          .then(() => {
             localStorage.removeItem("basket");
              window.location = "/";
            
          })
      }
    } else {
      console.log("Ваша корзина пуста");
    }
  }
  renderSelectStreets() {
    const { streets } = menuData;
    const fragment = document.createDocumentFragment();
    const optionTemp = document.querySelector(".selectStreetItem");
    const street = document.querySelector(".select__body");
    streets.forEach((item) => {
      const cardClone = optionTemp.content.cloneNode(true);
      cardClone.querySelector(".select__item").textContent = item.name;
      cardClone.querySelector(".select__item").dataset.id = item.id;
      fragment.append(cardClone);
    });
    street.innerHTML = "";
    street.appendChild(fragment);
    document.querySelector(".select__current").textContent = streets[0].name;
    document.querySelector(".select__current").dataset.id = streets[0].id;
  }

  renderSelectPayment() {
    const { delivery } = data;
    console.log(delivery.typeDelivery);
    if (delivery.typeDelivery === "takeaway") {
      document.querySelector(".order__address .order__item_h2").textContent =
        "Детали";
      document.querySelector(
        ".paymentCardSelect .select__current"
      ).textContent = "Наличными/картой в ресторане";
      document.querySelector(".address__main").style.display = "none";
      document.querySelector(".comments__textarea").style.marginTop = 0;
      document.querySelector(".shortChange").style.display = "none";
      document.querySelector(".cashPay").style.display = "none";
      document.querySelector(".courierPay").style.display = "none";
    } else {
      document.querySelector(
        ".paymentCardSelect .select__current"
      ).textContent = "Наличными курьеру";
      document.querySelector(".restaurantPay").style.display = "none";
    }
  }

  renderOrderWithProfileData(profileData) {
    console.log(profileData);
    let {
      isAuth,
      name,
      bonus,
      street,
      building,
      corp,
      apt,
      entrance,
      floor,
      intercom,
    } = profileData;
    console.log("here!!!!");
    numberBonuses = bonus;
    let maxBonus =
      (bonus / 100) * parseInt(menuData.delivery_options.bonus_percent);
    document.querySelector(".bonus_max").textContent = maxBonus;
    if (window.innerWidth > 1450) {
      let nameStreet = menuData.streets.find((elem) => elem.id === street);
      document.querySelector(".select__current").textContent = nameStreet.name;
      document.querySelector(".select__current").dataset.id = nameStreet.id;
    } else {
      document.querySelector(".street").value = street;
    }

    document.querySelector(".house").value = building;
    document.querySelector(".housing").value = corp;
    document.querySelector(".flat").value = apt;
    document.querySelector(".entrance").value = entrance;
    document.querySelector(".level").value = floor;
    document.querySelector(".intercom").value = intercom;
    document.querySelector(".range").max = maxBonus;
    orderNew.renderBonus();
  }

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
    let totalCheckBasket = 0;
    let convertedBasket = [];
    let currentRefreshTime = Date.now();
    let currentTypeDelivery = data.delivery.typeDelivery;
    data.basket.forEach((item) => {
      let currentId = item.id;
      let currentQuantity = item.card.quantity;
      let currentToppingsId = [];
      totalCheckBasket += item.card.price * item.card.quantity;
      item.card.toppings.forEach((topping) => {
        currentToppingsId.push(topping.id);
        totalCheckBasket += topping.price * item.card.quantity;
      });
      convertedBasket.push({
        id: currentId,
        quantity: currentQuantity,
        toppingsId: currentToppingsId,
      });
    });
    let currentAddress = {};
    let currentStreet;
    console.log(currentTypeDelivery);
    if (currentTypeDelivery === "delivery") {
      if (window.innerWidth < 1450) {
        currentStreet = document.querySelector(".street").value;
      } else {
        currentStreet = document.querySelector(
          ".address__main .select__current"
        ).dataset.id;
      }
    }
    let currentBuilding = document.querySelector(".house").value;
    let currentCorp = document.querySelector(".housing").value;
    let currentApt = document.querySelector(".flat").value;
    let currentEntrance = document.querySelector(".entrance").value;
    let currentFloor = document.querySelector(".level").value;
    let currentIntercom = document.querySelector(".intercom").value;
    currentAddress = {
      street: parseInt(currentStreet),
      building: currentBuilding,
      corp: currentCorp,
      apt: currentApt,
      entrance: currentEntrance,
      floor: currentFloor,
      intercom: currentIntercom,
    };
    let currentKindPay;
    if (window.innerWidth > 1450) {
      currentKindPay = document.querySelector(
        ".paymentCardSelect .select__current"
      ).textContent;
    } else {
      currentKindPay = document.querySelector(".paymentCard").value;
    }
    let currentShortChange = document.querySelector(
      ".shortChange__input"
    ).value;
    console.log(currentShortChange);
    let currentBonusUse = document.querySelector(".range").value;
    let currentComments = document.querySelector(".comments__textarea").value;
    let currentConfirm = document
      .querySelector(".confirm_img")
      .classList.contains("confirm__active");
    let currentDate = document.querySelector(".date").value;
    let currentTime = document.querySelector(".time").value;
    let currentCutlery = document.querySelector(".cutlery .input_text").value;
    let currentPayment = {
      kindPay: currentKindPay,
      shortChange: currentShortChange,
      bonusUse: parseInt(currentBonusUse),
    };
    let convertedData = {
      basket: convertedBasket,
      typeDelivery: currentTypeDelivery,
      customerInfo: {
        address: currentAddress,
        payment: currentPayment,
        comments: currentComments,
        doNotCall: currentConfirm,
        date: currentDate,
        time: currentTime,
        cutlery: parseInt(currentCutlery),
        totalCheck: totalCheckBasket,
      },
      refreshTime: currentRefreshTime,
    };
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
      } /*,
      customerInfo: {
        address: {},
        payment: {},
        comments: currentComments,
        confirm: currentConfirm,
        date: currentDate,
        time: currentTime,
      },*/,
    };
    console.log(data);
  }

  save() {
    let order = JSON.stringify(this.convertFromBasket());
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
        item.description + " " + item.contents;
      if (data.basket.length === 0) {
        cardClone.querySelector(".input_text").value = 0;
      } else {
        for (let i = 0; i < data.basket.length; i++) {
          let card = data.basket[i];
          if (card.id !== item.id) {
            cardClone.querySelector(".input_text").value = 0;
          } else {
            cardClone.querySelector(".input_text").value = card.card.quantity;
            break;
          }
        }
      } //Заполнить когда появится новая структура

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
          btnCount.querySelector(".input_text").value = itemCard.card.quantity;
        }
      }
    });
  }

  renderAddress() {
    const { streets } = menuData;
    const street = document.querySelector(".street");
    if (window.innerWidth > 1450) {
      street.style.display = "none";
      this.renderSelectStreets();
    } else {
      document.querySelector(".select").style.display = "none";
      const fragment = document.createDocumentFragment();
      const optionTemp = document.querySelector(".optionTemp");
      const street = document.querySelector(".street");
      // const newElem = document.createElement("option");
      //fragment.append(newElem);
      streets.forEach((item) => {
        const cardClone = optionTemp.content.cloneNode(true);
        cardClone.querySelector(".street__item").textContent = item.name;
        cardClone.querySelector(".street__item").value = item.id;
        fragment.append(cardClone);
      });
      street.innerHTML = "";
      street.appendChild(fragment);
    }
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
    today.item(0).value = moment().format("Y-DD-MM");
    today.item(1).textContent =
      "Завтра, " + moment().add(1, "days").format("D MMMM"); //date.toLocaleString("ru", options);
    today.item(1).value = moment().add(1, "days").format("Y-DD-MM");
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
    const { delivery } = data;
    if (window.innerWidth > 1450) {
      document.getElementById("paymentCard").style.display = "none";
      document.querySelector(".paymentCardSelect").style.display = "flex";
      this.renderSelectPayment();
    } else {
      document.getElementById("paymentCard").style.display = "block";
      document.querySelector(".paymentCardSelect").style.display = "none";
      if (delivery.typeDelivery === "takeaway") {
        document.querySelector(".order__address .order__item_h2").textContent =
          "Детали";
        document.getElementById("paymentCard").value =
          document.getElementById("restaurantPay").value;
        document.querySelector(".address__main").style.display = "none";
        document.querySelector(".comments__textarea").style.marginTop = 0;
        document.querySelector(".shortChange").style.display = "none";
        document.getElementById("cashPay").style.display = "none";
        document.getElementById("courierPay").style.display = "none";
      } else {
        document.getElementById("restaurantPay").style.display = "none";
      }
    }
    this.renderDelivery();
  }

  renderBonus() {
    numberBonuses = parseInt(numberBonuses);
    console.log(numberBonuses);
    writeOffPercent = parseInt(writeOffPercent);
    const bonusMax = document.querySelector(".bonus_max");
    const range = document.querySelector(".range");
    const bonusText = document.querySelector(".bonus__text");
    const numberBonusesText = document.querySelector(".numberBonuses");
    const writeOffBonuses = document.querySelector(".writeOffBonuses");
    if (numberBonuses !== 0) {
      numberBonusesText.style.display = "inline";
      document.querySelector(".bonus__text_other").style.display = "inline";
      writeOffBonuses.style.display = "inline";
      bonusText.textContent = "У вас ";
      bonusMax.textContent = Math.ceil((numberBonuses * writeOffPercent) / 100);
      range.max = Math.ceil((numberBonuses * writeOffPercent) / 100);
      numberBonusesText.textContent = numberBonuses + " бонусов";
      writeOffBonuses.textContent = Math.ceil(
        (numberBonuses * writeOffPercent) / 100
      );
    } else {
      numberBonusesText.style.display = "none";
      document.querySelector(".bonus__text_other").style.display = "none";
      writeOffBonuses.style.display = "none";
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
      console.log(delivery.typeDelivery);
      deliveryPrice.textContent = 0;
      console.log(totalCheck);
      console.log(takeaway_discount_order_total);
      otherText.textContent = " для скидки " + takeaway_discount + "%.";
      if (totalCheck >= takeaway_discount_order_total) {
        checKForFree.textContent = 0;
        totalCheck = Math.ceil((totalCheck * (100 - takeaway_discount)) / 100);
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
        totalCheck = totalCheck*(100 - parseInt(menuData.delivery_options.delivery_discount))/100;
        totalCheck += delivery_price;
      } else {
        deliveryPrice.textContent = 0;
        checKForFree.textContent = 0;
        totalCheck = totalCheck*(100 - parseInt(menuData.delivery_options.delivery_discount))/100;
      }
    }
    
    totalCheck = totalCheck - range.value;
    document.querySelector(".orderPrice__price").textContent = totalCheck;
  }
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
        item.card.weight + " г.";
      cardClone.querySelector(".basket__price").textContent = item.card.price;
      cardClone.querySelector(".input_text").value = item.card.quantity;
      let currentCount = cardClone.querySelector(".input_text");
      currentCount.dataset.id = "dish" + item.id;
      let currentMinus = cardClone.querySelector(".count_minus");
      let currentPlus = cardClone.querySelector(".count_plus");
      currentMinus.dataset.id = "dish" + item.id;
      currentPlus.dataset.id = "dish" + item.id;
      let toppPrice = 0;
      if (item.card.toppings) {
        item.card.toppings.forEach((topping) => {
          toppPrice += topping.price;
        });
      }
      cardClone.querySelector(".basket__price").textContent =
        item.card.price + toppPrice;
      currentPlus.addEventListener("click", countPlus(currentCount));
      currentCount.addEventListener("change", inputCountChange);
      currentMinus.addEventListener("click", countMinus(currentCount));
      const range = document.querySelector(".range");
      range.addEventListener("input", function () {
        orderNew.renderDelivery();
        orderNew.save();
      });
      fragment.append(cardClone);
    });
    orderList.innerHTML = "";
    orderList.appendChild(fragment);
    document.querySelector(".cutlery .input_text").dataset.id = "cutlery";
  }
  load() {
    //localStorage.removeItem("basket");
    let currentBasket = localStorage.getItem("basket");
    let currentData = JSON.parse(currentBasket);
    if (profileData.isAuth) {
      document.querySelectorAll(".profile__item").forEach((item) => {
        item.classList.add("active");
      });
    }
    if (currentBasket) {
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
    this.renderPriceCard();
    console.log(currentData !== undefined && currentData !== null);
    if (currentData !== undefined && currentData !== null) {
      console.log(currentData.customerInfo);
      if (
        currentData.customerInfo !== undefined &&
        currentData.customerInfo !== null
      ) {
        this.renderOrderFromBasket(currentData);
      } else {
        if (profileData.isAuth) {
          this.renderOrderWithProfileData(profileData);
        }
      }
    } else {
      if (profileData.isAuth) {
        this.renderOrderWithProfileData(profileData);
      }
    }
  }
}
let orderNew = new order();
orderNew.load();

//-------------------------------------------------------------------

console.log(profileData);
function renderModal(dishId, target) {
  let { meals, toppings } = menuData;
  modalFooter.querySelector(".modal__old_number").style.display =
    "inline-block";
  modalFooter.querySelector(".modal__old_letter").style.display =
    "inline-block";
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
      console.log(card.sale_price);
      console.log(card.price);
      priceAfterDiscount = card.price;
      modalFooter.querySelector(".modal__old_number").style.display = "none";
      modalFooter.querySelector(".modal__old_letter").style.display = "none";
    } else {
      console.log(card.sale_price);
      console.log(card.price);
      priceAfterDiscount = parseInt(card.sale_price);
      modalFooter.querySelector(".modal__old_number").textContent =
        (card.price + toppPrice) * currentValue;
    }
    modalFooter.querySelector(".modal__total_number").textContent =
      (priceAfterDiscount + toppPrice) * currentValue;
  }

  changeModalPrice(dishId);
}
const confirmLabel = document.querySelector(".confirm__label");
const confirmCheck = document.querySelector(".confirm_img");
confirmLabel.addEventListener("click", () => {
  confirmCheck.classList.toggle("confirm__active");
  orderNew.save();
});

const finalOrder = document.querySelector(".finalOrder");
finalOrder.addEventListener("click", () => {
  orderNew.sendOrder();
});

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
          orderNew.save();
          orderNew.renderPayment();
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
let addressItems = document.querySelectorAll(".address__item");
addressItems.forEach((addressItem) => {
  addressItem.addEventListener("change", () => {
    orderNew.save();
  });
});

let dates = document.querySelector(".date");
dates.addEventListener("change", () => {
  orderNew.save();
});

let times = document.querySelector(".time");
times.addEventListener("change", () => {
  orderNew.save();
});
let payment = document.querySelector(".paymentCard");
payment.addEventListener("change", () => {
  orderNew.save();
});

let textarea = document.querySelector(".comments__textarea");
textarea.addEventListener("change", (e) => {
  e.target.value = e.target.value.replace(/[<>]/g, "");
  orderNew.save();
});
/*----------------------Close modal window------------------------*/

function closeModal() {
  modalTrue = false;
  divBlock.style.display = "none";
  btnCloseModal.style.display = "none";
  modalFooter.style.display = "none";
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
    orderNew.save();
  });
});

function countPlus(count) {
  return function () {
    console.log(count);

    if (count.closest(".cutlery")) {
      count.value++;
      orderNew.save();
      console.log("here");
    } else {
      if (parseInt(count.value) === 0) {
        count.value++;
        addToBasket(count.dataset.id, count);
      } else if (count.value < 999) {
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
    }
    orderNew.save();
    orderNew.renderPayment();
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
          orderNew.renderPriceCard();
          let currentCards = document.querySelectorAll(
            '.list_item[data-id="' + count.dataset.id + '"]'
          );
          currentCards.forEach((currentCard) => {
            currentCard.querySelector(".desc_price").textContent =
              currCard.card.price;
            currentCard.querySelector(".card__button").style.display = "block";
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
    const currentBasket = document.querySelector(".order__basket");
    const basketCardList = currentBasket.querySelectorAll(".basket__card");
    for (t = 0; t < basketCardList.length; t++) {
      if (basketCardList[t].dataset.id === itemID) {
        basketCardList[t].querySelector(".basket__price").textContent =
          dataCard.card.price + toppPrice;
      }
    }
  }
}

const inputs = document.querySelectorAll(".input_text");
inputs.forEach((input) => {
  input.addEventListener("change", inputCountChange);
});
function inputCountChange(e) {
  let dishID = e.currentTarget.dataset.id;
  if (dishID === "cutlery") {
    this.value = this.value.replace(/[^\d.]/g, "");
    orderNew.save();
  } else {
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
        let cards = document.querySelectorAll(
          '.input_text[data-id="' + dishID + '"]'
        );
        const card = data.basket.find(
          (card) => card.id === parseInt(currentElementId)
        );
        currentCard.card.quantity = e.currentTarget.value;
        cards.forEach((item) => {
          item.value = currentCard.card.quantity;
        });
        orderNew.save();
        changeModalPrice(dishID);
      }
    } else {
      addToBasket(dishID, e.currentTarget);
    }
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
        item.closest(".topping__label").querySelector(".topping__price_number")
          .textContent
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
if (window.innerWidth > 1450) {
  let selectHeader = document.querySelectorAll(".select__header");
  let selectItem = document.querySelectorAll(".select__item");
  let selectItemPay = document.querySelectorAll(".select__item_pay");

  selectHeader.forEach((item) => {
    item.addEventListener("click", selectToggle);
  });

  selectItem.forEach((item) => {
    item.addEventListener("click", selectChoose);
  });

  selectItemPay.forEach((item) => {
    item.addEventListener("click", selectChoosePay);
  });

  function selectToggle() {
    this.parentElement.classList.toggle("is_active");
  }
  function selectChoosePay() {
    let text = this.innerText,
      select = this.closest(".paymentCardSelect"),
      currentText = select.querySelector(".select__current");
    currentText.innerText = text;
    currentText.dataset.id = this.dataset.id;
    select.classList.remove("is_active");
    orderNew.save();
  }

  function selectChoose() {
    let text = this.innerText,
      select = this.closest(".select"),
      currentText = select.querySelector(".select__current");
    currentText.innerText = text;
    currentText.dataset.id = this.dataset.id;
    select.classList.remove("is_active");
    orderNew.save();
  }
  window.addEventListener("click", (e) => {
    const target = e.target;
    if (!target.closest(".paymentCardSelect") && !target.closest(".select")) {
      // если этот элемент или его родительские элементы не окно навигации и не кнопка
      document
        .querySelector(".paymentCardSelect")
        .classList.remove("is_active");
      document.querySelector(".select").classList.remove("is_active");
    }
  });
}

//}
