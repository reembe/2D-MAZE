let player;
let walls = []; 
let mazeOpened = false; 

function setup() {
  createCanvas(800, 600);

  
  player = createSprite(750, 50, 15, 15);
  player.shapeColor = color(255);
  player.rotation = 90;

  
  textAlign(RIGHT, TOP);
  textSize(20);

  
  drawMaze();
}

function draw() {
  background(255);

  
  for (let i = 0; i < walls.length; i++) {
    let wall = walls[i];
    drawSprite(wall); 
  }

 
  if (!mazeOpened) {
    if (kb.pressing("left")) {
      player.velocity.x = -3;
    } else if (kb.pressing("right")) {
      player.velocity.x = 3;
    } else if (kb.pressing("up")) {
      player.velocity.y = -3;
    } else if (kb.pressing("down")) {
      player.velocity.y = 3;
    } else {
      player.velocity.x = 0;
      player.velocity.y = 0;
    }

    
    player.position.x = constrain(player.position.x, 0, width);
    player.position.y = constrain(player.position.y, 0, height);

   
    for (let i = 0; i < walls.length; i++) {
      let wall = walls[i];
      if (player.collide(wall)) {
        
        player.velocity.x = 0;
        player.velocity.y = 0;
        break; 
      }
    }
  }


  drawSprite(player);

  
  if (!mazeOpened && player.position.y > height - player.height / 2) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(50);
    text('SLAY!', width / 2, height / 2);
    mazeOpened = true; 
    player.velocity.x = 0;
    player.velocity.y = 0;
  }


  if (!mazeOpened) {
    fill(0);
    text('Start', width - 20, 10);
  }
}

function drawMaze() {
 
  let maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0 , 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  
  let rows = maze.length;
  let cols = maze[0].length;
  let cellWidth = width / cols;
  let cellHeight = height / rows;

  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (maze[i][j] === 1) {
     
        let x = j * cellWidth;
        let y = i * cellHeight;
        let w = cellWidth;
        let h = cellHeight;

        fill(0);
        rect(x, y, w, h);

        let wall = createSprite(x + w / 2, y + h / 2, w, h);
        wall.shapeColor = color(0);
        wall.static = true; 
        walls.push(wall);
      }
    }
  }
}
