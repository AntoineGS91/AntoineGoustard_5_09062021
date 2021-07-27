let mainSection = document.querySelector('#main')

if (cartInProgress === null){
        mainSection.innerHTML =` 
          <div>
              <div class="border border-primary text-center fs-2">
                  <p>Votre panier est vide</p>
                  <p>Merci de selectionner des produits</p>
              </div>
              <a class="btn btn-danger border border-primary" href="/index.html">Retour à l'accueil</a>
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
      mainSection.innerHTML = productDisplay
    }
    
checkCart()