import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    console.log(token);
    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(url,
                {
                    signal: abortCont.signal,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Tidak dapat mengambil data');
                    }
                    return res.json();
                })
                .then(data => {
                    setIsPending(false);
                    setData(data);
                    setError(null);
                    return;
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('Batalkan', err.name)
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                })
        }, 1000);
        // abort the fetch
        return () => abortCont.abort();
    }, [url])

    return { data, isPending, error };
}

export default useFetch;