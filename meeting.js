var MAX_SALARY = 2000;
var MAX_ATTENDANTS = 100;

var Cost = new (function() {
  var $current,
  salary = 0,
  attendants = 0,
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
    return attendants * salary / 60 / 60 * time / 100;
  };
  this.setSalary = function(s) {
    salary = s;
  };
  this.setAttendants = function(a) {
    attendants = a;
  };
  $(init);
});

$(document).ready(function() {
  new Dragdealer("salary-slider", {
    x: queryValue("salary", MAX_SALARY, 0.1),
    animationCallback: function(x, y) {
      var val = Math.round(x * MAX_SALARY);
      $("#salary-slider .value").text(val);
      Cost.setSalary(val);
    }
  });
  new Dragdealer("attendants-slider", {
    x: queryValue("attendants", MAX_ATTENDANTS, 0.1),
    animationCallback: function(x, y) {
      var val = Math.round(x * MAX_ATTENDANTS);
      $("#attendants-slider .value").text(val);
      Cost.setAttendants(val);
    }
  });
  $("#current").fitText(0.5);
});

var queryValue = function(param, max, fallback) {
  var v = $.url().param(param);
  return (v && parseInt(v) == v && v <= max) ? v/max : fallback;
}