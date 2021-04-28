import "./TicketDescription.scss";

import React from "react";
import ReadMore from "../ReadMore/ReadMore";

const TicketDescription = (props: any) => {
    const { desc } = props;
    return (
        <> { desc && desc.length > 0 ?
            <ReadMore>
                {desc}
            </ReadMore>
            :
            <>
            </>}

        </>);
};

export default TicketDescription;