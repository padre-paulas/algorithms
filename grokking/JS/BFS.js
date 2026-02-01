// const me = "Me", margot = "Margot", john = "John", helena = "Helena", mitch = "Mitch", ana = "Ana", barry = "Barry";
// const people = [[ me, false ], [ margot, false ], [ john, false ], [ helena, false ], [ mitch, false ], [ ana, true ], [ barry, false ]];

let edges = new Map();
edges.set("Me", ["Margot", "Helena"]);
edges.set("Margot", ["John"]);
edges.set("John", ["Mitch", "Helena"]);
edges.set("Helena", ["Mitch"]);
edges.set("Mitch", ["Ana"]);
edges.set("Ana", ["Barry"]);

let queue = [...edges.get("Me")];
let searched = [];
let person;

const BFS = () => {
  while (queue.length != 0) {
    person = queue.shift();
    if (searched.includes(person)) continue;
    if (person === "Ana") {
      console.log("The mango seller is " + person);
      return true;
    }
    queue.push(...edges.get(person));
    searched.push(person);
  }
  return false;
}

const result = BFS();
console.log(result);