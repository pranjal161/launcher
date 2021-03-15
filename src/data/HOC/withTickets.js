import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";

//storeAs contains the name of the ident in the tickets Reducer store, it's in parameter to be able to have different
// kind of tickets according a filter or components
const withTickets = (props = {storeAs: 'tickets'}) => {
    const {storeAs} = props
    const mapStateToProps = (state) => ({tickets: state.firestore.ordered[storeAs]})

    return compose(
        //connect firestore tickets collection to props
        firestoreConnect([{collection: 'tickets', ...props}]),
        // connect state.firestore.tickets to props.tickets
        connect(mapStateToProps)
    )
}

export default withTickets
