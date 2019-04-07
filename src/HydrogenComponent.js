var HydrogenModel = require('./HydrogenModel.js');

function HydrogenComponent() {

  this.ref = null;

  this.isComponent = true;

  this.isMounted = false;

  this.isLazyComponent = false;

  this.fragment = null; // To be rendered

  this.refs = {};

  this.rootDOMElement = null; // To be rendered

  this.rootElement = null; // To be rendered

  this.lastElement = null; // To be rendered

}

HydrogenComponent.prototype.remove = function(start, end) {

  var head = start || this.rootElement;

  while (true) {

    if (end ? head === end : head.nextElementSibling) {

      head.remove();

      head = head.nextElementSibling;

    } else {

      break;

    }

  }

}

HydrogenComponent.prototype.refresh = function() {

  var rootElement = this.rootElement;

  var lastElement = this.lastElement;

  HydrogenModel.render(this, this.lastElement, false, true);

  this.remove(rootElement, lastElement);

}

module.exports = HydrogenComponent;
