
class Calculator {
  constructor(screen, screenWidth=14) {
    this.screen = screen;
    this.SCREEN_WIDTH = screenWidth;
    this.reset();
  }

  reset() {
    this.answer = 0;
    this.current = '0';
    this.ready = true;
    this.canClear = true;
    this.lastOp = (_, a) => a;
    this.refreshScreen();
  }

  addDigit(digit) {
    this.addChar(digit[0]);
  }

  addPoint() {
    if ( this.current.includes('.') );
    else this.addChar('.');
  }

  addChar(char) {
    if (this.canClear) {
      this.reset();
      this.canClear = false;
    }
    if (!this.ready) {
      this.current = '';
      this.ready = true;
    }
    if (this.current.length < this.SCREEN_WIDTH) {
      this.current += char;
      this.refreshScreen();
    }
  }

  delChar() {
    this.current = this.current.substring(0, this.current.length-1);
    this.refreshScreen();
  }

  negate() {
    if (this.current.startsWith('-'))
      this.current = this.clean(this.current.substring(1));
    else
      this.current = '-' + this.clean(this.current);
    this.refreshScreen()
  }

  refreshScreen() {
    this.show(this.clean(this.current));
  }

  clean(str) {
    // console.log(str, typeof str);
    str = str.replace(/^0*/, '')||'0';
    if (str.startsWith('.'))
      str = '0' + str;
    return str;
  }

  show(message) {
    this.screen.textContent = message.substring(0, this.SCREEN_WIDTH);
  }

  readStr() {
    let str = this.screen.textContent;
    return this.clean(str);
  }

  read() {
    return parseFloat(this.readStr());
  }

  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  multiply(a, b) {
    return a * b;
  }

  divide(a, b) {
    return a / b;   // Infinity/NaN over showing zero-division-error
  }

  operate(op) {
    if (this.ready) {
      this.ready = false;

      this.answer = this.lastOp(this.answer, this.read());
      this.current = this.answer.toString();

      this.refreshScreen();
    }
    this.canClear = false;
    this.lastOp = this[op];
  }

  showAnswer() {
    if (this.ready)
      this.answer = this.lastOp(this.answer, this.read());
    else
      this.answer = this.lastOp(this.answer, parseFloat(this.current));

    this.ready = false;
    this.canClear = true;
    this.show(this.answer.toString());
  }
}
