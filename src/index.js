import _ from "lodash";
import * as util from "./util";

import * as color from "./color";
import localStorage from "./local-storage";
import Handlers from "./Handlers";
import react from "./react";

export default _.merge(util, {
  color,
  localStorage,
  Handlers,
  react
});
