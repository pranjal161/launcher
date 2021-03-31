import {useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';

function copyStyles(sourceDoc, targetDoc) {
    Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
      if (styleSheet.cssRules) { // for <style> elements
        const newStyleEl = sourceDoc.createElement('style');

        Array.from(styleSheet.cssRules).forEach(cssRule => {
          // write the text of each rule into the body of the style element
          newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
        });

        targetDoc.head.appendChild(newStyleEl);
      } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
        const newLinkEl = sourceDoc.createElement('link');

        newLinkEl.rel = 'stylesheet';
        newLinkEl.href = styleSheet.href;
        targetDoc.head.appendChild(newLinkEl);
      }
    });
}

const NewWindowPortal = ({children}) => {
    const container = document.createElement('div');
    let windowRef = useRef(null)
    let externalWindow = null;

    useEffect(() => {
        externalWindow = window.open('', '', 'width=400,height=600,left=200,top=200');
        externalWindow.document.body.appendChild(container);
        copyStyles(document, externalWindow.document);
        windowRef.current = externalWindow;
        return () => {
            externalWindow.close();
        }
    }, []);

    useEffect(() => {
      windowRef.current.document.body.appendChild(container);
    }, [children])

    return (
        ReactDOM.createPortal(children, container)
    )
}

export default NewWindowPortal;