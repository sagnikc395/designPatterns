//generate a chunk of HTML
// builder

const hello = "hello";
let html = [];
html.push("<p>");
html.push(hello);
html.push("</p>");

//console.log(html.join(""));

const words = ["hello", "world"];
html = [];
html.push("<ul>\n");
for (let word of words) {
  html.push(`   <li>${word}</li>\n`);
}
html.push("</ul>");

//console.log(html.join(""));

class Tag {
  static get indentSize() {
    return 4;
  }
  constructor(name = "", text = "") {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toString() {
    return this.toStringImpl(0);
  }

  toStringImpl(indent) {
    let html = [];
    let i = " ".repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0) {
      html.push(" ".repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push("\n");
    }
    return html.join("");
  }
}

//adding a builder -> build tags on top of tags
class HTMLBuilder {
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }
  addChild(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }
  toString() {
    return this.root.toString();
  }
  build() {
    return this.root;
  }
  static create(name) {
    return new HTMLBuilder(name);
  }
}

let builder = new HTMLBuilder("ul");
//take the set of words
for (let word of words) {
  builder.addChild("li", word);
}
console.log(builder.root.toString());
