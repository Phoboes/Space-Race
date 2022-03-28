import p from "../../globalVars";

const enemy = {
  populate: () => {
    // Create several aliens that will drop at the player
    for (let i = 1; i <= 2; i++) {
      for (let j = 1; j <= 5; j++) {
        const alien = p.aliens.create(130 * j, i * 100, "invader");
        // Now the aliens will fall slowly towards the player.
        alien.body.velocity.y = 60;
      }
    }
  },
};

export default enemy;
