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

  var back = end || this.lastElement;

  while (true) {

    var next = head.nextElementSibling;

    head.remove();

    if (head === back) {

      break;

    }

    head = next;

  }

}

HydrogenComponent.prototype.refresh = function() {

  var rootElement = this.rootElement;

  var lastElement = this.lastElement;

  HydrogenModel.render(this, this.rootElement, false, true);

  this.remove(rootElement, lastElement);

}

module.exports = HydrogenComponent;
