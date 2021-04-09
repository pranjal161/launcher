import {MutableRefObject, useEffect, useRef} from 'react';

import ReactDOM from 'react-dom';

/*eslint "require-jsdoc": [2, {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false
    }
}]*/

/**
 * Makes a copy of css styles in the main window and 
 * passes them to the new popup window.
 * @param {any} sourceDoc The main window.
 * @param {any} targetDoc The newly created window.
 * @returns {void} attaches the css from source to destination element
 */
function copyStyles(sourceDoc: Document, targetDoc: Document) {
    Array.from(sourceDoc.styleSheets).forEach((styleSheet) => {
        if (styleSheet.cssRules) { // for <style> elements
            const newStyleEl = sourceDoc.createElement('style');

            Array.from(styleSheet.cssRules).forEach((cssRule) => {
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

const NewWindowPortal = ( props : {children: any, onCloseCallback: any}) => {
    const { children , onCloseCallback=null } = props;
    const container = document.createElement('div');
    let windowRef = useRef<any>(null);
    let externalWindow: any;

    useEffect(() => {
        externalWindow = window.open('', '', 'width=620,height=600,left=200,top=200');
        externalWindow.document.body.appendChild(container);
        copyStyles(document, externalWindow.document);

        if(onCloseCallback)
            externalWindow.onbeforeunload = onCloseCallback;

        windowRef.current = externalWindow;
        return () => {
            externalWindow.close();
        }
    }, []);

    useEffect(() => {
            windowRef['current'].document.body.appendChild(container);
    }, [children])

    return (
        ReactDOM.createPortal(children, container)
    )
}

export default NewWindowPortal;
