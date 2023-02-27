/**
 * JS natively doesnt provide interfaces as it supports duck typing.
 * ISP :- have to split up interfaces into different parts so that people dont need to implement
 * things that they need.
 */

class Document {}

class Machine {
  //create a class which behaves as a interface
  constructor() {
    if (this.constructor.name === "Machine") {
      throw new Error("Machine is abstract!");
    }
  }
  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

//nad then implement this interface
class MultiFunctionPrinter extends Machine {
  print(doc) {
    //
  }
  fax(doc) {
    //
  }
  scan(doc) {
    //
  }
}

//make a custom class for not implmented thing

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented!`;
    super(msg);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError);
    }
  }
}

class OldFashionPrinter extends Machine {
  //cant implement and override all the methods
  print(doc) {
    //
  }
  //fax(doc){} -> can leave it blank
  //scan(doc){} -> can leave it blank
  //but that violates the principle of least surprise.
  //we will get no-op operation
  //or can throw a new eeor
  // scan(doc) {
  //    throw new Error("not implemented!");
  //  }
  scna(doc) {
    throw new NotImplementedError("OldFashionPrinter.scan");
  }
}

let printer = new OldFashionPrinter();
printer.scan();
