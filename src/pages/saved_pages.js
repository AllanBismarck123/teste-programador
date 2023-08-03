import React, { useState, useEffect } from 'react';
import client from '../axios/client.js';
import CircularProgress from '@mui/material/CircularProgress';
import CustomizedTables from '../components/table.js';
import { Typography } from '@mui/material';

var SavedPages = () => {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await client.get('/all-pages');
                setApiData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar dados da API:', error);
                setLoading(false);
                setError('Erro ao buscar os dados da API. Por favor, tente novamente mais tarde.');
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress size={50} />
                </div>
            ) : (
                <div>
                    {apiData.data.length !== 0 && <Typography align='center' variant='h4'>Páginas salvas</Typography>}
                    {error && <Typography color='error' align='center'>{error}</Typography>}
                    <br />
                    {apiData.data.length === 0 ?
                        <Typography align='center' variant='h5'>Não há páginas salvas, use o contador de tags pelo menos uma vez para poder consultar suas páginas salvas</Typography> : (
                            <div align='center'>
                                <CustomizedTables page={apiData.data[apiData.data.length - 1]} index={0} />
                                <div style={{ marginBottom: '20px' }}></div>
                                {apiData?.data?.map((page, index) => {
                                    return <div key={index} >
                                        <CustomizedTables page={page} index={index + 1} />
                                        <div style={{ marginBottom: '5px' }}></div>
                                    </div>
                                })}
                            </div>
                        )}
                </div>
            )}
        </div>
    );
}

export default SavedPages;