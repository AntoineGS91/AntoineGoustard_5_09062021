let cartInProgress = JSON.parse(localStorage.getItem('panier'))
let numberOfProducts = 0

function checkCart() {
    if (cartInProgress === null){
        document.querySelector('#cartTag').textContent = 0
    } else {
        for (i = 0; i < cartInProgress.length; i++){
            numberOfProducts += cartInProgress[i].productQuantity
        }
        document.querySelector('#cartTag').textContent = numberOfProducts
    }
}
