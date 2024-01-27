import { useEffect, useState } from "react";
import axios from "axios"

const useFetch = (url,options = {}) => {
    const [data, setdata] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [isError, setIsError] = useState("")
    const [toFetch, setToFetch] = useState()
    const fetchData =  async () => {
        try {
            const res = await axios.get(url,options)
            setdata(res.data)
            setIsPending(false)
        }
        catch (err) {
            setIsError(err.message)
            setIsPending(false)
        }
        
    }
    useEffect(() => {
        const abort = new AbortController();
        fetchData();
        return () => abort.abort();
    }, [toFetch])
    return (
        { data, setdata, isPending, isError, setToFetch }
    );
}

export default useFetch;