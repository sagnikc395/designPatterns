/**
 * Liskov Substituion Principle
 * If you have some function that takes some base type
 * it should also be able to take some derived types too.
 */

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  //getter
  get area() {
    return this._width * this._height;
  }
  // adding gettter for height and width seperately
  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  //setter
  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  toString() {
    return `${this._width} x ${this._height}`;
  }
}

//now want to add a new class Sqaure and want to enforce that extendisng Reactablge
// and enforce that height and width are same for them

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._hegith = value;
  }
  set height(value) {
    this._width = this._height = value;
  }
}

let rc = new Rectangle(2, 3);
console.log(rc.toString());

let sq = new Square(5);
console.log(sq.toString());
