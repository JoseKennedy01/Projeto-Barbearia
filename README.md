# Barbearia Inovação — Site Institucional

Site institucional premium, mobile-first, construído em HTML5, CSS3 e JavaScript puro (sem frameworks ou bibliotecas).

## Estrutura

```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
│       └── favicon.svg
└── README.md
```

## Como visualizar

Abra `index.html` diretamente no navegador, ou sirva a pasta com qualquer servidor estático:

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Imagens

As fotografias usadas em `index.html` são placeholders dinâmicos (`picsum.photos`), apenas para compor o layout com proporções reais. **Antes de publicar**, substitua os atributos `src` pelas fotos reais da barbearia (ambiente, equipe, serviços) salvando-as em `assets/images/` e atualizando os caminhos. Mantenha as proporções (`width`/`height`) indicadas em cada `<img>` para evitar reflow (CLS).

## Personalização rápida

- **Cores**: tokens em `:root` no topo de `css/style.css` (`--color-black`, `--color-white`, `--color-gray-*`).
- **Tipografia**: `Space Grotesk` (títulos) + `Inter` (texto), carregadas via Google Fonts em `index.html`.
- **Links do app**: os botões de App Store / Google Play em `#aplicativo` estão com `href="#"` — troque pelos links reais das lojas.
- **WhatsApp, telefone, endereço e mapa**: atualize os links no `<footer>`.

## Performance & acessibilidade

- HTML semântico (`header`, `main`, `section`, `footer`, `address`).
- Imagens com `alt` descritivo, `loading="lazy"` (exceto hero) e dimensões fixas.
- Navegação por teclado com foco visível (`:focus-visible`).
- Respeita `prefers-reduced-motion`.
- Sem CSS ou JavaScript inline — tudo em arquivos separados.