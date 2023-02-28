/**
 * Dependency Inversion Principle
 * Bascially defines a relation bw low level modules and high level modules.
 * States that high level modules should not directly depend on low level modules
 * in fact they should communicate with these low level modules using abstractions.
 */
let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  contructor(name) {
    this.name = name;
  }
}

//low level module --> like a interface that allows us to browse throught the data
class RelationshipBrowser {
  constructor() {
    if (this.contructor.name === "RelationshipBrowser") {
      throw new Error("RelationshipBrowser is abstract!");
    }
  }
  findAllChildrenOf(name) {
    //find all the children of the data
  }
}

//data storage method --> low level module
class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }
  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter((r) => r.from.name === name && r.type === Relationship.parent)
      .map((r) => r.to);
  }
}

//high level module => getting data not, not how it is stored
class Research {
  //abstract classes or interfaces
  //here using directly the low level data storage
  // have to refactor thing on 2 places
  // very tightly coupled together.
  //   constructor(relationships) {
  //find all children of John
  // let relations = relationships.data;
  // for (let rel of relations.filter(
  //   (r) => r.from.name === "John" && r.type === Relationship.parent
  // )) {
  //   console.log(`John has a child named ${rel.to.name}`);
  // }
  //   }

  constructor(browser) {
    
  }
}

let parent = new Person("John");
let child1 = new Person("Chris");
let child2 = new Person("Matt");

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
