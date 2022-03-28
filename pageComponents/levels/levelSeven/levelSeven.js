import p from "../../globalVars";
// Todo: levelone createBullet should become its own firing utility
// import levelOne from "../levelOne";
import utils from "../../utilityFunctions";
import asteroid from "./aliens";

// Level 7 introduces the first music, tetris ship and animations, player animations while moving

const levelSeven = {
  // PLAYER FIRING HANDLERS:

  fireBulletFromGroup: function (group, x, y, vx, vy) {
    const bullet = group.getFirstDead(false);
    if (bullet) {
      levelSeven.fireBullet(bullet, vx, vy);
    }
  },

  fireBullet: function (bullet, vx, vy) {
    const { x, y } = p.player;
    bullet.enableBody(true, x, y, true, true);
    bullet.setVelocity(vx, vy);
    bullet.angle = p.player.angle;

    // Animates colour changes of the bullet during flight
    p.game.anims.create({
      key: "rainbowBullet",
      frames: p.game.anims.generateFrameNumbers("levelSevenBullet", {
        start: 0,
        end: 4,
      }),
      frameRate: 4,
      repeat: -1,
    });

    bullet.play("rainbowBullet");
  },

  disableBulletFromBody: function (body) {
    body.gameObject.disableBody(true, true);
  },

  playerShotAlienHandler: function (alien, bullet) {
    p.totalKillCount += 1;
    // Get the x/y of alien to place the explosion animation
    const { x, y } = alien;

    // If it's a large asteroid, generate some fragments
    if (alien.texture.key === "levelSevenAsteroidLarge") {
      // Create 2 children that split left and right from the parent
      asteroid.createSprite({
        game: p.game,
        x: x - 10,
        y,
        vx: utils.random(-60, 60),
        vy: utils.random(-60, 60),
        key: "levelSevenAsteroidSmall",
        frames: "levelSevenAsteroidsSmall",
      });

      asteroid.createSprite({
        game: p.game,
        x: x + 10,
        y,
        vx: utils.random(-60, 60),
        vy: utils.random(-60, 60),
        key: "levelSevenAsteroidSmall",
        frames: "levelSevenAsteroidsSmall",
      });
    }

    // Now the aliens will fall slowly towards the player.

    //  When a bullet hits an alien we kill them both
    bullet.disableBody(true, true);
    alien.destroy();
    p.totalKillCount++;

    //AUDIO enemy is hit by bullet

    const hitAudio = this.sound.add("bassRumbleExplode");
    hitAudio.play();

    //  Increase the score
    p.score += 20;

    asteroid.explosionHandler(alien);
  },

  createBullet: function (bullet) {
    bullet.body.onWorldBounds = true;
  },

  // ALIEN HANDLERS

  disableAlienFromBody: function (body) {
    body.gameObject.disableBody(true, true);
  },

  playerAlienCollisionHandler: function (player, alien) {
    p.totalKillCount += 1;
    // Get the x/y of alien to place the explosion animation
    const { x, y } = alien;

    // The alien explodes and takes a life.
    alien.destroy();
    p.lives -= 1;
    p.totalKillCount++;

    //AUDIO enemy is hit by player

    const hitAudio = this.sound.add("bassRumbleExplode");
    hitAudio.play();

    //  Increase the score
    p.score += 20;

    //  And create an explosion
    asteroid.explosionHandler(alien);
  },

  init: (game) => {
    game.add.image(0, 0, "levelSixBackground").setOrigin(0, 0);

    // -----------------------

    // Todo: This can probably be killed after testing.
    p.aliens = game.physics.add.group({
      allowGravity: false,
    });

    asteroid.populate(game);

    p.bullets = game.physics.add.group({
      name: "bullets",
      collideWorldBounds: true,
      enable: false,
      createCallback: levelOne.createBullet,
      allowGravity: false,
    });

    p.bullets.createMultiple({
      key: "levelSevenBullet",
      quantity: 5,
      active: false,
      visible: false,
    });

    game.physics.world.on("worldbounds", levelOne.disableBulletFromBody);

    // -----------------------

    p.fireBulletFromPlayer = function () {
      // vector as direction only by setting the speed param to 1
      const vec = game.physics.velocityFromAngle(p.player.angle, 1);

      // bullet velocity using a magnitude of 10
      const vx = vec.x * 300;
      const vy = vec.y * 300;

      levelSeven.fireBulletFromGroup(p.bullets, p.player.x, p.player.y, vx, vy);

      // Creates a reference to the "playerShot" sound file set in preload (and plays it).
      const playerShot = p.game.sound.add("pew");
      playerShot.play();
      // Destroys any text, in this case, the initial text rendered.
    };

    // // Explosion animation -- loaded offscreen and invisible
    // levelSeven.explosion = game.physics.add.sprite(
    //   -100,
    //   -100,
    // );

    // -----------------------

    game.physics.add.overlap(
      p.aliens,
      p.bullets,
      levelSeven.playerShotAlienHandler,
      null,
      game
    );

    //  The hero!
    p.player = game.physics.add.sprite(400, 500, "levelSevenShip");
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;
    p.player.angle = 0;
    game.physics.add.overlap(
      p.aliens,
      p.player,
      levelSeven.playerAlienCollisionHandler,
      null,
      game
    );
    p.playerAnimation = game.anims.create({
      key: "levelSevenShipAnimation",
      frames: game.anims.generateFrameNumbers("levelSevenShip", {
        start: 1,
        end: 0,
      }),
      frameRate: 15,
      repeat: 0,
      yoyo: true,
    });

    p.player.play(p.playerAnimation.key);

    // Keyboard detect
    // Todo: Add to other lvls and kill
    p.cursorKeys = p.game.input.keyboard.addKeys(
      "W,A,S,D,up,left,right,down,space"
    );
  },
};

export default levelSeven;
