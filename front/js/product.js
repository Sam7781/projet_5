
const queryString= window.location.search;
const url= new URLSearchParams(queryString)
const id = url.get("id")




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
 
 function ajImage(imajUrl,alTxt){
 const image = document.createElement('img')
 image.src = imajUrl
 image.alt = alTxt
 const parent = document.querySelector(".item__img")
 if (parent != null) parent.appendChild(image)
}
function ajName(nameP){
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = nameP
}
function ajPrice(prixProduit){
    const span = document.querySelector("#price")
    if (span != null) span.textContent = prixProduit
}
function ajDescription(description){
    const p = document.querySelector("#description")
    if(p != null) p.textContent = description
}
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


let boutonPanier = document.getElementById("addToCart");

boutonPanier.addEventListener('click', function () {

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
  
  
  else { 
    let panierActuel = localStorage.getItem("panier");
   
    if (panierActuel === null) {

      panierActuel = [];
      panierActuel.push(canapChoisi);
      let panierLocalStorage = JSON.stringify(panierActuel);
      localStorage.setItem("panier", panierLocalStorage);
    } 
      else { 
      const panier = JSON.parse(panierActuel);
      memCanap = false;
    
      panier.forEach((canap) => {
        if (canap.id === id && canap.couleur === couleurCanap) { 
          
          canap.quantite = parseInt(quantite) + parseInt(canap.quantite);
          memCanap = true;
        }
       
      })
      if (memCanap === false) {
        panier.push(canapChoisi);
      }
      
      let panierLocalStorage = JSON.stringify(panier);
      localStorage.setItem("panier", panierLocalStorage); 
       
    }
  }
  
  window.location.href = "cart.html";
});
