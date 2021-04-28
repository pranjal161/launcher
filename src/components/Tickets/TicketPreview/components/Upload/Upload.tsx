import {DxcUpload} from "@dxc-technology/halstack-react"
import PropTypes from 'prop-types'
import React from 'react';
import useDeskTickets from "data/hooks/useDeskTickets";

const Upload = (props: {ticketId: string}) => {
    const {uploadDocument} = useDeskTickets()

    const callbackFunc=(param: any) => {
        //We need to get just encoded from the received format
        const onlyEncoded = param.image.slice(param.image.indexOf(','))

        let blob = new Blob(
            [Buffer.from(onlyEncoded, 'base64')],
            {
                type: param.type,
            }
        );
        const name = param.name;
        return uploadDocument(props.ticketId, name, blob, param.type)

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
