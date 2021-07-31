let cartProductList = document.querySelector('#cartProductList')

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
          <div class="price" id="productPrice">${cartInProgress[i].productPrice / 100} €</div>
        </div>`
    }

    let cartTotalPrice = []
    for (i = 0; i < cartInProgress.length; i++){
      let priceCartInProgress = cartInProgress[i].productPrice
      cartTotalPrice.push(priceCartInProgress)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let totalPrice = cartTotalPrice.reduce(reducer, 0)

    const priceDisplay = `<div class="fw-bold">${totalPrice / 100} €</div>`
    let cartProductPrice = document.querySelector('#totalPrice')

    cartProductPrice.innerHTML = priceDisplay
    cartProductList.innerHTML = productDisplay

    }
    
const emptierCart = document.querySelector('#emptierBtn')

emptierCart.addEventListener('click', (e) => {
  e.preventDefault()
  localStorage.removeItem('panier')
  document.location.reload()
})


checkCart()