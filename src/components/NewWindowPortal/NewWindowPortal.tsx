import React, { useEffect, useRef } from 'react';

import { DxcBox } from '@dxc-technology/halstack-react'
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';

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
    let sourceStyles = sourceDoc.head.querySelectorAll('style');

    let indexStyledComponents = undefined;
    // styled-components are inserted in a style tag with data-* attributes
    // here, we check if they exist and mark the index of the style tag,
    // so that later, in styleSheets import, it can be skipped and 
    // be managed with styled-components StyleSheetManager
    for(let i = 0; i < sourceStyles.length; i++) {
        if(sourceStyles[i].dataset &&
           sourceStyles[i].dataset.styled === "active") {
            indexStyledComponents = i;
            break;
        }
    }

    for(let i = 0; i < sourceDoc.styleSheets.length; i++) {

        if (sourceDoc.styleSheets[i].cssRules &&
            indexStyledComponents !== undefined &&
            i !== indexStyledComponents) { // for <style> elements

            const newStyleEl = sourceDoc.createElement('style');

            Array.from(sourceDoc.styleSheets[i].cssRules).forEach((cssRule) => {
                // write the text of each rule into the body of the style element
                newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
            });

            targetDoc.head.appendChild(newStyleEl);
        } else if (sourceDoc.styleSheets[i].href) { // for <link> elements loading CSS from a URL
            const newLinkEl = sourceDoc.createElement('link');

            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = sourceDoc.styleSheets[i].href!;
            targetDoc.head.appendChild(newLinkEl);
        }
    }

}

const NewWindowPortal = ( props : {
                                        children: any, 
                                        onCloseCallback: Function, 
                                        windowMaximized?: boolean,
                                        passSetFocus?: boolean,
                                        windowWidth?: number,
                                        windowHeight?: number,
                                        windowLeft?: number,
                                        windowTop?: number
                                    }) => {
    const { 
        onCloseCallback = null,
        windowMaximized = false,
        passSetFocus = false,
        windowWidth = 620,
        windowHeight = 600,
        windowLeft = 200,
        windowTop = 200
    } = props;
    let { children } = props;
    const container = document.createElement('div');
    let windowRef = useRef<any>(null);
    let externalWindow: any;

    const setFocus = () => {
        if(windowRef.current &&
           !windowRef.current.document.hasFocus()) {
            windowRef.current.focus();
        }
    }

    // When passing the NewWindowPortal setFocus function to its children, 
    // the NewWindowPortal must have only one child element and it must have a 
    // props property named setWindowFocus.
    if(passSetFocus) {
        children = React.cloneElement(children, {setWindowFocus: setFocus});
    }

    let windowNotFullScreenSpecs = '';
    if(!windowMaximized)
        windowNotFullScreenSpecs = `,width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
    else
        windowNotFullScreenSpecs = `,width=${window.screen.availWidth},height=${window.screen.availHeight},left=0,top=0`;

    useEffect(() => {
        externalWindow = window.open('', '', windowNotFullScreenSpecs);
        externalWindow.document.body.appendChild(container);
        copyStyles(document, externalWindow.document);

        if(onCloseCallback)
            externalWindow.onbeforeunload = onCloseCallback;

        windowRef.current = externalWindow;
        return () => {
            windowRef.current = null;
            externalWindow.close();
        }
    }, []);

    useEffect(() => {
        windowRef['current'].document.body.appendChild(container);
    }, [children]);

    return (
        ReactDOM.createPortal(<DxcBox
            margin="xxsmall"
            size="fillParent"
            shadowDepth={0}>
            <StyleSheetManager 
                target={container}>
                {children}
            </StyleSheetManager>
        </DxcBox>, container)
    )
}

export default NewWindowPortal;