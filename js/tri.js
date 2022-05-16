// le tableau des valeurs à trier
var triNumbers = [];

//le nombre de valeurs dans à trier
var nbTriBarre;

var triGen;
var triActive;

// appelé depuis le main.js
function triInit() {
  resetTriValues()
  $("#tri-range").change(function () {
    resetTriValues()
  });
  $("#tri-button-start").click(startTri);
  $("#tri-button-pause").click(pauseTri);
  $("#tri-button-continue").click(continueTri);
  $("#tri-button-stop").click(resetTriValues);
}

function addBar(parent, height) {
  parent.append('<div class="col tri-bar" style="height:' + height + '%"></div>');
}

function resetTriValues() {
  triGen = undefined;
  triActive = false;
  triNumbers = [];
  nbTriBarre = $("#tri-range").val();
  for (let i = 0; i < nbTriBarre; i++) {
    triNumbers.push(Math.floor(Math.random() * 100) + 1); //ajoute un nombre au hasard entre [0-100[ + 1 => [1-100]
  }
  //
  $("#tri-range-value").text(nbTriBarre);
  $("#tri-graph .row").empty();
  triNumbers.forEach(i => addBar($("#tri-graph .row"), i));
  showButton();
}

function startTri() {
  triGen = tri();
  triActive = true;
  triStep(0);
  showButton();
}

function pauseTri() {
  triActive = false;
  showButton();
}

function continueTri() {
  triActive = true;
  triStep(0);
  showButton();
}

function showButton() {
  $("#main-content button").hide();
  if (triActive) {
    $("#tri-button-pause").show();
    $("#tri-button-stop").show();
  } else {
    if (triGen != undefined) {
      $("#tri-button-continue").show();
      $("#tri-button-stop").show();
    } else {
      $("#tri-button-start").show();
    }
  }
}

function applyAction(action) {
  if (action.height) {
    $("#tri-graph .row div").eq(action.index).height(action.height + "%");
  }
  if (action.className != undefined) {
    $("#tri-graph .row div").eq(action.index).removeClass("tri-base tri-progress tri-hit");
    if (action.className != "") {
      $("#tri-graph .row div").eq(action.index).addClass(action.className);
    }
  }
}

function triStep(timeout) {
  setTimeout(function () {
    if (!triActive) {
      return;
    }
    let actions = triGen.next()
    if (!actions.done) {
      applyAction(actions.value);
      triStep(actions.value.timeout || 0);
    }
  }, timeout);
}

function* tri() {
  for (let i = 0; i < nbTriBarre - 1; i++) {
    yield ({ index: i, className: "tri-base", timeout: 1000 });
    for (let j = i + 1; j < nbTriBarre; j++) {
      yield ({ index: j, className: "tri-progress", timeout: 50 });
      if (triNumbers[i] > triNumbers[j]) {
        yield ({ index: j, className: "tri-hit", timeout: 200 });
        [triNumbers[i], triNumbers[j]] = [triNumbers[j], triNumbers[i]]
        applyAction ({ index: i, height: triNumbers[i] });
        yield ({ index: j, height: triNumbers[j], timeout: 200 });
      }
      applyAction({ index: j, className: "" })
    }
    applyAction({ index: i, className: "" })
  }
}

