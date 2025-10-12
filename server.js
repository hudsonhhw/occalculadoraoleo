const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 80;
const HOST = '0.0.0.0';

// Mapeamento de rotas para arquivos
const routes = {
    '/': 'index.html',
    '/index': 'index.html',
    '/poeira': 'poeira.html',
    '/calculadora': 'calculadoraoc.html',
    '/pecarara': 'pecarara.html'
    '/acido': 'acido.html'
};

// Criar servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Verificar se a rota existe no mapeamento
    const filePath = routes[pathname];
    
    if (filePath) {
        serveStaticFile(res, filePath);
    } else {
        serveNotFound(res);
    }
});

// Função para servir arquivos estáticos
function serveStaticFile(res, filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erro ao ler ${filePath}:`, err);
            serveNotFound(res);
            return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
}

// Função para página não encontrada
function serveNotFound(res) {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página Não Encontrada</title>
        <style>
            body {
                background: linear-gradient(135deg, #1a2b3c, #2c3e50);
                color: white;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                text-align: center;
            }
            .error-container {
                background: rgba(44, 62, 80, 0.9);
                padding: 40px;
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.4);
            }
            h1 { color: #e74c3c; font-size: 3rem; margin-bottom: 20px; }
            p { margin-bottom: 20px; font-size: 1.2rem; }
            a { color: #3498db; text-decoration: none; font-weight: bold; }
            a:hover { text-decoration: underline; }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>404</h1>
            <p>Página não encontrada</p>
            <p><a href="/">Voltar para a página inicial</a></p>
        </div>
    </body>
    </html>
    `;

    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
}

// Iniciar servidor
server.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📁 Servindo arquivos HTML do diretório: ${process.cwd()}`);
    console.log('📋 Páginas disponíveis:');
    Object.entries(routes).forEach(([route, file]) => {
        console.log(`   • http://localhost:${PORT}${route} - ${file}`);
    });
});

// Função para obter IPs da rede
function getNetworkIPs() {
    const os = require('os');
    const interfaces = os.networkInterfaces();
    const addresses = [];
    
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                addresses.push(interface.address);
            }
        }
    }
    
    return addresses;
}

// Mostrar IPs da rede ao iniciar
console.log('🌐 Acessível em:');
getNetworkIPs().forEach((ip, index) => {
    console.log(`   ${index + 1}. http://${ip}:${PORT}`);
});
console.log('');

// Tratamento de erros do servidor
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Porta ${PORT} já está em uso. Tente usar uma porta diferente.`);
    } else {
        console.error('❌ Erro no servidor:', err);
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Encerrando servidor...');
    server.close(() => {
        console.log('✅ Servidor encerrado com sucesso.');
        process.exit(0);
    });
});
