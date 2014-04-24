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
    x: 0.1,
    animationCallback: function(x, y) {
      var val = Math.round(x * 2000);
      $("#salary-slider .value").text(val);
      Cost.setSalary(val);
    }
  });
  new Dragdealer("attendants-slider", {
    x: 0.2,
    animationCallback: function(x, y) {
      var val = Math.round(x * 100);
      $("#attendants-slider .value").text(val);
      Cost.setAttendants(val);
    }
  });
  $("#current").fitText(0.5);
});