let orderId = localStorage.getItem('orderId')
let order_id = document.querySelector('#order_id')
let order_amount = document.querySelector('#order_amount')

let cartTotalPrice = []
for (i = 0; i < cartInProgress.length; i++){
    let priceCartInProgress = cartInProgress[i].productPrice * cartInProgress[i].productQuantity
    cartTotalPrice.push(priceCartInProgress)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue
let totalPrice = cartTotalPrice.reduce(reducer, 0)

const priceDisplay = `<div class="fw-bold">${totalPrice / 100} €</div>`
let cartProductPrice = document.querySelector('#totalPrice')

order_amount.innerHTML = priceDisplay
order_id.textContent = orderId    

localStorage.removeItem("panier");
localStorage.removeItem("formInfo");
localStorage.removeItem("orderId");

