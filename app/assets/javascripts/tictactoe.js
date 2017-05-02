$(function() {
  attachListeners();
});

var turn = 0;
var combos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var currentGame = 0;

function doTurn(event) {
  updateState(event);
  if(checkWinner()) {
    save(true)
    resetState();
  } else if(checkTie(turn)) {
    save(true)
    resetState();
    message('Tie game')
  } else {
    turn += 1;
  }
};

function checkTie(turn) {
  if (turn === 8) {
    return true;
  } else {
    return false;
  }
}
//try .forEach
function attachListeners() {
  //var tdTags = document.getElementsByTagName("td");

  //for (var i = 0 ; i < tdTags.length ; i++){
  //  tdTags[i].addEventListener("click", doTurn(event))
  //};

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
  //$('td').each(function(index, td){ //needed to use an anonymous function, scope issue?
  //  $(this).on("click", function(){
  //    doTurn(event);
  //  })
//});
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
  for(i = 0; i < combos.length; i++){
    if (checkCombo(combos[i], getMarks())){
      message('Player ' + player() + ' Won!')
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
  $(event.target).html(player());

  //var tdArr = []
  //$('td').each(function(index, td){
  //  tdArr.push(td.textContent);
  //});
  //currentGame = tdArr
};

function getMarks() {
  var marks = []
   $("td").each(function(i) {
     marks.push($(this).text())
   })
  return marks;
};

var getAllGames = function() {
  $.getJSON("/games", function(data) {
    showGames(data.games)
    //append to dom function
  });
};

var showGames = function(games) {
  var dom = $()
  games.forEach(function(game) {
    dom = dom.add(showGame(game));
  })
  $("#games").html(dom);
}

var showGame = function(game) {
  return $('<li>', {'data-state': game.state, 'data-gameid': game.id, text: game.id});
}
//var saveGame = function() {
//  if (currentGame === 0) {
//    var serializedGame = {game: {state: currentGame}}
//    var savedGame = $.post("/games", serializedGame)

//    savedGame.done(function(data) {
//      debugger;
//    })
//  }
//};

var save = function(resetCurrentGame) {
  var url, method;
  if(currentGame) {
    url = "/games/" + currentGame
    method = "PATCH"
  } else {
    url = "/games"
    method = "POST"
  }

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
      if(resetCurrentGame) {
        currentGame = undefined;
      } else {
        currentGame = data.game.id;
      }
    }
  })
};

var message = function(text) {
  $('#message').html(text);
}
