var Renderer = require("./Renderer.js");

var renderer = new Renderer();

var HydrogenModel = {

  render: function(rootElement, domRootNode, isParentToBeCleared, insertAfter) {

    renderer.render(rootElement, domRootNode, !!isParentToBeCleared, !!insertAfter);

  }

};

module.exports = HydrogenModel;
