var nbHanoiDisk;
var hanoiTour1 = [];
var hanoiTour2 = [];
var hanoiTour3 = [];

// appelé depuis le main.js
function hanoiInit() {
  hanoiChangeValue();
  $("#hanoi-range").change(function () {
    hanoiChangeValue();
  });
  $("#hanoi-button").click(function () {
    hanoiMonitor();
  });
}

function hanoiChangeValue() {
  nbHanoiDisk = $("#hanoi-range").val();
  $("#hanoi-range-value").text(nbHanoiDisk);
  hanoiTour1 = [];
  hanoiTour2 = [];
  hanoiTour3 = [];
  $("#hanoi-content").empty();
  for (let i = 0; i < nbHanoiDisk; i++) {
    placeDisk(1, nbHanoiDisk - i);
  }
}

function placeDisk(tourNb, diskNb) {
  var diskSizePerct = 32 * diskNb / nbHanoiDisk;
  var tour = getTourArray(tourNb);
  var x = getTourX(tourNb) - diskSizePerct / 2;
  var y = 10 + 10 + (tour.length) * 25;
  var disk = $('<div id="hanoi-disk-' + diskNb + '" class="hanoi-disk"></div>');
  $("#hanoi-content").append(disk);
  disk.css({
    "left": x + "%",
    "bottom": y + "px",
    "width": diskSizePerct + "%",
    "height": "20px",
    "background-color": "rgb(0,0," + 255 * diskNb / nbHanoiDisk + ")"
  });
  //
  tour.push(diskNb);
}

function moveDisk(tourNbFrom, tourNbTo) {
  var tourFrom = getTourArray(tourNbFrom);
  var tourTo = getTourArray(tourNbTo);
  var diskNo = tourFrom.pop();
  var diskSizePerct = 32 * diskNo / nbHanoiDisk;
  var x = getTourX(tourNbTo) - diskSizePerct / 2;
  var y = 10 + 10 + (tourTo.length) * 25;
  tourTo.push(diskNo);
  $("#hanoi-disk-" + diskNo).css({
    "left": x + "%",
    "bottom": y + "px"
  });
}

function hanoiMonitor() {
  var hanoiGen = hanoi(nbHanoiDisk, 1, 3);
  hanoiStep(hanoiGen);
}

function hanoiStep(hanoiGen) {
  setTimeout(function () {
    let actions = hanoiGen.next()
    if (!actions.done) {
      moveDisk(actions.value[0], actions.value[1]);
      hanoiStep(hanoiGen);
    }
  }, 300);
}

function* hanoi(n, tourNbFrom, tourNbTo) {
  var tourNbOther = getOtherTourNb(tourNbFrom, tourNbTo);
  if (n == 1) {
    yield [tourNbFrom, tourNbTo];
  } else {
    yield* hanoi(n - 1, tourNbFrom, tourNbOther);
    yield [tourNbFrom, tourNbTo];
    yield* hanoi(n - 1, tourNbOther, tourNbTo);
  }
}

function getOtherTourNb(tourNbFrom, tourNbTo) {
  return [1, 2, 3].find(element => element != tourNbFrom && element != tourNbTo)
}

function getTourArray(tourNb) {
  switch (tourNb) {
    case 1:
      return hanoiTour1;
      break;
    case 2:
      return hanoiTour2;
      break;
    case 3:
      return hanoiTour3;
      break;
    default:
      console.log(`Sorry,invalid tourNb: ${tourNb}.`);
  }
}

function getTourX(tourNb) {
  switch (tourNb) {
    case 1:
      return 16.66;
      break;
    case 2:
      return 50;
      break;
    case 3:
      return 83.33;
      break;
    default:
      console.log(`Sorry,invalid tourNb: ${tourNb}.`);
  }
}