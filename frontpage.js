var nameHrefCategory = "index.html#";
if (window.innerWidth < 800) {
  // переход по nav__label.click();
} else {
  //переход по asideMenu__label.click();
}

class frontpage {
 
}
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
          (card.price + toppPrice) * currentValue ;
        modalFooter.querySelector(".modal__total_number").textContent =
          (priceAfterDiscount + toppPrice) * currentValue;
      }
    });
  }
window.onload = init;
function init() { 
    let front = new frontpage();


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

      if (window.innerWidth < 800) {
        btnCloseModal.style.display = "block";
        modal.style.animation = "modal 0.7s forwards";
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
 }


