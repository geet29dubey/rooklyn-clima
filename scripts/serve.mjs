// Local preview of the production static export. Run after `pnpm build`.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let target=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return}
  try{if((await fs.stat(target)).isDirectory())target=path.join(target,'index.html')}catch{}
  let body,status=200;
  try{body=await fs.readFile(target)}catch{target=path.join(root,'404.html');body=await fs.readFile(target);status=404}
  res.writeHead(status,{'Content-Type':types[path.extname(target)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});
  res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(400);res.end('Bad request')}
});
const port=Number(process.env.PORT||3000);
server.listen(port,'127.0.0.1',()=>console.log(`Production preview: http://localhost:${port}`));
