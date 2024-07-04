let kiaiSpeed;
let spawnTimer;
let spawnMaxTimer;
let diffTimer;

let easyDiff;
let easyDescendStart;
let easyDescendTimer;
let easyDescendRate;
let fiveMax;

let midDiff;
let midDescendStart;
let midDescendTimer;
let midDescendRate;
let midMaxTimer;
let twoMax;

let hardMaxTimer;
let oneMax;
let easySteps;
let midSteps;
let hardSteps

let asteroids = [];
let hp;
let hpColor;
let astCrashHeight;

let buttons = [];
let correctValue;
let correctIndex;
let readyToUpdate = false;
let againButton;
let resumeButton;
let pauseButton;
let configButton2;

let amplitude = 10;
let frequency = 0.05;
let currentY = 0;
let offsetY;
let prepareTimer;
let prepareMaxTimer;
let climaxSetup = false;
let prepShipY;
let shipMaxY;
let shipY;
let shipYMult;
let timeOut = false;
let timerOut;
let timerOutEnd;
let kiai;
let kiaiTimer;
let kiaiEnd;
let kiaiPrepEnd;
let resetKiai;

let animTimer;
let animEnd;
let startx;
let starty;
let endx;
let endy;
let laserSkin = ["#15dafb", "#70e000", "#ff006e", "#fb5607"]

let combostate;
let comboDrawTime;
let comboDrawEnd;
let offY;
let pointsY;
let playbackRate;
let pointstate;
let falloff;
let quickfall;
let falloffRate;
let quickfallRate;

function startValues() {
  kiaiSpeed = 1;
  spawnTimer = 0;
  spawnMaxTimer = 10000;
  diffTimer = 0;

  easyDiff = 1;
  easyDescendStart = 45;
  easyDescendTimer = 0;
  easyDescendRate = 0.01;
  fiveMax = 10;

  midDiff = 1;
  midDescendStart = 45;
  midDescendTimer = 0;
  midDescendRate = 0.005;
  midMaxTimer = 10;
  twoMax = 20;

  hardMaxTimer = 10;
  oneMax = 10;

  easySteps = 3;
  midSteps = 8;
  hardSteps = 15;

  astSpeedAdd = 0.002;
  sizeMultAdd = 0.0048;
  asteroids = [];
  hp = 100;
  hpColor = "#54aad8";

  prepareTimer = 0;
  prepareMaxTimer = 1000;
  prepShipY = 300;
  shipY = 300;
  shipYMult = 1;

  timerOut = 0;
  timerOutEnd = 1000;
  lastPoints = 0;
  comboStreak = 0;
  comboAdd = 0;
  combostate = false;
  comboDrawTime = 0
  comboDrawEnd = 1000
  pointsY = 0;
  offY = 0;
  pointstate = false;
  falloff = 0;
  quickfall = 0;
  falloffRate = 0.05;
  quickfallRate = 0.75;

  points = 100;
  misses = 0;
  kiai = false;
  kiaiTimer = 0;
  kiaiEnd = 5000;
  kiaiPrepEnd = true;
  resetKiai = false;

  pausegame = false;

  startLaser();
}

function startLaser() {
  shootLaser = false;
  animTimer = 0;
  animEnd = 0;
  startx = width / 2;
  starty = height - 200;
  endx = startx;
  endy = starty;
}

class Ast {
  constructor(opString, opValue) {
    this.size = random(1, 2);
    if (kiai) {
      this.size *= kiaiSpeed / 1.5;
    } 
    this.sizeMult = 0.025;
    this.x = random(width / 2 - 5, width / 2 + 5);
    this.y = 50;
    this.xShift = (this.x - width / 2) / 25;
    this.opString = opString;
    this.opValue = opValue;
    this.speed = 0.1;
  }

  display() {
  
    if (!pausegame) {
      this.sizeMult *= 1 - sizeMultAdd;
      this.size *= 1 + this.sizeMult;
      this.speed += astSpeedAdd;
    }

    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(astLibrary[astSkin], 0, 0, this.size, this.size);
    pop();

    stroke(0);
    strokeWeight(this.size / 30);
    textAlign(CENTER, CENTER);
    textFont("PerfectDOSVGA437", this.size / 4);
    fill("white");
    text(this.opString, this.x, this.y);
  }
}

function gameSetup() {

  for (let i = 0; i < 3; i++) {
    let button = createButton("");
    button.parent("canvasParent");
    button.style("text-align", "center");
    button.style("font-size", "36px");
    button.style("font-family", "PerfectDOSVGA437");
    button.style("color", "#54aad8");
    button.style("background-color", "#02050d");
    button.style("border", "solid #54aad8");
    button.position(width / 2 - 127 + i * 90, 550);
    button.size(75, 40);
    button.mousePressed(() => checkValues(i));
    buttons.push(button);
  }
  pauseButton = createButton("PAUSA");
  pauseButton.parent("canvasParent");
  pauseButton.style("font-size", "32px");
  pauseButton.style("font-family", "PerfectDOSVGA437");
  pauseButton.style("color", "#c2455f");
  pauseButton.style("background-color", "#02050d");
  pauseButton.style("border", "2px solid #c2455f");
  pauseButton.style("border-radius", "2px");
  pauseButton.size(110, 45);
  pauseButton.position(width - 110 - 25, 25);
  pauseButton.mousePressed(() => {
    if (!pausegame) {
      pausegame = !pausegame;
      sfxLibrary[0].play();
      pauseMenu();
    }
  });
}

function gameDraw() {
  if (climaxSetup) {
    if (kiai) {
      if (kiaiTimer < kiaiEnd) {
        if (!pausegame) {
          kiaiTimer += deltaTime;
        }
        if (kiaiTimer > kiaiEnd - 2000) {            
          kiaiEndSpawn();
        }
      } else{
        if (!gameOver) {
          kiai = false;
          kiaiTimer = 0;
          kiaiMode();
          sfxLibrary[8].play();
          readyToUpdate = true;
          updateButtons();
        } else {
          if (!resetKiai) {
            if (asteroids.length == 0) {
              kiaiTimer = 0;
              prtclRate = 50;
              prtclSpeedMult = 1.01;
              prtclSizeAdd = 0.00075;
              spawnTimer = spawnMaxTimer * 0.8;
              kiaiSpeed = 1;
              kiaiPrepEnd = true;
              comboStreak = 0;
              resetKiai = true;
            }
          }
        }
      }
    }
    if (comboStreak > 1) {
      if (!pointstate) {
        if (falloff < 28) {
          if (!pausegame) {
            falloff += falloffRate;
          }
        } else {
          falloff = 28;
        }
      }
      textSize(28 + comboStreak + offY - falloff);
      textAlign(CENTER, CENTER);
      noStroke();
      if (comboStreak < 5) {
        fill("#54aad8");
      } else if (comboStreak < 10) {
        fill("#ffbe0b");
      } else {
        fill("#ff006e");
      }
      if (!kiai) {
        text("x" + comboStreak + " COMBO!", width / 2, 45);
      } else {
        text("TURBO ACTIVADO!", width / 2, 45);
      }

      
    }
    
    if (!gameOver) {
      textSize(32 + comboStreak + offY);
      if (comboStreak < 5) {
        fill("#54aad8");
      } else if (comboStreak < 10) {
        fill("#ffbe0b");
      } else {
        fill("#ff006e");
      }
      textAlign(LEFT, CENTER);
      noStroke();
      text(lastPoints, 30, 45);
      textAlign(CENTER, CENTER);
    }
    
    
    
    if (combostate) {
      offY = amplitude * sin((pointsY += deltaTime * (0.03 * (comboStreak / 2))) * frequency);
      if (comboDrawTime < comboDrawEnd) {
        if (!pausegame) {
          comboDrawTime += deltaTime;
        }
        falloff = 0;
        if (comboStreak >= 5) {
          if (quickfall < 32) {
            if (!pausegame) {
              quickfall += quickfallRate;
            }
          } else {
            quickfall = 32;
          }
  
          textSize(32 + comboStreak + offY * 1.25);
          if (comboStreak < 5) {
            fill("#54aad8");
          } else if (comboStreak < 10) {
            fill("#ffbe0b");
          } else {
            fill("#ff006e");
          }
          textAlign(CENTER, CENTER);
          noStroke();
          text("+" + comboAdd + "!", width / 2, 90);
          textAlign(CENTER, CENTER);
        }
      } else {
        comboDrawTime = 0;
        lastPoints += comboAdd
        combostate = false;
      }
    } else if (pointstate) {
      if (comboDrawTime < comboDrawEnd) {
        if (!pausegame) {
          comboDrawTime += deltaTime;
          offY = amplitude * sin((pointsY += deltaTime * (0.03 * 2)) * frequency);
        }
        falloff = 0;
      } else {
        quickfall = 0;
        offY = 0;
        comboDrawTime = 0;
        pointstate = false;
      }
    }
  }
  if (!pausegame) {
    spawnTimer += deltaTime;
    diffTimer += deltaTime;
  }

  if (!pausegame) {
    if (diffTimer >= 1000) {
      diffTimer = 0;

      if (easyDescendTimer < easyDescendStart) {
        easyDescendTimer += 1;
      } else {
        if (easyDiff > 0) {
          easyDiff -= easyDescendRate;
        }
        if (midDescendTimer < midDescendStart) {
          midDescendTimer += 1;
        } else {
          if (midDiff > 0.2) {
            midDiff -= midDescendRate;
          } else {
            if (midMaxTimer < 15) {
              midMaxTimer += 1;
            } else {
              midMaxTimer = 0;
              midSteps += 1;
              fiveMax += 1;
              twoMax += 1;
              if (hardMaxTimer < 15) {
                hardMaxTimer += 1;
              } else {
                hardMaxTimer = 0;
                hardSteps += 2;
                oneMax += 1;
              }
            }
          }
        }
      }
    }
  }
  
  if (spawnTimer >= spawnMaxTimer) {
    spawnTimer = 0;
    if (!kiai) {
      spawnMaxTimer -= 5 + (spawnMaxTimer / 250);
    }
    if (!gameOver) {
      spawn();
    }
  }

  let i = asteroids.length;

  while (i > 0 && asteroids.length > 0) {
    i--;
    if (!pausegame) {
      asteroids[i].y += asteroids[i].speed * kiaiSpeed;
      asteroids[i].x += asteroids[i].xShift * asteroids[i].speed * kiaiSpeed;
    }
    if (gameOver || shootLaser) {
      astCrashHeight = height + asteroids[i].size;
    } else {
      astCrashHeight = height - astLibrary[astSkin].height - 40;
    }
    if (asteroids[i].y < astCrashHeight) {
      asteroids[i].display();
    } else {
      
      let newAnim = new Anim(asteroids[i].x, asteroids[i].y, asteroids[i].size, 0);
      animList.push(newAnim);

      explosionRate = map(asteroids[i].size, 1, 200, 1.4, 0.8);
      sfxLibrary[3].rate(explosionRate);

      asteroids.splice(i, 1);
      comboAdd = 10;
      comboStreak = 0;
      readyToUpdate = true;
      updateButtons();
      if (hp > 0) {
        updateHealth(-20);
      }
    }
  }
  noSmooth();
  imageMode(CENTER);

  if (rungame) {
    laserBeam();
    timeOutCheck();
    if (!pausegame) {
      if (!kiai) {
        offsetY = amplitude * sin((currentY += deltaTime * 0.03) * frequency);
      } else {
        offsetY = amplitude * sin((currentY += deltaTime * 0.06) * frequency);
      }
    }
    if (climaxSetup) {
      if (!gameOver) {
        
        image(
          shipLibrary[shipSkin],
          width / 2,
          (height - 100) + offsetY,
          width / 2.5,
          height / 2.5,
          0,
          0,
          shipLibrary[shipSkin].width,
          shipLibrary[shipSkin].height,
          CONTAIN
        );
      } 
    }
  }
  if (gameOver && rungame) {
    deathSequence();
  }
  if (rungame) {
    animationManager();
  }
  if (climaxSetup) {
    if (!gameOver) {
      if (hp > 0) {
        strokeWeight(4);
        stroke(hpColor);
        fill(2, 5, 13);
        rectMode(CORNER);
        rect(width / 2 - 125, height - 87, hp * 2.5, 25);
      }
    }
  }

  if (pausegame) {
    background(0, 0, 0, 180);
    if (runsettings) {
      noStroke();
      textSize(32);
      fill("#54aad8");
      textAlign(LEFT, CENTER);
      text("MUSICA", width / 2 - 220, 240);
      text("SONIDO", width / 2 - 220, 320);
      rectMode(CENTER);
      if (fs) {
        fill("#54aad8");
      } else {
        fill("#c2455f");
      }
      square(width / 2 + 135, 160, 20)
      fill("#54aad8");
    }
  }
}

class Anim {
  constructor(x, y, size, animID) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.timer = 0;
    this.currentFrame = 0;
    this.animID = animID;
    if (this.animID == 0) {
      this.rate = map(this.size, 1, 200, 50, 80);
    } else {
      this.rate = 50;
    }
  }

  play() {
    if (this.currentFrame < animations[this.animID].length) {
      if (!pausegame) {
        this.timer += deltaTime;
      }

      imageMode(CENTER);
      image(
        animations[this.animID][this.currentFrame],
        this.x, this.y,
        this.size * 1.25,
        this.size * 1.25
      );
      
      if (this.timer > this.rate) {
        this.timer = 0;
        this.currentFrame++;
      }
    }
  }
}

function animationManager() {
  for (let i = animList.length - 1; i >= 0; i--) {
    animList[i].play();

    if (animList[i].currentFrame >= animations[animList[i].animID].length) {
      animList.splice(i, 1);
    }
  }
}

function pauseMenu() {
  timeOut = false;
  musicLibrary[1].setVolume(musicvol * 0.4);
  for (let button of buttons) {
    button.style("color", "#193240");
    button.style("border", "solid #193240");
  }
  pauseButton.style("color", "#521c27");
  pauseButton.style("border", "2px solid #521c27");
  if (!kiai) {
    offsetY = amplitude * sin((currentY) * frequency);
  } else {
    offsetY = amplitude * sin((currentY) * frequency);
  }
  
  resumeButton = createButton("CONTINUAR");
  resumeButton.parent("canvasParent");
  resumeButton.style("font-size", "36px");
  resumeButton.style("font-family", "PerfectDOSVGA437");
  resumeButton.style("color", "#54aad8");
  resumeButton.style("background-color", "#02050d");
  resumeButton.style("border", "2px solid #54aad8");
  resumeButton.style("border-radius", "2px");
  resumeButton.size(200, 60);
  resumeButton.position(width / 2 - 100, height / 3 - 60);
  resumeButton.mousePressed(() => {
    sfxLibrary[0].play();
    musicLibrary[1].setVolume(musicvol);
    resumeButton.remove();
    configButton2.remove();
    againButton.remove();
    timeOut = true;
    pausegame = false;
    pauseButton.style("color", "#c2455f");
    pauseButton.style("border", "2px solid #c2455f");
    for (let button of buttons) {
      button.style("color", "#54aad8");
      button.style("border", "solid #54aad8");
  }
  });
  
  configButton2 = createButton("AJUSTES");
  configButton2.parent("canvasParent");
  configButton2.style("font-size", "36px");
  configButton2.style("font-family", "PerfectDOSVGA437");
  configButton2.style("color", "#54aad8");
  textFont(customFont);
  configButton2.style("background-color", "#02050d");
  configButton2.style("border", "2px solid #54aad8");
  configButton2.style("border-radius", "2px");
  configButton2.size(170, 60);
  configButton2.position(width / 2 - 85, height / 2 - 60);
  configButton2.mousePressed(() => {
    sfxLibrary[0].play();
    configMenu();
    print("entered settings");
  });

  againButton = createButton("VOLVER AL MENU");
  againButton.parent("canvasParent");
  againButton.style("font-size", "36px");
  againButton.style("font-family", "PerfectDOSVGA437");
  againButton.style("color", "#54aad8");
  againButton.style("background-color", "#02050d");
  againButton.style("border", "2px solid #54aad8");
  againButton.style("border-radius", "2px");
  againButton.size(310, 60);
  againButton.position(width / 2 - 155, height - height / 3 - 60);
  againButton.mousePressed(() => {
    sfxLibrary[0].play();
    clearGame();
    kiai = false;
    kiaiMode();
    musicLibrary[1].setVolume(musicvol);
    restartSequence();
    resumeButton.remove();
    configButton2.remove();
    againButton.remove();
    gameOver = false;
    pausegame = false;
    rungame = false;
  });
}

function spawn() {
  let randNum = random();
  let op;

  if (randNum <= easyDiff) {  
    op = operationMatrix(1);
    print("EASY NIGGA");
    print(op.value);
  } 
  else if (randNum <= midDiff) {
    op = operationMatrix(2);
    print("MEDIUM NIGGA");
    print(op.value);
  } 
  else {
    op = operationMatrix(3);
    print("HARD NIGGA");
    print(op.value);
  }

  let newAst = new Ast(op.string, op.value);
  asteroids.push(newAst);
  updateButtons();
}

class Operation {
  constructor(string, value) {
    this.string = string;
    this.value = value;
  }
}

function operationMatrix(diff) {
  let first;
  let last;
  let symbol;
  let string;
  let value;
  switch(level) {
    case 1: 
      switch(diff) {
        case 1:
          first = int(random(1, 5)) * 5; // 5-25
          last = int(random(1, 5)) * 5; // 5-25
          
          if (first < last) {
            let temp = first;
            first = last;
            last = temp;
          }

          if (random() < 0.5) {
            symbol = "+";
            value = first + last;
          } else {
            symbol = "-";
            value = first - last;
          }
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 2:
          first = int(random(2, fiveMax)) * 5; // 10-50+
          last = int(random(2, fiveMax)) * 5; // 10-50+

          if (first < last) {
            let temp = first;
            first = last;
            last = temp;
          }
          
          if (random() < 0.5) {
            symbol = "+";
            value = first + last;
          } else {
            symbol = "-";
            value = first - last;
          }
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 3:
          do {
            first = int(random(5, fiveMax)) * 5; // 25-50+
            last = int(random(5, fiveMax)) * 5; // 25-50+
          }
          while(first - last < 10)

          if (first < last) {
            let temp = first;
            first = last;
            last = temp;
          }
          
          if (random() < 0.5) {
            symbol = "+";
            value = first + last;
          } else {
            symbol = "-";
            value = first - last;
          }
          string = str(first) + " " + symbol + " " + str(last);
          break;
        default:
          first = 0;
          last = 0;

          symbol = "+";
          value = first + last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
      }
      break;
    case 2: 
      switch(diff) {
        case 1:
          first = int(random(1, 12)) * 2; // 4-24
          last = int(random(1, 12)) * 2; // 4-24

          if (first < last) {
            let temp = first;
            first = last;
            last = temp;
          }

          if (random() < 0.5) {
            symbol = "+";
            value = first + last;
          } else {
            symbol = "-";
            value = first - last;
          }
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 2:
          first = int(random(5, twoMax)) * 2; // 10-40+
          last = int(random(5, twoMax)) * 2; // 10-40+

          if (first < last) {
            let temp = first;
            first = last;
            last = temp;
          }

          if (random() < 0.5) {
            symbol = "+";
            value = first + last;
          } else {
            symbol = "-";
            value = first - last;
          }
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 3:
          first = int(random(1, oneMax)) * 2; // 2-10+
          last = int(random(1, oneMax)) * 2; // 2-10+

          symbol = "x";
          value = first * last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
        default:
          first = 0;
          last = 0;

          symbol = "+";
          value = first + last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
      }
      break;
    case 3: 
      switch(diff) {
        case 1:
          first = int(random(5, 15)); // 5-15
          last = int(random(5, 15)); // 5-15

          if (first < last) {
            let temp = first;
            first = last;
            last = temp;
          }

          if (random() < 0.5) {
            symbol = "+";
            value = first + last;
          } else {
            symbol = "-";
            value = first - last;
          }
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 2:
          first = int(random(2, oneMax)); // 2-10+
          last = int(random(2, oneMax)); // 2-10+

          symbol = "x";
          value = first * last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 3:
          do {
            first = int(random(2, twoMax)); // 2-20+
            last = int(random(2, twoMax)); // 2-20+
  
            if (first < last) {
              let temp = first;
              first = last;
              last = temp;
            }
          }
          while(first % last != 0 || first / last == 1);

          symbol = "/";
          value = first / last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
        default:
          first = 0;
          last = 0;

          symbol = "+";
          value = first + last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
      }
      break;
    case 4: 
      switch(diff) {
        case 1:
          first = int(random(2, 10)); // 2-10
          last = int(random(2, 10)); // 2-10

          symbol = "x";
          value = first * last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 2:
          do {
            first = int(random(2, twoMax)); // 2-20+
            last = int(random(2, twoMax)); // 2-20+
  
            if (first < last) {
              let temp = first;
              first = last;
              last = temp;
            }
          }
          while(first % last != 0 || first / last == 1);

          symbol = "/";
          value = first / last;
          
          string = str(first) + " " + symbol + " " + str(last);
          break;
        case 3:
          first = int(random(2, oneMax)); // 2-10+
          last = random([2, 3]); // 2-3

          if (random() < 0.5) {
            symbol = "^";
            value = pow(first, last);

            string = str(first) + " " + symbol + " " + str(last);
            break;
          } else {
            symbol = "√";
            first = pow(first, last);
            if (last == 2) {
              value = Math.sqrt(first);
            } else{
              value = Math.cbrt(first);
            }

            string = str(last) + " " + symbol + " " + str(first);
            break;
          }
        default:
          first = 0;
          last = 0;

          symbol = "+";
          value = first + last;
          
          string = str(first) + symbol + str(last);
          break;
      }
      break;
  }
  if (kiai) {
    string = "";
    value = "";
  }

  let newOp = new Operation(string, value);
  return newOp;
}


function updateHealth(value) {
  if (hp + value <= 0) {
    hp = 0;
    sfxLibrary[5].rate(explosionRate * 0.6);
    sfxLibrary[5].play();
    let newAnim = new Anim(width / 2, height - 150, shipLibrary[shipSkin].width * 2, 1);
    animList.push(newAnim);
    musicLibrary[1].setVolume(musicvol * 0.4);
    clearGame();
  } else {
    if (value < 0) {
      sfxLibrary[3].play();
    }
    hp += value;
  }

  if (hp <= 33) {
    hpColor = "#c2455f";
  } else if (hp <= 66) {
    hpColor = "#ffbe0b";
  } else {
    hpColor = "#54aad8";
  }
}

function timeOutCheck() {
  if (timeOut) {
    if (timerOut < timerOutEnd) {
      timerOut += deltaTime;
    } else {
      timerOut = 0;
      timeOut = false;
    }
  }
}

function combo() {
  if (comboStreak >= 5) {
    playbackRate = map(comboStreak, 6, 10, 0.6, 0.95);
    sfxLibrary[9].rate(playbackRate);
    sfxLibrary[9].play();
    comboAdd += 10;
    lastPoints += points;
    pointsY = 0;
    comboDrawEnd -= comboDrawEnd / (comboStreak);
    offY = 0;
    quickfall = 0;
    combostate = true;
  } else {
    lastPoints += points;
    pointsY = 0;
    points = 100;
    pointstate = true;;
  }
  if (comboStreak == 10) {
    kiai = true;
    kiaiMode();
  }
}

function kiaiMode() {
  if (kiai) {
    sfxLibrary[10].rate(0.8);
    sfxLibrary[10].play();
    timerOutEnd = spawnMaxTimer / 50;
    asteroids.splice(0, asteroids.length);
    prtclRate = 30;
    prtclSpeedMult = 1.05;
    prtclSizeAdd = 0.005;
    spawnMaxTimer *= 0.1;
    kiaiSpeed = 16;
  } else {
    if (!gameOver) {
      timerOutEnd = 1000;
      comboDrawEnd = 1000;
      comboAdd = 0;
      comboStreak = 0; 
      offY = 0;
      quickfall = 0;
      combostate = false;
      asteroids.splice(0, asteroids.length);
      prtclRate = 50;
      prtclSpeedMult = 1.01;
      prtclSizeAdd = 0.00075;
      spawnTimer = spawnMaxTimer * 0.8;
      kiaiSpeed = 1;
      kiaiPrepEnd = true;
      
    } else {
      asteroids.splice(0, asteroids.length);
      prtclRate = 50;
      prtclSpeedMult = 1.01;
      prtclSizeAdd = 0.00075;
    }
  }
}

function kiaiEndSpawn() {
  if (kiaiPrepEnd) {
    spawnMaxTimer *= 10;
    kiaiPrepEnd = false;
    falloffRate = 0.05;
    quickfallRate = 0.75;
  }
}

function missedAttempts() {
  misses ++;
  //print(misses + " MISS");
  if (misses < 1) {
    points = 100;
    //print(points);
  } else if (misses < 2) {
    points = 60;
    //print(points);
  } else {
    points = 20;
  }
}

function checkValues(buttonIndex) {
  if (!pausegame) {
    if (!timeOut) {
      if (asteroids.length > 0) {
        if (!kiai) {
          let selectedValue = parseInt(buttons[buttonIndex].html());
          if (selectedValue == correctValue) {
            //print("Correct!");
            sfxLibrary[4].play();
            shootLaser = true;
          } else {
            sfxLibrary[7].play();
            comboDrawEnd = 1000;
            comboStreak = 0;
            missedAttempts();
            buttons[buttonIndex].style("color", "#c2455f");
            buttons[buttonIndex].style("border", "solid #c2455f");
            //print("Incorrect!");
          }
        } else {
          if (!shootLaser) {
            sfxLibrary[4].play();
          }
          shootLaser = true;
        }
        timeOut = true;
      } 
    }
  }
}

let strokeMax = 100;
let opacityGain = 1;
let strokeGain = strokeMax;
let res = 50;

function laserGlow() {
  
  let laser = color(laserSkin[shipSkin])

  for (let i = 0; i < res; i++) {
    
    strokeWeight(strokeGain);

    laser.setAlpha(opacityGain)
    stroke(laser);
    line(startx, starty, endx, endy);
    
    opacityGain *= Math.pow(255, 1 / res);
    strokeGain /= Math.pow(strokeMax, 1 / (res / 1.75));
  } 
  opacityGain = 1;
  strokeGain = strokeMax;
}

function laserBeam() {
  if (shootLaser) {

    if (asteroids.length > 0) {
      animEnd = 0.1 * (dist(width / 2, height - 200, asteroids[0].x, asteroids[0].y) / 50)
      let laserLength = 2;
  
      if (animTimer < animEnd) {
        if (!pausegame) {
          animTimer += (deltaTime / 1000);
          //strokeCap(SQUARE);
          laserGlow();
          noStroke();
          //strokeCap(ROUND);
    
          let rate = 0.09;
          startx = lerp(startx, asteroids[0].x, rate * (1 + laserLength));
          starty = lerp(starty, asteroids[0].y, rate * (1 + laserLength));
    
          endx = lerp(endx, asteroids[0].x, rate);
          endy = lerp(endy, asteroids[0].y, rate);
        }
      } else {

        let newAnim = new Anim(asteroids[0].x, asteroids[0].y, asteroids[0].size, 0);
        animList.push(newAnim);

        explosionRate = map(asteroids[0].size, 1, 200, 1.4, 0.8);
        sfxLibrary[3].rate(explosionRate);
        asteroids.splice(0, 1);
        shootLaser = false;
        readyToUpdate = true;
        if (kiai) {
          if (hp <= 95) {
            updateHealth(5);
          }
        }
        comboStreak ++;
        //print(comboStreak)
        //print(points);
        combo();
        updateButtons();
        sfxLibrary[3].play();
        startLaser();
      }
    } else {
      shootLaser = false;
      readyToUpdate = true;
      updateButtons();
      startLaser();
    }
  }
}

function updateButtons() {
  misses = 0;
  //points = 100;

  if (buttons.length > 0) {
    if (readyToUpdate) {
      for (let button of buttons) {
          button.style("color", "#54aad8");
          button.style("border", "solid #54aad8");
      }
      if (asteroids.length > 0) {
        if (kiai) {
          correctValue = asteroids[0].opValue;
          buttons[0].html(correctValue);
          buttons[1].html(correctValue);
          buttons[2].html(correctValue);
          readyToUpdate = false;
          return;
        } else {
          correctValue = asteroids[0].opValue;
          correctIndex = floor(random(3));
          readyToUpdate = false;
        }
      } else {
        for (let button of buttons) {
          button.html("");
        }
        return;
      }
      let firstIncFound = false;
      let firstIncValue;
      
      for (let i = 0; i < 3; i++) {
        if (i === correctIndex) {
          buttons[i].html(correctValue);
        } else {
          let incorrectValue;
          do {
            incorrectValue = deviatedValue(correctValue);
          }
          while (incorrectValue == correctValue)
          if (!firstIncFound) {
            firstIncFound = true;
            firstIncValue = incorrectValue;
          } else {
            
            while (floor(incorrectValue == firstIncValue) || floor(incorrectValue == correctValue)) {
              incorrectValue = deviatedValue(correctValue);
              //print('looping; ', 'correct value: ', correctValue, ' first inc value: ', firstIncValue,' deviated value: ', incorrectValue);
            }
          }
          buttons[i].html(incorrectValue);
        }
      }
    }
  }
}

function deviatedValue(correctValue) {
  let incorrectValue;
  let deviation;
  let stepAmount;
  if (level == 4) {
    if (correctValue % 2 == 0) {
      stepAmount = 2;
      deviation = stepAmount * round(random(1, 4));
    } else {
      stepAmount = 1;
      deviation = stepAmount * round(random(1, 8));
    }
  } else if (level == 3) {
    stepAmount = 1;
    deviation = stepAmount * round(random(1, hardSteps));
    //(correctValue / random(7, 9) + int(random(2) + 1));
  } else if (level == 2) {
    stepAmount = 2;
    deviation = stepAmount * round(random(1, midSteps));
    /*do {
      deviation = round(correctValue / random(7, 9) + int(random(2) + 2));
      print("value deviated by ", deviation)
    }
    while (round(correctValue - deviation) % 2 != 0);*/
  } else {
    stepAmount = 5;
    deviation = stepAmount * round(random(1, easySteps));
    /*do {
      deviation = round(correctValue / random(6, 8) + 5);
      print("value deviated by ", deviation)
    }
    while (round(correctValue - deviation) % 5 != 0);*/
  }

  if (random() < 0.5) {
    if (correctValue - deviation < 0) {
      incorrectValue = (correctValue - deviation) * -1;
    } else {
      incorrectValue = correctValue - deviation;
      //print("deviated value is ", incorrectValue)
    }
  } else {
    incorrectValue = correctValue + deviation;
    //print("deviated value is ", incorrectValue)
  }
  return int(incorrectValue);
}

function prepareSequence() {
  shipMaxY = height - 100;

  if (prepCount > 0) {
    
    fill("#c2455f");
    textSize(28);
    textAlign(CENTER, CENTER);
    text("RESOLVE LAS CUENTAS,", width / 2, height - 430 + (prepShipY));
    text("APRETA LOS BOTONES,", width / 2, height - 400 + (prepShipY));
    text("Y QUE LOS ASTEROIDES NO TE FRENEN...", width / 2, height - 370 + (prepShipY));

    noSmooth();
    imageMode(CENTER);
    image(
      shipLibrary[shipSkin],
      width / 2,
      prepShipY + offsetY,
      width / 2.5,
      height / 2.5,
      0,
      0,
      shipLibrary[shipSkin].width,
      shipLibrary[shipSkin].height,
      CONTAIN
    );
    if (prepareTimer < prepareMaxTimer) {
      prepareTimer += deltaTime;
    } else {
      prepCount -= 1;
      print(prepCount);
      if (prepCount <= 3 && prepCount > 0) {
        sfxLibrary[1].play();
      } else if (prepCount < 1) sfxLibrary[2].play();
      prepareTimer = 0;
    }
  }

  if (prepCount > 3) {
    textAlign(CENTER, CENTER);
    textSize(36);
    fill("#54aad8");
    text("ESTAS LISTO?", width / 2, height / 2 - 200);
  } else {
    if (prepCount <= 3 && prepCount >= 1) {
      fill("#54aad8");
      textSize(36);
      text(prepCount, width / 2, height / 2 - 200);
    }
  }

  if (prepCount <= 3) {
    if (prepShipY < shipMaxY) {
      prepShipY += 1.15;
    }
  }
  if (prepCount == 0 && !climaxSetup) {
    print("empezaste");
    gameSetup();
    musicLibrary[1].loop();
    climaxSetup = true;
    spawnMaxTimer = 5000;
    readyToUpdate = true;
    shipY = height - 100;
  }
}
function clearGame() {
  buttons[0].remove();
  buttons[1].remove();
  buttons[2].remove();
  buttons.splice(0, buttons.length);
  pauseButton.remove();
  if (!gameOver) {
    gameOver = true;
  }
  
  print("perdiste");

  if (!pausegame) {
    againButton = createButton("VOLVER AL MENU");
    againButton.parent("canvasParent");
    againButton.style("font-size", "36px");
    againButton.style("font-family", "PerfectDOSVGA437");
    againButton.style("color", "#c2455f");
    againButton.style("background-color", "#02050d");
    againButton.style("border", "2px solid #c2455f");
    againButton.style("border-radius", "2px");
    againButton.size(310, 50);
    againButton.position(width / 2 - 155, height / 2 - 25);
    againButton.mousePressed(() => {
      sfxLibrary[0].play();
      kiai = false;
      kiaiMode();
      restartSequence();
      againButton.remove();
      gameOver = false;
      rungame = false;
    });
  }
}

function deathSequence() {
  if (!pausegame) {
    textSize(16);
    fill("#c2455f");
    textAlign(CENTER, CENTER);
    noStroke();
    text("PUNTUACION:" + lastPoints, width / 2, height / 2 - 40);
    
    noSmooth();
      imageMode(CENTER);
      image(
        shipLibrary[shipSkin],
        width / 2,
        shipY,
        width / 2.5,
        height / 2.5,
        0,
        0,
        shipLibrary[shipSkin].width,
        shipLibrary[shipSkin].height,
        CONTAIN
      );
    if (shipY < height + shipLibrary[shipSkin].height) {
      shipYMult += 0.0001;
      shipY *= shipYMult;
    }
  } 
}

function restartSequence() {
  if (level == 1 && lastPoints > 5000) {
    midUnlock = true;
  }
  if (level == 2 && lastPoints > 10000) {
    hardUnlock = true;
  }
  if (level == 3 && lastPoints > 50000) {
    expertUnlock = true;
    specialUnlock = true;
  }
  if (lastPoints > maxPoints) {
    maxPoints = lastPoints;
  }
  prepCount = 7;
  runmenu = true;
  musicLibrary[1].stop();
  musicLibrary[1].setVolume(musicvol);
  startMusic();
  menuButtons(); 
}
