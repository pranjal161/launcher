import {useSelector} from "react-redux";

const useAllUsers = () => {
    return useSelector((state) => state.firestore.ordered['users'])
}

const useGetOne = (id) => {
    return useSelector((state) => ({id, ...state.firestore.data.users[id]}))
}

const useDeskUsers = () => {
    const getAll = useAllUsers
    const getOne = useGetOne

    return {getOne, getAll}
}

export default useDeskUsers
