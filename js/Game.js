class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage(p1)
    player2 = createSprite(300,200);
    player2.addImage(p2)
    
    players = [player1, player2];
  }

  obstacles = new Group();
  var obstaclesPositions = [ { x: width-800 , y: height / 2 + 250, image: obstacle1 }, 
    { x: width / 2 - 150, y: height - 1300, image: obstacle2 }, 
    { x: width / 2 + 250, y: height - 1800, image: obstacle3 },
    { x: width / 2 - 180, y: height - 2300, image: obstacle5 }, 
    { x: width / 2, y: height - 2800, image: obstacle2Image }, 
    { x: width / 2 - 180, y: height - 3300, image: obstacle4 }, 
    { x: width / 2 + 180, y: height - 3300, image: obstacle6 }, 
    { x: width / 2 + 250, y: height - 3800, image: obstacle5 }, 
    { x: width / 2 - 150, y: height - 4300, image: obstacle7 }, 
    { x: width / 2 + 250, y: height - 4800, image: obstacle4 }, 
    { x: width / 2, y: height - 5300, image: obstacl3e3 }, 
    { x: width / 2 - 180, y: height - 5500, image: obstacle7 } ];
  
    this.addSprites( obstacles, obstaclesPositions.length, obstacle1Image, 0.04, obstaclesPositions ); }

  play(){
    form.hide();

    Player.getPlayerInfo();
    //player.getRank();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the players
      var x ;
      var y=175;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in x direction
        y = y + 200;
        //use data form the database to display the players in y direction
        x = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
      stroke (10);
      fill ("red");
      ellipse(x,y,60,60);
      textSize(15);
      text(player.name + ":" + player.distance,x,y-100);
      
          players[index - 1].shapeColor = "red";
          camera.position.x = players[index-1].x;
          camera.position.y = displayHeight/2;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
  

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(player.distance>3700){
      gameState=2;
player.rank+=1;
player.updateRank(player.rank);
    }

    drawSprites();
  }
  end(){
    form.finish();
  }
}

