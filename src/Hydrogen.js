var HydrogenElement = require('./HydrogenElement.js');
var HydrogenComponent = require('./HydrogenComponent.js');
var HydrogenModel = require('./HydrogenModel.js');
var HydrogenRouter = require('./HydrogenRouter.js');
var LazyLoader = require('./LazyLoader.js');

var Hydrogen = {

  Element: HydrogenElement,
  Component: HydrogenComponent,
  Model: HydrogenModel,
  Router: HydrogenRouter,
  lazyLoader: new LazyLoader()

};

export default Hydrogen;
