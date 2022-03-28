import p from "../../globalVars";
// import levelOne from "../levelOne";
import utils from "../../utilityFunctions";
import enemy from "./aliens";

// Level 8 is another graphics upgrade and the introduction of 'seekers', enemies who actively chase the player to kamikaze
const levelEight = {
  // PLAYER FIRING HANDLERS:

  fireBulletFromGroup: function (group, x, y, vx, vy) {
    const bullet = group.getFirstDead(false);
    if (bullet) {
      levelEight.fireBullet(bullet, vx, vy);
    }
  },

  fireBullet: function (bullet, vx, vy) {
    const { x, y } = p.player;
    bullet.enableBody(true, x, y, true, true);
    bullet.setVelocity(vx, vy);
    bullet.angle = p.player.angle;

    // Animates colour changes of the bullet during flight
    p.game.anims.create({
      key: "levelEightShot",
      frames: p.game.anims.generateFrameNumbers("levelEightBullet", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    bullet.play("levelEightShot");
  },

  disableBulletFromBody: function (body) {
    body.gameObject.disableBody(true, true);
  },

  playerShotAlienHandler: function (alien, bullet) {
    p.totalKillCount += 1;
    // Get the x/y of alien to place the explosion animation
    const { x, y } = alien;

    // If it's a large asteroid, generate some fragments
    if (alien.texture.key === "levelEightAsteroidLarge") {
      // Create 2 children that split left and right from the parent
      const leftSplitAlien = p.aliens.create(
        x - 10,
        y,
        "levelEightAsteroidSmall"
      );
      leftSplitAlien.body.velocity.y = utils.random(-60, 60);
      leftSplitAlien.body.velocity.x = utils.random(-60, 60);

      const rightSplitAlien = p.aliens.create(
        x + 10,
        y,
        "levelEightAsteroidSmall"
      );
      rightSplitAlien.body.velocity.y = utils.random(-60, 60);
      rightSplitAlien.body.velocity.x = utils.random(-60, 60);
    }

    // Now the aliens will fall slowly towards the player.

    //  When a bullet hits an alien we kill them both
    bullet.disableBody(true, true);
    alien.destroy();
    p.totalKillCount++;

    //AUDIO enemy is hit by bullet

    const hitAudio = this.sound.add("enemyHit");
    hitAudio.play();

    //  Increase the score
    p.score += 20;

    //  And create an explosion
    levelEight.explosion.setPosition(x, y);
    levelEight.explosion.setVisible(true);

    const explosionAnimation = this.anims.create({
      key: "eightExplosion",
      frames: this.anims.generateFrameNumbers("levelEightKaboom", {
        start: 0,
        end: 15,
      }),
      frameRate: 25,
      repeat: 0,
    });

    levelEight.explosion.play("eightExplosion");
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

    const hitAudio = this.sound.add("enemyHit");
    hitAudio.play();

    //  Increase the score
    p.score += 20;

    //  And create an explosion
    levelEight.explosion.setPosition(x, y);
    levelEight.explosion.setVisible(true);

    const explosionAnimation = this.anims.create({
      key: "whiteExplosion",
      frames: this.anims.generateFrameNumbers("levelEightKaboom", {
        start: 0,
        end: 15,
      }),
      frameRate: 25,
      repeat: 0,
    });

    levelEight.explosion.play("whiteExplosion");
  },

  init: (game) => {
    game.add.image(0, 0, "levelEightBackground").setOrigin(0, 0);

    // -----------------------

    // Todo: This can probably be killed after testing.
    p.aliens = game.physics.add.group({
      allowGravity: false,
    });

    p.bullets = game.physics.add.group({
      name: "bullets",
      collideWorldBounds: true,
      enable: false,
      createCallback: levelOne.createBullet,
      allowGravity: false,
    });

    p.bullets.createMultiple({
      key: "levelEightBullet",
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

      levelEight.fireBulletFromGroup(p.bullets, p.player.x, p.player.y, vx, vy);

      // Creates a reference to the "playerShot" sound file set in preload (and plays it).
      const playerShot = p.game.sound.add("shortPlayerShot8");
      playerShot.play();
      // Destroys any text, in this case, the initial text rendered.
    };

    // Explosion animation -- loaded offscreen and invisible
    levelEight.explosion = game.physics.add.sprite(
      -100,
      -100,
      "levelEightKaboom"
    );
    levelEight.explosion.setVisible(false);

    // -----------------------

    game.physics.add.overlap(
      p.aliens,
      p.bullets,
      levelEight.playerShotAlienHandler,
      null,
      game
    );

    //  The hero!
    p.player = game.physics.add.sprite(400, 500, "levelEightShip");
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;
    p.player.angle = 0;
    game.physics.add.overlap(
      p.aliens,
      p.player,
      levelEight.playerAlienCollisionHandler,
      null,
      game
    );

    p.enemies.update = enemy.update;
    enemy.populate(game);

    levelEight.explosion.on("animationcomplete", () => {
      levelEight.explosion.setVisible(false);
    });

    levelEight.explosion.body.allowGravity = false;

    p.playerAnimation = game.anims.create({
      key: "levelEightShipAnimation",
      frames: game.anims.generateFrameNumbers("levelEightShip", {
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

export default levelEight;
