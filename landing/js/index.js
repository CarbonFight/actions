
//SITE BOUTON SCROLL TO TOP
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("btnScrollToTop").style.display = "block";
    } else {
        document.getElementById("btnScrollToTop").style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


//EFFET ZOOM IMAGE
       // Fonction pour activer l'animation lorsque l'élément est visible dans la vue
       function animateOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('zoomIn');
                observer.unobserve(entry.target); // Arrête d'observer une fois que l'élément est visible
            }
        });
    }

    // Crée un observateur pour surveiller l'image
    const observer = new IntersectionObserver(animateOnScroll, { root: null, threshold: 0.5 });

    // Cible l'image et commence à observer
    const image = document.getElementById('carbonImage');
    observer.observe(image);


    //FOOTER EFFET
    document.getElementById("toggleButton").addEventListener("click", function() {
        var divElement = document.querySelector(".divfooterbottom div");
        divElement.classList.toggle("visible"); // Toggle entre ajouter ou supprimer la classe visible
    });

    
  //COOKIES
  // Vérifie si le cookie d'acceptation existe
  function checkCookie() {
    var accepted = getCookie("cookiesAccepted");
    if (accepted) {
      // Si le cookie existe, masquer la boîte de dialogue
      document.querySelector('.container').style.display = 'none';
    }
  }

  // Fonction pour récupérer un cookie par son nom
  function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  // Fonction pour définir un cookie avec une durée d'expiration
  function setCookie(name, value, days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  // Vérifier si le cookie d'acceptation existe lors du chargement de la page
  window.onload = checkCookie;
  // Sélectionnez le bouton "close"
  var closeButton = document.querySelector('.close');

  // Ajoutez un gestionnaire d'événements pour le clic sur le bouton "close"
  closeButton.addEventListener('click', function() {
    // Sélectionnez le conteneur parent
    var container = document.querySelector('.container');
    // Masquez le conteneur parent
    container.style.display = 'none';
  });

  // Sélectionnez le bouton "accept"
  var acceptButton = document.querySelector('.accept');

  // Ajoutez un gestionnaire d'événements pour le clic sur le bouton "accept"
  acceptButton.addEventListener('click', function() {
    // Définir le cookie d'acceptation pour une durée de 30 jours
    setCookie("cookiesAccepted", "true", 30);
    // Masquer la boîte de dialogue
    document.querySelector('.container').style.display = 'none';
  });


