
// Utilisation de fetch pour faire un appel API afin de récupérer les données des produits sur le localfost:3000

fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data)=>{
    return addProducts(data)
})

// Affichage des produits sur la page d'accueil

function addProducts(donnees){
    console.log(donnees)

    for (let i = 0 ; i < donnees.length ; i++){
    
    const _id =donnees[i]._id
    const imageUrl = donnees[i].imageUrl
    const altTxt = donnees[i].altTxt
    const name = donnees[i].name
    const description = donnees[i].description
    const lien = ajLien(_id)
    const article=document.createElement("article")
    const image = ajImage(imageUrl, altTxt)
    const h3 = ajH3(name)
    const p = ajParaph(description)
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    appendChildren(lien, article)
}
}

// Création du lien 

function ajLien(id){
    const lien = document.createElement("a")
    lien.href="./product.html?id=" +id
    return lien
}

// Liens parents/enfants

function appendChildren(lien, article){
    const items = document.querySelector("#items")
    if(items != null){
        items.appendChild(lien)
        lien.appendChild(article)
    }
}

//Ajouter l'image du produit

function ajImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src= imageUrl
    image.alt = altTxt
    return image
}

// Ajouter le nom du canapé

function ajH3(name){
    const h3 = document.createElement("h3")
    h3.textContent= name
    h3.classList.add("productName")
    return h3
}
// Ajouter la description du canapé

function ajParaph(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}


