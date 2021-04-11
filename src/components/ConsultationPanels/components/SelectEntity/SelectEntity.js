import {DxcSelect} from "@dxc-technology/halstack-react";
import PropTypes from "prop-types";
import React from 'react';


const SelectEntity = ({entities, value, onChange}) => {
    //By default, we display the first item of entities
    const currentValue = value ? value : entities[0].id
    const options = entities.map((entity) => ({value: entity.id, label: entity.display}))
    return (
        <DxcSelect
            options={options}
            margin={{top: 0}}
            onChange={onChange}
            value={currentValue}
        />
    )
}


SelectEntity.propTypes = {
    entities: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.func,
}
export default SelectEntity;
