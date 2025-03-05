import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { IncomingMessage } from 'http';

const app = express();
const port = 3000;

// Permite requisições de qualquer origem (CORS)
app.use(cors({
  origin: "*"
}));

// Configura o diretório 'block' como público para servir as imagens
app.use('/block', express.static(path.join(process.cwd(), 'block')));

// Configura o diretório 'files' como público para servir os arquivos em /guis
app.use('/files', express.static(path.join(process.cwd(), 'files')));

// Rota para retornar o JSON com as imagens em formato {name, url}
app.get('/json', (req, res) => {
  const blockDir = path.join(process.cwd(), 'block');

  // Lê o diretório e filtra os arquivos de imagem
  fs.readdir(blockDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler o diretório' });
    }

    // Filtra para incluir apenas arquivos de imagem (por exemplo, .png, .jpg)
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg|gif|bmp)$/i.test(file));

    // Gera a estrutura JSON com name (sem a extensão) e url (caminho completo da imagem)
    const imageObjects = imageFiles.map((file) => ({
      name: path.basename(file, path.extname(file)), // Remove a extensão do nome do arquivo
      url: `http://localhost:3000/block/${file}` // Caminho completo da imagem
    }));

    // Retorna o JSON com name e url
    res.json(imageObjects);
  });
});

app.get('/guis', (req, res) => {
  const filePath = path.join(process.cwd(), 'files', 'gui.yml');
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Arquivo gui.yml não encontrado' });
  }
});

// Rota para receber o arquivo e salvar no diretório 'files'
app.post("/create/file", (req, res) => {
  const fileData = {}; // Onde o arquivo será armazenado
  let filePath = '';

  req.on('data', chunk => {
    // O chunk de dados recebido será armazenado no fileData
    fileData.buffer = (fileData.buffer || '') + chunk;
  });

  req.on('end', () => {
    const boundary = req.headers['content-type']?.split(';')[1]?.split('=')[1] || '';

    // Divida os dados do form usando o boundary para encontrar o arquivo
    const fileContent = fileData.buffer.split(`--${boundary}`)[1].split(`--`)[0].trim();

    // Filtra o arquivo pelo nome (e.g., "file")
    const match = fileContent.match(/Content-Disposition: form-data; name="file"; filename="([^"]+)"/);
    if (match && match[1]) {
      const filename = match[1];
      filePath = path.join(process.cwd(), 'files', 'gui.yml');
      
      // Salva o arquivo no diretório /files/gui.yml
      fs.writeFile(filePath, fileContent.split('\r\n\r\n')[1], 'binary', (err) => {
        if (err) {
          console.error('Erro ao salvar o arquivo:', err);
          return res.status(500).send('Erro ao salvar o arquivo');
        }

        res.status(200).send('Arquivo enviado e salvo com sucesso');
      });
    } else {
      return res.status(400).send('Nenhum arquivo encontrado');
    }
  });

  req.on('error', (err) => {
    console.error('Erro durante o upload:', err);
    res.status(500).send('Erro durante o upload');
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
