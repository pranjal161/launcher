import React, {useEffect} from 'react';
import {DxcSelect} from "@dxc-technology/halstack-react";
import PropTypes from "prop-types";
import SectionHeader from "components/SectionHeader/SectionHeader";

const SelectEntity = ({entities, value, onChange}) => {
    const entitiesArr = Object.entries(entities).map(([key, value]) => ({...value, id: key}))
    let currentValue = value
    useEffect(() => {
        if (!value && entitiesArr.length > 1) {
            //By default, we display the first item of entities
            currentValue = entitiesArr[0].id
            onChange(currentValue)
        } else
            currentValue = value
    },[])


    const options = entitiesArr.map((entity) => ({value: entity.id, label: entity.displayLong ? entity.displayLong : entity.display}))
    return (<>
        {options.length === 1 && <SectionHeader title={options[0].label}/>}
        {options.length > 1 && <DxcSelect
            options={options}
            value={currentValue}
            onChange={onChange}
            padding={{left: 0, bottom: 0, top: 0, right: 0}}
            margin={{left: 0, bottom: 0, top: 0, right: 0}}
        />}
    </>
    )
}

SelectEntity.propTypes =
    {
        entities: PropTypes.array,
        value: PropTypes.string,
        onChange: PropTypes.func,
    }
export default SelectEntity;
