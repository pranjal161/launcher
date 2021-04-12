import {DxcSelect} from "@dxc-technology/halstack-react";
import PropTypes from "prop-types";
import React from 'react';
import SectionHeader
    from "components/Tickets/TicketDetail/components/TicketSummary/components/SectionHeader/SectionHeader";


const SelectEntity = ({entities, value, onChange}) => {
    let currentValue
    if (!value && entities.length) {
        //By default, we display the first item of entities
        currentValue = entities[0].id
        onChange(currentValue)
    } else
        currentValue = value

    const options = entities.map((entity) => ({value: entity.id, label: entity.display}))
    return (<>
        {options.length === 1 && <SectionHeader title={options[0].label}/>}
        {options.length > 1 && <DxcSelect
            options={options}
            value={<SectionHeader title={currentValue}/>}
            onSelectOption={onChange}
            padding={{left: 0, bottom: 0, top: 0, right: 0}}
            margin={{left: 0, bottom: 0, top: 0, right: 0}}
            value={currentValue}
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
