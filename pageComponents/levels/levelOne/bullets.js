import p from "../../globalVars";

const bullets = {
  create: () => {
    p.bulletState.createCallback = bullets.createBullet;
    p.bulletState.disableBulletFromBody = bullets.disableBulletFromBody;
    //   Initialise the bullet group to the game and give it to globalVars for global access from other stages
    p.bullets = p.game.physics.add.group({
      name: "bullets",
      // collideWorldBounds: true,
      enable: false,
      createCallback: p.bulletState.createBullet,
      allowGravity: false,
    });

    // Create a bullet pool to recycle bullets from
    p.bullets.createMultiple({
      key: "bullet",
      quantity: 5,
      active: false,
      visible: false,
    });

    // If a bullet hits the world bounds, destroy it.
    // p.game.physics.world.on("worldbounds", bullets.disableBulletFromBody);

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
  fireBullet: (bullet, x, y, vx, vy) => {
    bullet.enableBody(true, x, y, true, true);
    bullet.setVelocity(vx, vy);
  },

  //   The 'kill' method called when the bullet hits a worldbound or an enemy; disables it and puts it back up for the bullet pool to use
  disableBulletFromBody: (body) => {
    body.gameObject.disableBody(true, true);
  },
};

export default bullets;
