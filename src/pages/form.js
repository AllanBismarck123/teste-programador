import React, { useState, useRef } from 'react';
import client from '../axios/client.js';
import { Link } from 'react-router-dom';
import AlertDialog from '../components/dialog.js';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import { Typography } from '@mui/material';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile) {

      const type = selectedFile.type.split('/')[1];

      let formData = new FormData();

      formData.append("archive_html", selectedFile);

      if (type === "html") {
        console.log("Página HTML selecionada:", selectedFile);
        uploadFile(formData);
      } else {
        setMsg("Por favor, selecione um arquivo .html válido!");
        handleClickOpen();
      }

      setSelectedFile(null);
      fileInputRef.current.value = null;
    } else {
      setMsg("Por favor, selecione um arquivo!");
      handleClickOpen();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  function uploadFile(file) {
    client.post('/upload-html', file)
      .then(function (response) {
        setMsg('Página contabilizada e salva com sucesso!\n' +
          'Para acessar a contagem das tags, acesse as páginas\n' +
          'salvas através do botão abaixo.');
        console.log(response.data.data.tags);
        handleClickOpen();
      })
      .catch(function (error) {
        setMsg('Erro, Verifique sua conexão');
        console.error(error);
        handleClickOpen();
      });
  }

  return (
    <div>
      <Typography align='center' variant='h5'>Contador de tags HTML</Typography>
      <Typography align='center' variant='h6'>Selecione um arquivo .html e faça o upload para fazer a contagem de tags.</Typography>
      <br />
      <form align='center'>
        <Fab variant="extended" size="medium" color="primary" aria-label="add" htmlFor="contained-button-file">
          <input ref={fileInputRef} styles={{ display: "none" }} type="file" id="contained-button-file" name="filename" onChange={handleFileChange} />
        </Fab>
        <br />
        <br />
        <Fab onClick={handleSubmit} variant="extended" size="medium" color="primary" aria-label="add">
          Enviar
          <SendIcon sx={{ marginLeft: 1 }} />
        </Fab>
        <br />
        <br />
        <br />
        <Typography align='center' variant='h6'>Acesse a contagem das tags das páginas salvas</Typography>
        <br />
        <Link to="/saved-pages">
          <Fab variant="extended" size="medium" color="primary" aria-label="add">
            Acessar
          </Fab>
        </Link>
        <AlertDialog open={open} setOpen={setOpen} msg={msg} />
      </form>
    </div>
  );
};

export default FileUploadComponent;