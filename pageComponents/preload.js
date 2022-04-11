import audioPreload from "./gameplay/audio/audioPreload";
export default function preload() {
  this.load.setBaseURL("./gameAssets/");

  // ------------------------------------
  // Level 1 & 2 assets:
  // ------------------------------------

  this.load.image("bullet", "levels/LevelOne/bullet.png");
  this.load.image("enemyBullet", "levels/LevelOne/enemy-bullet.png");
  this.load.image("invader", "levels/LevelOne/asteroid.png");
  this.load.image("ship", "levels/LevelOne/ship.png");
  this.load.spritesheet("kaboom", "levels/LevelOne/explode.png", {
    frameWidth: 128,
    frameHeight: 128,
  });
  this.load.image("starfield", "levels/LevelOne/background.png");

  // ------------------------------------
  // Preloaded images for level 3:
  // ------------------------------------

  // this.load.image(
  //   "asteroidLargeLevelThree",
  //   "levels/LevelThree/asteroidLarge.png"
  // );
  // this.load.image(
  //   "asteroidSmallLevelThree",
  //   "levels/LevelThree/asteroidSmall.png"
  // );
  // this.load.image(
  //   "asteroidSplitLevelThree",
  //   "levels/LevelThree/asteroidSplit.png"
  // );

  this.load.image("levelThreeShip", "levels/LevelThree/shipUpdated.png");

  this.load.spritesheet("invaderLarge", "levels/LevelThree/invaderLarge.png", {
    frameWidth: 40,
    frameHeight: 40,
  });

  this.load.spritesheet("invaderSmall", "levels/LevelThree/invaderSmall.png", {
    frameWidth: 27,
    frameHeight: 25,
  });

  this.load.spritesheet(
    "levelThreeKaboom",
    "levels/LevelThree/explosionPixels.png",
    {
      frameWidth: 37,
      frameHeight: 35,
    }
  );

  // ------------------------------------
  // Preloaded images for level 4:
  // ------------------------------------

  this.load.image("levelFourShip", "levels/LevelFour/shipUpdated.png");
  this.load.image("bulletLevelFour", "levels/LevelFour/bullet.png");

  // ------------------------------------
  //Preloaded images for level 5:
  // ------------------------------------

  // Nil

  // ------------------------------------
  // Preloaded images for level 6:
  // ------------------------------------

  this.load.spritesheet(
    "levelSixAsteroidLarge",
    "levels/LevelSix/levelSevenAsteroidsExtended.png",
    {
      frameWidth: 42,
      frameHeight: 42,
    }
  );
  this.load.spritesheet(
    "levelSixAsteroidSmall",
    "levels/LevelSix/asteroidSmallsprite.png",
    {
      frameWidth: 17,
      frameHeight: 15,
    }
  );

  this.load.image("levelSixBullet", "levels/LevelSix/bullet2.png");
  this.load.spritesheet("levelSixShip", "levels/levelSix/shipUpdated.png", {
    frameWidth: 37,
    frameHeight: 35,
  });
  this.load.spritesheet("levelSixKaboom", "levels/LevelSix/explodeWhite.png", {
    frameWidth: 128,
    frameHeight: 128,
  });
  this.load.image("levelSixBackground", "levels/LevelSix/background.png");

  // ------------------------------------
  // Preloaded images for level 7:
  // ------------------------------------

  this.load.spritesheet(
    "levelSevenAsteroidLarge",
    "levels/LevelSeven/asteroidLargeSprite2.png",
    { frameWidth: 36, frameHeight: 36 }
  );
  this.load.spritesheet(
    "levelSevenAsteroids",
    "levels/LevelSeven/asteroidSprite2.png",
    { frameWidth: 22, frameHeight: 22 }
  );
  this.load.spritesheet(
    "levelSevenAsteroidsSmall",
    "levels/LevelSeven/asteroidSmallSprite2.png",
    { frameWidth: 15, frameHeight: 15 }
  );
  this.load.spritesheet(
    "levelSevenBullet",
    "levels/LevelSeven/bulletSprite2.png",
    { frameWidth: 8, frameHeight: 8 }
  );
  this.load.spritesheet("levelSevenShip", "levels/LevelSeven/ship2.png", {
    frameWidth: 46,
    frameHeight: 36,
  });

  // ------------------------------------
  // Large asteroid explosions lvl 7
  // ------------------------------------

  this.load.spritesheet(
    "levelSevenLargeAsteroidExplosionYellow",
    "levels/LevelSeven/bigexplode1Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenLargeAsteroidExplosionRed",
    "levels/LevelSeven/bigExplode2Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenLargeAsteroidExplosionGreen",
    "levels/LevelSeven/bigExplode3Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenLargeAsteroidExplosionPurple",
    "levels/LevelSeven/bigExplode4Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenLargeAsteroidExplosionCyan",
    "levels/LevelSeven/bigExplode5Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );

  // ------------------------------------
  // Medium asteroid explosions lvl 7
  // ------------------------------------

  this.load.spritesheet(
    "levelSevenMediumAsteroidExplosionYellow",
    "levels/LevelSeven/explode1Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenMediumAsteroidExplosionRed",
    "levels/LevelSeven/explode2Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenMediumAsteroidExplosionGreen",
    "levels/LevelSeven/explode3Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenMediumAsteroidExplosionPurple",
    "levels/LevelSeven/explode4Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenMediumAsteroidExplosionCyan",
    "levels/LevelSeven/explode5Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );

  // ------------------------------------
  // Small asteroid explosions lvl 7
  // ------------------------------------

  this.load.spritesheet(
    "levelSevenSmallAsteroidExplosionYellow",
    "levels/LevelSeven/smallExplode1Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenSmallAsteroidExplosionRed",
    "levels/LevelSeven/smallExplode2Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenSmallAsteroidExplosionGreen",
    "levels/LevelSeven/smallExplode3Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenSmallAsteroidExplosionPurple",
    "levels/LevelSeven/smallExplode4Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );
  this.load.spritesheet(
    "levelSevenSmallAsteroidExplosionCyan",
    "levels/LevelSeven/smallExplode5Center.png",
    { frameWidth: 128, frameHeight: 127 }
  );

  // ------------------------------------
  // Preloaded images for level 8
  // ------------------------------------

  this.load.spritesheet(
    "levelEightSeeker",
    "levels/LevelEight/enemySeeker2.png",
    {
      frameHeight: 37,
      frameWidth: 37,
    }
  );
  this.load.spritesheet("levelEightBullet", "levels/LevelEight/bullet.png", {
    frameHeight: 8,
    frameWidth: 8,
  });
  this.load.spritesheet("levelEightShip", "levels/LevelEight/ship3.png", {
    frameHeight: 35,
    frameWidth: 43,
  });
  this.load.spritesheet("levelEightKaboom", "levels/LevelEight/explode.png", {
    frameHeight: 128,
    frameWidth: 128,
  });
  this.load.image("levelEightBackground", "levels/LevelEight/background.png");

  // ------------------------------------
  // Preloaded images for level 9
  // ------------------------------------

  this.load.spritesheet(
    "levelNineSeeker",
    "levels/LevelNine/enemySeekerRight.png",
    {
      frameHeight: 27,
      frameWidth: 34,
    }
  );
  this.load.spritesheet(
    "levelNineShooter",
    "levels/LevelNine/basicAlienRightAnimated.png",
    {
      frameHeight: 43,
      frameWidth: 62,
    }
  );
  this.load.spritesheet(
    "levelNineShooterBullet",
    "levels/LevelNine/basicAlienBulletRightUpdated.png",
    {
      frameHeight: 22,
      frameWidth: 34,
    }
  );
  this.load.spritesheet("levelNineBullet", "levels/LevelNine/bulletRight.png", {
    frameHeight: 5,
    frameWidth: 25,
  });
  this.load.spritesheet("levelNineShip", "levels/LevelNine/shipRight.png", {
    frameHeight: 35,
    frameWidth: 66,
  });
  this.load.spritesheet("levelNineKaboom", "levels/LevelNine/explode.png", {
    frameHeight: 128,
    frameWidth: 128,
  });
  this.load.image(
    "levelNineBackground",
    "levels/LevelNine/backgroundLarge.png"
  );

  // ------------------------------------
  // Preloaded images for level 10
  // ------------------------------------

  // this.load.spritesheet('levelTenSeeker', 'levels/LevelTen/enemySeeker.png', 28, 34);

  this.load.spritesheet(
    "levelTenShotgunShip",
    "levels/LevelTen/shotgunnerRightAnimated.png",
    { frameHeight: 54, frameWidth: 54 }
  );
  // this.load.spritesheet('levelTenBasicAlien', 'levels/LevelTen/basicAlien.png', 43, 63);
  // this.load.spritesheet('levelTenBasicAlienBullet', 'levels/LevelTen/basicAlienBullet.png', 23.333, 39);
  this.load.spritesheet(
    "levelTenAlienShotgunBullet",
    "levels/LevelTen/basicAlienShotgun.png",
    { frameWidth: 15, frameHeight: 15 }
  );
  this.load.spritesheet(
    "levelTenAlienMissileSeeker",
    "levels/LevelTen/alienSeekingMissileRight2.png",
    { frameHeight: 10, frameWidth: 41 }
  );
  this.load.spritesheet(
    "AlienMissileShip",
    "levels/LevelTen/alienMissileShipRight.png",
    { frameHeight: 57, frameWidth: 71 }
  );

  this.load.image("blueFlare", "levels/LevelTen/blueFlare.png");
  this.load.spritesheet(
    "levelTenBullet",
    "levels/LevelTen/bulletSpriteRight.png",
    { frameHeight: 5, frameWidth: 25 }
  );
  // this.load.spritesheet('levelTenShip', 'levels/LevelTen/ship.png', 35, 69);
  // this.load.spritesheet('levelTenBackground', 'levels/LevelTen/background.png');

  // ------------------------------------
  // AUDIO PRELOADS
  // ------------------------------------

  // -----------Player is hit----------

  this.load.audio("playerHit", "/audio/playerHit.wav");

  // -----------Player shots----------

  // Level 1 -> 5
  this.load.audio("playerShot", "/audio/playerShot.wav");

  // Level 6
  this.load.audio("babyPew", "/audio/babyPew.wav");

  // Level 7
  this.load.audio("pew", "/audio/pew.wav");

  // Level 8
  this.load.audio("shortPlayerShot8", "/audio/shortPlayerShot8.wav");

  // Level 9
  this.load.audio("laserPew", "/audio/laserPew.wav");

  // Unused

  this.load.audio("playerShotPew", "/audio/playerShotPew.wav");

  this.load.audio("8bitExplosion", "/audio/8bitExplosion.wav");

  // -----------Alien explosions/Deaths----------

  // Level 6 & 7
  this.load.audio("bassRumbleExplode", "/audio/bassRumbleExplode.wav");

  // Level 8
  this.load.audio("missile", "/audio/missile.wav");

  // Level 9
  this.load.audio("enemyHit", "/audio/enemyHit.wav");

  // ------ Upgrade transition sound to 7 -> 8 ---- //

  this.load.audio("8bitUpgrade", "/audio/8bitUpgrade.wav");

  // -----------MUSIC----------

  this.load.audio("level7Music", "/audio/level7Music.mp3");

  this.load.audio("level8Music", "/audio/level8Music.wav");

  this.load.audio("level9Music", "/audio/level9Music.wav");

  // -----------Game Over audio----------

  this.load.audio("gameOver", "/audio/gameOver.wav");

  this.load.audio("gameover8", "/audio/gameover8.wav");

  this.load.audio("pacManDeath", "/audio/pacManDeath.wav");
}
