let canvas;
let prepCount = 7;
let rungame = false;
let runmenu = false;
let runstart = false;
let runsettings = false;
let runaspects = false;

let startButton;
let configButton;
let aspectButton;
let easyButton;
let mediumButton;
let hardButton;
let expertButton;
let backButton;
let fsButton;
let lAstButton;
let rAstButton;
let lShipButton;
let rShipButton;
let applyAstButton;
let applyShipButton;
let astApplied = true;
let shipApplied = true;
let fs = false;
let customFont;
let midUnlock = false;
let hardUnlock = false;
let expertUnlock = false;

let musicSlider;
let sfxSlider;
let musicvol = 0.6;
let sfxvol = 0.3;
let maxPoints = 0
let lastPoints = 0;
let comboAdd;
let comboStreak;
let points;
let misses;

let pausegame = false;
let gameOver = false;
let shootLaser;
let level = 1;

let musicLibrary = [];
let musicFiles = [
  "assets/music/menuTheme", 
  "assets/music/gameplayTheme",
  "assets/music/synth"
];

let vfxLibrary = [];
let vfxFiles = [
  "assets/vfx/menu.png"
];
let animList = [];
let animations = [];
let animFiles = [
  [
    "assets/animations/explosionV2frames/frame1.png",
    "assets/animations/explosionV2frames/frame2.png",
    "assets/animations/explosionV2frames/frame3.png",
    "assets/animations/explosionV2frames/frame4.png",
    "assets/animations/explosionV2frames/frame5.png",
    "assets/animations/explosionV2frames/frame6.png",
    "assets/animations/explosionV2frames/frame7.png"
  ],
  [
    "assets/animations/explosionV3frames/frame1.png",
    "assets/animations/explosionV3frames/frame2.png",
    "assets/animations/explosionV3frames/frame3.png",
    "assets/animations/explosionV3frames/frame4.png",
    "assets/animations/explosionV3frames/frame5.png",
    "assets/animations/explosionV3frames/frame6.png",
    "assets/animations/explosionV3frames/frame7.png",
    "assets/animations/explosionV3frames/frame8.png",
    "assets/animations/explosionV3frames/frame9.png",
    "assets/animations/explosionV3frames/frame10.png",
    "assets/animations/explosionV3frames/frame11.png",
    "assets/animations/explosionV3frames/frame12.png",
    "assets/animations/explosionV3frames/frame13.png",
    "assets/animations/explosionV3frames/frame14.png",
    "assets/animations/explosionV3frames/frame15.png",
    "assets/animations/explosionV3frames/frame16.png",
    "assets/animations/explosionV3frames/frame17.png",
    "assets/animations/explosionV3frames/frame18.png",
    "assets/animations/explosionV3frames/frame19.png",
    "assets/animations/explosionV3frames/frame20.png",
    "assets/animations/explosionV3frames/frame21.png",
    "assets/animations/explosionV3frames/frame22.png",
    "assets/animations/explosionV3frames/frame23.png",
    "assets/animations/explosionV3frames/frame24.png",
    "assets/animations/explosionV3frames/frame25.png",
    "assets/animations/explosionV3frames/frame26.png",
    "assets/animations/explosionV3frames/frame27.png",
    "assets/animations/explosionV3frames/frame28.png",
    "assets/animations/explosionV3frames/frame29.png",
    "assets/animations/explosionV3frames/frame30.png",
    "assets/animations/explosionV3frames/frame31.png",
    "assets/animations/explosionV3frames/frame32.png",
    "assets/animations/explosionV3frames/frame33.png",
    "assets/animations/explosionV3frames/frame34.png",
    "assets/animations/explosionV3frames/frame35.png",
    "assets/animations/explosionV3frames/frame36.png",
    "assets/animations/explosionV3frames/frame37.png",
    "assets/animations/explosionV3frames/frame38.png",
    "assets/animations/explosionV3frames/frame39.png"
  ]
];

let astSelect = 0;
let astSkin = 0;
let astLibrary = [];
let astFiles = [
  "assets/skins/asteroidV1.png",
  "assets/skins/asteroidV2.png",
  "assets/skins/asteroidV3.png",
  "assets/skins/asteroidV4.png"
];

let shipSelect = 0;
let shipSkin = 0;
let shipLibrary = [];
let shipFiles = [
  "assets/skins/spaceshipV1.png",
  "assets/skins/spaceshipV2.png",
  "assets/skins/spaceshipV3.png",
  "assets/skins/spaceshipV4.png"
]

let sfxLibrary = [];
let sfxFiles = [
  "assets/sfx/blipSelect",
  "assets/sfx/timer",
  "assets/sfx/timer2",
  "assets/sfx/explosion",
  "assets/sfx/laserShoot",
  "assets/sfx/death",
  "assets/sfx/synth2",
  "assets/sfx/synth3",
  "assets/sfx/random",
  "assets/sfx/powerUp",
  "assets/sfx/turbo3"
];

function preload() {
  customFont = loadFont("assets/Perfect DOS VGA 437.ttf");

  for (let animID = 0; animID < animFiles.length; animID++) {
    animations[animID] = [];
    
    for (let frameID = 0; frameID < animFiles[animID].length; frameID++) {
      animations[animID][frameID] = loadImage(animFiles[animID][frameID]);
      //print("Loaded frame " + frameID + " of animation " + animID);
    }
  }

  for (let i = 0; i < shipFiles.length; i++) {
    shipLibrary[i] = loadImage(shipFiles[i]);
  }
  print("SHIPS LOADED");
  
  for (let i = 0; i < astFiles.length; i++) {
    astLibrary[i] = loadImage(astFiles[i]);
  }
  print("ASTEROIDS LOADED");

  for (let i = 0; i < vfxFiles.length; i++) {
    vfxLibrary[i] = loadImage(vfxFiles[i]);
  }
  print("VISUAL FX LOADED");

  soundFormats("wav", "mp3");

  for (let i = 0; i < musicFiles.length; i++) {
    musicLibrary[i] = loadSound(musicFiles[i]);
    musicLibrary[i].setVolume(musicvol);
  }
  print("MUSIC LOADED");

  for (let i = 0; i < sfxFiles.length; i++) {
    sfxLibrary[i] = loadSound(sfxFiles[i]);
    sfxLibrary[i].setVolume(sfxvol);
  }
  print("SOUND FX LOADED");
}

async function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent("canvasParent");
  musicLibrary[0].loop();
  runmenu = true;
  menuButtons();

}

function menuButtons() {
  if (runmenu) {
    startButton = createButton("COMENZAR");
    startButton.parent("canvasParent");
    startButton.style("font-size", "36px");
    startButton.style("font-family", "PerfectDOSVGA437");
    startButton.style("color", "#54aad8");
    textFont(customFont);
    startButton.style("background-color", "#02050d");
    startButton.style("border", "2px solid #54aad8");
    startButton.style("border-radius", "2px");
    startButton.size(200, 60);
    startButton.position(width / 2 - 100, 220);
    startButton.mousePressed(() => {
      startMenu();
      sfxLibrary[0].play();
      print("entered start");
    });

    aspectButton = createButton("ASPECTOS");
    aspectButton.parent("canvasParent");
    aspectButton.style("font-size", "36px");
    aspectButton.style("font-family", "PerfectDOSVGA437");
    aspectButton.style("color", "#54aad8");
    textFont(customFont);
    aspectButton.style("background-color", "#02050d");
    aspectButton.style("border", "2px solid #54aad8");
    aspectButton.style("border-radius", "2px");
    aspectButton.size(185, 60);
    aspectButton.position(width / 2 - 92.5, 300);
    aspectButton.mousePressed(() => {
      aspectMenu();
      sfxLibrary[0].play();
    });

    configButton = createButton("AJUSTES");
    configButton.parent("canvasParent");
    configButton.style("font-size", "36px");
    configButton.style("font-family", "PerfectDOSVGA437");
    configButton.style("color", "#54aad8");
    textFont(customFont);
    configButton.style("background-color", "#02050d");
    configButton.style("border", "2px solid #54aad8");
    configButton.style("border-radius", "2px");
    configButton.size(170, 60);
    configButton.position(width / 2 - 85, 380);
    configButton.mousePressed(() => {
      configMenu();
      sfxLibrary[0].play();
      print("entered settings");
    });
  }
  print("entered menu");
}

function getReady() {
  clearScreen();
  print("entered game");
  if (!rungame) {
    startValues();
    climaxSetup = false;
    rungame = true;
  }
}

function draw() {
  background(2, 5 ,13)
  drawParticles();
  print(particles.length);

  if (runmenu) {   
    noSmooth();
    imageMode(CORNER);
    image(vfxLibrary[0], 0, 0);
    
    if (gameOver) {
      deathSequence();
    }

    if (maxPoints > 0) {
      textSize(16);
      fill("#54aad8");
      textAlign(CENTER, CENTER);
      noStroke();
      text("MAYOR PUNTUACION: " + maxPoints, width / 2, 205);
    }
  }

  if (runsettings) {
    if (!rungame) {
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
    
    musicvol = musicSlider.value();
    sfxvol = sfxSlider.value();

    for (let i = 0; i < musicLibrary.length; i++) {
      musicLibrary[i].setVolume(musicvol);
    }

    for (let i = 0; i < sfxLibrary.length; i++) {
      sfxLibrary[i].setVolume(sfxvol);
    }
  }

  if (runaspects) {
    noSmooth();
    imageMode(CENTER);
    if (!expertUnlock) {
      if (shipSelect == 3) {
        tint(0);
      }
    }
    if (!hardUnlock) {
      if (shipSelect == 2) {
        tint(0);
      }
    }
    if (!midUnlock) {
      if (shipSelect == 1) {
        tint(0);
      }
    }
    image(
      shipLibrary[shipSelect],
      width / 2,
      height - shipLibrary[3].height,
      width / 2.5,
      height / 2.5,
      0,
      0,
      shipLibrary[3].width,
      shipLibrary[3].height,
      CONTAIN
    );
    noTint();

    if (!expertUnlock) {
      if (astSelect == 3) {
        tint(0);
      }
    }
    if (!hardUnlock) {
      if (astSelect == 2) {
        tint(0);
      }
    }
    if (!midUnlock) {
      if (astSelect == 1) {
        tint(0);
      }
    }
    image(
      astLibrary[astSelect],
      width / 2,
      height - 190 - shipLibrary[3].height - astLibrary[astSelect].height,
      width / 3.5,
      height / 3.5,
      0,
      0,
      astLibrary[0].width,
      astLibrary[0].height,
      CONTAIN
    );
    noTint();

    if (astSelect != astSkin) {
      astApplied = false;;
      applyAstButton.html("APLICAR");
      applyAstButton.style("color", "#54aad8");
      applyAstButton.style("border", "2px solid #54aad8");
    } else {
      astApplied = true;
      applyAstButton.html("APLICADO");
      applyAstButton.style("color", "#193240");
      applyAstButton.style("border", "solid #193240");
    }
    if (shipSelect != shipSkin) {
      shipApplied = false;
      applyShipButton.html("APLICAR");
      applyShipButton.style("color", "#54aad8");
      applyShipButton.style("border", "2px solid #54aad8");
    } else {
      shipApplied = true;
      applyShipButton.html("APLICADO");
      applyShipButton.style("color", "#193240");
      applyShipButton.style("border", "solid #193240");
    }

    if (!midUnlock) {
      if (astSelect == 1) {
        astApplied = true;
        applyAstButton.html("BLOQUEADO");
        applyAstButton.style("color", "#521c27");
        applyAstButton.style("border", "2px solid #521c27");

        fill("#521c27");
        textAlign(CENTER, CENTER);
        textSize(32);
        text("ALCANZA", width / 2, height / 4 - 10);
        text("5000", width / 2, height / 4 + 20);
        text("PUNTOS", width / 2, height / 4 + 50);
      }
      if (shipSelect == 1) {
        astApplied = true;
        applyShipButton.html("BLOQUEADO");
        applyShipButton.style("color", "#521c27");
        applyShipButton.style("border", "2px solid #521c27");
  
        fill("#521c27");
        textAlign(CENTER, CENTER);
        textSize(32);
        text("ALCANZA", width / 2, height - height / 4 - 10);
        text("5000", width / 2, height - height / 4 + 20);
        text("PUNTOS", width / 2, height - height / 4 + 50);
      }
    } 

    if (!hardUnlock) {
      if (astSelect == 2) {
        astApplied = true;
        applyAstButton.html("BLOQUEADO");
        applyAstButton.style("color", "#521c27");
        applyAstButton.style("border", "2px solid #521c27");

        fill("#521c27");
        textAlign(CENTER, CENTER);
        textSize(32);
        text("ALCANZA", width / 2, height / 4 - 10);
        text("10000", width / 2, height / 4 + 20);
        text("PUNTOS", width / 2, height / 4 + 50);
      }
      if (shipSelect == 2) {
        astApplied = true;
        applyShipButton.html("BLOQUEADO");
        applyShipButton.style("color", "#521c27");
        applyShipButton.style("border", "2px solid #521c27");
  
        fill("#521c27");
        textAlign(CENTER, CENTER);
        textSize(32);
        text("ALCANZA", width / 2, height - height / 4 - 10);
        text("10000", width / 2, height - height / 4 + 20);
        text("PUNTOS", width / 2, height - height / 4 + 50);
      }
    } 

    if (!expertUnlock) {
      if (astSelect == 3) {
        astApplied = true;
        applyAstButton.html("BLOQUEADO");
        applyAstButton.style("color", "#521c27");
        applyAstButton.style("border", "2px solid #521c27");

        fill("#521c27");
        textAlign(CENTER, CENTER);
        textSize(32);
        text("ALCANZA", width / 2, height / 4 - 10);
        text("25000", width / 2, height / 4 + 20);
        text("PUNTOS", width / 2, height / 4 + 50);
      }
      if (shipSelect == 3) {
        astApplied = true;
        applyShipButton.html("BLOQUEADO");
        applyShipButton.style("color", "#521c27");
        applyShipButton.style("border", "2px solid #521c27");
  
        fill("#521c27");
        textAlign(CENTER, CENTER);
        textSize(32);
        text("ALCANZA", width / 2, height - height / 4 - 10);
        text("25000", width / 2, height - height / 4 + 20);
        text("PUNTOS", width / 2, height - height / 4 + 50);
      }
    } 
  }
  
  if (runstart) {
    textSize(24);
    
    fill("#54aad8");
    textAlign(LEFT, CENTER);
    text("      -", width / 3 - 70, height / 3 + 9);
    text("7-90 ANOS", width / 3 - 70, height / 3 + 20);
    text("SUMAR", width / 3- 70, height / 3 + 50);
    text("RESTAR", width / 3- 70, height / 3 + 80);
    if (midUnlock) {
      fill("#54aad8");
      text("      -", width - width / 3 - 70, height / 3 + 9);
      text("9-12 ANOS", width - width / 3 - 70, height / 3 + 20);
      text("SUMAR", width - width / 3 - 70, height / 3 + 50);
      text("RESTAR", width - width / 3 - 70, height / 3 + 80);
      text("MULTIPLICAR", width - width / 3 - 70, height / 3 + 110);
    } else {
      fill("#193240")
      text("ALCANZA", width - width / 3 - 70, height / 3 + 20);
      text("5000", width - width / 3 - 70, height / 3 + 50);
      text("PUNTOS", width - width / 3 - 70, height / 3 + 80);
    }
    if (hardUnlock) {
      fill("#54aad8");
      text("       -", width / 3 - 70, height - height / 3 + 9);
      text("12-14 ANOS", width / 3 - 70, height - height / 3 + 20);
      text("SUMAR", width / 3 - 70, height - height / 3 + 50);
      text("RESTAR", width / 3 - 70, height - height / 3 + 80);
      text("MULTIPLICAR", width / 3 - 70, height - height / 3 + 110);
      text("DIVIDIR", width / 3 - 70, height - height / 3 + 140);
    } else {
      fill("#193240")
      text("ALCANZA", width / 3 - 70, height - height / 3 + 20);
      text("10000", width / 3 - 70, height - height / 3 + 50);
      text("PUNTOS", width / 3 - 70, height - height / 3 + 80);
    }
    if (expertUnlock) {
      fill("#54aad8");
      text("       -", width - width / 3 - 70, height - height / 3 + 9);
      text("14-16 ANOS", width - width / 3 - 70, height - height / 3 + 20);
      text("MULTIPLICAR", width - width / 3 - 70, height - height / 3 + 50);
      text("DIVIDIR", width - width / 3 - 70, height - height / 3 + 80);
      text("POTENCIAS", width - width / 3 - 70, height - height / 3 + 110);
      text("RAICES", width - width / 3 - 70, height - height / 3 + 140);
    } else {
      fill("#193240")
      text("ALCANZA", width - width / 3 - 70, height - height / 3 + 20);
      text("25000", width - width / 3 - 70, height - height / 3 + 50);
      text("PUNTOS", width - width / 3 - 70, height - height / 3 + 80);
    }
  }

  if (rungame) {
    gameDraw();
    if (!climaxSetup) {
      prepareSequence();
    }
  }
}

function clearScreen() {
  if (runmenu) {
    startButton.remove();
    aspectButton.remove();
    configButton.remove();
    runmenu = false;
  }
  if (runsettings) {
    musicSlider.remove();
    sfxSlider.remove();
    backButton.remove();
    fsButton.remove();
    runsettings = false;
  }
  if (runaspects) {
    backButton.remove();
    lShipButton.remove();
    rShipButton.remove();
    lAstButton.remove();
    rAstButton.remove();
    applyShipButton.remove();
    applyAstButton.remove();
    runaspects = false;
  }
  if (runstart) {
    backButton.remove();
    easyButton.remove();
    mediumButton.remove();
    hardButton.remove();
    expertButton.remove();
    runstart = false;
  }
  if (pausegame) {
    if (runsettings) {
      musicSlider.remove();
      sfxSlider.remove();
      backButton.remove();
      fsButton.remove();
      runsettings = false;
    } else {
      resumeButton.remove();
      configButton2.remove();
      againButton.remove();
    }
  }
}

function startMenu() {
  clearScreen();
  runstart = true;

  easyButton = createButton("FACIL");
  easyButton.parent("canvasParent");
  easyButton.style("font-size", "36px");
  easyButton.style("font-family", "PerfectDOSVGA437");
  easyButton.style("color", "#54aad8");
  easyButton.style("border", "2px solid #54aad8");
  easyButton.style("text-align", "center");
  textFont(customFont);
  easyButton.style("background-color", "#02050d");
  easyButton.style("border-radius", "2px");
  easyButton.size(160, 60);
  easyButton.position(width / 3 - 80, height / 3 - 60);
  easyButton.mousePressed(() => {
    level = 1;
    print(level);
    getReady();
    musicLibrary[0].stop();
    sfxLibrary[0].play();
  });

  mediumButton = createButton("MEDIO");
  mediumButton.parent("canvasParent");
  mediumButton.style("font-size", "36px");
  mediumButton.style("font-family", "PerfectDOSVGA437");
  if (midUnlock) {
    mediumButton.style("color", "#54aad8");
    mediumButton.style("border", "2px solid #54aad8");
  } else {
    mediumButton.style("color", "#193240");
    mediumButton.style("border", "solid #193240");
  }
  mediumButton.style("text-align", "center");
  textFont(customFont);
  mediumButton.style("background-color", "#02050d");
  mediumButton.style("border-radius", "2px");
  mediumButton.size(160, 60);
  mediumButton.position(width - width / 3 - 80, height / 3 - 60);
  mediumButton.mousePressed(() => {
    if (midUnlock) {
      level = 2;
      print(level);
      getReady();
      musicLibrary[0].stop();
      sfxLibrary[0].play();
    } else {
      sfxLibrary[7].play();
    }
  });

  hardButton = createButton("DIFICIL");
  hardButton.parent("canvasParent");
  hardButton.style("font-size", "36px");
  hardButton.style("font-family", "PerfectDOSVGA437");
  if (hardUnlock) {
    hardButton.style("color", "#54aad8");
    hardButton.style("border", "2px solid #54aad8");
  } else {
    hardButton.style("color", "#193240");
    hardButton.style("border", "solid #193240");
  }
  hardButton.style("text-align", "center");
  textFont(customFont);
  hardButton.style("background-color", "#02050d");
  hardButton.style("border-radius", "2px");
  hardButton.size(160, 60);
  hardButton.position(width / 3 - 80, height - height / 3 - 60);
  hardButton.mousePressed(() => {
    if (hardUnlock) {
      level = 3;
      print(level);
      getReady();
      musicLibrary[0].stop();
      sfxLibrary[0].play();
    } else {
      sfxLibrary[7].play();
    }
  });

  expertButton = createButton("EXPERTO");
  expertButton.parent("canvasParent");
  expertButton.style("font-size", "36px");
  expertButton.style("font-family", "PerfectDOSVGA437");
  if (expertUnlock) {
    expertButton.style("color", "#54aad8");
    expertButton.style("border", "2px solid #54aad8");
  } else {
    expertButton.style("color", "#193240");
    expertButton.style("border", "solid #193240");
  }
  expertButton.style("text-align", "center");
  textFont(customFont);
  expertButton.style("background-color", "#02050d");
  expertButton.style("border-radius", "2px");
  expertButton.size(160, 60);
  expertButton.position(width - width / 3 - 80, height - height / 3 - 60);
  expertButton.mousePressed(() => {
    if (expertUnlock) {
      level = 4;
      print(level);
      getReady();
      musicLibrary[0].stop();
      sfxLibrary[0].play();
    } else {
      sfxLibrary[7].play();
    }
  });

  backButton = createButton("ATRAS");
  backButton.parent("canvasParent");
  backButton.style("font-size", "32px");
  backButton.style("font-family", "PerfectDOSVGA437");
  backButton.style("color", "#c2455f");
  backButton.style("background-color", "#02050d");
  backButton.style("border", "2px solid #c2455f");
  backButton.style("border-radius", "2px");
  backButton.size(110, 45);
  backButton.position(25, height - 65);
  backButton.mousePressed(() => {
    clearScreen();
    runmenu = true;
    menuButtons();
    sfxLibrary[0].play();
  });
}

function aspectMenu() {
  clearScreen();
  runaspects = true;

  applyAstButton = createButton("APLICAR");
  applyAstButton.parent("canvasParent");
  applyAstButton.style("font-size", "36px");
  applyAstButton.style("font-family", "PerfectDOSVGA437");
  applyAstButton.style("color", "#193240");
  applyAstButton.style("border", "solid #193240");
  applyAstButton.style("text-align", "center");
  textFont(customFont);
  applyAstButton.style("background-color", "#02050d");
  applyAstButton.style("border-radius", "2px");
  applyAstButton.size(200, 60);
  applyAstButton.position(width / 2 - 100, height / 10 - 30);
  applyAstButton.mousePressed(() => {
    if (astApplied) {
      sfxLibrary[7].play();
    } else {
      if (astSelect == 3 && !expertUnlock) {
        sfxLibrary[7].play(); 
      } else if (astSelect == 2 && !hardUnlock) {
        sfxLibrary[7].play(); 
      } else if (astSelect == 1 && !midUnlock) {
        sfxLibrary[7].play(); 
      } else {
        sfxLibrary[0].play();
        astSkin = astSelect;
      }
    }
  });

  applyShipButton = createButton("APLICAR");
  applyShipButton.parent("canvasParent");
  applyShipButton.style("font-size", "36px");
  applyShipButton.style("font-family", "PerfectDOSVGA437");
  applyShipButton.style("color", "#193240");
  applyShipButton.style("border", "solid #193240");
  applyShipButton.style("text-align", "center");
  textFont(customFont);
  applyShipButton.style("background-color", "#02050d");
  applyShipButton.style("border-radius", "2px");
  applyShipButton.size(200, 60);
  applyShipButton.position(width / 2 - 100, height / 2 - 10);
  applyShipButton.mousePressed(() => {
    if (shipApplied) {
      sfxLibrary[7].play();
    } else {
      if (shipSelect == 3 && !expertUnlock) {
        sfxLibrary[7].play(); 
      } else if (shipSelect == 2 && !hardUnlock) {
        sfxLibrary[7].play(); 
      } else if (shipSelect == 1 && !midUnlock) {
        sfxLibrary[7].play(); 
      } else {
        sfxLibrary[0].play();
        shipSkin = shipSelect;
      }
    }
  });

  lAstButton = createButton("<");
  lAstButton.parent("canvasParent");
  lAstButton.style("padding-bottom: 50px");
  lAstButton.style("padding-right: 28px");
  lAstButton.style("text-align: center");
  lAstButton.style("font-size", "48px");
  lAstButton.style("font-family", "PerfectDOSVGA437");
  lAstButton.style("color", "#54aad8");
  lAstButton.style("background-color", "transparent");
  lAstButton.style("border", "none");
  lAstButton.size(30, 30);
  lAstButton.position(width / 2 - 215, height - 200 - shipLibrary[shipSkin].height - astLibrary[astSkin].height);
  lAstButton.mousePressed(() => {
    sfxLibrary[0].play();
    skinScroll(false, "ast")
  });

  rAstButton = createButton(">");
  rAstButton.parent("canvasParent");
  rAstButton.style("padding-bottom: 50px");
  rAstButton.style("text-align: center");
  rAstButton.style("font-size", "48px");
  rAstButton.style("font-family", "PerfectDOSVGA437");
  rAstButton.style("color", "#54aad8");
  rAstButton.style("background-color", "transparent");
  rAstButton.style("border", "none");
  rAstButton.size(30, 30);
  rAstButton.position(width / 2 + 185, height - 200 - shipLibrary[shipSelect].height - astLibrary[astSelect].height);
  rAstButton.mousePressed(() => {
    sfxLibrary[0].play();
    skinScroll(true, "ast")
  });

  lShipButton = createButton("<");
  lShipButton.parent("canvasParent");
  lShipButton.style("padding-bottom: 50px");
  lShipButton.style("padding-right: 28px");
  lShipButton.style("text-align: center");
  lShipButton.style("font-size", "48px");
  lShipButton.style("font-family", "PerfectDOSVGA437");
  lShipButton.style("color", "#54aad8");
  lShipButton.style("background-color", "transparent");
  lShipButton.style("border", "none");
  lShipButton.size(30, 30);
  lShipButton.position(width / 2 - 215, height - shipLibrary[shipSelect].height);
  lShipButton.mousePressed(() => {
    sfxLibrary[0].play();
    skinScroll(false, "ship")
  });

  rShipButton = createButton(">");
  rShipButton.parent("canvasParent");
  rShipButton.style("padding-bottom: 50px");
  rShipButton.style("text-align: center");
  rShipButton.style("font-size", "48px");
  rShipButton.style("font-family", "PerfectDOSVGA437");
  rShipButton.style("color", "#54aad8");
  rShipButton.style("background-color", "transparent");
  rShipButton.style("border", "none");
  rShipButton.size(30, 30);
  rShipButton.position(width / 2 + 185, height - shipLibrary[shipSelect].height);
  rShipButton.mousePressed(() => {
    sfxLibrary[0].play();
    skinScroll(true, "ship")
  });

  backButton = createButton("ATRAS");
  backButton.parent("canvasParent");
  backButton.style("font-size", "32px");
  backButton.style("font-family", "PerfectDOSVGA437");
  backButton.style("color", "#c2455f");
  backButton.style("background-color", "#02050d");
  backButton.style("border", "2px solid #c2455f");
  backButton.style("border-radius", "2px");
  backButton.size(110, 45);
  backButton.position(25, height - 65);
  backButton.mousePressed(() => {
    clearScreen();
    runmenu = true;
    menuButtons();
    sfxLibrary[0].play();
  });
  print("entered aspects");
}

function skinScroll(dir, object) {
  if (dir) {
    if (object == "ast") {
      if (astSelect == astFiles.length -1) {
        astSelect = 0;
      } else {
        astSelect ++;
      }
    }
    if (object == "ship") {
      if (shipSelect == shipFiles.length -1) {
        shipSelect = 0;
      } else {
        shipSelect ++;
      }
    }
  } else {
    if (object == "ast") {
      if (astSelect == 0) {
        astSelect = astFiles.length -1;
      } else {
        astSelect --;
      }
    }
    if (object == "ship") {
      if (shipSelect == 0) {
        shipSelect = shipFiles.length -1;
      } else {
        shipSelect --;
      }
    }
  }
}

function keyPressed() {
  if (keyCode == ESCAPE && fs == true) {
    fs = false;
  }
  if (keyIsDown(CONTROL) === true && keyIsDown(117) === true) {
    midUnlock = true;
    mediumButton.style("color", "#54aad8");
    mediumButton.style("border", "2px solid #54aad8");
  }
  if (keyIsDown(CONTROL) === true && keyIsDown(118) === true) {
    hardUnlock = true;
    hardButton.style("color", "#54aad8");
    hardButton.style("border", "2px solid #54aad8");
  }
  if (keyIsDown(CONTROL) === true && keyIsDown(119) === true) {
    expertUnlock = true;
    expertButton.style("color", "#54aad8");
    expertButton.style("border", "2px solid #54aad8");
  }
}

function configMenu() {
  background(2, 5, 13);
  clearScreen();
  runsettings = true;
  
  fsButton = createButton("PANTALLA COMPLETA");
  fsButton.parent("canvasParent");
  fsButton.style("font-size", "32px");
  fsButton.style("text-align: left");
  fsButton.style("font-family", "PerfectDOSVGA437");
  fsButton.style("color", "#54aad8");
  fsButton.style("background-color", "transparent");
  fsButton.style("border", "none");
  fsButton.size(400, 60);
  fsButton.position(width / 2 - 225, 135);
  fsButton.mousePressed(() => {
    if (fs) {
      fs = false;
    } else {
      fs = true;
    }
    fullscreen(fs);
    sfxLibrary[0].play();
  });
  
  musicSlider = createSlider(0, 1, musicvol, 0.01);
  musicSlider.addClass("styledSlider");
  musicSlider.parent("canvasParent");
  musicSlider.size(200);
  musicSlider.position(width / 2 - 50, 235);
  musicSlider.mouseReleased(() => {
    musicLibrary[2].play();
  });

  sfxSlider = createSlider(0, 1, sfxvol, 0.01);
  sfxSlider.addClass("styledSlider")
  sfxSlider.parent("canvasParent");
  sfxSlider.size(200);
  sfxSlider.position(width / 2 - 50, 315);
  sfxSlider.mouseReleased(() => {
    sfxLibrary[6].play();
  });
  if (!rungame) {
    backButton = createButton("ATRAS");
    backButton.parent("canvasParent");
    backButton.style("font-size", "32px");
    backButton.style("font-family", "PerfectDOSVGA437");
    backButton.style("color", "#c2455f");
    backButton.style("background-color", "#02050d");
    backButton.style("border", "2px solid #c2455f");
    backButton.style("border-radius", "2px");
    backButton.size(110, 45);
    backButton.position(25, height - 65);
    backButton.mousePressed(() => {
      clearScreen();
      runmenu = true;
      menuButtons();
      sfxLibrary[0].play();
    });
  } else {
    backButton = createButton("ATRAS");
    backButton.parent("canvasParent");
    backButton.style("font-size", "32px");
    backButton.style("font-family", "PerfectDOSVGA437");
    backButton.style("color", "#c2455f");
    backButton.style("background-color", "#02050d");
    backButton.style("border", "2px solid #c2455f");
    backButton.style("border-radius", "2px");
    backButton.size(110, 45);
    backButton.position(25, height - 65);
    backButton.mousePressed(() => {
      clearScreen();
      pauseMenu();
      sfxLibrary[0].play();
    });
  }
}