let MyObject = {
  "apple": 67.4,
  "pear": 70
}

let myTable = new Map();
myTable.set("apple", 87);
myTable.set("pineapple", 47);

console.log(myTable.has("apple"))
console.log(myTable);

let voted = new Map([
  ["Tom", true],
  ["Peter", true]
]);

console.log(voted)

function vote(name) {
  if (voted.has(name)) {
    console.log(`Kick ${name} out`);
    return;
  }
  voted.set(name, true)
  return;
}

vote("Martin");
vote("Tom");
console.log(voted)


