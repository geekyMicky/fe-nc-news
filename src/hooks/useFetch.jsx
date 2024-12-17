import { useState, useEffect } from "react";
import axios from 'axios'

const useFetch = (url) => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        axios.get(url).then((response) => {
            const sortedArticles = response.data.articles.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            setArticles(sortedArticles);
            setIsLoading(false)
        })
        .catch((error) => {
            console.log("Error fetching articles:", error);
            setError("Error fetching articles");
            setIsLoading(false);
        });
    }, []);

    return {articles, isLoading, error};
}

export default useFetch;