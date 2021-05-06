import React from 'react';

const RelatedList = (props: {value:any, component:any, onClick?:any, listTitle: string}) => {
    if (!props.value)
        return (<></>)
    if(props.value.length === 0)
        return (<>No item</>)



    return (
        <>
            {props.value.map((item: any, index:number) => (
                <div key={index}>
                    {props.component({value:item, onClick:props.onClick, rowTitle: props.listTitle})}
                </div>
            ))}
        </>
    );
}

export default RelatedList;
