var triNumbers = [];
var nbTriBarre;

function triInit() {
  resetTriValues()
  $("#tri-range").change(function () {
    resetTriValues()
  });
  $("#tri-button").click(function () {
    monitorTri()
  });
}

function addBar(parent, height) {
  parent.append('<div class="col tri-bar" style="height:' + height + '%"></div>');
}

function resetTriValues() {
  triNumbers = [];
  nbTriBarre = $("#tri-range").val();
  for (let i = 0; i < nbTriBarre; i++) {
    triNumbers.push(Math.floor(Math.random() * 100) + 1); //ajoute un nombre au hasard entre [0-100[ + 1 => [1-100]
  }
  //
  $("#tri-range-value").text(nbTriBarre);
  $("#tri-graph .row").empty();
  triNumbers.forEach(i => addBar($("#tri-graph .row"), i));
}

function monitorTri() {
  var triGen = tri();
  triStep(triGen, 0);
}


function applyActions(actions) {
  for (let action of actions) {
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
}

function triStep(triGen, timeout) {
  setTimeout(function () {
    let actions = triGen.next()
    if (!actions.done) {
      applyActions(actions.value);
      triStep(triGen, actions.value[0].timeout || 0);
    }
  }, timeout);
}


function* tri() {
  for (let i = 0; i < nbTriBarre - 1; i++) {
    yield ([{ index: i, className: "tri-base", timeout: 200 }]);
    for (let j = i + 1; j < nbTriBarre; j++) {
      yield ([{ index: j, className: "tri-progress", timeout: 50 }]);
      if (triNumbers[i] > triNumbers[j]) {
        yield ([{ index: j, className: "tri-hit", timeout: 200 }]);
        [triNumbers[i], triNumbers[j]] = [triNumbers[j], triNumbers[i]]
        yield ([
          { index: i, height: triNumbers[i], timeout: 200 },
          { index: j, height: triNumbers[j] }
        ]);
      }
      applyActions([{ index: j, className: "" }])
    }
    applyActions([{ index: i, className: "" }])
  }
}

