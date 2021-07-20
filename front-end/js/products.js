// Variables
const idForm = document.querySelector('#lenseChoice')
const btn_sendCart = document.querySelector('#addToCart')
const cartInProgress = []

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

  // Gestion du panier
  function addToCart() {
    cartInProgress.push(product._id)
    localStorage.setItem('panier', JSON.stringify(cartInProgress))
  }
  
  // Incrémentation icone panier
  function modifyCartNumber() {
      if (document.querySelector('#cartTag').textContent === null) {
        document.querySelector('#cartTag').textContent = 0
      } else {
        document.querySelector('#cartTag').textContent = cartInProgress.length
  }}

  // Event boutton panier
    btn_sendCart.addEventListener('click', (e) => {
      e.preventDefault()
      alert('Le produit a bien été ajouté au panier')
      addToCart()
      modifyCartNumber()
    }
  )
}

// Fonction main
(async () => {buildProducts(await getProducts(redirectionUrl()))})()