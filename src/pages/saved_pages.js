import React, { useState, useEffect } from 'react';
import client from '../axios/client.js';
import CircularProgress from '@mui/material/CircularProgress';

var SavedPages = () => {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get('/all-pages');
                setApiData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <CircularProgress />
            ) : (
                <div>
                    <h2 className='title'>Dados da API:</h2>
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default SavedPages;