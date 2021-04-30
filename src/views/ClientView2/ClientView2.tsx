import React, {useEffect} from 'react';
import Banner from "views/ClientView2/Banner/Banner";
import useActivity from "hooks/useActivity";
import useActivityApi from "hooks/useActivityApi";


const ClientView2 = (props:{hRef:string}) => {
    const {startActivity, stopActivity} = useActivity()

    useEffect(() => {
        console.log('starting Activity')
        startActivity()
        return stopActivity
    },[])

    const {response} = useActivityApi(props.hRef)

    console.log('response', response)

    return (
        <div><Banner hRef={props.hRef}/></div>
    );
}

export default ClientView2;
