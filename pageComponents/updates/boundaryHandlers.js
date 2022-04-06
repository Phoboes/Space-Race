const handler = {
  boundaryCheck: (group) => {
    for (let i = 0; i < group.children.entries.length; i++) {
      const { x, y } = group.children.entries[i].body;
      // console.log(y);
      if (x > 900 || x < -100 || y > 700 || y < -100) {
        group.children.entries[i].destroy();
      }
    }
  },

  playerBulletBoundary: (bullet) => {
    const { x, y } = bullet;
    if (x > 900 || x < -100 || y > 900 || y < -100) {
      if (bullet.body.particleManager) {
        bullet.body.particleManager.destroy();
      }
      bullet.body.gameObject.disableBody(true, true);
    }
  },

  enemyBulletBoundary: (bullet) => {
    const { x, y } = bullet;
    if (x > 900 || x < -100 || y > 900 || y < -100) {
      if (bullet.body.particleManager) {
        bullet.body.particleManager.destroy();
      }
      bullet.destroy();
    }
  },
};

export default handler;
