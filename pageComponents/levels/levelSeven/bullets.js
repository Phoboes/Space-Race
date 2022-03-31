import p from "../../globalVars";

const bullets = {
  create: () => {
    // Destroy the old instance of bullets; it's easier to start from scratch.
    p.bulletState = {};

    p.bulletState.createCallback = bullets.createBullet;
    p.bulletState.disableBulletFromBody = bullets.disableBulletFromBody;
    //   Initialise the bullet group to the game and give it to globalVars for global access from other stages
    p.bullets = p.game.physics.add.group({
      name: "bullets",
      enable: false,
      createCallback: p.bulletState.createBullet,
      allowGravity: false,
    });

    // Create a bullet pool to recycle bullets from
    p.bullets.createMultiple({
      key: "levelSixBullet",
      quantity: 5,
      active: false,
      visible: false,
    });

    // If a bullet hits the world bounds, destroy it.
    p.game.physics.world.on("worldbounds", bullets.disableBulletFromBody);

    // enables access to the firing function in globalvar, allowing it to be called from Update.
    p.playerState.fireBulletFromPlayer = function () {
      bullets.fireBulletFromGroup(p.bullets, p.player.x, p.player.y, 0, -300);

      // Creates a reference to the "playerShot" sound file set in preload (and plays it).
      const playerShot = p.game.sound.add(p.audio.playerShot);
      playerShot.play();
    };
  },

  //   Bullet create callback
  createBullet: (bullet) => {
    bullet.body.onWorldBounds = true;
  },

  //   Get the first inactive bullet if there is one and fire it, if not, there's too many bullets on screen and do nothing
  fireBulletFromGroup: (group, x, y, vx, vy) => {
    const bullet = group.getFirstDead(false);
    if (bullet) {
      bullets.fireBullet(bullet, x, y, vx, vy);
    }
  },

  //   Enables the bullet and gives it velocity
  fireBullet: (bullet) => {
    bullet.enableBody(true, x, y, true, true);
    // vector as direction only by setting the speed param to 1
    const vec = p.game.physics.velocityFromAngle(p.player.angle, 1);
    // bullet velocity using a magnitude of 10
    const vx = vec.x * 300;
    const vy = vec.y * 300;
    const { x, y } = p.player;
    // Start the bullet at the player's x/y
    bullet.enableBody(true, x, y, true, true);
    // Adjust its velocity to its angle from the player
    bullet.setVelocity(vx, vy);
    // Adjust the bullet's graphic to the player's angle
    bullet.angle = p.player.angle;
    // This offsets the bullet from the shooter's body slightly so it doesn't fire straight from the middle of its body
    Phaser.Math.RotateAroundDistance(
      bullet,
      x,
      y,
      bullet.angle * Phaser.Math.DEG_TO_RAD,
      30
    );

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

  //   The 'kill' method called when the bullet hits a worldbound or an enemy; disables it and puts it back up for the bullet pool to use
  disableBulletFromBody: (body) => {
    body.gameObject.disableBody(true, true);
  },
};

export default bullets;
