import React, { useState, useEffect } from 'react';
import client from '../axios/client.js';

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
                <p>Carregando...</p>
            ) : (
                <div>
                    <h2>Dados da API:</h2>
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default SavedPages;