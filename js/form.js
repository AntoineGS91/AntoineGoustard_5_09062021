const btnFormSubmit = document.querySelector('#btn_Form')
const regexNomPrenomVille = /^[a-zA-Z\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,20}$/;
const regexAdresse = /^[a-zA-Z0-9\sàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ-]{3,40}$/;
const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

formInfo = localStorage.getItem("formInfo")
formInfo = JSON.parse(formInfo)
let productCart = cartInProgress
let productCartId = []
for (let i = 0; i < productCart.length; i++) {
    productCartId.push(productCart[i].product_id)
}
dataObject = JSON.stringify({contact : formInfo, products : productCartId})

//  Controle des valeurs du formulaire
function formValidation() {
    let formInfo = {
    firstName: document.querySelector('#prenom').value,
    lastName: document.querySelector('#nom').value,
    address: document.querySelector('#adresse').value,
    city: document.querySelector('#ville').value,
    email: document.querySelector('#email').value
    }

    localStorage.setItem('formInfo', JSON.stringify(formInfo))

    if (!regexNomPrenomVille.test(formInfo.firstname)){
        alert("Le remplissage du prénom est incorrect")
    } else if (!regexNomPrenomVille.test(formInfo.lastname)){
        alert("Le remplissage du nom est incorrect")
    } else if (!regexAdresse.test(formInfo.address)){
        alert("Le remplissage de l'adresse est incorrect")
    } else if (!regexNomPrenomVille.test(formInfo.city)){
        alert("Le remplissage de la ville est incorrect")
    } else if(!regexEmail.test(formInfo.email)){
        alert("Le remplissage de l'adresse email est incorrect")
    } else {
        return true
    }
}

// Requete pour envoi des données vers l'API
function orderRequest(){
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: dataObject
    }) 
    .then(response => response.json())
    .then(order => {
      localStorage.setItem("orderId", order.orderId);
      window.location.href = "/html/confirm.html";
    })
    .catch(error => alert("Un problème est survenu"));
}

// Evenement au clic, déclenche les différentes fonctions
btnFormSubmit.addEventListener('click', (e) => {
    e.preventDefault() 
    if (formValidation()){
        orderRequest()
    } else {
        console.log('Un problème est survenu')
    }
})
