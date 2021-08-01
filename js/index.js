// Recupération de l'API
  async function getProducts() {
    return fetch(`http://localhost:3000/api/cameras`)
      .then(res => res.json())
      .catch((error) => {
        let mainSection = document.querySelector('#main')
        mainSection.innerHTML =` 
          <div>
              <div class="border border-primary text-center fs-2">
                  <p>Veuillez nous excuser, mais un problème est intervenu.</p>
                  <p>L'affichage de la page est impossible</p>
              </div>
          </div>`})}

// Generation du template
  function displayProduct(product) {
    const template = document.querySelector('#product')
    const article = document.importNode(template.content, true)

    article.querySelector('#productImage').src = product.imageUrl
    article.querySelector('#productName').textContent = product.name
    article.querySelector('#productPrice').textContent = `${product.price / 100} €`
    article.querySelector('#productDescription').textContent = product.description
    article.querySelector('#productLink').href = `/html/products.html?id=${product._id}`
    article.querySelector("[data-role='productLink']").setAttribute('data-value', product._id)
    document.querySelector('#productsList').appendChild(article)
  }

// Duplication du template
  const buildProductsList = (products) => {
    products.forEach(product => displayProduct(product))
  }

// Fonction main
  (async () => {
    buildProductsList(await getProducts())
    await checkCart()
  })()