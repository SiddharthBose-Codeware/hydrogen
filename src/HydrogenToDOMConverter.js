HydrogenToDOMConverter = {

  addEventListenersToDOMElement: function(domElement, hydrogenElement) {

    if (hydrogenElement.config.eventListeners) {

      var eventListeners = hydrogenElement.config.eventListeners;

      for (var i = 0; i < eventListeners.length; i++) {

        var eventListener = eventListeners[i];

        domElement.addEventListener(eventListener.event, function(event) {

          eventListener.listener(event, hydrogenElement);

        }, eventListener.useCapture || false);

      }

    }

    if (!hydrogenElement.config.children) {

      hydrogenElement.config.children = [];

    }

  },

  addPropsToDOMElement: function(domElement, hydrogenElement) {

    if (hydrogenElement.config.props) {

      var props = hydrogenElement.config.props;

      var entries = Object.entries(props);

      for (var i = 0; i < entries.length; i++) {

        var key = entries[i][0];

        var value = entries[i][1];

        domElement.setAttribute(key, value);

      }

    }

  },

  addTextNodesToDOMElement: function(domElement, hydrogenElement) {

    if (hydrogenElement.config.textNodes) {

     hydrogenElement.dynamicTextNodes = {};

      var textNodes = hydrogenElement.config.textNodes;

      var textNode = null;

      for (var i = 0; i < textNodes.length; i++) {

        if (typeof textNodes[i] !== "object") {

          textNode = document.createTextNode(textNodes[i]);

        } else {

          var textNodeEntry = Object.entries(textNodes[i])[0];

          textNode = document.createTextNode(textNodeEntry[1]);

          hydrogenElement.dynamicTextNodes[textNodeEntry[0]] = textNode;

        }

        domElement.appendChild(textNode);

      }

    }

  },

  addRouteLocation: function(domElement, hydrogenElement) {

    if (hydrogenElement.config.routeTo) {

      domElement.addEventListener("click", function() {

        hydrogenElement.config.router.mount(hydrogenElement.config.routeTo);

        event.stopPropagation();

      });

    }

  },

  convert: function(hydrogenElement) {

    var domElement = document.createElement(hydrogenElement.config.type);

    this.addEventListenersToDOMElement(domElement, hydrogenElement);

    this.addPropsToDOMElement(domElement, hydrogenElement);

    this.addTextNodesToDOMElement(domElement, hydrogenElement);

    this.addRouteLocation(domElement, hydrogenElement);

    hydrogenElement.domElement = domElement;

    return domElement;

  }

}

module.exports = HydrogenToDOMConverter;
