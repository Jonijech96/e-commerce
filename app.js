const menuBtn = document.querySelector(".button-menu");
const menuDisplay = document.querySelector(".menu");
const closeBtn = document.querySelector(".button-close");
const cartBtn = document.querySelector(".cart-shop");
const cartDisplay = document.querySelector(".cart");
const closeCart = document.querySelector(".cart__close");



//para agregar desde la card
const cardAdd = document.querySelector(".card-add");

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

cardAdd.addEventListener("click",()=>{
  console.log("entre");
})