let formDataAuth = new FormData();
let profileData;
var numberBonuses = 0;

fetch(urlPostAuth, {
  body: formDataAuth,
  method: "post",
})
  .then((response) => response.json())
  .then((response) => {
    console.log(response.isAuth);
    profileData = response;
    if (response.isAuth) {      
      numberBonuses = parseInt(response.points);
      document.querySelector(".mobile__profile_img img").src = iconInProfile;
      document.querySelector(".profile__img").src = iconInProfile;
      document.querySelector(".mobile__profile span").textContent =
        "ПРОФИЛЬ  |  ВЫЙТИ";
    } else {
      numberBonuses = 0;
      document.querySelector(".mobile__profile_img img").src = iconOutProfile;
      document.querySelector(".profile__img").src = iconOutProfile;
      document.querySelector(".mobile__profile span").textContent = "ВОЙТИ";
    }
  });

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

  loadScript(src) {
    let script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.body.append(script);
    let modalAuth = document.querySelector(".modalAuth");
    if (modalAuth) {
      console.log("!");
    } else {
      fetch("/auth.html")
        .then((response) => response.text())
        .then((text) => {
          let div = document.createElement("div");
          div.className = "modalAuth";
          div.innerHTML = text;
          document.body.appendChild(div);
          let scriptAuth = document.createElement("script");
          scriptAuth.src = srcScriptAuth;
          div.after(scriptAuth);
        });
    }
  }

  load() {
    fetch(urLForGet)
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        menuData = data;
        console.log(menuData);
        this.renderCategories(data);
        if (page === 1) {
          this.loadScript("/assets/js/index.js");
        }
        if (page === 2) {
          this.loadScript("/assets/js/order.js");
        }
        if (page === 3) {
          this.renderFrontpage();
          this.loadScript("/assets/js/frontpage.js");
        }
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
        let price;

        if (card) {
          if (card.sale_price === 0) {
            price = card.price;
          } else {
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
  renderFrontpage() {
    const { meals } = menuData;
    const mainMenu = document.querySelector(".menu__main");
    const fragment = document.createDocumentFragment();
    const itemMenuTemp = document.querySelector(".itemMenuTemp");
    meals.forEach((item) => {
      let cardClone = itemMenuTemp.content.cloneNode(true);
      let className = item.columns;
      let itemNMenu = cardClone.querySelector(".menu__main_item");
      itemNMenu.href = linkToMenuPage + item.name;
      itemNMenu.classList.add(className);
      cardClone.querySelector(".menu__main_h2").textContent = item.name;
      cardClone.querySelector(".menu__main_img").src = item.main_pic;
      fragment.append(cardClone);
    });
    mainMenu.innerHTML = "";
    mainMenu.appendChild(fragment);
  }

  renderCategories(menu) {
    let { meals } = menu;
    let menuMobileNav = document.querySelector(".menu__mobile_nav");
    const asideMenuUl = document.querySelector(".asideMenu__ul");
    const asideNavItem = document.querySelector(".asideItemTemp");
    let currentNav;

    if (page === 1) {
      const fragment = document.createDocumentFragment();
      const navLi = document.querySelector(".nav__li_temp");

      meals.forEach((item) => {
        const cardClone = navLi.content.cloneNode(true);
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
      document.querySelector(".nav__label").classList.add("nav__label_active");
      meals.forEach((item) => {
        const cardCloneAside = asideNavItem.content.cloneNode(true);
        cardCloneAside.querySelector(".asideMenu__input").id = "cat" + item.id;
        cardCloneAside
          .querySelector(".asideMenu__label")
          .setAttribute("for", "cat" + item.id);
        currentNav = document.querySelector(".asideMenu__ul");
        cardCloneAside.querySelector(".asideMenu__label").textContent =
          item.name;
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
        let menuH2 = categoryClone.querySelector(".menu__h2");
        menuH2.textContent = item.name;
        menuH2.id = item.name;
        // document.querySelector(".anchorCat").name = item.name;
        // let fragmentCard = document.createDocumentFragment();
        let menuCardTemp = document.querySelector(".menuCardTemp");
        let { products, id, name } = item;
        products.forEach((card) => {
          let price;
          if (card.sale_price === 0) {
            price = card.price;
          } else {
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
    }
    if (window.innerWidth > 800) {
      let fragmentAside = document.createDocumentFragment();
      meals.forEach((item) => {
        const cardCloneAside = asideNavItem.content.cloneNode(true);
        cardCloneAside.querySelector(".asideMenu__input").id = "cat" + item.id;
        cardCloneAside
          .querySelector(".asideMenu__label")
          .setAttribute("for", "cat" + item.id);
        currentNav = document.querySelector(".asideMenu__ul");
        if (page !== 1) {
          let asideMenuDiv = cardCloneAside.querySelector(".asideMenu__div");
          asideMenuDiv.dataset.catHref = linkToMenuPage + item.name;
          // cardCloneAside.querySelector(".asideMenu__a").href = linkToMenuPage + item.name;
        }
        cardCloneAside.querySelector(".asideMenu__label").textContent =
          item.name;
        fragmentAside.append(cardCloneAside);
      });
      currentNav.innerHTML = "";
      currentNav.appendChild(fragmentAside);
      document
        .querySelector(".asideMenu__label")
        .classList.add("category_active");
    }
    this.renderTop10(menu);
    if (page !== 1 && window.innerWidth > 800) {
      const asideMenu__label = document.querySelector(".category_active");
      asideMenu__label.classList.remove("category_active");
    }
  }
}
let dishesList = new dishesL();
dishesList.load();
