var HydrogenModel = require('./HydrogenModel.js');
var HydrogenToDOMConverter = require('./HydrogenToDOMConverter.js');

function HydrogenElement(config) {

  this.config = config;

  this.domElement = null; // To be rendered

  this.isComponent = false;

  this.parent = null; // To be rendered

  this.dynamicTextNodes = null; // To be rendered

  this.init(config);

}

HydrogenElement.prototype.init = function(config) {

  this.domElement = HydrogenToDOMConverter.convert(this);

}

HydrogenElement.prototype.appendChild = function(hydrogenElement) {

  this.config.children.push(hydrogenElement);

  hydrogenElement.parent = this;

  HydrogenModel.render(hydrogenElement, this.domElement, false, false);

}

HydrogenElement.prototype.remove = function() {

  if (!this.parent.isComponent) {

    this.parent.config.children.splice(this.parent.config.children.indexOf(this), 1);

  }

  this.domElement.remove();

}

HydrogenElement.prototype.getFirstChild = function() {

  return this.config.children[0];

}

HydrogenElement.prototype.getLastChild = function() {

  return this.config.children[this.children.length - 1];

}

HydrogenElement.prototype.getNextSibling = function() {

  return this.parent.config.children[this.parent.config.children.indexOf(this) + 1];

}

HydrogenElement.prototype.getPreviousSibling = function() {

  return this.parent.config.children[this.parent.config.children.indexOf(this) - 1];

}

HydrogenElement.prototype.getNodeType = function() {

  return this.domElement.nodeType;

}

HydrogenElement.prototype.getNodeValue = function() {

  return this.domElement.nodeValue;

}

HydrogenElement.prototype.getOwnerDocument = function() {

  return this.domElement.ownerDocument;

}

HydrogenElement.prototype.setDynamicTextNode = function(textNodeName, value) {

  this.dynamicTextNodes[textNodeName].textContent = value;

}

module.exports = HydrogenElement;
