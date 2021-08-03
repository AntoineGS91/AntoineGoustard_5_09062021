// Variables 
let orderId = localStorage.getItem('orderId')
let order_id = document.querySelector('#order_id')
let order_amount = document.querySelector('#order_amount')
let cartTotalPrice = []

// Calcul du prix total
for (i = 0; i < cartInProgress.length; i++){
    let priceCartInProgress = cartInProgress[i].productPrice * cartInProgress[i].productQuantity
    cartTotalPrice.push(priceCartInProgress)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue
let totalPrice = cartTotalPrice.reduce(reducer, 0)

// Affichage du prix total
const priceDisplay = `<div class="fw-bold">${totalPrice / 100} €</div>`
order_amount.innerHTML = priceDisplay
order_id.textContent = orderId    

// Supression des valeurs du localStorage
localStorage.removeItem("panier");
localStorage.removeItem("formInfo");
localStorage.removeItem("orderId");

