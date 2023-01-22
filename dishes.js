var menuData;
class dishesL {
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
    fetch("new.json" /*, "GET"*/)
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        menuData = data;
        this.renderCategories(data);
      })
      .catch((err) => console.error(err));
    
  }
  renderTop10(menu) {
    let { meals, top10 } = menu;
    let galleryList = document.querySelector(".gallery__list .swiper-wrapper");
    const fragment = document.createDocumentFragment();
    const galleryTemp = document.querySelector(".galleryTemp");
    top10.forEach((item) => {
      meals.forEach((dish) => {
        const cardClone = galleryTemp.content.cloneNode(true);
        const card = dish.products.find(
          (product) => product.id === parseInt(item)
        );
        console.log(card);
        let price;
        
        if (card) {
          if (card.sale_price === 0) {
            price = card.price;
          } 
          else {
            price = card.sale_price;
          }
          cardClone.querySelector(".card__img").src = card.img[0];
          cardClone.querySelector(".card__desc_name").textContent = card.name;
          cardClone.querySelector(".card__desc_weight").textContent =
            card.weight + " г.";
          cardClone.querySelector(".desc_price").textContent = price;
          cardClone.querySelector(".list_item").dataset.id = "dish" + card.id;
          let currentMinus = cardClone.querySelector(".count_minus");
          let currentCount = cardClone.querySelector(".input_text");
          let currentPlus = cardClone.querySelector(".count_plus");
          currentCount.dataset.id = "dish" + card.id;
          currentMinus.dataset.id = "dish" + card.id;
          currentPlus.dataset.id = "dish" + card.id;
          fragment.append(cardClone);
        }
      });
    });
    galleryList.innerHTML = "";
    galleryList.appendChild(fragment);
  }

  renderCategories(menu) {
    let { meals } = menu;
    let menuMobileNav = document.querySelector(".menu__mobile_nav");
    const fragment = document.createDocumentFragment();
    const navLi = document.querySelector(".nav__li_temp");
    const asideMenuUl = document.querySelector(".asideMenu__ul");
    const asideNavItem = document.querySelector(".asideItemTemp");
    let currentNav;
    meals.forEach((item) => {
      const cardClone = navLi.content.cloneNode(true);
      console.log(cardClone);
      //cardClone.querySelector(".nav__li").id = "tab" + item.id;
      cardClone.querySelector(".nav__li").dataset.name = "cat" + item.id;
      cardClone.querySelector(".nav__label").textContent = item.name;
      cardClone.querySelector(".nav__label").dataset.name = "cat" + item.id;
      cardClone
        .querySelector(".nav__label")
        .setAttribute("for", "tab" + item.id);
      cardClone.querySelector(".nav__input").id = "tab" + item.id;
      fragment.append(cardClone);
      currentNav = document.querySelector(".menu__mobile_nav");
    });
    currentNav.innerHTML = "";
    currentNav.appendChild(fragment);
    let fragmentaside = document.createDocumentFragment();
    meals.forEach((item) => {
      const cardCloneAside = asideNavItem.content.cloneNode(true);
      cardCloneAside.querySelector(".asideMenu__input").id = "cat" + item.id;
      cardCloneAside
        .querySelector(".asideMenu__label")
        .setAttribute("for", "cat" + item.id);
      currentNav = document.querySelector(".asideMenu__ul");
      cardCloneAside.querySelector(".asideMenu__label").textContent = item.name;
      fragmentaside.append(cardCloneAside);
    });
    currentNav.innerHTML = "";
    currentNav.appendChild(fragmentaside);
    let fragment1 = document.createDocumentFragment();
    const menuList = document.querySelector(".menu__list");
    let dishesListTemp = document.querySelector(".dishesListTemp");
    meals.forEach((item) => {
      let categoryClone = dishesListTemp.content.cloneNode(true);
      let menuCat = categoryClone.querySelector(".menu__cat");
    // let hrefCat = dishesListTemp.querySelector(".href__cat");
      //hrefCat.name = "href" + item.id;
      menuCat.dataset.name = "cat" + item.id;
      categoryClone.querySelector(".menu__h2").textContent = item.name;
      // let fragmentCard = document.createDocumentFragment();
      let menuCardTemp = document.querySelector(".menuCardTemp");
      let { products, id, name } = item;
      products.forEach((card) => {
        
        let price;
        if (card.sale_price === 0) {
          price = card.price;
        } 
        else {
          price = card.sale_price;
        }
        let cardIitemClone = menuCardTemp.content.cloneNode(true);
        cardIitemClone.querySelector(".card__img").src = card.img[0];
        cardIitemClone.querySelector(".card__desc_name").textContent =
          card.name;
        cardIitemClone.querySelector(".card__desc_weight").textContent =
          card.weight + " гр.";
        cardIitemClone.querySelector(".desc_price").textContent = price;
        cardIitemClone.querySelector(".list_item").dataset.id =
          "dish" + card.id;
        let currentMinus = cardIitemClone.querySelector(".count_minus");
        let currentCount = cardIitemClone.querySelector(".input_text");
        let currentPlus = cardIitemClone.querySelector(".count_plus");
        currentCount.dataset.id = "dish" + card.id;
        currentMinus.dataset.id = "dish" + card.id;
        currentPlus.dataset.id = "dish" + card.id;
        menuCat.appendChild(cardIitemClone);
      });
      fragment1.append(categoryClone);
    });
    menuList.innerHTML = "";
    menuList.appendChild(fragment1);
    document.querySelector(".nav__label").classList.add("nav__label_active");
    document.querySelector(".asideMenu__label").classList.add("category_active");
    this.renderTop10(menu);
  }
}
let dishesList = new dishesL();
dishesList.load();
