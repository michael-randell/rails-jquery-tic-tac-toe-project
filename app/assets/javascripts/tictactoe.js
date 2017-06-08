$(function() {
  attachListeners();
});

var turn = 0;
var combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var currentGame = 0;

function doTurn(event) {
  updateState(event);
  if(checkWinner()) {
    save(true)               //save taking care of state reset on tie with true parameter
    message('Player ' + player() + ' Won!')
  } else if(checkTie(turn)) {
    save(true)               //save taking care of state reset on tie with true parameter
    message('Tie game')
  } else {
    turn += 1;
  };
};

function checkTie(turn) {
  if (turn === 8) {
    return true;
  } else {
    return false;
  };
};

function attachListeners() {
  $("tbody").click(function(event) {
    doTurn(event)
  });

  $('#previous').click(function(event) {
    getAllGames();
  });

  $('#save').click(function(event) {
    save();
  });

  $("#previous").click(function() {
    getAllGames();
  });
};

function player() {
  if (turn % 2 == 0) {
    return 'X'
  } else {
    return 'O'
  };
};

function checkCombo(combo, tdArr){
    if ((tdArr[combo[0]] === "X") && (tdArr[combo[1]] === "X") && (tdArr[combo[2]] === "X")){
      return true;
    }else if ((tdArr[combo[0]] === "O") && (tdArr[combo[1]] === "O") && (tdArr[combo[2]] === "O")) {
      return true;
    } else {
      return false;
    };
};

function checkWinner() {
  var tdArr = getMarks()
  for(i = 0; i < combos.length; i++){
    if (checkCombo(combos[i], tdArr)){
      return true;
    }
  }
  return false;
};

var resetState = function() {
  turn = 0;
  currentGame = 0;
  $('td').empty();
}

var updateState = function(event) {
  $(event.target).html(player()); //targets and sets the 'X' or 'O' on board square, on click
};

function getMarks() {
  var marks = []
   $("td").each(function(i) {
     marks.push($(this).text())   //getting marks from DOM elements
   })
  return marks;
};

function resumeGame(existingMarks, gameId) {
  resetState()
  var localExistingMarks = existingMarks.split(",")
  turn = localExistingMarks.filter(String).length  //to grab and count present string characters, ignore empty strings
  var indexMatch = 0
  $("td").each(function() {
    this.append(localExistingMarks[indexMatch])
    indexMatch++                                   //different loop functionality
  })
  currentGame = gameId                             //set currentGame on a resume
}

var getAllGames = function() {
  $.getJSON("/games", function(data) {
    showGames(data.games)
    //append to dom function
  });
};

var showGames = function(games) {
  var dom = $()
  games.forEach(function(game) {
    dom = dom.add(showGame(game)); //add built element to jQuery object
  })
  $("#games").html(dom); //append to DOM
}

var showGame = function(game) {
  var newGame = $('<button>', {'id': 'aGame', 'data-state': game.state, 'data-gameid': game.id, text: game.id}); //creation of DOM element, embed data attrs
  newGame.click(function() {
    resumeGame(this.getAttribute("data-state"), this.getAttribute("data-gameid")) //attach click event handler, getting embedded data on element
  });
  return newGame
}

var save = function(resetCurrentGame) {
  var url, method;
  if(currentGame) {
    url = "/games/" + currentGame
    method = "PATCH"
  } else {
    url = "/games"
    method = "POST"
  };                                //dynamic switch functionality to handle update of data vs. new creation

  $.ajax({
    url: url,
    method: method,
    dataType: "json",
    data: {
      game: {
        state: getMarks()
      }
    },
    success: function(data) {
      if(resetCurrentGame) {        //if win or tie, true param is passed to reset board state
        resetState();
      } else {
        currentGame = data.game.id; //or to set currentGame
      }
    }
  });
};

var message = function(text) {
  $('#message').html(text);
}
