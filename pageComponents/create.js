import p from "./globalVars";
import init from "./gameplay/init";

export default function create() {
  p.game = this;
  init(this);
}
