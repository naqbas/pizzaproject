//content container for all pizza
const content = document.querySelector(".content");

//Basket of pizza that we have chosen => it will store pizza object
let basketPizza = [];

//All pizza that we have
let allPizzaOriginal = new Map([
  ["Мясной Микс", 3200],
  ["Чоризо фреш", 1900],
  ["Домашняя", 2400],
  ["Пепперони фреш", 2000],
  ["Овощи и грибы", 2400],
  ["Ветчина и сыр", 2000],
  ["Гавайская", 2400],
  ["Сырный цыпленок", 2700],
  ["Цыпленок ранч", 2700],
  ["Колбаски Барбекю", 2400],
  ["Сырная", 1900],
  ["Маргарита", 2100]
]);
/*
  copy of allPizzaOriginal used as main Map
  for changing by  all | meat | vegetarian | spicy
  and also sorting by priceAsc | priceDesc
  //sorting by price ascending initial value
*/
let allPizza = new Map([...allPizzaOriginal].sort((a, b) => a[1] - b[1]));

// pizza name => img number (for changing images when sorting) 
let pizzaImg = new Map([
  ["Мясной Микс", 1],
  ["Чоризо фреш", 2],
  ["Домашняя", 3],
  ["Пепперони фреш", 4],
  ["Овощи и грибы", 5],
  ["Ветчина и сыр", 6],
  ["Гавайская", 7],
  ["Сырный цыпленок", 8],
  ["Цыпленок ранч", 9],
  ["Колбаски Барбекю", 10],
  ["Сырная", 11],
  ["Маргарита", 12]
]);

//every content pizza block sample
function samplePizza(value, key) {
  return `<div class="content__pizza">
<img src="./images/pizza${pizzaImg.get(key)}.png" alt="">
<p class="pizza__title">${key}</p>
<div class="pizza__options">
  <div class="pizza__type">
    <p class="pizza__thin">${pizzaDough[0]}</p>
    <p class="pizza__traditional">${pizzaDough[1]}</p>
  </div>
  <div class="pizza__size">
    <p class="pizza__small">${pizzaSize[0]}см</p>
    <p class="pizza__medium">${pizzaSize[1]}см</p>
    <p class="pizza__big">${pizzaSize[2]}см</p>
  </div>
</div>
<div class="pizza__choose">
  <p class="pizza__price">от ${value}тг</p>
  <p class="pizza__add">+ Добавить</p>
</div>
</div>`;
}

//class Pizza(name, dough, size) calcultes price by size, used for adding to a basket
class Pizza {
  static totalPrice = 0;
  static totalPizza = 0;
  constructor(name, dough, size) {
    this.name = name;
    this.dough = dough;
    this.size = size;
    this.count = 1;
    switch (this.size) {
      case pizzaSize[0]:
        this.price = allPizza.get(this.name);
        break;
      case pizzaSize[1]:
        this.price = allPizza.get(this.name) + 1000;
        break;
      case pizzaSize[2]:
        this.price = allPizza.get(this.name) + 2000;
        break;
      default:
        this.price = allPizza.get(this.name);
        break;
    }
    Pizza.totalPrice += this.price;
    Pizza.totalPizza += this.count;
  }
}


//Arrays of pizza: all, meat, vegetarian, spicy
let allPizzas = ["Мясной Микс", "Чоризо фреш", "Домашняя", "Пепперони фреш", "Овощи и грибы", "Ветчина и сыр", "Гавайская", "Сырный цыпленок", "Цыпленок ранч", "Колбаски Барбекю", "Сырная", "Маргарита"];
let meatPizzas = ["Мясной Микс", "Чоризо фреш", "Домашняя", "Пепперони фреш", "Ветчина и сыр", "Гавайская", "Сырный цыпленок", "Цыпленок ранч", "Колбаски Барбекю"];
let vegetarianPizzas = ["Овощи и грибы", "Сырная", "Маргарита"];
let spicyPizzas = ["Мясной Микс", "Чоризо фреш", "Колбаски Барбекю"]


//Pizza size and Pizza dough
let pizzaSize = [25, 30, 35];
let pizzaDough = ["тонкое", "традиционное"];

// Working with nav left and right elements

//selecting nav left elements
let all_pizza = document.querySelector("#all__pizza");
let meat_pizza = document.querySelector("#meat__pizza");
let vegetarian_pizza = document.querySelector("#vegetarian__pizza");
let spicy_pizza = document.querySelector("#spicy__pizza");



//first page content using sample pizza
allPizza.forEach((value, key) => content.innerHTML += samplePizza(value, key));

//changing bgColor of all__pizza element
all_pizza.style.backgroundColor = "black";
all_pizza.style.color = "white";


//showing All pizza changing allPizza Map
all_pizza.onclick = function () {
  content.innerHTML = "";
  choosePizzaType(all_pizza, meat_pizza, vegetarian_pizza, spicy_pizza);
  allPizza = new Map();
  allPizzas.forEach(pizza => {
    allPizza.set(pizza, allPizzaOriginal.get(pizza));
  })
  allPizza.forEach((value, key) => content.innerHTML += samplePizza(value, key));
  sortSelection();
}

//showing Meat pizza changing allPizza Map
meat_pizza.onclick = function () {
  content.innerHTML = "";
  choosePizzaType(meat_pizza, all_pizza, vegetarian_pizza, spicy_pizza);
  allPizza = new Map();
  meatPizzas.forEach(meatPizza => {
    allPizza.set(meatPizza, allPizzaOriginal.get(meatPizza));
  })
  allPizza.forEach((value, key) => content.innerHTML += samplePizza(value, key));
  sortSelection();
}
//showing Vegetatian pizza changing allPizza Map
vegetarian_pizza.onclick = function () {
  content.innerHTML = "";
  choosePizzaType(vegetarian_pizza, all_pizza, meat_pizza, spicy_pizza);
  allPizza = new Map();
  vegetarianPizzas.forEach(vegetarianPizza => {
    allPizza.set(vegetarianPizza, allPizzaOriginal.get(vegetarianPizza));
  })
  allPizza.forEach((value, key) => content.innerHTML += samplePizza(value, key));
  sortSelection();
}
//showing Spicy pizza changing allPizza Map
spicy_pizza.onclick = function () {
  content.innerHTML = "";
  choosePizzaType(spicy_pizza, all_pizza, meat_pizza, vegetarian_pizza);
  allPizza = new Map();
  spicyPizzas.forEach(spicyPizza => {
    allPizza.set(spicyPizza, allPizzaOriginal.get(spicyPizza));
  })
  allPizza.forEach((value, key) => content.innerHTML += samplePizza(value, key));
  sortSelection();
}

//Changing bgColor of nav elements (red,white,white,white)
function choosePizzaType(a, b, c, d) {
  a.style.backgroundColor = "black";
  a.style.color = "white";
  b.style.backgroundColor = "white";
  b.style.color = "black";
  c.style.backgroundColor = "white";
  c.style.color = "black";
  d.style.backgroundColor = "white";
  d.style.color = "black";
}

//soring by selection popular | priceAsc | priceDesc changing allPizza Map
document.querySelector("#select").onchange = function () {
  sortSelection();
}
function sortSelection() {
  content.innerHTML = "";
  if (document.querySelector("#select").value == "priceAsc") {
    allPizza = new Map([...allPizza].sort((a, b) => a[1] - b[1]));
  }
  else if (document.querySelector("#select").value == "priceDesc") {
    allPizza = new Map([...allPizza].sort((a, b) => b[1] - a[1]));
  }
  allPizza.forEach((value, key) => content.innerHTML += samplePizza(value, key));
  contentPizzaChanges();
}


/* Working with content pizza => samplePizza*/

//select All pizza titles
let pizzaTitles = document.querySelectorAll(".pizza__title");
let pizzaPrices = document.querySelectorAll(".pizza__price");

//select All pizza thins and pizza taditionals
let pizzaThins = document.querySelectorAll(".pizza__thin");
let pizzaTraditionals = document.querySelectorAll(".pizza__traditional");

//select All pizza small, pizza medium, pizza big
let pizzaSmalls = document.querySelectorAll(".pizza__small");
let pizzaMediums = document.querySelectorAll(".pizza__medium");
let pizzaBigs = document.querySelectorAll(".pizza__big");

//select All pizza add btns
let pizzaAdds = document.querySelectorAll(".pizza__add");

//initial bgColor of pizzaThin and pizzaSmall
pizzaThins.forEach((pizzaThin, index) => {
  pizzaThin.style.backgroundColor = "black";
  pizzaThin.style.color = "white";
  pizzaTraditionals[index].style.backgroundColor = "#F3F3F3";
  pizzaTraditionals[index].style.color = "#2C2C2C";
});
pizzaSmalls.forEach((pizzaSmall, index) => {
  pizzaSmall.style.backgroundColor = "black";
  pizzaSmall.style.color = "white";
  pizzaMediums[index].style.backgroundColor = "#F3F3F3";
  pizzaMediums[index].style.color = "#2C2C2C";
  pizzaBigs[index].style.backgroundColor = "#F3F3F3";
  pizzaBigs[index].style.color = "#2C2C2C";
});


//Checking if thin pizza is clicked
pizzaThins.forEach((pizzaThin, index) => pizzaThin.addEventListener("click", () => {
  pizzaThins[index].style.backgroundColor = "black";
  pizzaThins[index].style.color = "white";
  pizzaTraditionals[index].style.backgroundColor = "#F3F3F3";
  pizzaTraditionals[index].style.color = "#2C2C2C";
}));

//Checking if traditional pizza is clicked
pizzaTraditionals.forEach((pizzaTraditional, index) => pizzaTraditional.addEventListener("click", () => {
  pizzaTraditionals[index].style.backgroundColor = "black";
  pizzaTraditionals[index].style.color = "white";
  pizzaThins[index].style.backgroundColor = "#F3F3F3";
  pizzaThins[index].style.color = "#2C2C2C";
}));


//Checking if small pizza is clicked => changing price
pizzaSmalls.forEach((pizzaSmall, index) => pizzaSmall.addEventListener("click", () => {
  pizzaSmall.style.backgroundColor = "black";
  pizzaSmall.style.color = "white";
  pizzaMediums[index].style.backgroundColor = "#F3F3F3";
  pizzaMediums[index].style.color = "#2C2C2C";
  pizzaBigs[index].style.backgroundColor = "#F3F3F3";
  pizzaBigs[index].style.color = "#2C2C2C";

  let priceTemp = allPizza.get(pizzaTitles[index].textContent);
  pizzaPrices[index].textContent = `от ${priceTemp}тг`;
}));
//Checking if medium pizza is clicked => changing price
pizzaMediums.forEach((pizzaMedium, index) => pizzaMedium.addEventListener("click", () => {
  pizzaMedium.style.backgroundColor = "black";
  pizzaMedium.style.color = "white";
  pizzaSmalls[index].style.backgroundColor = "#F3F3F3";
  pizzaSmalls[index].style.color = "#2C2C2C";
  pizzaBigs[index].style.backgroundColor = "#F3F3F3";
  pizzaBigs[index].style.color = "#2C2C2C";

  let priceTemp = allPizza.get(pizzaTitles[index].textContent) + 1000;
  pizzaPrices[index].textContent = `от ${priceTemp}тг`;
}));
//Checking if big pizza is clicked => changing price
pizzaBigs.forEach((pizzaBig, index) => pizzaBig.addEventListener("click", () => {
  pizzaBig.style.backgroundColor = "black";
  pizzaBig.style.color = "white";
  pizzaSmalls[index].style.backgroundColor = "#F3F3F3";
  pizzaSmalls[index].style.color = "#2C2C2C";
  pizzaMediums[index].style.backgroundColor = "#F3F3F3";
  pizzaMediums[index].style.color = "#2C2C2C";

  let priceTemp = allPizza.get(pizzaTitles[index].textContent) + 2000;
  pizzaPrices[index].textContent = `от ${priceTemp}тг`;
}));

//Checking if add pizza is clicked => changing price
pizzaAdds.forEach((pizzaAdd, index) => pizzaAdd.addEventListener("click", () => {

  let titlePizza = pizzaTitles[index].textContent;
  let thinPizza = pizzaThins[index].textContent;
  let traditionalPizza = pizzaTraditionals[index].textContent;

  let thinPizzaColor = pizzaThins[index].style.backgroundColor;
  let traditionalPizzaColor = pizzaTraditionals[index].style.backgroundColor;
  let smallPizzaColor = pizzaSmalls[index].style.backgroundColor;
  let mediumPizzaColor = pizzaMediums[index].style.backgroundColor;
  let bigPizzaColor = pizzaBigs[index].style.backgroundColor;

  let sizePizza;
  //Checking size of pizza
  if (smallPizzaColor == "black") {
    sizePizza = pizzaSize[0];
  }
  else if (mediumPizzaColor == "black") {
    sizePizza = pizzaSize[1];
  }
  else if (bigPizzaColor == "black") {
    sizePizza = pizzaSize[2];;
  }
  //Adding pizza to a basket
  basketPizza.push(new Pizza(titlePizza, thinPizzaColor == "black" ? thinPizza : traditionalPizza, sizePizza));
  //if pizza exists pizza count += 1
  let pizzaExist = titlePizza + " " + (thinPizzaColor == "black" ? thinPizza : traditionalPizza) + " " + sizePizza;
  basketPizza.forEach((pizza, index) => {
    let checkPizza = pizza.name + " " + pizza.dough + " " + pizza.size;
    if (checkPizza == pizzaExist && index != (basketPizza.length - 1)) {
      pizza.count += 1;
      basketPizza.pop();
    }
  });
  //Changing total price and amount of pizza
  document.querySelector("#totalPrice").textContent = Pizza.totalPrice + "тг";
  document.querySelector("#totalPizza").textContent = Pizza.totalPizza;

}));

function contentPizzaChanges() {
  /* Working with content pizza => samplePizza*/

  //select All pizza titles
  pizzaTitles = document.querySelectorAll(".pizza__title");
  pizzaPrices = document.querySelectorAll(".pizza__price");

  //select All pizza thins and pizza taditionals
  pizzaThins = document.querySelectorAll(".pizza__thin");
  pizzaTraditionals = document.querySelectorAll(".pizza__traditional");

  //select All pizza small, pizza medium, pizza big
  pizzaSmalls = document.querySelectorAll(".pizza__small");
  pizzaMediums = document.querySelectorAll(".pizza__medium");
  pizzaBigs = document.querySelectorAll(".pizza__big");

  //select All pizza add btns
  pizzaAdds = document.querySelectorAll(".pizza__add");

  //initial bgColor of pizzaThin and pizzaSmall
  pizzaThins.forEach((pizzaThin, index) => {
    pizzaThin.style.backgroundColor = "black";
    pizzaThin.style.color = "white";
    pizzaTraditionals[index].style.backgroundColor = "#F3F3F3";
    pizzaTraditionals[index].style.color = "#2C2C2C";
  });
  pizzaSmalls.forEach((pizzaSmall, index) => {
    pizzaSmall.style.backgroundColor = "black";
    pizzaSmall.style.color = "white";
    pizzaMediums[index].style.backgroundColor = "#F3F3F3";
    pizzaMediums[index].style.color = "#2C2C2C";
    pizzaBigs[index].style.backgroundColor = "#F3F3F3";
    pizzaBigs[index].style.color = "#2C2C2C";
  });


  //Checking if thin pizza is clicked
  pizzaThins.forEach((pizzaThin, index) => pizzaThin.addEventListener("click", () => {
    pizzaThins[index].style.backgroundColor = "black";
    pizzaThins[index].style.color = "white";
    pizzaTraditionals[index].style.backgroundColor = "#F3F3F3";
    pizzaTraditionals[index].style.color = "#2C2C2C";
  }));

  //Checking if traditional pizza is clicked
  pizzaTraditionals.forEach((pizzaTraditional, index) => pizzaTraditional.addEventListener("click", () => {
    pizzaTraditionals[index].style.backgroundColor = "black";
    pizzaTraditionals[index].style.color = "white";
    pizzaThins[index].style.backgroundColor = "#F3F3F3";
    pizzaThins[index].style.color = "#2C2C2C";
  }));


  //Checking if small pizza is clicked => changing price
  pizzaSmalls.forEach((pizzaSmall, index) => pizzaSmall.addEventListener("click", () => {
    pizzaSmall.style.backgroundColor = "black";
    pizzaSmall.style.color = "white";
    pizzaMediums[index].style.backgroundColor = "#F3F3F3";
    pizzaMediums[index].style.color = "#2C2C2C";
    pizzaBigs[index].style.backgroundColor = "#F3F3F3";
    pizzaBigs[index].style.color = "#2C2C2C";

    let priceTemp = allPizza.get(pizzaTitles[index].textContent);
    pizzaPrices[index].textContent = `от ${priceTemp}тг`;
  }));
  //Checking if medium pizza is clicked => changing price
  pizzaMediums.forEach((pizzaMedium, index) => pizzaMedium.addEventListener("click", () => {
    pizzaMedium.style.backgroundColor = "black";
    pizzaMedium.style.color = "white";
    pizzaSmalls[index].style.backgroundColor = "#F3F3F3";
    pizzaSmalls[index].style.color = "#2C2C2C";
    pizzaBigs[index].style.backgroundColor = "#F3F3F3";
    pizzaBigs[index].style.color = "#2C2C2C";

    let priceTemp = allPizza.get(pizzaTitles[index].textContent) + 1000;
    pizzaPrices[index].textContent = `от ${priceTemp}тг`;
  }));
  //Checking if big pizza is clicked => changing price
  pizzaBigs.forEach((pizzaBig, index) => pizzaBig.addEventListener("click", () => {
    pizzaBig.style.backgroundColor = "black";
    pizzaBig.style.color = "white";
    pizzaSmalls[index].style.backgroundColor = "#F3F3F3";
    pizzaSmalls[index].style.color = "#2C2C2C";
    pizzaMediums[index].style.backgroundColor = "#F3F3F3";
    pizzaMediums[index].style.color = "#2C2C2C";

    let priceTemp = allPizza.get(pizzaTitles[index].textContent) + 2000;
    pizzaPrices[index].textContent = `от ${priceTemp}тг`;
  }));

  //Checking if add pizza is clicked => changing price
  pizzaAdds.forEach((pizzaAdd, index) => pizzaAdd.addEventListener("click", () => {

    let titlePizza = pizzaTitles[index].textContent;
    let thinPizza = pizzaThins[index].textContent;
    let traditionalPizza = pizzaTraditionals[index].textContent;

    let thinPizzaColor = pizzaThins[index].style.backgroundColor;
    let traditionalPizzaColor = pizzaTraditionals[index].style.backgroundColor;
    let smallPizzaColor = pizzaSmalls[index].style.backgroundColor;
    let mediumPizzaColor = pizzaMediums[index].style.backgroundColor;
    let bigPizzaColor = pizzaBigs[index].style.backgroundColor;

    let sizePizza;
    //Checking size of pizza
    if (smallPizzaColor == "black") {
      sizePizza = pizzaSize[0];
    }
    else if (mediumPizzaColor == "black") {
      sizePizza = pizzaSize[1];
    }
    else if (bigPizzaColor == "black") {
      sizePizza = pizzaSize[2];;
    }

    //Adding pizza to a basket
    basketPizza.push(new Pizza(titlePizza, thinPizzaColor == "black" ? thinPizza : traditionalPizza, sizePizza));
    //if pizza exists pizza count += 1
    let pizzaExist = titlePizza + " " + (thinPizzaColor == "black" ? thinPizza : traditionalPizza) + " " + sizePizza;
    basketPizza.forEach((pizza, index) => {
      let checkPizza = pizza.name + " " + pizza.dough + " " + pizza.size;
      if (checkPizza == pizzaExist && index != (basketPizza.length - 1)) {
        pizza.count += 1;
        basketPizza.pop();
      }
    });
    //Changing total price and amount of pizza
    document.querySelector("#totalPrice").textContent = Pizza.totalPrice + "тг";
    document.querySelector("#totalPizza").textContent = Pizza.totalPizza;
  }));
};


/*           (working with Basket page)             */

//Content of the basket page
let content__basket = document.querySelector("#content__basket");
let content__main = document.querySelector("#content__main");

//Hiding basket page
content__basket.style.display = "none";

//if there is no pizza => content pizza empty
let contentPizzaBasketText = "";
let contentPizzaEmpty = `<p>Корзина пустая</p>
  <p>Вероятней всего, вы не заказывали еще пиццу</p>
  <p>Для того, чтобы заказать пиццу, перейди на главную страницу</p>`;

//Showing basket page when clicking to basket
document.querySelector(".header__right").onclick = function () {

  content__main.style.display = "none";
  content__basket.style.display = "block";

  //Filling content of basket page by basketPizza array of pizza elements
  basketPizza.forEach(pizza => contentPizzaBasket(pizza));
  // For deleting pizza element and checking recursively if basket is empty?
  deletePizzaElement();
}

// For deleting pizza elements
function deletePizzaElement() {
  if (basketPizza.length == 0) {
    content__basket.innerHTML = contentBasket(contentPizzaEmpty);
    document.querySelector("#totalPizzaChange").innerHTML = Pizza.totalPizza;
    document.querySelector("#totalPriceChange").textContent = `${Pizza.totalPrice}тг`;
  }
  else {
    content__basket.innerHTML = contentBasket(contentPizzaBasketText);
    let countTexts = document.querySelectorAll(".countText");
    let pizzaCountPluses = document.querySelectorAll(".pizzaCountPlus");
    let pizzaCountMinuses = document.querySelectorAll(".pizzaCountMinus");
    let countMultPrices = document.querySelectorAll(".countMultPrice");
    let deletePizzas = document.querySelectorAll(".deletePizza");

    deletePizzas.forEach((deletePizza, index) => deletePizza.addEventListener("click", () => {
      Pizza.totalPizza -= basketPizza[index].count;
      Pizza.totalPrice -= basketPizza[index].price * basketPizza[index].count;
      basketPizza.splice(index, 1);

      contentPizzaBasketText = "";
      basketPizza.forEach(pizza => contentPizzaBasket(pizza));
      content__basket.innerHTML = contentBasket(contentPizzaBasketText);
      document.querySelector("#totalPizzaChange").innerHTML = Pizza.totalPizza;
      document.querySelector("#totalPriceChange").textContent = `${Pizza.totalPrice}тг`;
      deletePizzaElement();
    }));
    pizzaCountPluses.forEach((countPlus, index) => countPlus.addEventListener("click", () => {
      if (basketPizza[index].count < 10) {
        basketPizza[index].count += 1;
        countTexts[index].innerHTML = basketPizza[index].count;
        countMultPrices[index].innerHTML = basketPizza[index].count * basketPizza[index].price + "тг";

        Pizza.totalPizza += 1;
        Pizza.totalPrice += basketPizza[index].price;
        document.querySelector("#totalPizzaChange").innerHTML = Pizza.totalPizza;
        document.querySelector("#totalPriceChange").textContent = `${Pizza.totalPrice}тг`;
      }
    }));
    pizzaCountMinuses.forEach((countMinus, index) => countMinus.addEventListener("click", () => {
      if (basketPizza[index].count > 1) {
        basketPizza[index].count -= 1;
        countTexts[index].innerHTML = basketPizza[index].count;
        countMultPrices[index].innerHTML = basketPizza[index].count * basketPizza[index].price + "тг";

        Pizza.totalPizza -= 1;
        Pizza.totalPrice -= basketPizza[index].price;
        document.querySelector("#totalPizzaChange").innerHTML = Pizza.totalPizza;
        document.querySelector("#totalPriceChange").textContent = `${Pizza.totalPrice}тг`;
      }
    }));
  }
  //Showing main page when clicking to back button and clearing contentPizzaBasketText
  document.querySelector("#back").onclick = function () {
    contentPizzaBasketText = "";
    content__basket.style.display = "none"
    content__main.style.display = "block";
    document.querySelector("#totalPrice").textContent = Pizza.totalPrice + "тг";
    document.querySelector("#totalPizza").textContent = Pizza.totalPizza;
  }
  document.querySelector("#payBtn").onclick = function () {
    if (basketPizza.length != 0) {
      let finishText = "";
      basketPizza.forEach(pizza => {
        finishText += pizza.name + "=> " + pizza.dough + " тесто, " + pizza.size + "см, " + pizza.count + "шт, на " + (pizza.count * pizza.price) + "тг" + "\n";
      });
      finishText += "Всего пицц: " + Pizza.totalPizza + "шт" + "\n" + "Сумма заказов: " + Pizza.totalPrice + "тг" + "\n" + "Приятного аппетита!" + "\n" + "Спасибо за покупку!";
      alert(finishText);
    }
  }
  document.querySelector("#deleteAllPizza").onclick = function () {
    basketPizza = [];
    Pizza.totalPizza = 0;
    Pizza.totalPrice = 0;
    deletePizzaElement();
  };
}


//to include every pizza element contentPizzaBasketText => to display
function contentPizzaBasket(pizza) {
  contentPizzaBasketText += `<div class="content__pizza_basket">
    <div class="pizza__left_basket">
      <img src="./images/pizza${pizzaImg.get(pizza.name)}.png" alt="logo">
      <div class="pizza__title">
        <p>${pizza.name}</p>
        <p>${pizza.dough} тесто, ${pizza.size}см</p>
      </div>
    </div>
    <div class="pizza__count_basket">
      <p class="pizzaCountMinus">-</p>
      <p class="countText">${pizza.count}</p>
      <p class="pizzaCountPlus">+</p>
    </div>
    <p class="countMultPrice">${pizza.count * pizza.price}тг</p>
    <p class="deletePizza">x</p>
  </div>`;
}

// Content of basket page sample
function contentBasket(text) {
  return `<header class="header__basket">
    <img src="./images/logo.png" alt="logo">
    <div class="header__title_basket">
      <p>PIZZA</p>
      <p>самая вкусная пицца во вселенной</p>
    </div>
  </header>
  <div class="contentB">
    <div class="content__header_basket">
      <p>Корзина</p>
      <p id="deleteAllPizza">Очистить корзину</p>
    </div>
    ${text}
    <div class="content__count_basket">
      <div class="count__left_basket">
        <p>Всего пицц:</p>
        <p id="totalPizzaChange">${Pizza.totalPizza}</p>
      </div>
      <div class="count__right_basket">
        <p>Сумма заказов:</p>
        <p id="totalPriceChange">${Pizza.totalPrice}тг</p>
      </div>
    </div>
    <div class="content__buy_basket">
      <p id="back">< Вернуться назад</p>
      <p id="payBtn">Оплатить сейчас</p>
    </div>
  </div>`;
}