let data;
class order {
  renderBasket() {
    const { basket } = data;
    const fragment = document.createDocumentFragment();
    const basketCard = document.querySelector(".basketCardTemp");
    const orderList = document.querySelector(".order__list");
    basket.forEach((item) => {
      const cardClone = basketCard.content.cloneNode(true);
      cardClone.querySelector(".basket__card_img").src = item.card.img;
      cardClone.querySelector(".basket__h3").textContent = item.card.name;
      cardClone.querySelector(".basket__weight").textContent = item.card.weight;
      cardClone.querySelector(".basket__price").textContent = item.card.price;
      fragment.append(cardClone);
    });
    orderList.innerHTML = "";
    orderList.appendChild(fragment);
  }

  renderExtra() {
    const extra  = menuData.meals[(menuData.meals.length - 1)].products;
    console.log(extra);
    const fragment = document.createDocumentFragment();
    const toppingCardTemp = document.querySelector(".toppingCardTemp");
    const orderToppingList = document.querySelector(".order__topping_list");
    extra.forEach((item) => {
        const cardClone = toppingCardTemp.content.cloneNode(true);
        cardClone.querySelector(".basket__h3").textContent = item.name;
        cardClone.querySelector(".basket__price").textContent = parseInt(item.price);
        cardClone.querySelector(".order__topping_desc").textContent = item.description + " " + item.content; //Заполнить когда появится новая структура
        cardClone.querySelector(".input_text").value = "0";   //Заполнить из корзины
        fragment.append(cardClone);
    })
    orderToppingList.innerHTML ="";
    orderToppingList.appendChild(fragment);
  }

  renderAddress() {}

  renderPayment() {}

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
    fetch("order.json" /*, "GET"*/)
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((order) => {
        data = order;
        this.renderBasket();
        this.renderExtra();
      })
      .catch((err) => console.error(err));
  }

  save() {}
}

let orderNew = new order();
orderNew.load(); 
