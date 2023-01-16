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

  renderCategories(menu) {
    let { dishes, tops, toppings } = menu;
    //let {id, name, products} = dishes;
    let quantityDishes = menu.length;
    let menuMobileNav = document.querySelector(".menu__mobile_nav");
    console.log(quantityDishes);
    console.log(menu);
    const fragment = document.createDocumentFragment();
    const navLi = menuMobileNav.querySelector(".nav__li_temp");
    const asideMenuUl = document.querySelector(".asideMenu__ul");
    const asideNavItem = asideMenuUl.querySelector(".asideItemTemp");
    let currentNav;
    dishes.forEach((item) => {
      if (window.innerWidth < 800) {
        const cardClone = navLi.content.cloneNode(true);
        console.log(cardClone);
        cardClone.querySelector(".nav__li").id = item.id;
        cardClone.querySelector(".nav__label").textContent = item.name;
        fragment.append(cardClone);
        currentNav = document.querySelector(".menu__mobile_nav");
      } else {
        const cardClone = asideNavItem.content.cloneNode(true);
        console.log(cardClone);
        cardClone.querySelector(".asideMenu__input").id = item.id;
        cardClone.querySelector(".asideMenu__label").for = item.id;
        currentNav = document.querySelector(".asideMenu__ul");
        cardClone.querySelector(".asideMenu__label").textContent = item.name;
        fragment.append(cardClone);
      }
    });
    currentNav.innerHTML = "";
    currentNav.appendChild(fragment);
    let fragment1 = document.createDocumentFragment();
    const menuList = document.querySelector(".menu__list");
    let dishesListTemp = menuList.querySelector(".dishesListTemp");

    dishes.forEach((item) => {
      let categoryClone = dishesListTemp.content.cloneNode(true);
      let menuCat = categoryClone.querySelector(".menu__cat");
      menuCat.id = item.id;
      menuCat.dataset.name = item.id;
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
    
  }
}
