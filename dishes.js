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
    fetch("dishes.json" /*, "GET"*/)
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        this.renderCategories(data);
      })
      .catch((err) => console.error(err));
    /* const dishes = JSON.parse(dishes.json);
            this.renderCategories(dishes);*/
  }
  renderTop10(menu) {
    let { dishes, tops } = menu;
    let galleryList = document.querySelector(".gallery__list .swiper-wrapper");
    const fragment = document.createDocumentFragment();
    const galleryTemp = galleryList.querySelector(".galleryTemp");
    tops.forEach((item) => {      
      dishes.forEach((dish) => {
        const cardClone = galleryTemp.content.cloneNode(true);
        const card = dish.products.find(
          (product) => product.id === parseInt(item)
        );
        console.log(card);
        if (card) {
            cardClone.querySelector(".card__img").src = card.img[0];
            cardClone.querySelector(".card__desc_name").textContent = card.name;
            cardClone.querySelector(".card__desc_weight").textContent =
              card.weight + " г.";
            cardClone.querySelector(".desc_price").textContent = card.price;
            fragment.append(cardClone);
        }
      });      
    });
    galleryList.innerHTML = "";
      galleryList.appendChild(fragment);
  }

  renderCategories(menu) {
    let { dishes } = menu;
    let menuMobileNav = document.querySelector(".menu__mobile_nav");
    const fragment = document.createDocumentFragment();
    const navLi = menuMobileNav.querySelector(".nav__li_temp");
    const asideMenuUl = document.querySelector(".asideMenu__ul");
    const asideNavItem = asideMenuUl.querySelector(".asideItemTemp");
    let currentNav;
    dishes.forEach((item) => {
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
    dishes.forEach((item) => {
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
    let dishesListTemp = menuList.querySelector(".dishesListTemp");
    dishes.forEach((item) => {
      let categoryClone = dishesListTemp.content.cloneNode(true);
      let menuCat = categoryClone.querySelector(".menu__cat");
      menuCat.id = item.id;
      menuCat.dataset.name = "cat" + item.id;
      categoryClone.querySelector(".menu__h2").textContent = item.name;
      // let fragmentCard = document.createDocumentFragment();
      let menuCardTemp = menuCat.querySelector(".menuCardTemp");
      let { products, id, name } = item;
      products.forEach((card) => {
        let cardIitemClone = menuCardTemp.content.cloneNode(true);
        cardIitemClone.querySelector(".card__img").src = card.img[0];
        cardIitemClone.querySelector(".card__desc_name").textContent =
          card.name;
        cardIitemClone.querySelector(".card__desc_weight").textContent =
          card.weight + " гр.";
        cardIitemClone.querySelector(".desc_price").textContent = card.price;
        cardIitemClone.querySelector(".menu__list_item").id = card.id;
        menuCat.appendChild(cardIitemClone);
      });
      fragment1.append(categoryClone);
    });
    menuList.innerHTML = "";
    menuList.appendChild(fragment1);
    this.renderTop10(menu);
  }
}
