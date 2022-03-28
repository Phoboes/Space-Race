// 11 is +shotgunners
// 12 is infinite everything until death and likely enemy pools

import p from "../../globalVars";
import enemy from "./aliens";
import collision from "./collision";
import bullets from "./bullets";
import utils from "../../utilityFunctions";

// 10 is seekers/missile launchers/gunners
const levelEleven = {
  init: (game) => {
    game.add.image(0, 0, "levelNineBackground").setOrigin(0, 0);

    // Todo: This can probably be killed after testing.
    p.aliens = game.physics.add.group({
      allowGravity: false,
    });

    p.bullets = game.physics.add.group({
      name: "bullets",
      enable: false,
      createCallback: bullets.player.createCallback,
      allowGravity: false,
    });

    p.bullets.createMultiple({
      key: "levelTenBullet",
      quantity: 10,
      active: false,
      visible: false,
    });

    // Passes the firing handler for this level up to globalVars for use in update
    p.fireBulletFromPlayer = bullets.player.fireBullet;

    // Add a listener for aliens being shot by the player
    game.physics.add.overlap(
      p.aliens,
      p.bullets,
      collision.enemy.playerBulletCollisionHandler,
      null,
      game
    );

    // Add the player to the game
    p.player = game.physics.add.sprite(400, 500, "levelNineShip");
    p.player.setCollideWorldBounds(true);
    p.player.body.allowGravity = false;
    // Point the player up
    p.player.angle = 0;

    // Add player/alien collisions
    game.physics.add.overlap(
      p.aliens,
      p.player,
      collision.player.alienCollisionHandler,
      null,
      game
    );

    // Add enemies
    enemy.populate(game);

    // Listens for changes in enemies that need to update positions (ie seekers chasing the player)
    p.enemies.update = enemy.update;

    // Add the player animations and start them off.
    p.playerAnimation = game.anims.create({
      key: "levelNineShipAnimation",
      frames: game.anims.generateFrameNumbers("levelNineShip", {
        start: 1,
        end: 2,
      }),
      frameRate: 15,
      repeat: 0,
      yoyo: true,
    });
    p.player.play(p.playerAnimation.key);
    p.player.setSize(40, 40, true);

    // Keyboard detect
    // Todo: Add to other lvls and kill
    p.cursorKeys = p.game.input.keyboard.addKeys(
      "W,A,S,D,up,left,right,down,space"
    );
  },
};

export default levelEleven;
