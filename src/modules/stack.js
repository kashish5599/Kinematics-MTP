class Stack {
  constructor() {
    this.items = [];
  }

  push(el) {
    this.items.push(el);
  }

  pop() {
    if (this.items.length === 0) {
      console.error("ERROR: stack empty");
      return null;
    }
    return this.items.pop();
  }

  top() {
    if (this.items.length === 0) {
      console.error("ERROR: stack empty");
      return null;
    }
    return this.items.slice(-1)[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  print() {
    let str = "";
    this.items.forEach((el) => (str += el + " "));
    return str.trim();
  }

  size() {
    return this.items.length;
  }
}

export default Stack;
