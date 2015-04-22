var MAX_COST = 2000;
var MAX_ATTENDEES = 100;

var Cost = new (function() {
  var $current,
  cost = 0,
  attendees = 0,
  incrementTime = 70,
  currentTime = 0,
  init = function() {
    $current = $('#current');
    Cost.Timer = $.timer(updateTimer, incrementTime, false);
  },
  updateTimer = function() {
    $current.html(formatCost(currentTime).toFixed(2));
    currentTime += incrementTime / 10;
  },
  formatCost = function(time) {
    return attendees * cost / 60 / 60 * time / 100;
  };
  this.setCost = function(c) {
    cost = c;
  };
  this.setAttendees = function(a) {
    attendees = a;
  };
  $(init);
});

$(document).ready(function() {
  new Dragdealer("cost-slider", {
    x: queryValue("cost", MAX_COST, 0.1),
    animationCallback: function(x, y) {
      var val = Math.round(x * MAX_COST);
      $("#cost-slider .value").text(val);
      Cost.setCost(val);
    }
  });
  new Dragdealer("attendees-slider", {
    x: queryValue("attendees", MAX_ATTENDEES, 0.1),
    animationCallback: function(x, y) {
      var val = Math.round(x * MAX_ATTENDEES);
      $("#attendees-slider .value").text(val);
      Cost.setAttendees(val);
    }
  });
  $("#current").fitText(0.5);
});

var queryValue = function(param, max, fallback) {
  var v = $.url().param(param);
  return (v && parseInt(v) == v && v <= max) ? v/max : fallback;
}