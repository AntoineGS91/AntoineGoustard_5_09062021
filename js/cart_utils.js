function checkCart() {
    const cartInProgress = JSON.parse(localStorage.getItem('panier'))
    if (cartInProgress === null){
        document.querySelector('#cartTag').textContent = 0
    } else {
        document.querySelector('#cartTag').textContent = cartInProgress.length
    }
}