import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
max-width:300px;`

const SideBar = (props: { ticket: any }) => {
    const { ticket } = props;

    return (
        <Root>
            <h4>sidebar</h4>

        </Root>
    )

}
export default SideBar;