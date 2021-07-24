const getCart = async function() {  
    try {
        let res = await fetch("http://localhost:3000/api/cameras");
        if (res.ok) {
            let cameras = await res.json();
            // Récupération contenu du panier en localstorage
            let basketContent = JSON.parse(localStorage.getItem("panier"))
            console.log('contenu du localstorage',basketContent);
            if(localStorage.length>0){
                for (i = 0; i < basketContent.length; i++) {
                    let itemCamera = cameras.find(cameras => cameras['_id'] == basketContent[i].idCamera);
                    console.log("résultat recherche cam choisie par l'ID",itemCamera);
                    createBasket(itemCamera, basketContent);
                    addItemPrice(itemCamera,basketContent); 
                }
                    totalPriceOrder(arrayPrice);
            }else{
                noBasket();
            }
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) { 
        console.log(e);
    }
}