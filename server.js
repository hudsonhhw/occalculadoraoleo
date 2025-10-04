const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 80;
const HOST = '0.0.0.0';

// Criar servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Roteamento das páginas
    if (pathname === '/' || pathname === '/index') {
        serveHomePage(res);
    } else if (pathname === '/poeira') {
        servePoeiraPage(res);
    } else if (pathname === '/calculadora') {
        serveCalculadoraPage(res);
    } else if (pathname === '/pecarara') {
        servePecaRaraPage(res);
    } else {
        serveNotFound(res);
    }
});

// Função para servir a página inicial
function serveHomePage(res) {
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calculadoras Once Human</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
                background: linear-gradient(135deg, #1a2b3c, #2c3e50);
                color: #fff;
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                text-align: center;
            }
            
            header {
                margin-bottom: 40px;
                padding: 20px;
            }
            
            h1 {
                color: #3498db;
                font-size: 2.5rem;
                margin-bottom: 10px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            }
            
            .subtitle {
                font-size: 1.2rem;
                color: #ecf0f1;
                opacity: 0.9;
            }
            
            .cards-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 25px;
                margin-top: 30px;
            }
            
            .card {
                background: rgba(44, 62, 80, 0.9);
                border-radius: 15px;
                padding: 30px;
                text-decoration: none;
                color: white;
                transition: all 0.3s ease;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                border: 2px solid transparent;
            }
            
            .card:hover {
                transform: translateY(-10px);
                border-color: #3498db;
                box-shadow: 0 15px 35px rgba(52, 152, 219, 0.3);
            }
            
            .card h2 {
                color: #3498db;
                margin-bottom: 15px;
                font-size: 1.5rem;
            }
            
            .card p {
                color: #bdc3c7;
                line-height: 1.6;
            }
            
            .card-icon {
                font-size: 3rem;
                margin-bottom: 15px;
            }
            
            @media (max-width: 768px) {
                .cards-container {
                    grid-template-columns: 1fr;
                }
                
                h1 {
                    font-size: 2rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>Calculadoras Once Human</h1>
                <p class="subtitle">Ferramentas úteis para o jogo</p>
            </header>
            
            <div class="cards-container">
                <a href="/poeira" class="card">
                    <div class="card-icon">⭐</div>
                    <h2>Calculadora de Poeira Estelar</h2>
                    <p>Calcule os recursos necessários para produzir poeira estelar</p>
                </a>
                
                <a href="/calculadora" class="card">
                    <div class="card-icon">🔋</div>
                    <h2>Calculadora de Combustível</h2>
                    <p>Calcule recursos e equipamentos para produção de combustível misto</p>
                </a>
                
                <a href="/pecarara" class="card">
                    <div class="card-icon">🧪</div>
                    <h2>Calculadora de Peças Raras</h2>
                    <p>Calcule materiais para craftar peças raras de diferentes tipos</p>
                </a>
            </div>
        </div>
    </body>
    </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
}

// Função para servir a página de poeira estelar
function servePoeiraPage(res) {
    fs.readFile('poeira.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler poeira.html:', err);
            serveNotFound(res);
            return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
}

// Função para servir a página da calculadora de combustível
function serveCalculadoraPage(res) {
    fs.readFile('calculadoraoc.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler calculadoraoc.html:', err);
            serveNotFound(res);
            return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
    });
}

// Função para servir a página de peças raras
function servePecaRaraPage(res) {
    fs.readFile('pecarara.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler pecarara.html:', err);
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
            
            h1 {
                color: #e74c3c;
                font-size: 3rem;
                margin-bottom: 20px;
            }
            
            p {
                margin-bottom: 20px;
                font-size: 1.2rem;
            }
            
            a {
                color: #3498db;
                text-decoration: none;
                font-weight: bold;
            }
            
            a:hover {
                text-decoration: underline;
            }
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
    console.log(`   • http://localhost:${PORT}/ - Página inicial`);
    console.log(`   • http://localhost:${PORT}/poeira - Calculadora de Poeira Estelar`);
    console.log(`   • http://localhost:${PORT}/calculadora - Calculadora de Combustível`);
    console.log(`   • http://localhost:${PORT}/pecarara - Calculadora de Peças Raras`);
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
