
// execute quand le chargement index.html est terminé
$(document).ready(function () {
  //selectionne premier menu
  showTabContent($("#tab-list button:first-child"));
  //quand clic buton
  $("#tab-list button").on("click", function () {
    showTabContent($(this))
  });
});

// fonction pour télécharger et afficher le contenu dans le div #main-content
function showTabContent(element) {
  var bsActiveButton = new bootstrap.Tab(element)
  var section = element.attr("data-load-target")
  $.get("html/" + section + ".html").then(function (content) {
    $('#main-content').html(content)
    setupContentJs(section)
    bsActiveButton.show()
  });
}

// appeler initialisation js de la section
function setupContentJs(section) {
  switch (section) {
    case "tri":
      triInit();
      break;
    case "hanoi":
      hanoiInit();
      break;
    default:
      console.log(`Sorry,no js for ${section}.`);
  }
}