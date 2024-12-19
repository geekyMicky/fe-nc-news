import { useState, useEffect } from "react";
import axios from 'axios';

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        const signal = controller.signal;

        axios.get(url, { signal })
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                } else {
                    setError(error.message);
                    setIsLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, [url]);

    return { data, isLoading, error };
};

export default useAxios;