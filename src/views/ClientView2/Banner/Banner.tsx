import React from 'react';
import useActivityApi from "hooks/useActivityApi";

const Banner = (props:{hRef:string}) => {
    const {response} = useActivityApi(props.hRef)

    return (
        <div>Banner</div>
    );
}

export default Banner;
