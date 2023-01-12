let monPanier = localStorage.getItem("panier")
console.log("panier", monPanier)
let panier = JSON.parse(monPanier)
console.log("panier",panier)


let quantiTotal = 0
let prixTotal = 0

if (panier == null || panier.length==0){
//panier vide
    let h1 = document.querySelector("h1")
    h1.innerHTML = `Le panier est vide`
  
    }
//affichage de la quantité total et du prix totale des produits ajoutés au panier
    else {
        panier.forEach((element) => {
            fetch(`http://localhost:3000/api/products/${element.id}`)
                .then(response => response.json())
                .then((donnees) =>{
                  data = donnees;
                afficher(element,data);
                quantiTotal += parseInt(element.quantite)
                prixTotal += data.price * element.quantite

                let totalQuantity = document.getElementById("totalQuantity")
                totalQuantity.innerHTML = quantiTotal

                let totalPrice = document.getElementById("totalPrice")
                totalPrice.innerHTML = prixTotal
                
        });

    })

    }

//affichage des produits
    function afficher(produit, data){
        
        let section = document.getElementById("cart__items")
        let ajArticle = document.createElement("artcile")
        ajArticle.className = "cart__item"
        ajArticle.setAttribute("data-id",produit.id)
        ajArticle.setAttribute("data-color", produit.couleur)
        section.appendChild(ajArticle)

        let divImage = document.createElement("div")
        divImage.className = "cart__item__img"
        ajArticle.appendChild(divImage)
        let ajImage =document.createElement(`img`)
        divImage.appendChild(ajImage)
        ajImage.setAttribute("src", data.imageUrl)
        ajImage.setAttribute("alt", data.altTxt)

        let cartItemContent = document.createElement("div")
        cartItemContent.className="cart__item__content"
        ajArticle.appendChild(cartItemContent)

        let description = document.createElement("div")
        description.className = "cart__item__content__description"
        cartItemContent.appendChild(description)

        let h2 = document.createElement("h2")
        h2.textContent=data.name
        description.appendChild(h2)

        let para = document.createElement("p")
        para.textContent = produit.couleur
        description.appendChild(para)

        let p = document.createElement("p")
        p.textContent = data.price + " €"
        description.appendChild(p)

        let cartItemcontentsettings = document.createElement("div")
        cartItemcontentsettings.className = "cart__item__content__settings"
        cartItemContent.appendChild(cartItemcontentsettings)

        let carteItemQ = document.createElement("div")
        carteItemQ.className= "cart__item__content__settings__quantity"
        cartItemcontentsettings.appendChild(carteItemQ)

        let pQuant = document.createElement("p")
        pQuant.textContent = "Qte : " + produit.quantite
        cartItemcontentsettings.appendChild(pQuant)
        
        let inputQ = document.createElement("input")
        inputQ.className ="itemQuantity"
        inputQ.type ="number"
        inputQ.name = "itemQuantity"
        inputQ.setAttribute("min", "1")
        inputQ.setAttribute("max", "100")
        inputQ.setAttribute("value" , produit.quantite)
        cartItemcontentsettings.appendChild(inputQ)


        let supp =document.createElement("div")
        supp.className = "cart__item__content__settings__delete"
        cartItemcontentsettings.appendChild(supp)

        let buttonSupp = document.createElement("p")
        buttonSupp.className ="deleteItem"
        buttonSupp.textContent ="Supprimer"
        supp.appendChild(buttonSupp)


        
        upDateQuantite(inputQ,produit)
        Supprimer(buttonSupp , produit)
        
    }


//Mise ajour de la quantité en écoutant un évènement(onchange)

    function upDateQuantite(input, produit){
        input.onchange =(e) =>{

            let ajQuantite = e.target.value
            produit.quantite = ajQuantite
            if(ajQuantite > 100 || ajQuantite < 0){
              alert("Problème au niveau de la quantité du produit !!")
              window.location.reload()
              return
            }else{
            e.target.previousElementSibling.textContent ="Qté : " + produit.quantite
            let newLocalStorage = JSON.stringify(panier)
            localStorage.setItem("panier", newLocalStorage)
          window.location.reload()  
        }
        }
        
    }
//Supprimer un produit en écoutant un évènement(onclick)

function Supprimer(button , produit){
    button.onclick =(e) =>{
        panier = panier.filter(canap => (canap.id != produit.id || canap.couleur != produit.couleur))
        let newLocalStorage = JSON.stringify(panier)
        localStorage.setItem("panier" , newLocalStorage)
        alert(`Votre canapé sera supprimé. `)
        window.location.reload()
      
       
    }
  
}
 




//Formulaire

let myForm = document.querySelector(".cart__order__form")
let RegexNom = /^[a-zA-Z ,.'-]{3,50}$/;
let RegexAdress = /^[A-Za-z0-9\s ,.'-çñàéèêëïîôüù]{5,50}$/;
let RegexMail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i);
    let firstName = document.getElementById("firstName")
    firstName.onchange = (e) =>{
    
    if (RegexNom.test(firstName.value)){
            firstNameErrorMsg.innerHTML = 'Valide'
            let userNameV = RegexNom.test(firstName.value); 
            
          } else {
            firstNameErrorMsg.innerHTML = 'Format du prénom incorrect.'; 
            firstNameErrorMsg.style.color="red"
            e.preventDefault()
          }
    }


  

    let lastName = document.getElementById("lastName")
    lastName.onchange = (e) =>{
    // let RegexNom = new RegExp ("^[a-zA-Z ,.'-]+$");
    if (RegexNom.test(lastName.value)){
            lastNameErrorMsg.innerHTML = 'Valide'
            let nomV = RegexNom.test(lastName.value); 
            
          } else {
           lastNameErrorMsg.innerHTML = 'Format du nom incorrect.'; 
            lastNameErrorMsg.style.color ="red"
            e.preventDefault()
          }
    }

    let address = document.getElementById("address")
    address.onchange = (e) =>{
       
    if (RegexAdress.test(address.value)){
        addressErrorMsg.innerHTML = 'Valide'
            let adressV = RegexAdress.test(address.value); 
            
          } else {
            addressErrorMsg.innerHTML = 'Format adresse incorrect.'; 
            addressErrorMsg.style.color ="red"
            e.preventDefault()
          }
    }


    let ville = document.getElementById("city")
    ville.onchange = (e) =>{
        
    if (RegexNom.test(ville.value)){
        cityErrorMsg.innerHTML = 'Valide'
            let villeV = RegexNom.test(ville.value); 
            
          } else {
            cityErrorMsg.innerHTML = 'Format du champ ville incorrect.'; 
            cityErrorMsg.style.color ="red"
            e.preventDefault()
          }
    }

    let eMail = document.getElementById("email")
    eMail.onchange = (e) =>{

    
    
    if (RegexMail.test(eMail.value)){
        emailErrorMsg.innerHTML = 'Valide'
            let emailV = RegexNom.test(eMail.value); 
            
          } else {
            emailErrorMsg.innerHTML = 'Format d email incorrect.'; 
            emailErrorMsg.style.color ="red"
            e.preventDefault()
          }
    }

// Commander
function commander(){
let commanDer = document.querySelector("#order")
commanDer.onclick = (e) =>{
  e.preventDefault();
  if (RegexNom.test(firstName.value) && RegexNom.test(lastName.value) && RegexNom.test(ville.value) && RegexAdress.test(address.value) && RegexMail.test(eMail.value)){

    let products = [];
    
    if (panier == null || panier.length==0){ 
      alert ("Ajouter un produit au panier!!!")
    return
  }
    else{
    for (i = 0; i < panier.length; i++) {
        products.push(panier[i].id)
    }}
console.log(products)


       let contact = {
          firstName : firstName.value,
          lastName : lastName.value,
          address : address.value,
          city : ville.value,
          email : eMail.value
        }
        const commande = { contact , products}
     
    
   
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commande),
      })
      .then((response) => response.json())
      .then((data) => {
          console.table(data);
          localStorage.setItem("orderId", data.orderId);
          document.location.href = `confirmation.html?id=${data.orderId}`;

      })
        .catch(function (err) {
          alert("erreur");
        });
  
  
      }
     else{
      alert ("Veuillez vérifier vos données")
    }
  
  }
}

commander()