# PHF Galvanizados — Landing Page Multicidade

Landing page estática para o curso presencial de Telhados e Estruturas em Aço Galvanizado.

## Executar

Abra `index.html` diretamente no navegador. Para testar URLs amigáveis, use um servidor estático local.

Exemplo:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080/?cidade=assis`.

## Cidade

A configuração fica em `js/cities.js`.

Para adicionar outra cidade, copie o objeto `assis`, altere `slug`, cidade, estado, informações da turma, imagens, vídeos, FAQ e WhatsApp.

A página aceita:

- `?cidade=assis`
- `/curso/assis` caso a hospedagem tenha rewrite para `index.html`.

## Imagens e vídeos

Os caminhos ficam centralizados no objeto da cidade. Exemplo:

```js
hero: { image: 'assets/images/assis/hero.jpg' }
gallery: [{ type: 'image', src: 'assets/images/assis/01.jpg' }]
videos: [{ type: 'video', src: 'assets/videos/assis/01.mp4' }]
```

Não é necessário duplicar o HTML para uma nova cidade.

## WhatsApp

Altere `contact.whatsapp` e `contact.message` em `js/cities.js`. Todos os CTAs usam automaticamente esses dados.

## Tracking

A função global `trackEvent(event, extra)` está em `js/main.js`. Ela envia o evento para `dataLayer`, quando existente, e para `fbq`, quando existente. Também dispara o evento `landingpage:event` para integrações próprias.

Eventos já preparados:

- `header_cta`
- `hero_cta`
- `intro_cta`
- `class_cta`
- `faq_cta`
- `final_cta`
- `mobile_cta`
- `whatsapp_float`
- `faq_open`
- `gallery_open`
- `video_play`

## Design

A interface foi refeita seguindo uma direção editorial/industrial: tipografia forte, grandes blocos de imagem, linhas técnicas, contraste entre azul profundo e papel claro e laranja como acento. Evita excesso de cards, ícones e bordas arredondadas.

## Publicação

Pode ser publicada em qualquer hospedagem estática. Para usar `/curso/assis`, configure o servidor para encaminhar `/curso/*` para `index.html`.

### Galeria por cidade
A seção de registros agora é independente da página da turma e permite filtrar entre **Todas**, **Assis / SP** e **Garça / SP**. O filtro usa o parâmetro opcional `galeria` na URL e não interfere no parâmetro `cidade`.

Estrutura de fotos:
- `assets/images/assis/` → registros de Assis
- `assets/images/garca/` → registros de Garça

Cadastre os arquivos em `CITY_GALLERIES` dentro de `js/cities.js`. A opção **Todas** agrupa os registros por cidade; ao selecionar uma cidade, somente os registros dela são exibidos.

Para evitar uma seção excessivamente longa, cada cidade exibe inicialmente até **6 registros**. Quando houver mais arquivos, o botão **Ver mais X registros** revela o restante e permite recolher novamente com **Mostrar menos**.


### Animações GSAP

A landing page usa **GSAP + ScrollTrigger** para as animações de entrada e scroll. A biblioteca é carregada via CDN no `index.html`.

- títulos: entrada palavra a palavra;
- textos e blocos: fade + deslocamento vertical suave;
- módulos: entrada progressiva;
- imagens: fade + leve escala;
- galeria: animação ao trocar o filtro de cidade;
- hero: timeline de entrada na abertura;
- `prefers-reduced-motion`: reduz as animações e mantém o conteúdo acessível.

Se o CDN do GSAP não carregar, o projeto utiliza automaticamente o fallback com `IntersectionObserver` já existente.


## GSAP + ScrollTrigger

A camada de animação usa GSAP 3.13.0 e ScrollTrigger. O `index.html` carrega primeiro o CDNJS e, se ele falhar, tenta jsDelivr antes de iniciar `main.js`. Assim, o código de animação não é executado antes de `window.gsap` e `window.ScrollTrigger` existirem.

As animações incluem timeline do hero, títulos palavra a palavra, textos ligados ao scroll com `scrub`, entradas em sequência (`stagger`), movimentos laterais, reveal/parallax de imagens e animação da galeria após troca de cidade. O fallback CSS/IntersectionObserver permanece disponível quando os CDNs estiverem indisponíveis ou quando `prefers-reduced-motion` estiver ativo.


### Galeria assimétrica
A prévia da galeria exibe 4 registros em um mosaico CSS Grid: um bloco vertical alto à esquerda, um bloco horizontal largo no topo à direita e dois blocos na linha inferior. Os demais registros aparecem ao clicar em “Ver mais”.


### Galeria compacta

A galeria usa um mosaico assimétrico de 4 blocos na prévia, com largura máxima de 1040px no desktop e alturas reduzidas para facilitar a visualização. Em telas menores, o grid se adapta responsivamente.
