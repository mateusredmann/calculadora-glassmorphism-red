# Calculadora Glassmorphism Red

Uma calculadora elegante com estética glassmorphism e paleta vermelha vibrante, construída com HTML, CSS e JavaScript puros — zero frameworks, zero dependências.

![Preview](https://img.shields.io/badge/status-live-brightgreen) ![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## Demo

🔗 **[github.com/mateusredmann/calculadora-glassmorphism-red](https://github.com/mateusredmann/calculadora-glassmorphism-red)**

> Para rodar localmente: abra `index.html` diretamente no browser, ou suba um servidor estático:
> ```bash
> python -m http.server 8080
> # Acesse http://localhost:8080
> ```

---

## Visual

- **Fundo:** `#0d0000` com gradiente radial sutil
- **Superfície:** Glassmorphism com `backdrop-filter: blur(20px)` e borda semi-transparente
- **Orbs animados:** 3 esferas vermelhas com animações CSS únicas (18s / 23s / 16s), GPU-accelerated
- **Botões:** Efeitos hover com glow vermelho (`scale(1.05)`) e active com recuo (`scale(0.95)`)
- **Display:** Fonte monoespaciada `Share Tech Mono` (Google Fonts), alinhada à direita

---

## Funcionalidades

| Operação | Botão | Comportamento |
|----------|-------|---------------|
| Soma | `+` | Operação binária encadeável |
| Subtração | `−` | Operação binária encadeável |
| Multiplicação | `×` | Operação binária encadeável |
| Divisão | `÷` | Trata divisão por zero com `"Erro"` |
| Porcentagem | `%` | Converte valor atual para decimal |
| Inversão de sinal | `+/−` | Inverte positivo/negativo |
| Decimal | `.` | Previne duplo ponto no mesmo número |
| Apagar | `⌫` | Remove último caractere digitado |
| Limpar | `AC` | Reseta estado completo |
| Igual | `=` | Calcula resultado e formata saída |

### Edge Cases tratados
- Divisão por zero → exibe `"Erro"`, bloqueado até `AC`
- Resultado longo → formatado com `toPrecision(8)` ou `toExponential(4)`
- Digitar após resultado → inicia nova entrada (não concatena)
- Operador sem valor válido → ignorado
- `=` sem operador → mantém valor atual

---

## Estrutura do Projeto

```
calculadora-glassmorphism-red/
├── index.html      # Estrutura HTML semântica (2.9 KB)
├── style.css       # Glassmorphism + animações + responsividade (13 KB)
├── script.js       # Lógica da calculadora — state machine vanilla JS (12 KB)
└── docs/
    └── stories/    # 7 stories de desenvolvimento (pipeline AIOX)
```

---

## Arquitetura CSS

```
:root                   → Custom Properties (paleta completa)
body                    → Flex center + fundo escuro
.calculator-wrapper     → Container relativo para posicionamento dos orbs
.orb / .orb-1/2/3      → Orbs animados com @keyframes únicos
.calculator             → Superfície glass principal
.display                → Área de resultado + expressão
#expression / #result   → Tipografia monoespaciada
.buttons                → Grid 4×1fr com gap: 12px
button                  → Base glass + variantes (operador, =, AC)
button:hover/active     → Interações com transform e glow
@media queries          → ≤360px · ≤480px · ≥1024px
```

### JavaScript — State Machine

```javascript
state = {
  currentValue: '0',
  previousValue: '',
  operator: null,
  shouldResetDisplay: false
}
```

O event listener usa **delegação de eventos** no elemento `.calculator` (parent), capturando cliques do grid de botões e do botão `⌫` no display via `e.target.closest('button')`.

---

## Responsividade

| Viewport | Comportamento |
|----------|---------------|
| ≥ 1024px | Calculadora com largura fixa de `380px` |
| 320px – 1023px | Calculadora fluida adaptada ao container |
| ≤ 480px | Largura `95vw`, padding reduzido, fonte `1.8rem` |
| ≤ 360px | Ajustes adicionais de espaçamento |

Sem scroll horizontal em nenhum viewport entre 320px e 1920px.

---

## Stack & Decisões Técnicas

| Decisão | Escolha | Motivo |
|---------|---------|--------|
| Frameworks JS | Nenhum | Calculadora simples não requer overhead |
| CSS Framework | Nenhum | Controle total sobre glassmorphism |
| Fonte | Share Tech Mono (Google Fonts) | Estética digital/retro no display |
| Animações | CSS `@keyframes` + `transform` | GPU-accelerated, zero JS, 60fps |
| Event handling | Delegação no `.calculator` | Captura ⌫ no display + grid de botões |
| Segurança | Zero `eval()`, zero `fetch` | XSS risk LOW, app 100% estático |

---

## Performance

- **Tempo de operação:** 0.10ms para 5 cálculos consecutivos
- **Animações:** `transform` e `opacity` apenas (zero layout reflow)
- **Fontes:** `<link rel="preconnect">` para carregamento antecipado
- **Tamanho total:** ~28 KB (HTML + CSS + JS)

---

## Desenvolvimento

Este projeto foi construído via pipeline **Synkra AIOX** — um sistema de orquestração multi-agente:

```
@analyst → @pm → @sm → @po → @dev → @qa → @devops
```

| Agente | Responsabilidade |
|--------|-----------------|
| @analyst | Pesquisa e briefing de mercado |
| @pm (Morgan) | PRD com requisitos funcionais e não-funcionais |
| @sm (River) | Criação das 7 stories de desenvolvimento |
| @po (Pax) | Validação e aprovação das stories |
| @dev (Dex) | Implementação do código (Epic 1 + Epic 2) |
| @qa (Quinn) | QA Gate: 37/37 testes automatizados PASS |
| @devops (Gage) | Pre-push gate + publicação no GitHub |

### Stories entregues

| Story | Título | Status |
|-------|--------|--------|
| 1.1 | Project Scaffold | ✅ Done |
| 1.2 | Calculator Core Logic | ✅ Done |
| 1.3 | Edge Cases & Validation | ✅ Done |
| 2.1 | CSS Foundation & Glass Surfaces | ✅ Done |
| 2.2 | Animated Background Orbs | ✅ Done |
| 2.3 | Button Styles & Interaction Effects | ✅ Done |
| 2.4 | Typography, Layout & Responsive | ✅ Done |

---

## Browser Support

| Browser | Suporte |
|---------|---------|
| Chrome 88+ | ✅ Completo |
| Firefox 90+ | ✅ Completo |
| Edge 88+ | ✅ Completo |
| Safari 14+ | ✅ Completo (com `-webkit-backdrop-filter`) |

---

## Licença

MIT — livre para uso pessoal e comercial.
