import fs from 'fs';
import path from 'path';

const directoryPath = './block';
const outputFile = './files.json';

// Lê os arquivos no diretório
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Erro ao ler o diretório:', err);
        return;
    }

    // Cria uma lista com os nomes dos arquivos
    const fileList = files.filter(file => fs.statSync(path.join(directoryPath, file)).isFile());

    // Escreve o JSON com a lista de arquivos
    fs.writeFileSync(outputFile, JSON.stringify({
        files: fileList
    }, null, 2));

    console.log(`Lista de arquivos salva em ${outputFile}`);
});
