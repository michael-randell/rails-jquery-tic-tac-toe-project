# jQuery Tic-Tac-Toe

## Objective

Make a tic-tac-toe game that behaves like the following video.

Right click on the link below and select "Save link as..." to see a video of how your game should behave.

[video](http://flatiron-videos.s3.amazonaws.com/Learn%20Curriculum%20Helpers/ttt.mov)

## HTML

You may never have built a "single page app" before so check out the directory structure.  Here we're using a Rails app to serve up some HTML.  There's really only one view, the main root route.  Once rails loads that everything will be done using AJAX with rails serving as our API.

We'll be leveraging the asset pipeline to load all our JavaScript so check out the manifest.  The main HTML file is in `views/home/index.html` Our JS code needs to do two things.  We'll first need to create a simple game of Tic Tac Toe.  Once that's done we'll need to figure out how to let the user persist the state of their game and see old games.  Lastly the user should be able to click on an old game and resume playing that game.

The grid is made by a table. Each square is in a table row, or `tr` and each square is a table data, or `td` (you could also call this a cell).

Each `td` has two data attributes: x and y coordinates. The top left `td` had an x of 0 and a y of 0.

```html
<td data-x="0" data-y="0"></td>
```

The middle `td` has an x of 1 and a y of 1.

```html
<td data-x="1" data-y="1"></td>
```

The lower right corner has an x of 2 and a y of 2.

```html
<td data-x="2" data-y="2"></td>
```

## JavaScript TTT

  For the actual TTT functionality, we've given you a lot of structure and the tests force you down a pretty specific path as far as what functions you should define and what they should do.

* `attachListeners()`
  * You must have a function called `attachListeners()` which the tests call to attach the click handlers to the page after the DOM has been loaded
  * When a client clicks on a cell, the function `doTurn()` should be called and passed a parameter of the event
* `doTurn()`
  * Increment the variable `turn` by one
  * Should call on the function `updateState()` and pass it the event
  * Should call on `checkWinner()`
* `player()`
  * If the turn number is even, this function should return the string "X", else it should return the string "O"
* `updateState()`
  * This method should call on `player()` and add the return value of this function to the clicked cell on the table
* `checkWinner()`
  * This function should evaluate the board to see if anyone has won
  * If there is a winner, this function should make one of two strings: "Player X Won!" or "Player O Won!". It should then pass this string to `message()`.
* `message()`
  * This function should accept a string and add the string to the `div` with an id of "message" 

## Persistence

Because this is the final project in the JavaScript section, for the persistence functionality we've intentionally left the implementation vague.  The tests are integration tests which actually simulate a user clicking around in the browser rather than us telling you exactly what functions to define and what they should do.  In theory it wouldn't matter what backend framework and language you used to implement the functionality.  In practice, there are some rspec tests that make sure your server responds in a sensible way.  The only thing the tests require is that the server responds to a few routes:
* GET "/games"
* POST "/games/:id"
* PATCH "/games/:id"

**Note** On the JavaScript side the actual tests will mock out the responses so your backend should send the responses the front end tests are simulating.

Running `learn` will only run the Jasmine tests. If you want to run the Rspec tests, make sure you run `rspec` separately. If you seem to be having issues running the Rspec tests, run `spring stop` followed by `rspec`.

## Resources

* [jQuery data()](https://api.jquery.com/jquery.data/)

<p class='util--hide'>View <a href='https://learn.co/lessons/js-tictactoe-rails-api'>jQuery Tic Tac Toe</a> on Learn.co and start learning to code for free.</p>
