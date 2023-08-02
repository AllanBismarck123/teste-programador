import React, { useState } from 'react';
import client from '../axios/client.js';
import { Link } from 'react-router-dom';
import AlertDialog from '../components/dialog.js';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(null);

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
      <h2 className='title'>Contador de tags HTML</h2>
      <p className='description'>Selecione um arquivo .html e faça o upload para fazer a contagem de tags.</p>
      <form>
        <input type="file" id="myFile" name="filename" onChange={handleFileChange} />
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained" endIcon={<SendIcon />}>
          Enviar
        </Button>
      </form>
      <br />
      <br />
      <br />
      <p className='description'>Acesse a contagem das tags das páginas salvas</p>
      <Link to="/saved-pages">
        <Button variant="contained" size="medium">
          Acessar
        </Button>
      </Link>
      <AlertDialog open={open} setOpen={setOpen} msg={msg} />
    </div>
  );
};

export default FileUploadComponent;