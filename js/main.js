
$(document).ready(function () {
  //selectionne premier menu
  showTabContent($("#tab-list button:first-child"));
  //
  $("#tab-list button").on("click", function () {
    showTabContent($(this))
  });
});

function showTabContent(element) {
  var bsActiveButton = new bootstrap.Tab(element)
  var section = element.attr("data-load-target")
  $.get("html/" + section + ".html").then(function (content) {
    $('#main-content').html(content)
    setupContentJs(section)
    bsActiveButton.show()
  });
}

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