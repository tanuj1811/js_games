
  
  function calcResult(uc){
    console.log(uc.id);
    let humanChoice = uc.id;
    let botChoice = intTOChoice(Math.floor(Math.random()*3));
    console.log("\nrandom :" + botChoice);
    let result = Result(humanChoice,botChoice);
    showWinner(result,uc,botChoice);
    
  }
  
  function showWinner(result,hc,bc){
    var message,colour;
    if(result[0] == 1){
        message = 'You Lost';
        colour = 'red';
    }else if(result[0] == -1){
        message = 'Match Tied';
        colour = 'Yellow';
    }else{
        message='You WON :)';
        colour = 'Green';
    }
    var botImg = document.getElementById(bc);
    botImg.setAttribute("onclick","playAgain()");
    botImg.setAttribute("style","box-shadow: 0 0 50px "+colour+";");
    hc.setAttribute("style","box-shadow: 0 0 50px "+colour+";");
    hc.setAttribute("onclick","playAgain()");
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let h1 = document.createElement('h1');
    let textA = document.createTextNode(message);
    h1.setAttribute("style","color:"+colour);
    h1.setAttribute('id','result');
    h1.appendChild(textA);

    
    document.getElementById('display').appendChild(hc);
    document.getElementById('display').appendChild(h1);
    document.getElementById('display').appendChild(botImg)
    
} 

  function intTOChoice(no){
    return ["rock","paper","scissor"][no];
  }

  function Result(humanChoice,botChoice){
    let result = {
      "rock":{"rock":-1,"paper":1,"scissor":0},
      "paper":{"rock":0,"paper":-1,"scissor":1},
      "scissor":{"rock":1,"paper":0,"scissor":-1},
    };
    
    let urResult = result[humanChoice][botChoice];
    let botResult = result[botChoice][humanChoice];
  
    return [urResult,botResult];
  }

  function playAgain(){
    location.reload();
  }


  // 2nd game
  var blackjackGame = {
    'you' :{'scoreSpam':'#your-blackjack-score','div' : '#your-cards','score':0},
    'dealer' :{'scoreSpam':'#dealer-blackjack-score','div' : '#dealer-cards','score':0},
    'cards' :['2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','K.png','Q.png','J.png','A.png'],
    'table' :{'win':0 ,'losses' : 0,'draw':0},
  }
  document.querySelector('#stand-btn').addEventListener('click',standBtn);
  const You = blackjackGame['you'];
  const Dealer = blackjackGame['dealer'];

  const hitSound = new Audio('sounds/swish.m4a');
  const winSound = new Audio('sounds/cash.mp3');
  const loseSound = new Audio('sounds/aww.mp3');

 function hitBtn(){
    generateCard(You);
 }

 function standBtn(){
     generateCard(Dealer);
 }

 function dealBtn(){
    getWinner();
    let urImages = document.querySelector('#your-cards').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-cards').querySelectorAll('img');
    urImages.forEach((a)=>a.remove());
    dealerImages.forEach((a)=>a.remove());
    You['score'] = 0;
    Dealer['score'] = 0;
    let gameresult = document.querySelector(You['scoreSpam']).textContent=0;
    document.querySelector(Dealer['scoreSpam']).textContent=0;
 }

 function generateCard(activePlayer) {
    if(activePlayer['score'] <= 21){
        let cardNo = Math.floor(Math.random()*13);
        let tmpcard = blackjackGame['cards'][cardNo];

        let cardImage = document.createElement('img');
        cardImage.src = 'images/'+ tmpcard;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();

        updateScore(cardNo,activePlayer);
    }
 }

 function updateScore(cardNo,activePlayer){
     let cardScore;
     if(cardNo === 12){  //for ace
        if(activePlayer['score']+11 <= 21)
            cardScore = 11;
        else 
            cardScore = 1;
     }else if(cardNo > 8) cardScore = 10;
     else cardScore = cardNo+2;

     activePlayer['score'] += cardScore;
     if(activePlayer['score'] <=21)
        document.querySelector(activePlayer['scoreSpam']).textContent = activePlayer['score'];
     else{
        document.querySelector(activePlayer['scoreSpam']).textContent = 'BUST :( ☠';
     }
 }

 function getWinner(){
     let winner = null
     let us = You['score'],ds = Dealer['score'];
     
     if(us <= 21){
        if(us > ds || ds >21)
            winner = You;
        else if(us != ds)
            winner = Dealer;
     }else if(ds <= 21)
        winner = Dealer;

     showResult(winner);
 }

 function showResult(winner){
     if(winner == You){
        document.querySelector('#blackjack-result').textContent = 'You Won 🤑🤑';
        document.querySelector('#blackjack-result').style.color = 'green';
        // blackjackGame['table']['win']++;
        document.querySelector('#win').textContent = ++blackjackGame['table']['win'];
        winSound.play();
     }
     else if(winner == Dealer){
        document.querySelector('#blackjack-result').textContent = 'You Lost 😣';
        document.querySelector('#blackjack-result').style.color = 'red';
        document.querySelector('#losses').textContent = ++blackjackGame['table']['losses'];
        loseSound.play();
     }else{
        document.querySelector('#blackjack-result').textContent = 'Matched tired 😣';
        document.querySelector('#blackjack-result').style.color = 'yellow';
        document.querySelector('#draw').textContent = ++blackjackGame['table']['draw'];
        loseSound.play();
     }
 }