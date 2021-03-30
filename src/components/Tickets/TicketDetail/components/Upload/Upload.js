import {DxcUpload} from "@dxc-technology/halstack-react"
import React from 'react';
import useDeskTickets from "../../../../../data/hooks/useDeskTickets";

const Upload = ({ticketId}) => {
    const {uploadDocument} = useDeskTickets()

    const callbackFunc=(param) => {
        //We need to get just encoded from the received format
        const onlyEncoded = param.image.slice(param.image.indexOf(','))

        var blob = new Blob(
            [new Buffer.from(onlyEncoded, 'base64')],
            {
                type: param.type,
            }
        );
        const name = param.name
        return uploadDocument(ticketId, name, blob)

        //Todo : pb d'affichage, on peut aussi sélectionner plusisurs fichiers mais ça ne fonctionne pas

    }
    return (
        <div><DxcUpload margin="xxsmall" callbackUpload={callbackFunc} /></div>
    );
}

Upload.propTypes = {
    ticketId: PropTypes.string
}

export default Upload;
