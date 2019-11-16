let Interval ;
let aantal = 0;                                                                 //variabele die bijhoudt wat het aantal schoten is
let win = false;                                                                //variabele die controleert of het spel al gewonnen is

let bord_player = [                                                             //met extra 'laag' rond zodat hij makkelijk kan controleren of er al een boot staat zonder index errors
['','A','B','B','D','E','F','G','H','I','J',''],
['1',0,0,0,0,0,0,0,0,0,0,''],
['2',0,0,0,0,0,0,0,0,0,0,''],
['3',0,0,0,0,0,0,0,0,0,0,''],
['4',0,0,0,0,0,0,0,0,0,0,''],
['5',0,0,0,0,0,0,0,0,0,0,''],
['6',0,0,0,0,0,0,0,0,0,0,''],
['7',0,0,0,0,0,0,0,0,0,0,''],
['8',0,0,0,0,0,0,0,0,0,0,''],
['9',0,0,0,0,0,0,0,0,0,0,''],
['10',0,0,0,0,0,0,0,0,0,0,''],
['','','','','','','','','','','','']]
let bord_pc = [                                                                 //met extra 'laag' rond zodat hij makkelijk kan controleren of er al een boot staat zonder index errors
['','A','B','B','D','E','F','G','H','I','J',''],
['1',0,0,0,0,0,0,0,0,0,0,''],
['2',0,0,0,0,0,0,0,0,0,0,''],
['3',0,0,0,0,0,0,0,0,0,0,''],
['4',0,0,0,0,0,0,0,0,0,0,''],
['5',0,0,0,0,0,0,0,0,0,0,''],
['6',0,0,0,0,0,0,0,0,0,0,''],
['7',0,0,0,0,0,0,0,0,0,0,''],
['8',0,0,0,0,0,0,0,0,0,0,''],
['9',0,0,0,0,0,0,0,0,0,0,''],
['10',0,0,0,0,0,0,0,0,0,0,''],
['','','','','','','','','','','','']]
window.onload = function(){                                                     //dit wordt uitgevoerd bij het laden van de pagina
  boot_random(bord_player,1,6)                                                  //plaatsing boten speler
  boot_random(bord_player,2,4)
  boot_random(bord_player,3,3)
  boot_random(bord_player,4,2)

  boot_random(bord_pc,1,6)                                                      //plaatsing boten pc
  boot_random(bord_pc,2,4)
  boot_random(bord_pc,3,3)
  boot_random(bord_pc,4,2)

  draw_board_html(bord_player, 'player');                                       //beide borden worden geschreven in het html bestand
  draw_board_html(bord_pc, 'pc');
  timer();                                                                      //de timer wordt gestart
  document.getElementById("aantalspeler").innerHTML = "Aantal schoten "+aantal;
}
//functie die interne representatie op html tekent
function draw_board_html(board, who){
    let boardhtml = ""
    for (let i = 0 ; i < 12 ; i++) {                                            //loopen door de matrix
        let row= "<tr>";
      for (let j=0; j< 12 ;j++){
        let rowtemp = ""
          if (board[i][j] === 0){
            if (who == 'player'){
              rowtemp = `<td id='deadcel_player'></td>`;                                                 //cel die nog niet aangeklikt is player
            }
            else if (who == 'pc'){
            rowtemp = `<td onclick="squareclick(this,bord_pc,'pc')" id='deadcel_pc'></td>`;              //cel die nog niet aangeklikt is pc
          }
          }
          else if (board[i][j] === 1){
            if (who == 'player'){
              rowtemp = `<td id='shipcel_${who}'></td>`;                                                 //cel waar een schip ligt player
            }
            else if (who == 'pc'){
              rowtemp = `<td onclick="squareclick(this,bord_pc,'pc')" id='shipcel_${who}'></td>`;        //cel waar een schip ligt pc
            }
          }
          else if (board[i][j] === 2){
            rowtemp = `<td id='misscel'></td>`;                                                          //cel die aangeklikt is en waar niets lag, miss
          }
          else if (board[i][j] === 3){
            rowtemp = `<td id='hitcel'></td>`;                                                           //cel die geraakt is
          }
          else if (board[i][j] === 4){                                                                   //voor als er een boot volledig gezonken is
            rowtemp = `<td id='gezonken'></td>`;
          }
          else {
            rowtemp = `<td id='randindex'>${board[i][j]}</td>`;                                          //randcellen met A,B,C en 1,2,3
          }
          row += rowtemp;
      }
      row += "</tr>";
      boardhtml += row;
    }
    let index = 'table_'+ who;
    document.getElementById(index).innerHTML = boardhtml                        //invullen in het html bestand in de table met id table_...
}
//timer
function timer() {                                                              //timer, bron: https://www.cssscript.com/a-minimal-pure-javascript-stopwatch/
  let seconds = 00;
  let tens = 00;
  let appendTens = document.getElementById("tens")
  let appendSeconds = document.getElementById("seconds")
  clearInterval(Interval);
  Interval = setInterval(startTimer, 10);
  function startTimer () {
    tens++;
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    if (tens > 9){
      appendTens.innerHTML = tens;
    }
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  }
}
//functie die plaatsing van boten document
function boot_random(board,hvl,lengte){                                         //functie die de boten random plaatst, hvl= aantal boten, lengte = lengte van elke boot
  for (let k=0 ; k < hvl ; k++){                                                //loopen door het aantal boten
      let vakjesrond = true                                                     //boolean die false geeft als er rond het coordinaat geen boten aangrenzen
      let counter = 0
      let booltest = false                                                      // wordt in line 189 uitgelegd
      while (booltest == false && vakjesrond == true ) {
        horver = Math.floor(Math.random()*2);                                   //random kiezen horizontaal of verticaal
        let temp = 1;
        let x = 0;
        let y = 0;
        while (temp === 1){                                                     //zorgen dat het gekozen coordinaat niet reeds een boot bevat
          x = Math.floor((Math.random() * 10) + 1);
          y = Math.floor((Math.random() * 10) + 1);
          temp = board[x][y];
        }
        let boolrandgeval = false;                                              //boolean die true geeft als het een 'speciaal' geval is
        vakjesrond = false
          if(horver==0){                                                        // als de boot horizontaal geplaats wordt
            if (y > (10-lengte+1)){                                             //dan moet hij links georienteerd zijn, als hij teveel naar rechts ligt
              boolrandgeval = true;                                             // is een 'speciaal' geval
              for (let i = x-1; i<x+2;i++){
                for (let j = y-lengte; j < y+2; j++){
                  vakjesrond = board[i][j] === 1;
                  if (vakjesrond == true){                                      //als er nergens een boot (een 1) rond ligt dan blijft vakjesrond true
                    i+=100;                                                     //als er een boot ligt uit de loop
                    j+=100;
                  }
                }
              }
            }
            else {                                                              //als hij gwn rechts georienteerd is
              for (let i =x-1; i < x+2; i++){
                for (let j = y-1; j < y+lengte+1; j++){
                  vakjesrond = board[i][j] === 1;
                  if (vakjesrond == true){
                    i+=100;
                    j+=100;
                  }
                }
              }
            }
          }                                                                     //na coordinaatbepaling horizontaal
          else {                                                                //als de boot verticaal geplaatst wordt
            if (x < lengte){                                                    //als de boot teveel naar boven ligt dat hij naaronder georienteerd moet zijn
              boolrandgeval = true;                                             // dit is een 'speciaal' geval voor verticale plaatsing
              for (let i = x-1; i<(x+lengte+1);i++){                            //uitleg eerste loop
                for (let j = y-1; j < y+2; j++){
                  vakjesrond = board[i][j] === 1;
                  if (vakjesrond == true){
                    i+=100;
                    j+=100;
                  }
                }
              }
            }
            else {                                                              //als hij gwn naarboven georienteerd is
              for (let i = (x-lengte); i < x+2; i++){
                for (let j = y-1; j < y+2; j++){
                  vakjesrond = board[i][j] === 1;
                  if (vakjesrond == true){
                    i+=100;
                    j+=100;
                  }
                }
              }
            }
          }                                                                     //na de coordinaatbepaling verticaal

          counter +=1;
          if (counter > 1000){                                                  //in sommige gevallen is het onmogelijk om nog een schip te plaatsen, dan uit de while loop gaan
            booltest = true;                                                    // dit is een catastrofaal geval
          }
            if (vakjesrond == false){                                           //als dit waar is, coordinaten invullen in bord
              co = [x,y]
              if (horver==0){                                                   //voor de horizontale boten
              if (boolrandgeval == true ){                                      //hij moet links georienteerd liggen, ('speciaal' geval)
                for (let a = 1; a < lengte; a++){                               //de lengte van de boot bepaald het aantal coordinaten
                  co.push(x,(y-a))                                              //een array maken met alle coordinaten van de boot
                }
              }
              else{                                                             //hij ligt rechts georienteerd
                for (let z = 1; z < lengte; z++){
                  co.push(x,(y+z))
                }
              }
            }
            else {                                                              //voor de verticale boten
              if (boolrandgeval == true ){                                      //hij moet naaronder georienteerd liggen, ('speciaal' geval)
                for (let a = 1; a < lengte; a++){
                  co.push((x+a),y)
                }
              }
              else{                                                             //hij ligt naarboven georienteerd
                for (let z = 1; z < lengte; z++){
                  co.push((co[0]-z),co[1])
                }
              }
            }
            let n = 1
            for (let b = 0; b < lengte*2; b++){                                 //loopen door de lijst met coordinaten en deze invullen in de matrix
                board[co[b]][co[n]] = 1;
                b+=1
                n+=2
              }
            }                                                                   //uit de vakjesrond == false
            }                                                                   //uit de while
            if (booltest == true){                                              // als het een catastrofaal geval is, pagina herladen en opnieuw beginnen
              location.reload();
            }
    }                                                                           // uit de for loop
  }                                                                             // uit de funtie
function checkgamecomplete(board,who){                                          //functie die controleerd of het spel gedaan is
  let count = 0;
  for (let i = 1; i < 11; i++){
    for (let j=1; j < 11; j++){
      if (board[i][j] == 3 || board[i][j] == 4){                                //telt aantal hits
        count +=1;
      }
    }
    if (count == 31){                                                           //als het aantal gehitte boten 31 is, is het spel gedaan
      document.getElementById('wiewint').innerHTML = 'het spel is gewonnen door '+ who
      clearInterval(Interval);                                                  //timer stoppen
      return true
    }
  }
}
function squareclick(cell,board,who){                                           //functie die gerunt wordt bij het klikken van een cel op het bord van speler B
  if (win != true){                                                             //als het spel gewonnnen is mag dit niet meer uitgevoerd worden
  aantal+=1;
  document.getElementById("aantalspeler").innerHTML = "Aantal schoten "+ aantal;
  let kolom = cell.cellIndex;
  let rij = cell.parentNode.rowIndex;
  if (board[rij][kolom] === 1){                                                 //een hit
    board[rij][kolom] = 3;
    draw_board_html(board,who)
    document.getElementById("raakA").innerHTML = 'Raak door speler A'
    bootgezonken(board,'pc')
    win = checkgamecomplete(board,'speler A');                                  //als het spel gewonnen is, win = true
    if (win != true){
      win = false;
    }
  }
  else {                                                                        // miss
    board[rij][kolom] = 2;
    draw_board_html(board,who)
    document.getElementById("raakA").innerHTML = 'Speler A heeft gemist';
  }
  if (win != true){                                                             //als het spel gewonnen is mag de pc geen zet meer doen
  document.getElementById("textbox").innerHTML = 'Beurt aan de tegenspeler';
  guesspc(bord_player,'player');
  document.getElementById("textbox").innerHTML = 'Beurt aan speler A';
}
}
}                                                                               //einde squareclick
function guesspc(board,who){                                                    //functie die de zet van de computer uitvoerd
  let temp = undefined;
  let x;
  let y;
  while (temp != 0 && temp !=1){                                                //zoekt naar coordinaten, mag niet een reeds gekozen coordinaat kiezen dus checkt naar waarde van coordinaat in matrix
  x = Math.floor((Math.random() * 10) + 1);                                     //random getal tussen 1 en 10
  y = Math.floor((Math.random() * 10) + 1);
  temp = board[x][y];
  }
  if (board[x][y] === 1){                                                       //als het een hit is
    board[x][y] = 3;
    draw_board_html(board,who)
    document.getElementById("raakB").innerHTML = 'Raak door player B'
    bootgezonken(board,'player')                                                //controleert of de boot gezonken is
    win = checkgamecomplete(board,'speler B');                                  //controleert of het spel gewonnen is
  }
  else {
    board[x][y] = 2;
    draw_board_html(board,who);                                                 //het bord opnieuw tekenen
    document.getElementById("raakB").innerHTML = 'Speler B heeft gemist';
  }
}                                                                               // einde guesspc
function reset(){                                                               //functie die uitgevoerd wordt als er op newgame wordt gedrukt
  location.reload()
}
function bootgezonken(board,who){                                               //functie die checkt of de boot gezonken is door horizontaal en verticaal door de matrix te loopen
  for (let i = 1; i < 11; i++){                                                 //eerst horizonaal door de matrix
    let boolinvullen = false;                                                   //als er een gezonken schip ingevuld moet worden, boolinvullen = true
    let countgezonken = 0;                                                      //telt de lengte van het schip
    let boolgezonken = false;                                                   //bool die aangeeft of vorige cel gehit was of niet en er geen 1 naast lag
    for (let j = 1; j < 12; j++){                                               //horizontaal loopen
      test = board[i][j];
      if (test == 3){                                                           //als de cel geraakt is
        if (board[i][j-1] !== 1){                                               //als er een 1 voor ligt, boot nog niet gezonken
          if (board[i][j-1] !== 3){                                             //als er geen 3 voor ligt
          countgezonken+=1;
          boolgezonken = true;
        }
          else if (board[i][j-1] === 3){                                        //als de vorige cel een 3 was
            if (boolgezonken == true){
              countgezonken+=1;
            }
          }
        }
        else if (board[i][j-1] === 1){
          boolgezonken = false;                                                 //als er voor het gezonken stuk nog een niet gezonken stuk lag
          countgezonken = 0;                                                    // dan is de boot nog niet gezonken
        }
      }
      else {                                                                    //de cel is niet geraakt
        if (test !== 1 && boolgezonken == true){                                //als de cel geen boot is en de vorige is een geraakte boot zonder een aanliggende 1
          boolinvullen = true;
          boolgezonken = false;                                                 //terug false maken, anders worden foute cellen ingevuld
        }
        else {
        countgezonken = 0;                                                      //terug resetten want 3's moeten aan elkaar grenzen
        boolgezonken = false;
      }
      }
      if ((boolinvullen == true) && (countgezonken>1)){                         //als hij mag ingevuld worden
          for (let kolom = 1; kolom < countgezonken+1; kolom++ ){               //achterwaarts want er wordt voorwaarts gelezen
            board[i][j-kolom] = 4;                                              //gezonken boot invullen
          }
          boolinvullen = false;
          countgezonken = 0;
          boolgezonken = false;
      }
      else if (boolinvullen == true && countgezonken == 1){
        countgezonken = 0;
        boolinvullen = false;
      }
      }
    }                                                                           //einde horizontale check
    for (let j = 1; j < 11; j++){                                               //verticaal door de matrix
      let boolinvullen = false;
      let countgezonken = 0;
      let boolgezonken = false;
      for (let i = 1; i < 12; i++){                                             //kijk commentaar horizontaal, hier leest hij elke kolom van boven naar beneden
        test = board[i][j];
        if (test == 3){
          if (board[i-1][j] !== 1){
            if (board[i-1][j] !== 3){
            countgezonken+=1;
            boolgezonken = true;
          }
            else if (board[i-1][j] === 3){
              if (boolgezonken == true){
                countgezonken+=1;
              }
            }
          }
          else if (board[i-1][j] === 1){
            boolgezonken = false;
            countgezonken = 0;
          }
        }
        else {

          if (test !== 1 && boolgezonken == true){
            boolinvullen = true;
            boolgezonken = false;
          }
          else {
          countgezonken = 0;                                                    //terug resetten want 3's moeten aan elkaar grenzen
          boolgezonken = false;
        }
        }

        if ((boolinvullen == true) && (countgezonken>1)){
            for (let rij = 1; rij < countgezonken+1; rij++ ){
              board[i-rij][j] = 4;                                              //gezonken boot invullen
            }
            boolinvullen = false;
            countgezonken = 0;
            boolgezonken = false;
        }
        else if (boolinvullen == true && countgezonken == 1){
          countgezonken = 0;
          boolinvullen = false;
        }
        }
      }
    draw_board_html(board,who)                                                  //bord met evt gezonken boten invullen

  }                                                                             // einde functie
