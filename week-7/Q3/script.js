// 1. Object having data dor html anchor tag
const anchorObject = { tag: 'a',
                        props: {
                            href: 'https://example.com',                        },
                        children: ['Click me']
                    }
// document.body.appendChild(anchorElement);


// 2. A function generates html code and returns the final html tag
function createElement(elementObject) {
    const element = document.createElement(elementObject.tag);
  
    // Set attributes
    if (elementObject.props) {
      for (let prop in elementObject.props) {
        if (prop === 'style') {
          Object.assign(element.style, elementObject.props[prop]);
        } else {
          element[prop] = elementObject.props[prop];
        }
      }
    }
  
    // Append children
    if (elementObject.children) {
        elementObject.children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else {
          element.appendChild(child);
        }
      });
    }
  
    return element;
}


// 3. Create a function customRender that takes in the object and the path of html where it will be rendered
function customRender(elementObject, htmlPath){
    const element = createElement(elementObject)

    const container = document.querySelector(htmlPath);
    if (container) {
        container.appendChild(element);
    } else {
        console.error(`Container with selector "${htmlPath}" not found.`);
    }
}

customRender(anchorObject, 'body')