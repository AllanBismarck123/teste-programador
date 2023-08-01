import React, { useState } from 'react';
import client from '../axios/client.js';
import { Link } from 'react-router-dom';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const type = selectedFile.type.split('/')[1];

    let formData = new FormData();

    formData.append("archive_html", selectedFile);

    if (type === "html") {
      console.log("Página HTML selecionada:", selectedFile);
      uploadFile(formData);
    } else {
      alert("Por favor, selecione um arquivo .html válido!");
    }
  };

  function uploadFile(file) {
    client.post('/upload-html', file)
      .then(function (response) {
        alert('Página contabilizada e salva com sucesso!\n' +
        'Para acessar a contagem das tags, acesse as páginas\n' +
        'salvas através do botão abaixo.');
        console.log(response.data.data.tags);
      })
      .catch(function (error) {
        alert('Erro, Verifique sua conexão');
        console.error(error);
      });
  }

  return (
    <div>
      <p>Selecione um arquivo .html e faça o upload para fazer a contagem de tags.</p>
      <form onSubmit={handleSubmit}>
        <input type="file" id="myFile" name="filename" onChange={handleFileChange} />
        <input type="submit" value="Upload" />
      </form>
      <p>Acesse a contagem das tags das páginas salvas</p>
      <button><Link to="/saved-pages">Acessar</Link></button>
    </div>
  );
};

export default FileUploadComponent;