# Calculadora Glassmorphism Red — Product Requirements Document (PRD)

> **Status:** Draft  
> **Criado por:** Morgan (@pm)  
> **Data:** 2026-05-07  
> **Versão:** 1.0

---

## 1. Goals & Background Context

### Goals

- Entregar uma calculadora web 100% funcional com operações básicas (+ − × ÷ % AC ⌫)
- Criar uma interface glassmorphism com paleta vermelha dominante e fundo animado
- Produzir código HTML/CSS/JS puro sem dependências externas ou processo de build
- Garantir compatibilidade com browsers modernos (Chrome 88+, Firefox 90+, Edge 88+)
- Servir como showcase de CSS moderno e referência de glassmorphism para desenvolvedores

### Background Context

Calculadoras web são ferramentas ubíquas, porém visualmente genéricas. Este projeto preenche a lacuna entre funcionalidade e design de alto impacto, entregando uma calculadora que combina UX completo com identidade visual marcante baseada em glassmorphism e cores vermelhas.

O produto é 100% client-side — sem backend, sem npm, sem build — tornando-o trivial de hospedar, distribuir e estudar. A paleta vermelha cria uma identidade única que serve tanto como ferramenta cotidiana quanto como portfólio de CSS avançado.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-05-07 | 1.0 | Criação inicial do PRD | Morgan (@pm) |

---

## 2. Requirements

### Functional Requirements

- **FR1:** A calculadora deve exibir um display com a expressão atual e o resultado calculado
- **FR2:** A calculadora deve suportar entrada de dígitos 0-9 e ponto decimal
- **FR3:** A calculadora deve executar as operações: adição (+), subtração (−), multiplicação (×) e divisão (÷)
- **FR4:** A calculadora deve suportar a função de percentual (%)
- **FR5:** A calculadora deve suportar limpeza total do estado (AC — All Clear)
- **FR6:** A calculadora deve suportar apagar o último dígito inserido (⌫ backspace)
- **FR7:** A calculadora deve suportar inversão de sinal do valor atual (+/−)
- **FR8:** A calculadora deve tratar divisão por zero exibindo mensagem de erro no display ("Erro")
- **FR9:** O fundo da página deve exibir orbs animados com gradientes vermelhos em movimento contínuo via CSS animation
- **FR10:** Os botões devem exibir efeito de glow vermelho e escala ao hover e ao clicar (active state)
- **FR11:** A interface deve aplicar glassmorphism real: `backdrop-filter: blur()`, bordas semi-transparentes e camadas de profundidade
- **FR12:** A calculadora deve encadear operações sequencialmente (ex: 5 + 3 × 2 com avaliação ao pressionar =)

### Non-Functional Requirements

- **NFR1:** A aplicação deve ser composta por no máximo 3 arquivos: `index.html`, `style.css` e `script.js` — sem dependências externas
- **NFR2:** As animações CSS devem rodar a 60fps sem degradação perceptível em hardware moderno
- **NFR3:** A aplicação deve ser compatível com Chrome 88+, Firefox 90+ e Edge 88+ (suporte nativo a `backdrop-filter`)
- **NFR4:** O código deve incluir comentários explicativos nas seções de lógica e nos efeitos CSS não-óbvios
- **NFR5:** A interface deve ser responsiva, funcionando em telas de 320px (mobile) a 1920px (desktop)
- **NFR6:** O `backdrop-filter` deve incluir prefixo `-webkit-` para compatibilidade com Safari
- **NFR7:** O CSS deve usar Custom Properties (`--var`) para a paleta de cores, facilitando customização futura

---

## 3. User Interface Design Goals

### Overall UX Vision

Interface minimalista de alto impacto visual — o glassmorphism cria uma sensação de profundidade e modernidade, enquanto a paleta vermelha transmite energia e personalidade. O usuário deve sentir que está interagindo com um artefato premium, não uma calculadora genérica. Cada toque/clique deve ter feedback visual imediato e satisfatório.

### Key Interaction Paradigms

- **Click/Tap direto:** Botões respondem a clique com animação de escala (shrink + glow)
- **Feedback visual imediato:** Display atualiza em tempo real a cada entrada
- **Estado visual claro:** Operador ativo destacado visualmente no display
- **Micro-animações:** Transições suaves (200-300ms ease) em hover e active states

### Core Screens and Views

- **Tela única — Calculadora Principal:** Única view da aplicação, contendo display + grid de botões sobre fundo animado

### Accessibility

Nenhum requisito formal de acessibilidade (WCAG) para o MVP — foco em experiência visual. Contraste mínimo funcional garantido entre texto e superfícies glass.

### Branding

| Elemento | Valor |
|----------|-------|
| Background | `#0d0000` (preto-avermelhado profundo) |
| Primary gradient | `#FF0000` → `#8B0000` → `#1a0000` |
| Glass surface | `rgba(255, 0, 0, 0.08)` com `backdrop-filter: blur(20px)` |
| Bordas glass | `rgba(255, 255, 255, 0.1)` a `rgba(255, 0, 0, 0.2)` |
| Glow effect | `box-shadow: 0 0 20px rgba(255,0,0,0.4)` |
| Fonte display | Monoespaciada — `Share Tech Mono` (Google Fonts) |
| Fonte botões | Sans-serif moderna — `system-ui` ou `Inter` |
| Orbs animados | 3-5 círculos desfocados em tons de vermelho, animação lenta (15-25s loop) |

### Target Device and Platforms

**Web Responsive** — Desktop prioritário, mobile funcional (min 320px)

---

## 4. Technical Assumptions

### Repository Structure

**Single-repo (flat)** — Projeto de 3 arquivos, sem necessidade de monorepo.

```
calculadora-glassmorphism/
├── index.html
├── style.css
└── script.js
```

### Service Architecture

**Single-page static app (Zero backend)** — 100% client-side. Sem servidor, sem API, sem banco de dados. Distribuível via qualquer hosting estático.

### Testing Requirements

**Manual testing only** — Validação manual cobre operações aritméticas, edge cases, responsividade e efeitos visuais nos browsers alvo.

### Additional Technical Assumptions

- **Linguagens:** HTML5 + CSS3 + JavaScript ES6+ (vanilla, sem transpiler)
- **CSS Architecture:** Custom Properties para paleta; Flexbox/Grid para layout
- **JS Pattern:** Estado em objeto simples `{ currentValue, previousValue, operator, shouldResetDisplay }`
- **Sem Build Tools:** Zero webpack, vite, parcel
- **Sem Package Manager:** Zero npm/yarn
- **CSS backdrop-filter:** Prefixos `-webkit-` e padrão incluídos
- **Fontes:** Google Fonts via CDN (única dependência externa permitida)
- **Hospedagem alvo:** GitHub Pages ou qualquer servidor estático

---

## 5. Epic List

| Epic | Título | Objetivo |
|------|--------|---------|
| Epic 1 | Foundation & Calculator Core | Estrutura do projeto + lógica JS funcional completa |
| Epic 2 | Glassmorphism UI & Visual Polish | Identidade visual completa, animações e responsividade |

---

## 6. Epic Details

---

### Epic 1: Foundation & Calculator Core

Estabelecer os 3 arquivos do projeto com HTML semântico, estrutura de botões completa e toda a lógica JavaScript — entregando uma calculadora plenamente funcional com estado gerenciado, operações encadeadas e tratamento de edge cases, pronta para receber o design visual no Epic 2.

---

#### Story 1.1 — Project Scaffold & HTML Structure

> Como desenvolvedor, quero criar a estrutura base do projeto com HTML semântico e grid de botões, para que a calculadora tenha uma fundação organizada pronta para lógica e estilo.

**Acceptance Criteria:**
1. Criar os 3 arquivos: `index.html`, `style.css`, `script.js` com links corretamente configurados
2. O `index.html` contém um elemento `<div class="calculator">` com display e grid de botões
3. O display possui dois elementos: expressão atual (`#expression`) e resultado (`#result`)
4. O grid contém todos os 19 botões: AC, +/−, %, ÷, 7, 8, 9, ×, 4, 5, 6, −, 1, 2, 3, +, 0, ., =
5. Cada botão possui `data-action` e `data-value` attributes para seleção via JS
6. O `style.css` inclui reset básico e `box-sizing: border-box`
7. O `script.js` é linkado no final do `<body>` e não gera erros no console

---

#### Story 1.2 — Calculator Core Logic

> Como usuário, quero inserir números e operações e ver o resultado calculado, para que eu possa realizar cálculos básicos do dia a dia.

**Acceptance Criteria:**
1. O estado da calculadora é gerenciado em objeto JS: `{ currentValue, previousValue, operator, shouldResetDisplay }`
2. Clicar em dígitos (0-9) atualiza `#result` com o valor atual concatenado
3. Clicar em operador (+, −, ×, ÷) armazena `previousValue` e `operator`, aguarda segundo operando
4. Clicar em `=` executa o cálculo e exibe o resultado em `#result`
5. `#expression` exibe a expressão em formação (ex: `12 + 5 =`)
6. Operações encadeadas funcionam: pressionar operador após `=` continua com o resultado
7. Botão AC reseta completamente o estado para `0`
8. Botão ⌫ remove o último caractere do valor atual
9. Botão +/− inverte o sinal do valor atual
10. Botão % converte o valor atual para percentual (divide por 100)

---

#### Story 1.3 — Edge Cases & Input Validation

> Como usuário, quero que a calculadora trate entradas inválidas graciosamente, para que erros não quebrem a experiência.

**Acceptance Criteria:**
1. Divisão por zero exibe `"Erro"` no display e reseta o estado ao clicar em AC
2. Ponto decimal (.) não pode ser inserido duas vezes no mesmo número
3. Operador não pode ser inserido se não há valor atual válido
4. Resultado muito longo é formatado com `toFixed()` ou notação exponencial para caber no display
5. Clicar em `=` sem operador definido não altera o valor atual
6. Após exibir resultado, digitar novo número inicia nova entrada (não concatena ao resultado)

---

### Epic 2: Glassmorphism UI & Visual Polish

Aplicar toda a identidade visual sobre a base funcional do Epic 1 — glassmorphism, paleta vermelha, orbs animados, efeitos de interação e responsividade — transformando a calculadora funcional em uma experiência visual premium.

---

#### Story 2.1 — CSS Foundation & Glass Surfaces

> Como usuário, quero ver a interface com efeito glassmorphism e paleta vermelha, para que a calculadora tenha identidade visual única e moderna.

**Acceptance Criteria:**
1. CSS Custom Properties definidas para toda a paleta: `--bg`, `--glass-bg`, `--border-glass`, `--red-primary`, `--red-dark`, `--glow`
2. Background do `<body>` aplicado: `#0d0000` com gradiente radial sutil
3. `.calculator` possui: `background: rgba(255,0,0,0.08)`, `backdrop-filter: blur(20px)`, `-webkit-backdrop-filter: blur(20px)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 20px`
4. Display (`#result`) possui superfície glass própria com background mais escuro e borda sutil
5. `#expression` exibe texto menor, opaco, acima do resultado principal
6. Todos os valores de paleta usam as Custom Properties definidas (zero valores hardcoded no CSS)

---

#### Story 2.2 — Animated Background Orbs

> Como usuário, quero ver orbs coloridos animados no fundo, para que a interface tenha profundidade e movimento que reforcem a identidade visual.

**Acceptance Criteria:**
1. Mínimo 3 orbs criados como elementos `<div class="orb">` no HTML
2. Cada orb possui: `border-radius: 50%`, `filter: blur(60px)`, `position: absolute`, opacidade entre 0.3-0.6
3. Orbs usam cores variadas da paleta vermelha: `#FF0000`, `#8B0000`, `#CC0000`
4. Cada orb possui animação CSS `@keyframes` única com `transform: translate()` e `scale()` em loop infinito
5. Duração das animações entre 15s e 25s com `ease-in-out` para movimento orgânico
6. Orbs não interferem nos cliques dos botões (`pointer-events: none`)
7. `.calculator` possui `z-index` superior aos orbs garantindo legibilidade

---

#### Story 2.3 — Button Styles & Interaction Effects

> Como usuário, quero ver botões com design glass e efeitos visuais ao interagir, para que cada clique seja visualmente satisfatório.

**Acceptance Criteria:**
1. Botões possuem: `background: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 12px`, `color: #fff`
2. Botão `=` possui gradient vermelho destaque: `background: linear-gradient(135deg, #FF0000, #8B0000)`
3. Botões de operador (+, −, ×, ÷) possuem tom de vermelho sutil diferenciado dos numéricos
4. `:hover` aplica: `background: rgba(255,0,0,0.2)`, `box-shadow: 0 0 15px rgba(255,0,0,0.3)`, `transform: scale(1.05)`
5. `:active` aplica: `transform: scale(0.95)`, `box-shadow: 0 0 25px rgba(255,0,0,0.5)`
6. Todas as transições usam `transition: all 200ms ease`
7. Botão AC possui cor diferenciada (vermelho mais claro/brilhante)

---

#### Story 2.4 — Typography, Layout & Responsive

> Como usuário, quero que a calculadora seja legível e bem proporcionada em qualquer dispositivo, para que eu possa usar confortavelmente no desktop e no mobile.

**Acceptance Criteria:**
1. Google Fonts `Share Tech Mono` carregada para o display via `<link>` no `<head>`
2. `#result` usa fonte monoespaciada, tamanho mínimo `2rem`, alinhamento à direita
3. Layout da calculadora centralizado na viewport via `display: flex; align-items: center; justify-content: center` no `<body>`
4. Grid de botões usa `display: grid; grid-template-columns: repeat(4, 1fr)` com `gap: 12px`
5. Botão `0` ocupa 2 colunas (`grid-column: span 2`)
6. Em telas ≤ 480px: largura da calculadora passa para `95vw`, botões reduzem padding
7. Em telas ≥ 1024px: calculadora tem largura máxima de `380px`
8. Sem scroll horizontal em nenhum viewport entre 320px e 1920px

---

## 7. Next Steps

### UX Expert Prompt

> @ux-design-expert — Revisar o PRD em `docs/prd.md` e criar especificação visual detalhada para a Calculadora Glassmorphism Red, focando na paleta vermelha, efeitos glass e animações de orbs conforme definido na seção UI Goals.

### Architect Prompt

> @architect — Revisar o PRD em `docs/prd.md` e validar as decisões técnicas da seção Technical Assumptions. Confirmar arquitetura de 3 arquivos (HTML/CSS/JS), padrão de estado JS e estrutura de CSS Custom Properties. Gerar documento de arquitetura se necessário.
