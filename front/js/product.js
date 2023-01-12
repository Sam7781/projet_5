// L'utilisation de wndow location search pour otenir l'url appartir de ?id
const queryString= window.location.search;
const url= new URLSearchParams(queryString)
// Récuperer le numéro de l'id
const id = url.get("id")


// Envoyer uen requête à l'api avec l'id pour récupérer les détails du produits

fetch(`http://localhost:3000/api/products/${id}`)
 .then((response) => response.json())
 .then((res) => donneesCanap(res))

 function donneesCanap(canap){

    const altTxt = canap.altTxt
    const colors = canap.colors
    const description = canap.description
    const imageUrl = canap.imageUrl
    const name = canap.name
    const price = canap.price
    prixProduit = price
    nameP = name 
    imajUrl = imageUrl
    alTxt = altTxt
    ajImage(imageUrl,altTxt)
    ajName(name)
    ajPrice(price)
    ajDescription(description)
    ajColors(colors)
 }
 
//  Créer l'image et intégrer l'url et le src.
 function ajImage(imajUrl,alTxt){

    const image = document.createElement('img')
    image.src = imajUrl
    image.alt = alTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

// Le nom du produit
function ajName(nameP){

    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = nameP
}

// Le prix du produit
function ajPrice(prixProduit){

    const span = document.querySelector("#price")
    if (span != null) span.textContent = prixProduit
}

// La description du produit
function ajDescription(description){

    const p = document.querySelector("#description")
    if(p != null) p.textContent = description
}

// Couleurs 
function ajColors(colors){

    const choice =document.querySelector("#colors") 
    console.log(colors)
    if (choice !=null){
    colors.forEach((color) => {
    const option = document.createElement("option")
    option.value = color
    option.textContent = color
    choice.appendChild(option)
    console.log(color)
    })
}
}

// Variable qui va écouter les évènements sur le bouton "ajouter au panier"
let boutonPanier = document.getElementById("addToCart");

boutonPanier.addEventListener('click', function () {

  // Récupération de la quantité et la couleur
  const quantite = document.getElementById("quantity").value;
  const couleurCanap = document.getElementById("colors").value;
  
  let canapChoisi = {
      id: id,
      quantite: quantite,
      couleur: couleurCanap
      };
        

  if (couleurCanap == "" || quantite <= 0 || quantite > 100) {
      alert("Veuillez choisir une couleur et une quantité!");
      return
  }
   else if(quantite>100) {
     alert("La quantité ne peut pas être supérieur à 100!");
      return
  }
  
  
  else { 
    let panierActuel = localStorage.getItem("panier");
   
    if (panierActuel === null) {

      panierActuel = [];
      panierActuel.push(canapChoisi);
      let panierLocalStorage = JSON.stringify(panierActuel);
      localStorage.setItem("panier", panierLocalStorage);
      alert("Produit ajouter au panier")
    } 
      else { 
         
      const panier = JSON.parse(panierActuel);
      memCanap = false;
     
      panier.forEach((canap) => {
        if (canap.id === id && canap.couleur === couleurCanap) { 
           memCanap = true;
          
         if( (parseInt(quantite) + parseInt(canap.quantite)) > 100){
          alert("La quantité maximale de ce produit ne peut dépasser 100!");
           return  
        }
        canap.quantite = parseInt(quantite) + parseInt(canap.quantite);
        alert("Produit ajouter au panier")
        }
      })
      if (memCanap === false) {
        panier.push(canapChoisi);
       alert("Produit ajouter au panier")
      }
       
      let panierLocalStorage = JSON.stringify(panier);
      localStorage.setItem("panier", panierLocalStorage); 
       
    }
     
  }

 
 
});
