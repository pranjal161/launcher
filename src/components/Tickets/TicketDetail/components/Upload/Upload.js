import React from 'react';
import {DxcUpload} from "@dxc-technology/halstack-react"
import {useFirebase} from "react-redux-firebase";


const Upload = (props) => {
    const firebase = useFirebase()
    const filesPath = '/tests'

    const callbackFunc=(param) => {
        const onlyEncoded = param.image.slice(param.image.indexOf(','))

        var blob = new Blob(
            
            [new Buffer(onlyEncoded, 'base64')],
            {
                type: param.type,
            }
        );
        console.log('blob', param, blob)
        const name = param.name
        firebase.uploadFile(filesPath, blob, filesPath, {name})

//Todo : pb d'affichage, on peut aussi sélectionner plusisurs fichiers mais ça ne fonctionne pas

    }
    return (
        <div><DxcUpload margin="xxsmall" callbackUpload={callbackFunc} /></div>
    );
}

export default Upload;
