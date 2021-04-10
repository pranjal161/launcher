import { DxcSelect } from "@dxc-technology/halstack-react";
import PropTypes from "prop-types";
import React from 'react';


const SelectEntity = ({entities, currentEntity, onChange}) => {
    const options = entities.map((entity) => ({value: entity.id, label: entity.display}))
    console.log('options', options)
    return (
        <div data-test={"consult-select"}>
            <DxcSelect
                options={options}
                margin={{top:0}}
            />
        </div>
    )
}


SelectEntity.propTypes = {
    entities: PropTypes.array,
    currentEntity: PropTypes.string,
    onChange: PropTypes.func,
}
export default SelectEntity;
