const DEFAULT_DURATION = 15;

const tick = new Audio("assets/tick2.wav");
const alarm = new Audio("assets/alarm2.wav");
tick.loop = true;

function formatTime(ms) {
  var date = new Date(0);
  date.setSeconds(ms); // specify value for SECONDS here
  var timeString = date.toISOString().substring(11, 19).slice(3);

  return timeString;
}

let COUNTDOWN_ONGOING = false;
let ROUND_DUR = DEFAULT_DURATION;
let CURR_DUR = DEFAULT_DURATION;
let TIMER;
let count;

$(() => {
  $("#countdown").text(formatTime(CURR_DUR));
  $("#dur-controller p").text(formatTime(ROUND_DUR));

  $("#startbtn").click(() => startCountdown());
  $("#stopbtn").click(() => stopCountdown());
  $("#resetbtn").click(() => resetCountdown());
  $("#sub1btn").click(() => sub1());
  $("#add1btn").click(() => add1());

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      if (COUNTDOWN_ONGOING) stopCountdown();
      else startCountdown();
    }
  };
});

function startCountdown() {
  console.log("starting");
  COUNTDOWN_ONGOING = true;

  $("#startbtn").prop("disabled", true);
  $("#stopbtn").prop("disabled", false);

  tick.play();

  TIMER = setInterval(function () {
    CURR_DUR--;
    $("#countdown").text(formatTime(CURR_DUR));

    if (CURR_DUR === 0) {
      timesup();

      tick.pause();
      alarm.play();

      clearInterval(TIMER);

      CURR_DUR = ROUND_DUR;

      COUNTDOWN_ONGOING = false;
      $("#startbtn").prop("disabled", false);
      $("#stopbtn").prop("disabled", true);
    }
  }, 1000);
}

function stopCountdown() {
  tick.pause();
  console.log("stopping");
  $("#startbtn").prop("disabled", false);
  $("#stopbtn").prop("disabled", true);

  COUNTDOWN_ONGOING = false;
  clearInterval(TIMER);
}

function resetCountdown() {
  tick.pause();

  console.log("resetting");
  $("#startbtn").prop("disabled", false);
  $("#stopbtn").prop("disabled", true);

  COUNTDOWN_ONGOING = false;
  CURR_DUR = ROUND_DUR;
  clearInterval(TIMER);

  $("#countdown").show();
  $("#timesup").hide();

  $("#countdown").text(formatTime(CURR_DUR));
}

function timesup() {
  $("#countdown").hide();
  $("#timesup").show();
}

function add1() {
  ROUND_DUR += 1;
  $("#dur-controller p").text(formatTime(ROUND_DUR));
}

function sub1() {
  ROUND_DUR -= 1;
  $("#dur-controller p").text(formatTime(ROUND_DUR));
}
