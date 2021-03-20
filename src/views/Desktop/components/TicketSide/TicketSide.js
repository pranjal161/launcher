import React, {useReducer} from 'react';
import {initialState, reducer} from "./store";
import Context from "./Context";
import Toolbar from "./components/Sidebar/Toolbar";
import {Grid} from "@material-ui/core";

function TicketSide(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const TicketDetailBound = () => (<div>Content</div>)

    return (
        <Context.Provider value={{state, dispatch,}}>
            <Grid container spacing={3}>
                <Grid item>
                    <Toolbar></Toolbar>
                </Grid>
                <Grid item>
                    <TicketDetailBound></TicketDetailBound>
                </Grid>
            </Grid>


        </Context.Provider>
    );
}

export default TicketSide;
