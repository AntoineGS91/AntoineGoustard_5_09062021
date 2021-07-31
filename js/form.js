const btnFormSubmit = document.querySelector('#btn_Form')
const regexNomPrenomVille = /([A-Za-z_\s\-']+)/;
const regexAdresse = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
const regexEmail = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/;  

//  Controle des valeurs du formulaire
function formValidation() {
    let formInfo = {
    lastname: document.querySelector('#nom').value,
    firstname: document.querySelector('#prenom').value,
    address: document.querySelector('#adresse').value,
    city: document.querySelector('#ville').value,
    email: document.querySelector('#email').value
    }

    localStorage.setItem('formInfo', JSON.stringify(formInfo))
    if (regexNomPrenomVille.test(formInfo.firstname)){
        console.log("OK")
        if (regexNomPrenomVille.test(formInfo.lastname)){
            console.log("OK")
            if (regexAdresse.test(formInfo.address)){
                console.log("OK")
                if (regexNomPrenomVille.test(formInfo.city)){
                    console.log("OK")
                    if (regexEmail.test(formInfo.email)){
                        console.log("TestComplete")
                        return true;
                    } else {
                        alert("Le remplissage de l'adresse email est incorrect")
                        return false
                    }
                } else {
                    alert("Le remplissage de la ville est incorrect")
                    return false
                }
            } else {
                alert("Le remplissage de l'adresse est incorrect")
                return false
            }
        } else {
            alert("Le remplissage du nom est incorrect")
            return false
        }
    } else{
        alert("Le remplissage du prénom est incorrect")
        return false
    }
}

// Recupération des données pour envoi requete
function orderValues() {
    formInfo = localStorage.getItem("formInfo")
    dataObject = JSON.stringify({cartInProgress, formInfo})
    orderRequest(dataObject)
}

// Requete pour envoi des données vers l'API
function orderRequest(dataObject){
    console.log(dataObject)
    fetch('http://localhost:3000/api/cameras/order', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: dataObject
    }) 
    .then(response => {
        response = response.json()
        console.log(response)
    })
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
        orderValues()
    } else {
        console.log('Un problème est survenu')
    }
})
