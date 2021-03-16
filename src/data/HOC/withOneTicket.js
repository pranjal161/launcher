import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";

//storeAs contains the name of the ident in the tickets Reducer store, it's in parameter to be able to have different
// kind of tickets according a filter or components
const withOneTickets = (WrappedComponent, {id}) => {
    const storeAs = 'ticket_' + id
    const mapStateToProps = (state) => ({ticket: state.firestore.data[storeAs]})

    return compose(
        firestoreConnect([{collection: 'tickets', doc: id, storeAs}]),
        connect(mapStateToProps)
    )(WrappedComponent)
}

export default withOneTickets
