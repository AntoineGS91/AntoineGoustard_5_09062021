// Variables
const idForm = document.querySelector('#lenseChoice')
const btn_sendCart = document.querySelector('#addToCart')
const quantitySelected = document.querySelector('#quantity')


// Récupération des données de l'API
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
      let productQuantity = quantitySelected.value
      alert('Le produit a bien été ajouté au panier')
      

      // Création objet pour le panier/localStorage
        let cartObject = {
          productName: product.name,
          product_id: product._id,
          productLense : lenseChoice,
          productPrice: product.price,
          productQuantity: parseInt(productQuantity),
          productImg: product.imageUrl
        }


      // Ajout au panier
        let cartInProgress = JSON.parse(localStorage.getItem('panier'))
        if (cartInProgress === null) {
          cartInProgress = []
          cartInProgress.push(cartObject)
          localStorage.setItem('panier', JSON.stringify(cartInProgress))
        } else {
          cartInProgress.push(cartObject)
          localStorage.setItem('panier', JSON.stringify(cartInProgress))
            }
          document.location.reload()
    })
}

      
       

// Fonction main
(async () => {
  buildProducts(await getProducts(redirectionUrl()))
  await checkCart()
})()