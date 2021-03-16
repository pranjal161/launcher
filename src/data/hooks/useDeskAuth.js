import {useSelector} from "react-redux";

export function useDeskAuth(){
    const auth = useSelector(state => state.auth)
    return {auth, currentUserId : auth.id}
}
