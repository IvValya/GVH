class dishes {
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
    debugger;
    fetch("dishes.json"/*, "GET"*/)
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => {
        const dishes = JSON.parse(data);
        this.renderCategories(dishes);
      })
      .catch((err) => console.error(err));
    /* const dishes = JSON.parse(dishes.json);
            this.renderCategories(dishes);*/
  }

  renderCategories(dishes) {
    let quantityDishes = dishes.length;
    let menuMobileNav = document.querySelector(".menu__mobile_nav");
    console.log(quantityDishes);
    console.log(dishes);

    const fragment = document.createDocumentFragment();
    const navLi = menuMobileNav.querySelector(".basketTemp");
    navLi.forEach((item) => {
      const cardClone = navLi.content.cloneNode(true);
      console.log(cardClone);
    });
  }
}
