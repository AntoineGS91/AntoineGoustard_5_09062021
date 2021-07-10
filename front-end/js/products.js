// Variables
const idForm = document.querySelector('#lenseChoice')
const btn_sendCart = document.querySelector('#addToCart')

// Gestion de la page en fonction de l'id du produit
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

  // Panier
  function modifyCartNumber() {
    if (localStorage.getItem('panier') === null) { //si la clé 'panier' n'est pas trouvée dans le localStorage
      document.querySelector('#cartTag').textContent = 1; //ajouter 1 à l'icone panier
    }else {
      document.querySelector('#cartTag').textContent++ ; //ajouter 1 à l'icone panier
    }
  }

  // Gestion du produit en LocalStorage
  



  // Event boutton panier
    btn_sendCart.addEventListener('click', (e) => {
      e.preventDefault()
      modifyCartNumber()
      alert('Le produit a bien été ajouté au panier')
    })
}

// Fonction main
(async () => {buildProducts(await getProducts(redirectionUrl()))})()


