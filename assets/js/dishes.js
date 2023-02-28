let formDataAuth = new FormData();
let profileData;
var numberBonuses = 0;
var menuData;
let timeJSON = [
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 0,
      hour: 24,
      minute: 00,
    },
  ],
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 0,
      hour: 24,
      minute: 00,
    },
  ],
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 0,
      hour: 24,
      minute: 00,
    },
  ],
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 0,
      hour: 24,
      minute: 00,
    },
  ],
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 1,
      hour: 00,
      minute: 00,
    },
  ],
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 0,
      hour: 24,
      minute: 00,
    },
  ],
  [
    {
      hour: 11,
      minute: 00,
    },
    {
      day: 0,
      hour: 24,
      minute: 00,
    },
  ],
];
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
        if (page === 4) {
          this.loadScript("/assets/js/profile.js");
        }
        if (page === 5) {
          this.loadScript("/assets/js/template.js");
        }
        document.querySelector(".header__nav a:first-child").href = linkToMenu;
        document.querySelector(".mobile__nav a:first-child").href = linkToMenu;
        document.querySelector(".footerMenu").href = linkToMenu;
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
fetch(urlPostAuth, {
  body: formDataAuth,
  method: "post",
})
  .then((response) => response.json())
  .then((response) => {
    console.log(response.isAuth);
    profileData = response;
    dishesList.load();
    if (response.isAuth) {
      console.log(response.isAuth);
      numberBonuses = parseInt(response.points);
      document.querySelector(".mobile__profile_img img").src = iconInProfile;
      document.querySelector(".profile__img").src = iconInProfile;
      /*document.querySelectorAll(".profileDropDown").forEach((item) => {
        item.style.display = "flex";
      })*/
      document.querySelector(".enter").style.display = "none";
    } else {
      numberBonuses = 0;
      document.querySelector(".mobile__profile_img img").src = iconOutProfile;
      document.querySelector(".profile__img").src = iconOutProfile;
      document.querySelector(".enter").style.display = "inline";
      document.querySelectorAll(".profileDropDown").forEach((item) => {
        item.style.display = "none";
      });
    }
  });

var timerTime;
/*
function renderIndicator() {
  let indicator = document.querySelector(".indicator");
  let textWorkTime = document.querySelector(".workTime__span_now");
  let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  let previousTimeClose = moment();
  previousTimeClose = previousTimeClose.set({ hour: 0, minute: 0, second: 0 });
  previousTimeClose = previousTimeClose.subtract(1, "days");
  let previousDayClose;
  let currentDay;
  let nullTime;
  let currentDayOpen;
  let currentDayClose;
  let now;
  let timeOpen;
  let timeClose;
  currentDay = parseInt(moment().format("e"));
  if (currentDay === 0) {
    previousDayClose = timeJSON[6][1];
  } else {
    previousDayClose = timeJSON[currentDay - 1][1];
  }
  previousTimeClose = previousTimeClose.add({
    days: previousDayClose.day,
    hour: previousDayClose.hour,
    minute: previousDayClose.minute,
  });
  nullTime = moment();
  nullTime = nullTime.set({ hour: 0, minute: 0, second: 0 });
  currentDayOpen = timeJSON[currentDay][0];
  currentDayClose = timeJSON[currentDay][1];
  now = moment();
  timeOpen = moment();
  timeOpen = timeOpen.set({
    hour: currentDayOpen.hour,
    minute: currentDayOpen.minute,
    second: 0,
  });
  timeClose = nullTime;
  timeClose = timeClose.add({
    days: currentDayClose.day,
    hour: currentDayClose.hour,
    minute: currentDayClose.minute,
  });

  timerTime = setInterval(() => {
    currentDay = parseInt(moment().format("e"));
    if (currentDay === 0) {
      previousDayClose = timeJSON[6][1];
    } else {
      previousDayClose = timeJSON[currentDay - 1][1];
    }
    previousTimeClose = previousTimeClose.add({
      days: previousDayClose.day,
      hour: previousDayClose.hour,
      minute: previousDayClose.minute,
    });
    nullTime = moment();
    nullTime = nullTime.set({ hour: 0, minute: 0, second: 0 });
    currentDayOpen = timeJSON[currentDay][0];
    currentDayClose = timeJSON[currentDay][1];
    now = moment();
    timeOpen = moment();
    timeOpen = timeOpen.set({
      hour: currentDayOpen.hour,
      minute: currentDayOpen.minute,
      second: 0,
    });
    timeClose = nullTime;
    timeClose = timeClose.add({
      days: currentDayClose.day,
      hour: currentDayClose.hour,
      minute: currentDayClose.minute,
    });
    if (
      (timeOpen.format("DD-MM-YY HH:mm") <= now.format("DD-MM-YY HH:mm") &&
        now.format("DD-MM-YY HH:mm") < timeClose.format("DD-MM-YY HH:mm")) ||
      now.format("DD-MM-YY HH:mm") < previousTimeClose.format("DD-MM-YY HH:mm")
    ) {
      indicator.classList.remove("closeInd");
      indicator.classList.add("openInd");
      textWorkTime.textContent = "Сейчас работаем";
    } else {
      indicator.classList.remove("openInd");
      indicator.classList.add("closeInd");
      textWorkTime.textContent = "Сейчас закрыты";
    }
  }, 60000);
}

document.addEventListener("DOMContentLoaded", () => {
  clearInterval(timerTime);
  renderIndicator();
});
*/


let datesWeek = [
  {
    from: "11:00",
    to: "24:00",
  },
  {
    from: "11:00",
    to: "24:00",
  },
  {
    from: "11:00",
    to: "24:00",
  },
  {
    from: "11:00",
    to: "24:00",
  },
  {
    from: "11:00",
    to: "24:00",
  },
  {
    from: "11:00",
    to: "24:00",
  },
  {
    from: "11:00",
    to: "24:00",
  },
];


function renderIndicatorTime() {
  let indicator = document.querySelector(".indicator");
  let textWorkTime = document.querySelector(".workTime__span_now");
  let workSpan = document.querySelector(".workTime__span");
  let currentDay = parseInt(moment().format("e"));
  let previousDay;
  if (currentDay === 0) {
    currentDay = 6;
  } else {
    currentDay = currentDay - 1;
  }
  if (currentDay === 0) {
    previousDay = 6;
  } else {
    previousDay = currentDay - 1;
  }
  let nowDateOnly = moment().format("YYYY-MM-DD");
  let prevDateOnly = moment().subtract(1, "days").format("YYYY-MM-DD");
  let isOpenNow = false;
  let curData = datesWeek[currentDay];
  let prevData = datesWeek[previousDay];
  let fromDate = moment(nowDateOnly + " " + curData.from, "YYYY-MM-DD HH:mm");
  let toDate = moment(nowDateOnly + " " + curData.to, "YYYY-MM-DD HH:mm");
  let fromDatePrev = moment(
    prevDateOnly + " " + prevData.from,
    "YYYY-MM-DD HH:mm"
  );
  let toDatePrev = moment(
    prevDateOnly + " " + prevData.to,
    "YYYY-MM-DD HH:mm"
  );
  if (toDate < fromDate) {
    toDate = toDate.add(1, "days");
  }
  if (toDatePrev < fromDatePrev) {
    toDatePrev = toDatePrev.add(1, "days");
  }
  if (moment().isBetween(fromDate, toDate) || moment() < toDatePrev) {
    isOpenNow = true;
  }
  console.log(isOpenNow);
  if (isOpenNow) {
    indicator.classList.remove("closeInd");
    indicator.classList.add("openInd");
    textWorkTime.textContent = "Сейчас работаем";
  } else {
    indicator.classList.remove("openInd");
    indicator.classList.add("closeInd");
    textWorkTime.textContent = "Сейчас закрыты";
    let days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    let text = days[0];
    let countStart = 0;
    let countEnd = 0;
    let count = 0;
    let arrayText = [];
    let is = false;
    for (let i = 0; i < datesWeek.length - 1; i++) {
      if (
        datesWeek[i].from === datesWeek[i + 1].from &&
        datesWeek[i].to === datesWeek[i + 1].to
      ) {
        is = true;
        countEnd = i + 1;
        arrayText[count] =
          text +
          "-" +
          days[countEnd] +
          ": " +
          datesWeek[i + 1].from +
          "-" +
          datesWeek[i + 1].to;
        console.log(
          text +
            "-" +
            days[countEnd] +
            ": " +
            datesWeek[i + 1].from +
            "-" +
            datesWeek[i + 1].to
        );
      } else {
        if (countStart === countEnd || is) {
          count++;
        }
        arrayText[count] =
          days[i + 1] +
          ": " +
          datesWeek[i + 1].from +
          "-" +
          datesWeek[i + 1].to;
        
        countStart = i + 1;
        countEnd = i + 1;
        text = days[i + 1];
      }
    }
    workSpan.textContent = "";
    for (let k=0; k <= count; k++) {
      workSpan.innerHTML += arrayText[k] + "</br>";
    }
  }
}

function renderIndicator() {
  renderIndicatorTime();
  timerTime = setInterval(() => {
    renderIndicatorTime();
  }, 60000);
 
};
document.addEventListener("DOMContentLoaded", () => {
  clearInterval(timerTime);
  renderIndicator();
});