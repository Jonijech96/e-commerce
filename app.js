const menuBtn = document.querySelector(".button-menu");
const menuDisplay = document.querySelector(".menu");
const closeBtn = document.querySelector(".button-close");
const cartBtn = document.querySelector(".cart-shop");
const cartDisplay = document.querySelector(".cart");
const closeCart = document.querySelector(".cart__close");
const cartTotal = document.querySelector(".cart__total");
const buyBtn = document.querySelector(".cart__button-buy");


//contador 
const cartCount = document.querySelector(".cart-number");

// let totalPrice = 0;

const cardsDefault = [
  {title:"Hoodies",stock:10,price:14,img:"featured1",id:0},
  {title:"Shirts",stock:15,price:24,img:"featured2",id:1},
  {title:"Sweatshirts",stock:20,price:24,img:"featured3",id:2},
];

let cartArray= JSON.parse(localStorage.getItem("carts")) || [];

let cartGrid = document.querySelector(".cart__grid");

let cardArray = JSON.parse(localStorage.getItem("cards")) || cardsDefault;

const cardDisplay = document.querySelector(".products__content");

createCard();
createCartItem();

const cartItem = document.querySelectorAll(".cart__item");


//para agregar desde la card
const cardAdd = document.querySelectorAll(".card-add");

cartBtn.addEventListener("click",()=>{
  cartDisplay.classList.add("cart--activate");
});

menuBtn.addEventListener("click",()=>{
  menuDisplay.classList.toggle("menu--activate");
});

closeBtn.addEventListener("click",()=>{
  menuDisplay.classList.toggle("menu--activate");
});

closeCart.addEventListener("click",()=>{
  cartDisplay.classList.toggle("cart--activate");
});



buyBtn.addEventListener("click",()=>{
  cartArray.forEach((cart)=>{
    cardArray[cart.id].stock -= cart.stock;
  })
  cartArray = [];
  createCard();
  createCartItem();
})

cardDisplay.addEventListener("click",(e)=>{
  
  if (e.target.textContent == "+") {
    
    let cardSelect = cardArray.find(card => card.id == e.target.parentElement.id);
    let indice = cartArray.findIndex(cart=>cart.id==cardSelect.id);
    if (indice !== -1 && cartArray[indice].stock < cardSelect.stock) {
      cartArray[indice].stock ++;
    }else
    if (indice == -1 && cardSelect.stock > 1) {
      cartArray.push({
        id:cardSelect.id,
        stock:1,
      })
    }else{
        window.alert("no hay suficiente stock");
      }  
      createCartItem();
      localStorage.setItem("carts",JSON.stringify(cartArray));
  }
})

cartGrid.addEventListener("click",(e)=>{
  let idSelected = null;
  let indexCart = null; 
  
  switch (e.target.textContent) {
    case "delete":
      cartArray.splice(cartArray.findIndex(cart=>cart.id==e.target.parentElement.getAttribute("id")),1);
      createCartItem();
      break;
    case "+":
      idSelected = e.target.parentElement.parentElement.getAttribute("id");
      indexCart = cartArray.findIndex(e=>e.id==idSelected);
      if (cartArray[indexCart].stock < cardArray[idSelected].stock) {
        cartArray[indexCart].stock ++;
      }else{
        window.alert("no hay suficiente stock");
      }
      createCartItem();
      break;
    case "-":
      idSelected = e.target.parentElement.parentElement.getAttribute("id");
      indexCart = cartArray.findIndex(e=>e.id==idSelected);
      if (cartArray[indexCart].stock > 1) {
        cartArray[indexCart].stock --;
      }else{
        cartArray.splice(indexCart,1);
        console.log("me quede en 0");
      }
      createCartItem();
      break;        
      default:
      break;
    }
})


function createCartItem() {
  let totalPrice = 0;
  let count = 0;
  const elements = cartArray.map((cart)=>{
    const title = cardArray[cart.id].title;
    const stock = cardArray[cart.id].stock;
    const price = cardArray[cart.id].price;
    const img = cardArray[cart.id].img;
    totalPrice += cart.stock * price;
    count += cart.stock;

    return `
    <div class="cart__item" id="${cart.id}">
    <img class="cart__img" src="./assets/img/${img}.png" alt="">
    <div class="cart__content">
      <h3 class="card__title">${title}</h3>
      <span class="filter__stock border-right">Stock: ${stock}</span><span class="cart__price">$${price}.00</span>
      <p class="cart__subtotal">Subtotal: $${cart.stock * price}.00</p>
      <button>-</button><span class="cart-units">${cart.stock} units</span><button>+</button>
    </div>
    <button>delete</button>
  </div>
    `
  });
  cartGrid.innerHTML = elements.join("");
  cartCount.innerHTML = count;
  cartTotal.innerHTML = `
    <p>${count} items</p>
    <h3>$${totalPrice}.00</h3>
  `;
  localStorage.setItem("carts",JSON.stringify(cartArray));
}

function createCard () {
  const elements =  cardArray.map((card)=>{
    return `
      <div class="products__card card" id=${card.id}>
        <button class="card-add">+</button>
        <div class="card__content__img">
          <img class="card__img" src="./assets/img/${card.img}.png" alt="">
        </div>
        <div class="card__text">
          <h3 class="card__price border-right">$${card.price}.00</h3><span class="filter__stock">Stock: ${card.stock}</span>
          <h3 class="card__title">${card.title}</h3>
        </div>
      </div>
    `});
  cardDisplay.innerHTML = elements.join("");
  localStorage.setItem("cards",JSON.stringify(cardArray));
}

//Scroll
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("header--botton", window.scrollY > 0);
});