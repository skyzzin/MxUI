import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = 3000;

// Permite requisições de qualquer origem (CORS)
app.use(cors({
  origin: "*"
}));

// Configura o diretório 'block' como público para servir as imagens
app.use('/block', express.static(path.join(process.cwd(), 'block')));

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

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
