let TotalShipsHit = 0;

//Detect collision
function collision($div1, $div2) {
  var x1 = $div1.offset().left;
  var y1 = $div1.offset().top;
  var h1 = $div1.outerHeight(true);
  var w1 = $div1.outerWidth(true);
  var b1 = y1 + h1;
  var r1 = x1 + w1;

  var x2 = $div2.offset().left;
  var y2 = $div2.offset().top;
  var h2 = $div2.outerHeight(true);
  var w2 = $div2.outerWidth(true);
  var b2 = y2 + h2;
  var r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}

//Method to create new Alein ship
function createAlienShip() {

  if ($('.Alien-ship').length == 0) {
    console.log("New alien ship created.")
    var $alien_ship = $("<div>", { "class": "Alien-ship" });

    $alien_ship.css("left", "30px");
    console.log($alien_ship.css);
    $(".battlefield").append($alien_ship);
    MoveFromLeftRight($alien_ship);
  } else {
    MoveFromLeftRight($('.Alien-ship'));
  }

}

//Move alien ship from left- Right
function MoveFromLeftRight($alien_ship) {

  $alien_ship.css("transition-delay", "10s");
  $alien_ship.css("transition", "10s");
  setTimeout(function () { $alien_ship.css("left", "600px") }, 500);

}
//Function to call IF collision happens
//Else it creates NEW Bullet to hit the target
function find() {
  if (collision($('.Alien-ship'), $('.bullets'))) {
    console.log("Bullet hit ,ship destroyed");
    // $(".Alien-ship").animate({ 'height': 'toggle' });
    $(".Alien-ship").css("left", "30px");
    $(".Alien-ship").remove();//Delete / destroy Alien ship
    TotalShipsHit++;
    console.log(TotalShipsHit);
    $('.score').empty();
    $('.score').append(`<h3>Score - ${TotalShipsHit}/5 </h3>`);

    if (TotalShipsHit == 5) {
      $('#winText').empty();
      $('#winText').append(`<h1>YOU WIN !!SAVED THE WORLD FROM ALIENS</h1>`);
    } else {
      //Create new Ship
      createAlienShip();
    }
  } else {
    console.log("Damn it!Just missed!");
    //Create new bullet
    var $div = $("<div>", { "class": "bullets" });
    $(".ship").after($div);
    setTimeout(function () { 
      if($(".Alien-ship").css("left") == "600px"){
        $('#winText').empty();
        $('#winText').append(`<h1>YOU LOST</h1>`);
      }
    }, 500);
  }
}


//Click to hit plane
$("#btn-start").on('click', function (event) {
  console.log(TotalShipsHit);
  if (event) {
    console.log(event);
    $(".bullets").animate({ "top": "-=405px" }, "fast"); //fire bullet
    setTimeout(find, 250);
    $(".bullets").animate({ 'height': 'toggle' }); //Disappear bullet
  }
});

// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }