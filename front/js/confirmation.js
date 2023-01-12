
//récupérer le numéro de la commande et l'afficher  
function numeroDeCommande() {
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = localStorage.getItem("orderId");
    //vider le localStorage
    localStorage.clear()
}
  numeroDeCommande()