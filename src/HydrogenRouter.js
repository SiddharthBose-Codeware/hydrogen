var HydrogenElement = require("./HydrogenElement.js");
var HydrogenModel = require("./HydrogenModel.js");
var pathToRegexp = require("path-to-regexp");

function makeMatchingRouteWithParams(route, keys, regexTestResult) {

  var paramsValue = regexTestResult;

  var params = {};

  for (var i = 0; i < paramsValue.length; i++) {

    params[keys[i]] = paramsValue[i];

  }

  return {

    route: route,
    params: params

  };

}

function HydrogenRouter() {

  // this.states = [];

  this.isPopStateSet = false;

}

HydrogenRouter.prototype.setRoutes = function(routes, root) {

  this.routes = routes;

  this.root = root;

}

HydrogenRouter.prototype.addPopStateListener = function(path) {

  let currentRouter = this;

  window.addEventListener("popstate", function (event) {

    // currentRouter.states.pop();

    // if (currentRouter.states.length !== 0) {

      // currentRouter.mount(currentRouter.states[currentRouter.states - 1]);

      currentRouter.mount(path);

    // }

  });

  this.isPopStateSet = true;

}

HydrogenRouter.prototype.getMatchingRouteWithParams = function(currentLocation) {

  for (var route of this.routes) {

    var keys = [];

    var routePathRegex = pathToRegexp(route.path, keys);

    var regexTestResult = routePathRegex.exec(currentLocation);

    if (regexTestResult !== null) {

      return makeMatchingRouteWithParams(route, keys, regexTestResult);

    }

  }

  return null;

}

HydrogenRouter.prototype.mount = function(path) {

  if (!this.isPopStateSet) {

    this.addPopStateListener();

  }

  var currentLocation = path || location.pathname;

  var matchingRouteWithParams = this.getMatchingRouteWithParams(currentLocation);

  if (matchingRouteWithParams !== null) {

    var route = matchingRouteWithParams.route;

    var params = matchingRouteWithParams.params;

    // this.states.push(componentHydrogenElement);

    if (path) {

      history.pushState({}, null, path);

    }

    document.title = route.title;

    HydrogenModel.render(

      new route.viewComponent(),

      this.root || document.body,

      true,

      false

    );

  } else {

    // TODO: Not found (404)

  }

}

module.exports = HydrogenRouter;
