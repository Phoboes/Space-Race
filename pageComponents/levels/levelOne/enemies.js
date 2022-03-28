import p from "../../globalVars";

const enemy = {
  create: () => {
    // Create the first alien group (and create 1)
    p.aliens = p.game.physics.add.group({
      key: "invader",
      setXY: { x: 400, y: 200, stepX: 100 },
      allowGravity: false,
    });
  },
};

export default enemy;
