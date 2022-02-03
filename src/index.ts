/** 
 * Carrega os fluxos criados para serem executados de acordo com suas regras
 */

import { App } from "./model/App";

const app = new App ();

app.init();
app.addListener('loaded', () => {
  app.startFlow();
});