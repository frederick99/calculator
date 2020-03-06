
const keypad = document.querySelector('.keypad');
const numberKeys = keypad.querySelectorAll('.num');
const operators = keypad.querySelectorAll('.op');
const keyPoint = keypad.querySelector('.kPoint');
const keyInvert = keypad.querySelector('.kInv');
const keyAC = keypad.querySelector('.kAC');
const keyDel = keypad.querySelector('.kBksp');
const keyAns = keypad.querySelector('.kEq');

numberKeys.forEach(key => {
  key.addEventListener('click', () => {
    const digit = key.getAttribute('data-val');
    calculator.addDigit(digit);
  });
});

operators.forEach(op => {
  op.addEventListener('click', () => {
    const operator = op.getAttribute('data-opname');
    calculator.operate(operator);
  })
})

keyPoint.addEventListener('click', () => calculator.addPoint());
keyInvert.addEventListener('click', () => calculator.negate())
keyAC.addEventListener('click', () => calculator.reset());
keyDel.addEventListener('click', () => calculator.delChar());
keyAns.addEventListener('click', () => calculator.showAnswer());

window.addEventListener('keyup', ({keyCode}) => {
  // console.log(keyCode);
  if (keyCode >= 48 && keyCode < 58)
    calculator.addDigit((keyCode-48).toString());
  else if (keyCode >= 96 && keyCode < 106)
    calculator.addDigit((keyCode-96).toString());
  else switch (keyCode) {
    case 8:
    case 46: return calculator.delChar();
    case 13: return calculator.showAnswer();
    case 32: return calculator.reset();
    case 106: return calculator.operate('multiply');
    case 107: return calculator.operate('add');
    case 109: return calculator.operate('subtract');
    case 111: return calculator.operate('divide');
    case 110: return calculator.addPoint();
  }
});

const screen = document.querySelector('.display span');
const calculator = new Calculator(screen);
