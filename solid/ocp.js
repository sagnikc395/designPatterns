/**
 * Open Closed Principle
 *
 *
 */

//frozen objects -> Enums
let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

//amazon filters on predefined criteria ; here by color
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }
  //new filter added
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }
}
//new class for upcoming specification
class ColorSpecificaton {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecifciation {
  constructor(size) {
    this.size = size;
  }
  isSatisfied(item) {
    return item.size === this.size;
  }
}

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green Products (old)`);
for (let p of pf.filterByColor(products, Color.green))
  console.log(` * ${p.name}`);

//can add another methods to the Product FIlter class to filter by size
// OCP -> Open for extensions and Closed for modification.
// this filterclass once we have defined and put in prod , we dont change it
// rather for new change requests
// and imherit the class and implement on its child
// State - Space Explosion for large requests ....
// 3 criteria -> 7 methods
// now each such filter is decoupled by one another and then then simply combine them

class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();
console.log(`Green Products (new): `);
for (let p of bf.filter(products, new ColorSpecificaton(Color.green))) {
  console.log(` * ${p.name} is green`);
}

//items that are large and green :- use a combinator

class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  //check if every item from the specification is satisfied or not
  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}
//..can similarly make or specification,xor specification etc.


console.log(`Large and green products`);
let spec = new AndSpecification(
  new ColorSpecificaton(Color.green),
  new SizeSpecifciation(Size.large)
);
for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is color green and large size`);
}
