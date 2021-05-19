import * as navbarTabsActions from "../../store/actions/navigationBarTabsActions";
import * as popupWindowActions from "../../store/actions/popupWindowTabsActions";
import * as ticketActions from "../../store/actions/ticketActions";

import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";

const useAllTickets = () => useSelector((state:any) => state.firestore.ordered['tickets'])

const useMyAllTickets = () => {
    const auth = useSelector((state:any) => state.auth)
    const allTickets = useAllTickets()
    return allTickets && allTickets.filter((ticket:any) => ticket.assignedTo && ticket.assignedTo === auth.id)
}

const useGetOne = (id: string | number) => useSelector((state:any) => (state.firestore.data.tickets ? {id, ...state.firestore.data.tickets[id]} : undefined))
/**
 * Use shallow equality to avoid unnecessary rerenders. 
 * Because objects are returned by reference, and every call to a hook in a functional component
 * just calls it again, thus generating a new reference regardless of data, shallow equality must be used. 
 * This is also the standard method for calling a store on update with a class component, connect and mapStateToProps Redux store methods.
 * @function useGetOneShallow
 * @param {string|undefined} id - the id of the ticket to fetch from store
 * @returns {Object} - the ticket object
 */
const useGetOneShallow = (id: string | number) => useSelector((state:any) => (state.firestore.data.tickets ? {id, ...state.firestore.data.tickets[id]} : undefined), shallowEqual)

const useGetState = () => useSelector((state:any) => (state.tickets))

const useGetAllDocuments = (ticketId: string | number) => {
    const ticket = useGetOne(ticketId)
    return ticket && ticket.documents
}

const useGetDocumentUrl = (ticketId: string | number, documentId: string | number) => {
    const ticket = useGetOne(ticketId)
    return ticket && ticket.documents && ticket.documents[documentId] && ticket.documents[documentId].url
}


const useDeskTickets = () => {
    const getAll = useAllTickets
    const getMyAllTickets = useMyAllTickets
    const getOne = useGetOne
    const getOneShallow = useGetOneShallow
    const getTicketsState = useGetState
    const getDocumentUrl = useGetDocumentUrl
    const getAllDocuments = useGetAllDocuments

    const dispatch = useDispatch();
    const create = useCallback((ticket) => dispatch(ticketActions.create(ticket)), [dispatch])
    const update = useCallback((ticket) => dispatch(ticketActions.update(ticket)), [dispatch])
    const remove = useCallback((id) => dispatch(ticketActions.remove(id)), [dispatch])
    const assignTo = useCallback((id, userId) => dispatch(ticketActions.assignTo(id, userId)), [dispatch])
    const createdBy = useCallback((id, userId) => dispatch(ticketActions.createdBy(id, userId)), [dispatch])
    const select = useCallback((id) => dispatch(ticketActions.select(id)), [dispatch])
    const unSelect = useCallback((id) => dispatch(ticketActions.unSelect(id)), [dispatch])
    const addRelatedClients = useCallback((id, clientId) => dispatch(ticketActions.addRelatedClients(id, clientId)), [dispatch])
    const removeRelatedClients = useCallback((id, clientId) => dispatch(ticketActions.removeRelatedClients(id, clientId)), [dispatch])
    const addRelatedContract = useCallback((id, contract) => dispatch(ticketActions.addRelatedContract(id, contract)), [dispatch])
    const removeRelatedContract= useCallback((id, contract) => dispatch(ticketActions.removeRelatedContract(id, contract)), [dispatch])

    const removeSuggestedActivity = useCallback((id, activityId) => dispatch(ticketActions.removeSuggestedActivity(id, activityId)), [dispatch])
    const executeActivity = useCallback((id, activityId) => dispatch(ticketActions.executeActivity(id, activityId)), [dispatch])
    const uploadDocument = useCallback((id, name, blob, type) => dispatch(ticketActions.uploadDocument(id, name, blob, type)), [dispatch])
    const openInSecondary = useCallback((ticketId, displayTicketLabel) => dispatch(popupWindowActions.addTicketTabByID(ticketId, displayTicketLabel)), [dispatch])
    const openInNewTab = useCallback((ticketId, displayTicketLabel, type) => dispatch(navbarTabsActions.addNavBarTabByID(ticketId, displayTicketLabel, type)), [dispatch])

    return {
        getOne,
        getOneShallow,
        getAll,
        getMyAllTickets,
        getTicketsState,
        getDocumentUrl,
        getAllDocuments,
        create,
        update,
        remove,
        assignTo,
        createdBy,
        select,
        unSelect,
        addRelatedClients,
        removeRelatedClients,
        addRelatedContract,
        removeRelatedContract,
        removeSuggestedActivity,
        executeActivity,
        uploadDocument,
        openInNewTab,
        openInSecondary
    }
}

export default useDeskTickets