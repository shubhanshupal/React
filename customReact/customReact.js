function customReact(element, container) {
    const domElement = document.createElement(element.type);
    domElement.innerHTML= element.child;
    for (const prop in element.props) {
        domElement.setAttribute(prop, element.props[prop])
    }
    container.appendChild(domElement);
}

const container = document.getElementById("root");

const reactElement = {
  type: "a",
  props: {
    href:'https/google.com',
    target:'_blank'
  },
  child:'click me to visit google'
}


customReact(reactElement, container);  