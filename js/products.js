// Variables
const idForm = document.querySelector('#lenseChoice')
const btn_sendCart = document.querySelector('#addToCart')


// Gestion de l'api de la page
function getProducts(productId) {
  return fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then((res) => res.json())
    .catch((error) => {
      alert("Erreur lors du chargement des données")
    })
}


// Gestion de l'URL prenant en compte l'id du produit
function redirectionUrl() {
  return new URL(window.location.href).searchParams.get('id')
}


// Incorporation des infos produits dans la page
function buildProducts(product) {
  document.querySelector('#productImage').src = product.imageUrl
  document.querySelector('#productName').textContent = product.name
  document.querySelector('#productPrice').textContent = `${product.price / 100} €`
  document.querySelector('#productDescription').textContent = product.description


  // Choix de lentille
  let lenses = product.lenses
  for (let i = 0; i < lenses.length; i++) {
    let optionLenses = document.createElement("OPTION");
    idForm.appendChild(optionLenses);
    optionLenses.textContent = product.lenses[i];
  }


  // Event boutton panier
    btn_sendCart.addEventListener('click', (e) => {
      e.preventDefault()
      let lenseChoice = idForm.value;
      alert('Le produit a bien été ajouté au panier')
      let cartInProgress = []
  
  
  // Création objet pour le panier/localStorage
      let cartObject = {
        productName: product.name,
        product_id: product._id,
        productPrice: product.price,
        productImg: product.imageUrl,
        productLense : lenseChoice,
        productQuantity: 1
      }


    // Gestion du panier
      function addToCart() {
        if (cartInProgress<0) {
          cartInProgress.push(cartObject)
          localStorage.setItem('panier', JSON.stringify(cartInProgress))
        } else { 
          if (cartInProgress.includes(cartObject)) {
            cartObject.productQuantity = cartObject.productQuantity + 1
          } else {
            // cartInProgress = JSON.parse(localStorage.getItem('panier'))
            cartInProgress.push(cartObject)
            localStorage.setItem('panier', JSON.stringify(cartInProgress))
          }
        }
      }
   
        addToCart()
        checkCart()
      }
    )
}

// Fonction main
(async () => {
  buildProducts(await getProducts(redirectionUrl()))
  await checkCart()
})()