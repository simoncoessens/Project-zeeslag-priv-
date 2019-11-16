var Interval ;
var aantal = 0;
var win = false;
// javascript representatie omzetten naar html
let bord_player = [       //met extra 'laag' rond zodat hij makkelijk kan controleren of er al een boot staat zonder index errors
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
let bord_pc = [       //met extra 'laag' rond zodat hij makkelijk kan controleren of er al een boot staat zonder index errors
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
window.onload = function(){
  boot_random(bord_player,1,6)      //plaatsing boten speler
  boot_random(bord_player,2,4)
  boot_random(bord_player,3,3)
  boot_random(bord_player,4,2)

  boot_random(bord_pc,1,6)        //plaatsing boten pc
  boot_random(bord_pc,2,4)
  boot_random(bord_pc,3,3)
  boot_random(bord_pc,4,2)

  draw_board_html(bord_player, 'player');
  draw_board_html(bord_pc, 'pc');
  timer();
  document.getElementById("aantalspeler").innerHTML = "Aantal schoten "+aantal;
}
//functie die interne representatie op html tekent
function draw_board_html(board, who){
    let boardhtml = ""
    for (let i = 0 ; i < 12 ; i++) {
        let row= "<tr>";
      for (let j=0; j< 12 ;j++){
        let rowtemp = ""
          if (board[i][j] === 0){
            if (who == 'player'){
              rowtemp = `<td id='deadcel_player'></td>`;         //cel die nog niet aangeklikt is
            }
            else if (who == 'pc'){
            rowtemp = `<td onclick="squareclick(this,bord_pc,'pc')" id='deadcel_pc'></td>`;         //cel die nog niet aangeklikt is
          }
          }
          else if (board[i][j] === 1){
            if (who == 'player'){
              rowtemp = `<td id='shipcel_${who}'></td>`;        //cel waar een schip ligt
            }
            else if (who == 'pc'){
              rowtemp = `<td onclick="squareclick(this,bord_pc,'pc')" id='shipcel_${who}'></td>`;        //cel waar een schip ligt
            }
          }
          else if (board[i][j] === 2){
            rowtemp = `<td id='misscel'></td>`;        //cel die aangeklikt is en waar niets lag, miss
          }
          else if (board[i][j] === 3){
            rowtemp = `<td id='hitcel'></td>`;        //cel die geraakt is
          }
          else if (board[i][j] === 4){              //voor als er een boot volledig gezonken is
            rowtemp = `<td id='gezonken'></td>`;
          }
          else {
            rowtemp = `<td id='randindex'>${board[i][j]}</td>`;       //randcellen met A,B,C en 1,2,3
          }
          row += rowtemp;
      }
      row += "</tr>";
      boardhtml += row;
    }
    let index = 'table_'+ who;
    document.getElementById(index).innerHTML = boardhtml
}
//timer
function timer() {
  let seconds = 00;
  let tens = 00;
  let appendTens = document.getElementById("tens")
  let appendSeconds = document.getElementById("seconds")
  // buttonStart.onclick = function() {
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
function boot_random(board,hvl,lengte){
  // boot horizontaal of verticaal
  //hvl boten van lengte vakjes
  for (let k=0 ; k < hvl ; k++){     //plaatsen van de hvl(aantal) boten met lengte vakjes
      vakjesrond = true
      let counter = 0
      let booltest = false
      while (booltest == false && vakjesrond == true ) {    //checken of er nog geen boot rondom ligt, anders zoeken naar een nieuw coordinaat
        horver = Math.floor(Math.random()*2);     //random kiezen horizontaal of verticaal
        let temp = 1;
        let x = 0;
        let y = 0;
        while (temp === 1){
          x = Math.floor((Math.random() * 10) + 1);
          y = Math.floor((Math.random() * 10) + 1);
          temp = board[x][y];
        }
        console.log(x,y)
        let boolrandgeval = false;
        vakjesrond = false
        if (vakjesrond == false){   //als er al een boot ligt zwz opnieuw genereren
          if(horver==0){          //horizontaal
            if (y > (10-lengte+1)){    //dan moet hij links georienteerd zijn, als hij teveel naar rechts ligt
              boolrandgeval = true;
              for (let i = x-1; i<x+2;i++){
                for (let j = y-lengte; j < y+2; j++){
                  vakjesrond = board[i][j] === 1;
                  if (vakjesrond == true){
                    i+=100;
                    j+=100;
                  }
                }
              }
            }
            else {                                        //als hij gwn rechts georienteerd is
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
          } //na coordinaatbepaling horizontaal
          else {                      //verticaal
            if (x < lengte){    //als de boot teveel naar boven ligt dat hij naaronder georienteerd moet zijn
              boolrandgeval = true;
              for (let i = x-1; i<(x+lengte+1);i++){
                for (let j = y-1; j < y+2; j++){
                  vakjesrond = board[i][j] === 1;
                  if (vakjesrond == true){
                    i+=100;
                    j+=100;
                  }
                }
              }
            }
            else {                                        //als hij gwn naarboven georienteerd is
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
          }//na de coordinaatbepaling verticaal
          } //na de if vakrond == false
          counter +=1;
          console.log(counter)
          if (counter > 1000){
            booltest = true;
          }
            if (vakjesrond == false){                     //als dit waar is, coordinaten invullen in bord
              co = [x,y]
              if (horver==0){                             //voor de horizontaal
              if (boolrandgeval == true ){               //hij moet links georienteerd liggen
                for (let a = 1; a < lengte; a++){
                  co.push(x,(y-a))
                }
              }
              else{                                   //hij ligt rechts georienteerd
                for (let z = 1; z < lengte; z++){
                  co.push(x,(y+z))
                }
              }
            }
            else {                            //voor de verticaal
              if (boolrandgeval == true ){              //hij moet naaronder georienteerd liggen
                for (let a = 1; a < lengte; a++){
                  co.push((x+a),y)
                }
              }
              else{                                   //hij ligt naarboven georienteerd
                for (let z = 1; z < lengte; z++){
                  co.push((co[0]-z),co[1])
                }
              }
            }
            // boot invullen in board
            console.log(co, 'succesvolle co')
            let n = 1
            for (let b = 0; b < lengte*2; b++){
                board[co[b]][co[n]] = 1;
                b+=1
                n+=2
              }
            }     //uit de vakjesrond == false 2
            } //uit de while
            if (booltest == true){
              location.reload();
            }
  }// uit de for loop
} // uit de funtie
function checkgamecomplete(board,who){        //functie die controleerd of het spel gedaan is
  let count = 0;
  for (let i = 1; i < 11; i++){
    for (let j=1; j < 11; j++){
      if (board[i][j] == 3 || board[i][j] == 4){
        count +=1;
      }
    }
    if (count == 31){
      document.getElementById('wiewint').innerHTML = 'het spel is gewonnen door '+ who
      clearInterval(Interval);                                                          //timer stoppen
      return true
    }
  }
}
function squareclick(cell,board,who){
  if (win != true){
  aantal+=1;
  document.getElementById("aantalspeler").innerHTML = "Aantal schoten "+ aantal;
  let kolom = cell.cellIndex;
  let rij = cell.parentNode.rowIndex;
  if (board[rij][kolom] === 1){
    board[rij][kolom] = 3;
    draw_board_html(board,who)
    document.getElementById("raakA").innerHTML = 'Raak door speler A'
    bootgezonken(board,'pc')
    win = checkgamecomplete(board,'speler A');
    if (win != true){
      win = false;
    }
  }
  else {
    board[rij][kolom] = 2;
    draw_board_html(board,who)
    document.getElementById("raakA").innerHTML = 'Speler B heeft gemist';
  }
  if (win != true){
  document.getElementById("textbox").innerHTML = 'Beurt aan de tegenspeler';
  guesspc(bord_player,'player');
  document.getElementById("textbox").innerHTML = 'Beurt aan speler A';
}
}
}       //functie als een cel van bord speler B aangeklikt wordt
function guesspc(board,who){
  let temp = undefined;
  let x;
  let y;
  while (temp != 0 && temp !=1){
  x = Math.floor((Math.random() * 10) + 1);
  y = Math.floor((Math.random() * 10) + 1);
  temp = board[x][y];
  }
  if (board[x][y] === 1){
    board[x][y] = 3;
    draw_board_html(board,who)
    document.getElementById("raakB").innerHTML = 'Raak door player B'
    bootgezonken(board,'player')
    win = checkgamecomplete(board,'speler B');
  }
  else {
    board[x][y] = 2;
    draw_board_html(board,who)
    document.getElementById("raakB").innerHTML = 'Speler B heeft gemist';
  }
}                // functie die zet speler B uitvoert
function reset(){                           //functie die uitgevoerd wordt als er op newgame wordt gedrukt
  location.reload()
}
function bootgezonken(board,who){               //functie die checkt of de boot gezonken is, kijkt of er rond alle 3's geen aanliggende 1 is
                                            //horizontaal en verticaal laten loopen
  //horizontaal
  for (let i = 1; i < 11; i++){
    let boolinvullen = false;
    let countgezonken = 0;
    let boolgezonken = false;
    for (let j = 1; j < 12; j++){
      test = board[i][j];
      if (test == 3){
        if (board[i][j-1] !== 1){
          if (board[i][j-1] !== 3){
          countgezonken+=1;
          boolgezonken = true;        //houdt bij of vorige cel een geraakte boot was
        }
          else if (board[i][j-1] === 3){
            if (boolgezonken == true){
              countgezonken+=1;
            }
          }
        }
        else if (board[i][j-1] === 1){
          boolgezonken = false;       //als er voor de gezonken stuk nog een niet gezonken stuk lag
          countgezonken = 0;
        }
      }
      else {
        if (test !== 1 && boolgezonken == true){
          boolinvullen = true;
          boolgezonken = false;
        }
        else {
        countgezonken = 0;                  //terug resetten want 3's moeten aan elkaar grenzen
        boolgezonken = false;
      }
      }
      if ((boolinvullen == true) && (countgezonken>1)){
          for (let kolom = 1; kolom < countgezonken+1; kolom++ ){
            board[i][j-kolom] = 4;                                    //gezonken boot invullen
          }
          boolinvullen = false;
          countgezonken = 0;
          boolgezonken = false;
      }
      else if (boolinvullen == true && countgezonken == 1){
        countgezonken = 0;
      }
      }
    }
    //verticaal
    for (let j = 1; j < 11; j++){
      let boolinvullen = false;
      let countgezonken = 0;
      let boolgezonken = false;
      for (let i = 1; i < 12; i++){
        test = board[i][j];
        if (test == 3){
          if (board[i-1][j] !== 1){
            if (board[i-1][j] !== 3){
            countgezonken+=1;
            boolgezonken = true;        //houdt bij of vorige cel een geraakte boot was
          }
            else if (board[i-1][j] === 3){
              if (boolgezonken == true){
                countgezonken+=1;
              }
            }
          }
          else if (board[i-1][j] === 1){
            boolgezonken = false;       //als er voor de gezonken stuk nog een niet gezonken stuk lag
            countgezonken = 0;
          }
        }
        else {

          if (test !== 1 && boolgezonken == true){
            boolinvullen = true;
            boolgezonken = false;
          }
          else {
          countgezonken = 0;                  //terug resetten want 3's moeten aan elkaar grenzen
          boolgezonken = false;
        }
        }

        if ((boolinvullen == true) && (countgezonken>1)){
            for (let rij = 1; rij < countgezonken+1; rij++ ){
              board[i-rij][j] = 4;                                    //gezonken boot invullen
            }
            boolinvullen = false;
            countgezonken = 0;
            boolgezonken = false;
        }
        else if (boolinvullen == true && countgezonken == 1){
          countgezonken = 0;
        }
        }
      }
    draw_board_html(board,who)

  }// einde functie
