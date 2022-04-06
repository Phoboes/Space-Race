import p from "../../globalVars";

const enemy = {
  create: () => {
    for (let j = 1; j <= 5; j++) {
      const alien = p.aliens.create(130 * j, -20, "invader");
      alien.body.velocity.y = 60;
    }
  },
  populate: () => {
    // Create several aliens that will drop at the player
    enemy.create();
    // Do it again after a delay.
    p.game.time.addEvent({
      delay: 2000,
      callback: () => {
        enemy.create();
      },
    });
  },
};

export default enemy;
