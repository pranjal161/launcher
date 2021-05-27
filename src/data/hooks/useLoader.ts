import { useCallback, useEffect, useMemo, useState } from 'react';

import axios from 'axios';

const Axios = axios.create(); // export this and use it in all your components

const useLoader = () => {
    const [counter, setCounter] = useState(0);
    // To add up/remove request count from Axios Array
    const inc = useCallback(() => setCounter((counter) => counter + 1), [setCounter]);
    const dec = useCallback(() => setCounter((counter) => counter - 1), [setCounter]);

    const interceptors = useMemo(() => ({
        request: (config: any) => (inc(), config),
        response: (response: any) => (dec(), response),
        error: (error: any) => (dec(), Promise.reject(error)),
    }), [inc, dec]); // create the interceptors

    useEffect(() => {
        // add request interceptors
        const reqInterceptor = Axios.interceptors.request.use(interceptors.request, interceptors.error);
        // add response interceptors
        const resInterceptor = Axios.interceptors.response.use(interceptors.response, interceptors.error);
        return () => {
            // remove all intercepts when done
            Axios.interceptors.request.eject(reqInterceptor);
            Axios.interceptors.response.eject(resInterceptor);
        };
    }, [interceptors]);

    return [counter > 0];
};

export { Axios };
export default useLoader;