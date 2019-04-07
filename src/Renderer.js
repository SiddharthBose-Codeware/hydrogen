var HydrogenToDOMConverter = require('./HydrogenToDOMConverter.js');

function Renderer() {

  this.queue = [];

  this.appendPendingStack = [];

  this.lazyComponentsList = [];

  // this.hydrogenToDOMConverter = new HydrogenToDOMConverter();

}

Renderer.prototype.renderComponentOrElement = function(root) {

  this.queue = [{

    element: root,
    parent: null

  }];

  while (this.queue.length != 0) {

    let front = this.queue.shift();

    if (front.element.isComponent) {

      if (front.element.isLazyComponent && front.element != root) {

        this.lazyComponentsList.push(front.element);

      }

      this.renderComponent(front);

      let innerComponents = front.element.render();

      if (!Array.isArray(innerComponents)) {

        innerComponents = [innerComponents];

      }

      for (let i = 0; i < innerComponents.length; i++) {

        this.queue.push({

          element: innerComponents[i],
          parent: front.element

        });

      }

    } else {

      this.renderElement(front);

      if (front.element.config.children) {

        for (let i = 0; i < front.element.config.children.length; i++) {

          this.queue.push({

            element: front.element.config.children[i],
            parent: front.element

          });

        }

      }

    }

  }

  while (this.appendPendingStack.length != 0) {

    var front = this.appendPendingStack.pop();

    if (front.element.isComponent) {

      front.element.rootElement = front.element.fragment.firstElementChild;

      front.element.lastElement = front.element.fragment.lastElementChild;

    }

    if (front.parent.isComponent) {

      if (front.element.isComponent) {

        if (front.parent.fragment.firstChild) {

          front.parent.fragment.insertBefore(front.element.fragment, front.parent.fragment.firstChild);

        } else {

          front.parent.fragment.appendChild(front.element.fragment);

        }

      } else {

        if (front.parent.fragment.firstChild) {

          front.parent.fragment.insertBefore(front.element.domElement, front.parent.fragment.firstChild);

        } else {

          front.parent.fragment.appendChild(front.element.domElement);

        }

        if (front.element.config.onAttach) {

          front.element.config.onAttach(front.element);

        }

      }

    } else {

      if (front.element.isComponent) {

        if (front.parent.domElement.firstChild) {

          front.parent.domElement.insertBefore(front.element.fragment, front.parent.domElement.firstChild);

        } else {

          front.parent.domElement.appendChild(front.element.fragment);

        }

      } else {

        if (front.parent.domElement.firstChild) {

          front.parent.domElement.insertBefore(front.element.domElement, front.parent.domElement.firstChild);

        } else {

          front.parent.domElement.appendChild(front.element.domElement);

        }

        if (front.element.config.onAttach) {

          front.element.config.onAttach(front.element);

        }

      }

    }

  }

}

Renderer.prototype.renderComponent = function(front) {

  front.element.fragment = document.createDocumentFragment();

  if (front.parent) {

    if (front.parent.isComponent) {

      front.element.isMounted = true;

      front.element.component = front.parent;

    } else {

      front.element.component = front.parent.component;

    }

    this.appendPendingStack.push({
      element: front.element,
      parent: front.parent
    });

  }

  if (front.element.ref) {

    front.element.component.refs[front.element.ref] = front.element;

  }

  if (front.element.groupref) {

    if (front.element.component.grouprefs[front.element.groupref]) {

      front.element.component.grouprefs[front.element.groupref].push(front.element);

    } else {

      front.element.component.grouprefs[front.element.groupref] = [front.element];

    }

  }

}

Renderer.prototype.renderElement = function(front) {

  if (front.parent) {

    if (front.parent.isComponent) {

      front.element.component = front.parent;

      this.appendPendingStack.push({
        element: front.element,
        parent: front.parent
      });

    } else {

      this.appendPendingStack.push({
        element: front.element,
        parent: front.parent
      });

      front.element.component = front.parent.component;

    }

    front.element.parent = front.parent;

  } else {

    this.hydrogenToDOMConverter.convert(front.element);

  }

  if (front.element.config.ref) {

    front.element.component.refs[front.element.config.ref] = front.element;

  }

  if (front.element.config.groupref) {

    if (front.element.component.groupref[front.element.config.groupref]) {

      front.element.component.groupref[front.element.config.groupref].push(front.element);

    } else {

      front.element.component.groupref[front.element.config.groupref] = [front.element];

    }

  }

}

Renderer.prototype.clearParentDOMElement = function(parentDOMElement) {

  while (parentDOMElement.hasChildNodes()) {

    parentDOMElement.lastChild.remove();

  }

}

Renderer.prototype.loadLazyComponents = function() {

  var current = this;

  while (current.lazyComponentsList.length != 0) {

    current.lazyComponentsList.pop().lazyLoad();

  }

}

Renderer.prototype.render = function(rootComponent, parentDOMElement, isParentToBeCleared, insertBefore) {

  this.renderComponentOrElement(rootComponent);

  if (isParentToBeCleared) {

    this.clearParentDOMElement(parentDOMElement);

  }

  if (insertBefore) {

    if (rootComponent.isComponent) {

      parentDOMElement.parentNode.insertBefore(rootComponent.fragment, parentDOMElement);

    } else {

      parentDOMElement.parentNode.insertBefore(rootComponent.domElement, parentDOMElement);

    }

  } else {

    if (rootComponent.isComponent) {

      parentDOMElement.appendChild(rootComponent.fragment);

    } else {

      parentDOMElement.appendChild(rootComponent.domElement);

    }

  }

  rootComponent.isMounted = true;

  this.loadLazyComponents();

}

module.exports = Renderer;
