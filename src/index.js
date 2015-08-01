import _ from "lodash";
import * as util from "./util";


export default _.merge(util, {
  color: require("./color"),
  localStorage: require("./local-storage"),
  Handlers: require("./Handlers"),
});
