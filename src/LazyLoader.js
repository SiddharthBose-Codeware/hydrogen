var HydrogenComponent = require('./HydrogenComponent');

class LazyComponentWrapperComponent extends HydrogenComponent {

  constructor(loadingComponent, componentImport, shouldLoad, componentArguments) {

    super();

    this.currentComponent = loadingComponent;

    this.componentImport = componentImport;

    this.componentArguments = componentArguments;

    this.isLazyComponent = true;

    this.shouldLoad = shouldLoad;

  }

  render() {

    return this.currentComponent;

  }

  lazyLoad() {

    if (!this.shouldLoad) return;

    var current = this;

    this.componentImport.then(function(componentModule) {

      var component = new (componentModule.default)(...current.componentArguments);

      current.loadComponent(component);

    });

  }

  loadComponent(component) {

    this.currentComponent = component;

    this.refresh();

  }

}

function LazyLoader() {

  this.lazyComponentsList = {};

  this.lazyComponentWrapperComponent = LazyComponentWrapperComponent;

}

LazyLoader.prototype.load = function(componentImport, loadingComponent, ...arguments) {

  var lazyComponentWrapperComponent = new (this.lazyComponentWrapperComponent)(loadingComponent, componentImport, !!componentImport, arguments);

  return lazyComponentWrapperComponent;

}

module.exports = LazyLoader;
