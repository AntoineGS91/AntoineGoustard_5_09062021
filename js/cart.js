let cartProductList = document.querySelector('#cartProductList')
let cartInProgress = JSON.parse(localStorage.getItem('panier'))

// Affichage du contenu du panier
if (cartInProgress === null){
  cartProductList.innerHTML =` 
    <div>
        <div class="border border-primary text-center fs-2">
            <p>Votre panier est vide</p>
            <p>Merci de selectionner des produits</p>
        </div>
        <a class="btn btn-danger border border-primary d-flex justify-content-center" href="/index.html">Retour à l'accueil</a>
    </div>`
} else {
    let productDisplay = []
    for (i = 0; i < cartInProgress.length; i++){
      productDisplay = productDisplay + 
        `<div id="product" class="mt-3 d-flex">
          <img id="productImage" src="${cartInProgress[i].productImg}" class="rounded w-25" src="" alt="">
          <h2 id="productName" class="mb-4 text-center">${cartInProgress[i].productName}</h2>
          <div id="productLense">${cartInProgress[i].productLense}</div>
          <div id="productQuantity">${cartInProgress[i].productQuantity}</div>
          <div class="price" id="productPrice">${(cartInProgress[i].productPrice * cartInProgress[i].productQuantity)/ 100} €</div>
          <btn class="btn-delete btn btn-danger text-center mt-auto mb-auto">Supprimer du panier</btn>
        </div>`
    }

// Calcul et affichage du prix total du panier
let cartTotalPrice = []
for (i = 0; i < cartInProgress.length; i++){
  let priceCartInProgress = cartInProgress[i].productPrice * cartInProgress[i].productQuantity
  cartTotalPrice.push(priceCartInProgress)
}
const reducer = (accumulator, currentValue) => accumulator + currentValue
let totalPrice = cartTotalPrice.reduce(reducer, 0)

const priceDisplay = `<div class="fw-bold">${totalPrice / 100} €</div>`
let cartProductPrice = document.querySelector('#totalPrice')

cartProductPrice.innerHTML = priceDisplay
cartProductList.innerHTML = productDisplay
}

// Bouton pour retirer un objet du panier
let btnDelete = document.querySelectorAll('.btn-delete');
for (let k = 0; k < btnDelete.length; k++){
  btnDelete[k].addEventListener('click', (event) => {
    event.preventDefault()
    productToDelete = cartInProgress[k].product_id + '/' + cartInProgress[k].productLense
    cartInProgress = cartInProgress.filter((el) => el.product_id + '/' + el.productLense !== productToDelete);
    localStorage.setItem('panier', JSON.stringify(cartInProgress))
    window.location.reload()
    })
  }

// Bouton pour vider le panier
const emptierCart = document.querySelector('#emptierBtn')
emptierCart.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('panier')
  window.location.reload()
})


checkCart()