# FLUX

O Fluxo é um sistema simples que possibilitará criar diversos fluxos para diversas tarefas cotidianas. A ideia é ir projetando o restante do sitema conforme sua utilização e crescimento. Mas por enquanto, partimos com uma pequena esturutra base que vou explicar adiante.

O Fluxo é composto por um ou vários fluxos quer deverão ser disparados por gatilhos. Esse fluxos contém uma ou várias ações encadeadas que executam ações sobre os dados buscados. 


## Rodando os fluxos

A ideia é que os fluxos rodem através de gatilhos. Inicialmente estou rodando através do start no script. Ainda tenho que pensar como os gatilhos irão funcionar. 


## Como criar um fluxo?

Todo fluxo deve estar dentro da pasta flows. Esse fluxo pode estar na pasta superior ou em uma subpastas. Isso facilita muito a organização dos fluxos criados. 

Por exemplo, um fluxo para buscar uma infomração e ler num determinado banco de dados poderia estar em:

flows/cliente_nome/searchAndSaveInDatabase.json

Quando o script for executado, ele lêrá esse arquivo JSON e executará as actions definidas. 

Esse arquivo, poderia ter o formato abaixo: 

```JSON
{
  "name": "Serach data end save in database",
  "flow": [
    {
      "name": "Input word key",
      "type": "action",
      "action": "Input/Word",
      "actionOptions": {
        "label": "Informe uma palavra chave:"
      }
    },
    {
      "name": "Search",
      "type": "action",
      "action": "Search/Google"
    },
    {
      "name": "Save in database",
      "type": "action",
      "action": "Database/Mysql/SaveData",
      "actionOptions": {
        "host": "mysql.myhost.com",
        "user": "root",
        "pass": "123456",
        "base": "searches",
        "table": "...",
        "values": {
          "inputTable": "value"
        }
      }
    } 
  ]
}
```

## Actions

As actions são as partes do fluxo que executam uma ação sobre os dados. As actions são programadas por classes dentro do ecosistema do aplicativo. 
As actions estão definidas na pasta src/Actions e extendem a class Action (src/model/Action.ts). E devem ser organizadas por assunto.
Essa classe deve sempre retornar o conteúdo para a próxima ação. 
Uma action deve ser enxuta e realizar o mínimo de trabalho possível para que possa ser reutilizada em diversos senários.
Uma action colocada em produção para utilização, deve sempre manter o mesmo tipo de entrada e saida. Para manter sempre a compatibilidade com os fluxos existentes. 
Se houver necessidade de alterar uma action para adicionar funcionalidade, deve-se havaliar se não é melhor criar uma nova classe para a nova ação.

Um exemplo de action: 

Action para Donwload de arquivo.

local: /File/Download.ts

```Typescript
import axios from "axios";
import fs from "fs";
import path from "path"
import { PATH_ROOT } from "../../config/constants";

import { Action } from "../../model/Action";

/**
 *  Exemplo de uso configuração
 **

  {
    "name": "Download XLSX",
    "type": "action",
    "action": "File/Download",
    "actionOptions": {
      "conditions": [
        "localFileIsNotExists"
      ],
      "dest": "downloads",
      "newFileName": "planilha.xslx",
      "url": "http://s.com/pl.xlsx"
    }
  }

*/

class FileDownload extends Action {

  public async exec(data: any): Promise<any> {
    super.exec(data);

    const options = this.getOptions();
    const localFileName = path.join(PATH_ROOT, options.dest, options.newFileName);

    try {
     
      const result = axios({
        url: options.url,
        method: 'get',
        responseType: 'stream'
      });

      const stream = (await result).data;

      await (new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(localFileName);
        writeStream.on('finish', () => resolve('finish'));
        stream.pipe(writeStream);
      }));

      return localFileName;
    }
    catch (err) {
      throw err;
    }
  }
}

export default FileDownload;
```