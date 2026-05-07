/* ============================================
   Calculadora Glassmorphism Red — script.js
   Story 1.2: Calculator Core Logic
   Story 1.3: Edge Cases & Input Validation
   ============================================ */

/* ─────────────────────────────────────────
   ESTADO DA CALCULADORA (AC: 1)
   ───────────────────────────────────────── */
const state = {
  currentValue: '0',       // valor sendo exibido/digitado
  previousValue: '',       // valor antes do operador
  operator: null,          // operador pendente: '+', '-', '*', '/'
  shouldResetDisplay: false // flag: próximo dígito inicia nova entrada
};

/* ─────────────────────────────────────────
   REFERÊNCIAS DOM
   ───────────────────────────────────────── */
const displayResult     = document.getElementById('result');
const displayExpression = document.getElementById('expression');

/* ─────────────────────────────────────────
   ATUALIZAÇÃO DO DISPLAY
   ───────────────────────────────────────── */
function updateDisplay() {
  displayResult.textContent = state.currentValue;
}

function updateExpression(text) {
  displayExpression.textContent = text;
}

/* ─────────────────────────────────────────
   RESET DE ESTADO (AC: 7)
   ───────────────────────────────────────── */
function resetState() {
  state.currentValue      = '0';
  state.previousValue     = '';
  state.operator          = null;
  state.shouldResetDisplay = false;
  updateDisplay();
  updateExpression('');
}

/* ─────────────────────────────────────────
   FORMATAÇÃO DE RESULTADO LONGO (AC: 4 / Story 1.3 AC: 4)
   ───────────────────────────────────────── */
function formatResult(value) {
  if (value === 'Erro') return value;

  const num = parseFloat(value);
  if (isNaN(num)) return 'Erro';

  // Se o número cabe em 10 caracteres, exibir direto
  const str = String(num);
  if (str.length <= 10) return str;

  // Tentar toPrecision para reduzir tamanho
  const precise = parseFloat(num.toPrecision(8)).toString();
  if (precise.length <= 10) return precise;

  // Fallback: notação exponencial
  return num.toExponential(4);
}

/* ─────────────────────────────────────────
   CÁLCULO CENTRAL (AC: 4)
   ───────────────────────────────────────── */
function calculate(prev, current, operator) {
  const a = parseFloat(prev);
  const b = parseFloat(current);

  switch (operator) {
    case '+': return String(a + b);
    case '-': return String(a - b);
    case '*': return String(a * b);
    case '/':
      // Guard: divisão por zero (Story 1.3 AC: 1)
      if (b === 0) return 'Erro';
      return String(a / b);
    default:
      return current;
  }
}

/* ─────────────────────────────────────────
   HANDLER: DÍGITOS 0-9 (AC: 2, 6)
   ───────────────────────────────────────── */
function handleDigit(value) {
  // Guard: estado de erro — ignorar até AC (Story 1.3)
  if (state.currentValue === 'Erro') return;

  // Se flag ativa, iniciar nova entrada
  if (state.shouldResetDisplay) {
    state.currentValue      = value;
    state.shouldResetDisplay = false;
  } else {
    // Evitar múltiplos zeros à esquerda
    state.currentValue =
      state.currentValue === '0' ? value : state.currentValue + value;
  }

  updateDisplay();
}

/* ─────────────────────────────────────────
   HANDLER: PONTO DECIMAL (Story 1.3 AC: 2)
   ───────────────────────────────────────── */
function handleDecimal() {
  if (state.currentValue === 'Erro') return;

  // Iniciar nova entrada se necessário
  if (state.shouldResetDisplay) {
    state.currentValue      = '0';
    state.shouldResetDisplay = false;
  }

  // Guard: não permitir dois pontos decimais
  if (state.currentValue.includes('.')) return;

  state.currentValue += '.';
  updateDisplay();
}

/* ─────────────────────────────────────────
   HANDLER: OPERADORES +, -, *, / (AC: 3, 6)
   ───────────────────────────────────────── */
function handleOperator(op) {
  // Guard: estado de erro (Story 1.3 AC: 3)
  if (state.currentValue === 'Erro') return;

  // Guard: operador sem valor válido (Story 1.3 AC: 3)
  if (state.currentValue === '' && state.previousValue === '') return;

  // Se já há operador pendente e não veio de "=",
  // executar cálculo encadeado (AC: 6)
  if (state.operator && !state.shouldResetDisplay) {
    const result = calculate(state.previousValue, state.currentValue, state.operator);
    const formatted = formatResult(result);

    state.currentValue = formatted;
    updateDisplay();

    if (formatted === 'Erro') {
      state.operator        = null;
      state.previousValue   = '';
      state.shouldResetDisplay = false;
      updateExpression('');
      return;
    }
  }

  // Armazenar currentValue como previousValue e definir operador
  state.previousValue      = state.currentValue;
  state.operator           = op;
  state.shouldResetDisplay  = true;

  // Exibir expressão parcial (AC: 5)
  const opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[op] || op;
  updateExpression(`${state.previousValue} ${opSymbol}`);
}

/* ─────────────────────────────────────────
   HANDLER: IGUAL = (AC: 4, 5)
   ───────────────────────────────────────── */
function handleEquals() {
  // Guard: sem operador definido (Story 1.3 AC: 5)
  if (!state.operator) return;

  // Guard: estado de erro
  if (state.currentValue === 'Erro') return;

  const opSymbol = { '+': '+', '-': '−', '*': '×', '/': '÷' }[state.operator] || state.operator;

  // Exibir expressão completa (AC: 5)
  updateExpression(`${state.previousValue} ${opSymbol} ${state.currentValue} =`);

  // Calcular resultado
  const result    = calculate(state.previousValue, state.currentValue, state.operator);
  const formatted = formatResult(result);

  state.currentValue       = formatted;
  state.previousValue      = '';
  state.operator           = null;
  state.shouldResetDisplay  = true; // próximo dígito inicia nova entrada (Story 1.3 AC: 6)

  updateDisplay();
}

/* ─────────────────────────────────────────
   HANDLER: AC — ALL CLEAR (AC: 7)
   ───────────────────────────────────────── */
function handleClear() {
  resetState();
}

/* ─────────────────────────────────────────
   HANDLER: ⌫ BACKSPACE (AC: 8)
   ───────────────────────────────────────── */
function handleBackspace() {
  if (state.currentValue === 'Erro') {
    resetState();
    return;
  }

  // Não fazer backspace se shouldResetDisplay (resultado recém calculado)
  if (state.shouldResetDisplay) return;

  if (state.currentValue.length <= 1) {
    state.currentValue = '0';
  } else {
    state.currentValue = state.currentValue.slice(0, -1);
  }

  updateDisplay();
}

/* ─────────────────────────────────────────
   HANDLER: +/− SINAL (AC: 9)
   ───────────────────────────────────────── */
function handleSign() {
  if (state.currentValue === 'Erro' || state.currentValue === '0') return;

  const num = parseFloat(state.currentValue);
  state.currentValue = String(num * -1);
  updateDisplay();
}

/* ─────────────────────────────────────────
   HANDLER: % PERCENTUAL (AC: 10)
   ───────────────────────────────────────── */
function handlePercent() {
  if (state.currentValue === 'Erro') return;

  const num = parseFloat(state.currentValue);
  if (isNaN(num)) return;

  state.currentValue = formatResult(String(num / 100));
  updateDisplay();
}

/* ─────────────────────────────────────────
   ROTEADOR DE AÇÕES — função compartilhada
   ───────────────────────────────────────── */
function routeAction(action, value) {
  // Guard global: se estado é erro, apenas AC funciona
  if (state.currentValue === 'Erro' && action !== 'clear') {
    return;
  }

  switch (action) {
    case 'digit':     handleDigit(value);    break;
    case 'decimal':   handleDecimal();       break;
    case 'operator':  handleOperator(value); break;
    case 'equals':    handleEquals();        break;
    case 'clear':     handleClear();         break;
    case 'backspace': handleBackspace();     break;
    case 'sign':      handleSign();          break;
    case 'percent':   handlePercent();       break;
    default:
      console.warn(`Ação desconhecida: ${action}`);
  }
}

/* ─────────────────────────────────────────
   EVENT LISTENER PRINCIPAL — Event Delegation
   Cobre .buttons (grid) + .display (botão ⌫)
   ───────────────────────────────────────── */
document.querySelector('.calculator').addEventListener('click', function(e) {
  // Encontrar o botão clicado (suporte a cliques em filhos)
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.dataset.action;
  const value  = btn.dataset.value;

  routeAction(action, value);
});

/* ─────────────────────────────────────────
   INICIALIZAÇÃO
   ───────────────────────────────────────── */
updateDisplay();
console.log('Calculadora Glassmorphism Red — script.js carregado ✓');
