const cartInProgress = JSON.parse(localStorage.getItem('panier'))

function checkCart() {
    if (cartInProgress === null){
        document.querySelector('#cartTag').textContent = 0
    } else {
        document.querySelector('#cartTag').textContent = cartInProgress.length
    }
}
