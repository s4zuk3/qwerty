
var endpoint = "https://movistar-festigame.herokuapp.com";
var playerData = {};
var answers = [];
var playing = false;
var countdowing = false;
var focusGame = false;
var paused = false;
function focusOnGame(){
  focusGame = true;
}
function loadAllAnswers(prepend){

  var allanswers = ["The legend of zelda",
"Mafia",
"Age of empires",
"Alien Versus Predator",
"Assassins Creed",
"Banjo Kazooie",
"Batman Arkham Asylum",
"Batman Arkham City",
"Battlefield",
"Beatles Rock Band",
"Beyond Good and Evil",
"Blade Runner",
"Bomberman",
"Boy and his blob",
"Burnout",
"Buscaminas",
"Bully",
"Cool boarders",
"Call of Duty",
"Capcom vs snk",
"Carmageddon",
"Castlevania",
"Colin McRae",
"Command and conquer",
"Contra",
"Counter strike",
"Crazy taxi",
"Crash bandicoot",
"Crysis",
"Dance dance revolution",
"Diablo",
"Donkey Kong Country",
"Doom",
"Double dragon",
"Dragon Age",
"Driver",
"Duke Nukem 3D",
"Earthworm jim",
"The elder scrolls",
"Exitebike",
"Fear",
"Fallout",
"Far Cry",
"Fatal Fury",
"FIFA",
"Final Fantasy",
"Final Fight",
"F zero",
"Gears of war",
"God of war",
"Goldeneye",
"Gran Turismo",
"Grand Theft Auto",
"Guitar hero",
"Half life",
"Halo",
"Heavy rain",
"House of dead",
"Killer Instinct",
"King of fighters",
"Left 4 dead",
"Lego star wars",
"The lost vikings",
"Machinarium",
"Mario Kart",
"Marvel vs capcom",
"Medal of honor",
"Mega Man",
"Metal Gear Solid",
"Metal Slug",
"Mortal Kombat",
"Need for speed underground",
"Outlast",
"PacMan",
"Portal",
"Prince of persia",
"Pro evolution soccer",
"Prototype",
"Quake",
"Rayman",
"Resident evil",
"Simcity",
"Silent Hill",
"Sonic adventure",
"Space invaders",
"Spiderman",
"Star wars rogue squadron",
"Starcraft",
"Starfox",
"Street fighter",
"mario bros",
"mario kart",
"Super Metroid",
"Super smash bros",
"Tekken",
"Tomb raider legend",
"Tony Hawk",
"Warcraft",
"Worms",
"Wwe smackdown vs raw"];

  for(var i = 0; i < 100; i++){
    addAnswer((i+1)+'.jpg',allanswers[i].toUpperCase());
  }

  if(prepend)
    for(var i = 0; i < answers.length; i++)
      $("#answer-container").prepend('<img src="img/respuestas/'+ answers[i].img+'" class="question-image" id="question-image-'+i+'">');

}
var score = 0;



var currentGameName = '';


var preloadPictures = function(pictureUrls, callback) {
    var i,
        j,
        loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
      var p = Math.round((i/j)*100.0);

        (function (img, src) {
            img.onload = function () {
                if (++loaded == pictureUrls.length && callback) {
                    callback();
                }
            };
            img.onerror = function () {};
            img.onabort = function () {};

            img.src = src;
        } (new Image(), pictureUrls[i]));
    }
};

function preloadImgAsync(sources, callback)
{
  var preloadedCounter = 0;
  for(var i = 0; i < sources.length; i++){
    jQuery.get(sources[i],function(){
        preloadedCounter++;
        var r = preloadedCounter / sources.length;
        $("#loading").text("Cargando... "+Math.round(r*100)+"%");
        console.log(Math.round(r*100));
        if(preloadedCounter == sources.length && callback)
          callback();

      });
  }
}
function twoDigits(n){

  return n > 9 ? "" + n: "0" + n;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function addAnswer(img, gameName){
  var a = {};
  a.gameName = gameName;
  a.img = img;
  a.id = answers.length;
  answers.push(a);
}
var pixelated = [];

function randomIntsExcluded(length,randoms){
  for(var i = 0; i < length; i++){

  }
}

function newQuestion(){
  paused = false;
  if(answers.length === 0)
    loadAllAnswers(false);

  var index = getRandomInt(0,answers.length);
  $("#game-name-input").val('');

  $(".show").removeClass("show");
  currentGameName = answers[index].gameName;

  // console.log(answers[index].id+")"+ currentGameName+" ["+index+"/"+answers.length+"]");
  // console.log(currentGameName);
  if($.inArray(answers[index].id, pixelated) == -1){
    document.getElementById("question-image-"+answers[index].id).closePixelate(getRandomOptions());
    pixelated.push(answers[index].id);
  }



  $("#question-image-"+answers[index].id).addClass("show");


  // $("#question-image").remove();
  // $("#answer-container").append('<img src="img/'+ answers[index].img+'" id="question-image">');
  // $("#question-image").attr("src","img/" + answers[index].img);

  var cluesIndexes = [];
  cluesIndexes.push(getRandomInt(0,currentGameName.length));
  var secondIndex;
  do{
    secondIndex = getRandomInt(0,currentGameName.length);
  }while(currentGameName[secondIndex] == ' ' || secondIndex == cluesIndexes[0]);
  cluesIndexes.push(secondIndex);
  // console.log(currentGameName);
  // console.log(cluesIndexes);

  var gameInputText = '';
  for(var i = 0; i < currentGameName.length; i++){
    if(currentGameName[i] == ' '){
      gameInputText += ' ';
    } else {
      if(i == cluesIndexes[0] || i == cluesIndexes[1])
        gameInputText += currentGameName[i];
      else 
        gameInputText += '_';
    }
  }

  $("#game-name-label").text(gameInputText);

  answers.splice(index, 1);



}
function questionAnswered(success){
  if(success){
    $("#success").fadeIn("fast").delay(333).fadeOut("fast");
  } else{
    $("#fail").fadeIn("fast").delay(333).fadeOut("fast");
  }
  paused = true;
  setTimeout(function() { newQuestion(); }, 1000);

}

function setPlayerData(pd){
  playerData = pd;
}
function endGame(){
  audioElement.pause();
  playerData.score = score;

  $.ajax({
    url: '/register',
    type: 'POST',
    dataType: 'json',
    data: playerData,
  })
  .done(function(data) {
    console.log("Enviado!");
    console.log(data);
  })
  .fail(function() {
    alert("Hubo un error enviando tu puntaje. Por favor intenta mas tarde.");
  })
  .always(function() {
    console.log("complete");
  });

  console.log(playerData);

  $(".game-interaction").removeClass('active');
  $("#score").css('display', 'none');
  $("#countdown").css('display', 'none');
  $("#score-end").css('display', 'block');
  $("#score-end").text(twoDigits(score));
  $("#next").css('display','none');
  playing = false;
  countdowing = false;
  $("#play").removeClass('alamierda').css('display','none');
  $(".show").removeClass("show");
  $("#question-image-start").removeClass("show");
  $("#question-image-end").addClass("show");
  $(".container").removeClass("playing");
  $(".hide-at-end").css('display','none');
  document.getElementById("question-image-end").scrollIntoView();

}

function startCountdown(){
  countdowing = true;
  $('#precountdown').removeClass('start');
  $('#game-name-input').focus().select();
  $("#score").text("00");
  $(".game-interaction").addClass('active');
  $(".btn-next").css('display','block');


  //IF IS MOBILE
  // $("#countdown-logo").css('display','none');
  // $(".site-logo").css('display','none');
  // $(".game-stats").css('position','absolute');
  // $(".game-stats").css('z-index',3000);

  newQuestion();

  // var timeLeft = 3000; // testing time!
  var timeLeft = 60000;
  var countdownLoop = setInterval(function(){
    if(!paused){
      timeLeft -= 100;

      $("#countdown").text(twoDigits(Math.ceil(timeLeft/1000)));

      if(timeLeft <= 0){
        $("#countdown").text(0);
        clearInterval(countdownLoop);
        endGame();
      }
    }

  },100);


}

var audioPlaying = false; 
function switchMute(){
  if(audioPlaying){
    audioElement.pause();
    audioPlaying = false;
    $("#audioswitch").attr('src','img/unmute.png');
  } else {
    audioElement.play();
    audioPlaying = true;
    $("#audioswitch").attr('src','img/mute.png');
  }
}
function startPrecountdown(){
  audioPlaying = true;
  audioElement.play();

  score = 0;
  $("#score-end").css('display', 'none');

  $("#precountdown").addClass('start').text("3");
  $(".container").addClass("playing");

  setTimeout(function(){
    $("#precountdown").text("2");
    setTimeout(function(){
      $("#precountdown").text("1");
      setTimeout(function(){
        $("#precountdown").text("");
        startCountdown();
      },1000);
    },1000);
  },1000);
}

$(document).click(function() {
  if(focusGame)
    $("#game-name-input").focus();
});



function getRandomOptions(){
  var options = [];
  options.push([{ resolution: 4 }]);

  //Circulos
  options.push([{ resolution: 4 },
  { shape : 'circle', resolution : 4, offset: 20 },
  { shape : 'circle', resolution : 4, size: 6, offset: 2 },
  { shape : 'circle', resolution : 4, size: 7, offset: 2 },
  { shape : 'circle', resolution : 4, size: 4, offset: 2 }]);

  //rombos
  options.push([{ shape: 'diamond', resolution: 6, size: 6 },
  { shape: 'diamond', resolution: 6, offset: 3 },
  { resolution: 6, alpha: 0.5 }]);

  //Pixelado circulos 1
  options.push([{ shape: 'square', resolution: 8 },
  { shape: 'circle', resolution: 8, offset: 4 },
  { shape: 'circle', resolution: 8, offset: 0, alpha: 0.5 },
  { shape: 'circle', resolution: 4, size: 2, offset: 0, alpha: 0.5 }]);

  //Pixelado con circulos 2
  options.push([{ shape : 'circle', resolution : 6 },
  { shape : 'circle', resolution : 6, size: 2, offset: 4 }]);

  //artistico
  options.push([{ shape : 'square', resolution : 8, offset: 4 },
  { shape : 'circle', resolution : 8, offset : 0 },
  { shape : 'diamond', resolution : 4, size: 3, offset : 0, alpha : 0.6 },
  { shape : 'diamond', resolution : 4, size: 3, offset : 2, alpha : 0.6 }]);
  var rInt = getRandomInt(0,options.length);
  return options[0];

}

// function init() {
//   console.log("init()");
//     for(var i = 0; i < answers.length;i++){
//       document.getElementById("question-image-"+i).closePixelate(getRandomOptions());
//     }
// };

// window.addEventListener( 'load', init, false);

var audioElement;

$(document).ready(function() {

  audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'audio/loop.mp3');
  // audioElement.setAttribute('autoplay', 'autoplay');
  audioElement.setAttribute('loop', 'true');
  //audioElement.load()

  $.get();

  // audioElement.addEventListener("load", function() {
  //     audioElement.play();
  // }, true);

  // $('.play').click(function() {
  //     audioElement.play();
  // });

  // $('.pause').click(function() {
  //     audioElement.pause();
  // });

  loadAllAnswers(true);


  $("#success").hide();
  $("#fail").hide();
  $("#next").css('display','none');
  $("#loading").css('display','block');
  $("#play").css('display','none');
  var preload = [];
  preload.push('img/home.png');
  preload.push('img/end.png');
  preload.push('img/next.png');
  preload.push('img/play.png');
  for(var i = 0; i < answers.length; i++)
    preload.push('img/respuestas/'+(i+1)+'.jpg');

  setTimeout(function(){
    preloadImgAsync(preload, function(){
      console.log("DONE!");
      $("#play").css('display','block');
      $("#loading").css('display','none');
    });
  },3000);

  // preloadPictures(preload, function(){
  //   $("#play").css('display','block');
  //   $("#loading").css('display','none');
  //   for(var i = 0; i < answers.length;i++){

  //     document.getElementById("question-image-"+i).closePixelate(getRandomOptions());
  //   }

  // });

  $("#question-image-home").addClass("show");

  $("#next").click(function(){
    newQuestion();
  });

  $("#game-name-input").keypress(function(e) {
    //Next question if user press enter
    if(countdowing){
      var code = e.keyCode || e.which;
      var inp = String.fromCharCode(code);
      if(code == 13 || (code >= 37 && code <= 40)){
        newQuestion();
      }
      else if (/[a-zA-Z0-9-_ ]/.test(inp) || code == 8){


      }
    }
  });

});
function onClickGameNameInput(){
  if(!playing){
      playing = true;
      $("#play").addClass('alamierda');
      $(".show").removeClass("show");
      startPrecountdown();
      window.scrollTo(0, 0);
      // document.getElementById("festigame").scrollIntoView();
    }
}
function stripSpaces(str){
  return(str.replace(/\s+/g, ''));
}
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
function gameNameInput(){
  var written = stripSpaces($("#game-name-input").val()).toUpperCase();
  $("#game-name-input").val(written);

  var textToShow = '';
  for(var i = 0; i < currentGameName.length; i++){
    if(currentGameName[i] == ' '){
      textToShow += ' ';
    } else {
      textToShow += '_';
    }
  }

  var writtenIndex = 0;
  for(var i = 0; i < textToShow.length; i++){

    if(currentGameName[i] != ' '){
      textToShow = textToShow.replaceAt(i,written.charAt(writtenIndex));
      // console.log("textToShow["+i+"] = "+"written["+writtenIndex+"]");
      // console.log(textToShow);
      writtenIndex++;
    }else{
      textToShow = textToShow.replaceAt(i,' ');
    }
  }

  console.log("gameNameInput()");

  // console.log("--");
  // console.log("currentGameName\t"+currentGameName);
  // console.log("written\t"+written);
  // console.log("textToShow\t"+textToShow);
  $('#game-name-label').text(textToShow);

  if(stripSpaces(written).toUpperCase().length == stripSpaces(currentGameName).toUpperCase().length){
    if(stripSpaces(written).toUpperCase() === stripSpaces(currentGameName).toUpperCase()){
      score++;
      $("#score").text(twoDigits(score));
      questionAnswered(true);
    }else{
      questionAnswered(false);
    }
  }
}

// SHARES
function fbShare(url) {
	winHeight=350;
	winWidth=500;
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('https://facebook.com/sharer/sharer.php?u=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
function twtShare(url,text) {
	winHeight=350;
	winWidth=500;
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://twitter.com/share?text=Juega+con+%23MovistarGamers%2C+adivina+la+mayor+cantidad+de+juegos+y+participa+por+entradas+dobles+para+FestiGame&url=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}
