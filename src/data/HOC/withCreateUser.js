import {compose} from "redux";
import {connect} from "react-redux";
import {signUp} from "../../store/actions/authActions";
import {useFirestore} from "react-redux-firebase";

//storeAs contains the name of the ident in the tickets Reducer store, it's in parameter to be able to have different
// kind of tickets according a filter or components
const withCreateUser = (props ) => {
    const firestore = useFirestore()

    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            signUp: (credentials) => dispatch(signUp(credentials, firestore))
        }
    }

    return compose(
        // connect state.firestore.tickets to props.tickets
        connect(mapStateToProps)
    )
}

export default withCreateUser
