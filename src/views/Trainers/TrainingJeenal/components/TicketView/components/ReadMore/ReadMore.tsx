import "./ReadMore.scss";

import { ExpandLess, ExpandMore } from "assets/svg";
import React, { useState } from "react";

const ReadMore = (props: any) => {
    const { children } = props;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <div className="text desc_height">
            {isReadMore ? children.slice(0, 180) : children}
            <div onClick={toggleReadMore} className="read-or-hide">
                {isReadMore ? <>{"Read more"} <ExpandMore /></> : <>{"Show less"} < ExpandLess /></>}
            </div>
        </div>
    );
};

export default ReadMore;