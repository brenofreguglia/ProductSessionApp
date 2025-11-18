import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const host = "localhost";
const port = 3000;

const app = express();
const produtos = [];

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: "minh4Chav3S3cr3t4",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 15,
        },
    })
);

app.get("/", (req, res) => {
    res.redirect("/login");
});

app.get("/Addprodutos", auth, (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`
        <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Produtos</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>

      <body class="bg-light">
        <nav class="navbar navbar-dark bg-primary mb-4">
          <div class="container">
            <span class="navbar-brand fw-semibold">Sistema de Produtos</span>
                <span class="navbar-text text-light me-3">
      Último acesso: ${req.cookies.ultimoAcesso || ""}
    </span>
            <div>
              <a href="/Listaprodutos" class="btn btn-light btn-sm me-2">Lista</a>
              <a href="/logout" class="btn btn-outline-light btn-sm">Sair</a>
            </div>
          </div>
        </nav>

        <div class="container">
          <div class="card shadow mx-auto" style="max-width: 650px;">
            <div class="card-body">
              <h3 class="text-center mb-4">Cadastro de Produtos</h3>
              <hr>

              <form method="POST" action="/Addprodutos">
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Código de barras</label>
                    <input type="text" class="form-control" name="codBarras"> 
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Data de validade</label>
                    <input type="date" class="form-control" name="validade">
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Descrição</label>
                  <input type="text" class="form-control" name="descricao">
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Preço de custo</label>
                    <input type="number" step="0.01" class="form-control" name="precoCusto">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Preço de venda</label>
                    <input type="number" step="0.01" class="form-control" name="precoVenda">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Quantidade em estoque</label>
                    <input type="number" class="form-control" name="quantidade">
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Fabricante</label>
                    <input type="text" class="form-control" name="fabricante">
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <a href="/Listaprodutos" class="btn btn-secondary">Ver produtos</a>
                  <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.post("/Addprodutos", auth, (req, res) => {
    const {
        codBarras,
        descricao,
        precoCusto,
        precoVenda,
        validade,
        quantidade,
        fabricante,
    } = req.body;

    if (
        codBarras &&
        descricao &&
        precoCusto &&
        precoVenda &&
        validade &&
        quantidade &&
        fabricante
    ) {
        produtos.push({
            codBarras,
            descricao,
            precoCusto: parseFloat(precoCusto).toFixed(2),
            precoVenda: parseFloat(precoVenda).toFixed(2),
            validade,
            quantidade: parseInt(quantidade, 10),
            fabricante,
        });
        return res.redirect("/Listaprodutos");
    } else {
    }
    let conteudo = `<!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cadastro de Produtos</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>

      <body class="bg-light">
        <nav class="navbar navbar-dark bg-primary mb-4">
          <div class="container">
            <span class="navbar-brand fw-semibold">Sistema de Produtos</span>
                <span class="navbar-text text-light me-3">
      Último acesso: ${req.cookies.ultimoAcesso || ""}
    </span>
            <div>
              <a href="/Listaprodutos" class="btn btn-light btn-sm me-2">Lista</a>
              <a href="/logout" class="btn btn-outline-light btn-sm">Sair</a>
            </div>
          </div>
        </nav>

        <div class="container">
          <div class="card shadow mx-auto" style="max-width: 650px;">
            <div class="card-body">
              <h3 class="text-center mb-4">Cadastro de Produtos</h3>

              <form method="POST" action="/Addprodutos">
                
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Código de barras</label>
                    <input type="text" class="form-control" name="codBarras" value  ="${codBarras}">`;
    if (!codBarras) {
        conteudo += `<div class="form-text text-danger">O campo código de barras é obrigatório.</div>`;
    }
    conteudo += `</div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Data de validade</label>
                    <input type="date" class="form-control" name="validade" value="${validade}">`;
    if (!validade) {
        conteudo += `<div class="form-text text-danger">O campo data de validade é obrigatório.</div>`;
    }
    conteudo += `</div>
                </div>

                <div class="mb-3">
                  <label class="form-label">Descrição</label>
                  <input type="text" class="form-control" name="descricao" value="${descricao}">`;

    if (!descricao) {
        conteudo += `<div class="form-text text-danger">O campo descrição é obrigatório.</div>`;
    }
    conteudo += `</div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Preço de custo</label>
                        <input type="number" step="0.01" class="form-control" name="precoCusto" value="${precoCusto}">`;
    if (!precoCusto) {
        conteudo += `<div class="form-text text-danger">O campo preço de custo é obrigatório.</div>`;
    }
    conteudo += `</div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Preço de venda</label>
                        <input type="number" step="0.01" class="form-control" name="precoVenda" value="${precoVenda}">`;
    if (!precoVenda) {
        conteudo += `<div class="form-text text-danger">O campo preço de venda é obrigatório.</div>`;
    }

    conteudo += `</div>
                </div>

                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Quantidade em estoque</label>
                    <input type="number" class="form-control" name="quantidade" value="${quantidade}">`;
    if (!quantidade) {
        conteudo += `<div class="form-text text-danger">O campo quantidade em estoque é obrigatório.</div>`;
    }

    conteudo += `</div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Fabricante</label>
                    <input type="text" class="form-control" name="fabricante" value="${fabricante}">
                    `;
    if (!fabricante) {
        conteudo += `<div class="form-text text-danger">O campo fabricante é obrigatório.</div>`;
    }

    conteudo += `</div>
                </div>

                <div class="d-flex justify-content-between mt-4">
                  <a href="/Listaprodutos" class="btn btn-secondary">Ver produtos</a>
                  <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </body>
    </html>`;

    res.setHeader("Content-Type", "text/html");
    res.send(conteudo);

});

app.get("/Listaprodutos", auth, (req, res) => {
    let Tabela = `<!DOCTYPE html >
            <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Produtos cadastrados</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                        </head>

                        <body class="bg-light">

                            <nav class="navbar navbar-dark bg-primary mb-4">
                                <div class="container">
                                    <span class="navbar-brand fw-semibold">Sistema de Produtos</span>
                                    <span class="navbar-text text-light me-3">
                                        Último acesso: ${req.cookies.ultimoAcesso || ""}
                                    </span>
                                    <div>
                                        <a href="/Addprodutos" class="btn btn-light btn-sm me-2">Novo produto</a>
                                        <a href="/logout" class="btn btn-outline-light btn-sm">Sair</a>
                                    </div>
                                </div>
                            </nav>

                            <div class="container">

                                <div class="card shadow">
                                    <div class="card-body">

                                        <h3 class="mb-4">Produtos cadastrados</h3>
                                        <hr>

                                        <div class="table-responsive">
                                            <table class="table table-hover align-middle">
                                                <thead class="table-primary">
                                                    <tr>
                                                        <th>Código</th>
                                                        <th>Descrição</th>
                                                        <th>Custo</th>
                                                        <th>Venda</th>
                                                        <th>Validade</th>
                                                        <th>Qtd</th>
                                                        <th>Fabricante</th>
                                                    </tr>
                                                </thead>
                                                <tbody>`;
    for (let i = 0; i < produtos.length; i++) {
        Tabela += `
        <tr>
          <td>${produtos[i].codBarras}</td>
          <td>${produtos[i].descricao}</td>
          <td>R$ ${produtos[i].precoCusto}</td>
          <td>R$ ${produtos[i].precoVenda}</td>
          <td>${produtos[i].validade}</td>
          <td>${produtos[i].quantidade}</td>
          <td>${produtos[i].fabricante}</td>
        </tr >
            `;
    }
    Tabela += `</tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </body>
                        </html>
                `;

    res.setHeader("Content-Type", "text/html");
    res.send(Tabela);

});

app.get("/login", (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send(`
    <!DOCTYPE html>
        <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Login</title>
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                        </head>

                        <body class="bg-light">

                            <div class="d-flex justify-content-center align-items-center vh-100">
                                <div class="card shadow p-4" style="width: 360px;">
                                    <h3 class="text-center mb-4">Acesso ao sistema</h3>

                                    <form method="POST" action="/login">
                                        <div class="mb-3">
                                            <label class="form-label">Usuário</label>
                                            <input type="text" class="form-control" name="username">
                                        </div>

                                        <div class="mb-4">
                                            <label class="form-label">Senha</label>
                                            <input type="password" class="form-control" name="password">
                                        </div>

                                        <button type="submit" class="btn btn-primary w-100">Entrar</button>
                                    </form>
                                </div>
                            </div>

                        </body>
                    </html>
                    `);
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        req.session.user = {
            nome: "Administrador",
            login: username,
        };

        const dataAtual = new Date();
        res.cookie("ultimoAcesso", dataAtual.toLocaleString());

        res.redirect("/Addprodutos");
    } else {
        let conteudo = `<!DOCTYPE html>
                    <html lang="pt-BR">
                        <head>
                            <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Login</title>
                                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
                                    </head>

                                    <body class="bg-light">

                                        <div class="d-flex justify-content-center align-items-center vh-100">
                                            <div class="card shadow p-4" style="width: 360px;">
                                                <h3 class="text-center mb-4">Acesso ao sistema</h3>

                                                <form method="POST" action="/login">
                                                    <div class="mb-3">
                                                        <label class="form-label">Usuário</label>
                                                        <input type="text" class="form-control" name="username" value="${username}">
                                                            `;
        if (!username) {
            conteudo += `<div class="form-text text-danger">O campo usuário é obrigatório.</div>`;
        }

        conteudo += `</div>

                                                    <div class="mb-4">
                                                        <label class="form-label">Senha</label>
                                                        <input type="password" class="form-control" name="password">
                                                            `;
        if (!password) {
            conteudo += `<div class="form-text text-danger">O campo senha é obrigatório.</div>`;
        }

        conteudo += `</div>

                                                    <button type="submit" class="btn btn-primary w-100">Entrar</button>
                                                </form>
                                            </div>
                                        </div>

                                    </body>
                                </html>`;
        res.setHeader("Content-Type", "text/html");
        res.send(conteudo);
    }
});

// logout
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

function auth(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect("/login");
}

app.listen(port, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});
