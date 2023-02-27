/**
 * single responsibility principle
 * a class should have a a primary responsbility
 * only one method to change its responsibility
 * bad to add more than 1 responsibility to it
 */

import fs from "fs";

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    //print the journal and one bring string result
    return Object.values(this.entries).join("\n");
  }
  //also tempting to add more functionality to save journal to files
  // save(filename){
  //   fs.writeFileSync(filename,this.toString());
  // }
  // also add more bloat :- load from filename, load from url
  //added more reponsibiliy to this class and is not good
  //take this operations and add this persistnece thing and add to seprate class
}

class PersistenceManager {
  preprocess(j) {
    //do something :- apply this method to all the serilization manager
    // better for organization and code readibility.
  }
  savetoFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today");
j.addEntry("I made sandwhich today");
console.log(j.toString());

let p = new PersistenceManager();
let fileName = "./temp.text";
p.savetoFile(j,fileName);

//God OBJECT :- antipattern; having a single class having every possible thing 
// this pattern opposite of god object 
// also called as seperation of concerns.
// makes the entire code base eaiser to manage and refactor.
