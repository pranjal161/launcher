import {compose} from "redux";
import {connect} from "react-redux";
import {signUp} from "../../store/actions/authActions";

const withCreateUser = (WrappedComponent,props ) => {

    const mapStateToProps = (state) => {
        return {
            auth: state.auth
        }
    }

    const mapDispatchToProps = (dispatch) => ({ signUp: (credentials) => dispatch(signUp(credentials))})

    return compose(
        connect(mapStateToProps, mapDispatchToProps)(WrappedComponent)
    )
}


export default withCreateUser
