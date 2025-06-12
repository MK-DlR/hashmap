// main.js

import { HashMap } from "./hashmap.js";

// tests
const test = new HashMap(0.75, 16);

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// This insertion will push load factor over 0.75 and trigger resize
test.set("monkey", "brown");

console.log(`Capacity after resize (should be 32): ${test.capacity}`);
console.log(`Item count: ${test.itemCount}`);
console.log(`Load factor after resize: ${test.itemCount / test.capacity}`);

test.set("apple", "green");
test.set("lion", "striped golden");
console.log(test.get("apple")); // should print "green"
console.log(test.get("lion")); // should print "striped golden"

console.log("Has 'dog'? ", test.has("dog")); // true
console.log("Has 'monkey'? ", test.has("monkey")); // true
console.log("Has 'unicorn'? ", test.has("unicorn")); // false

console.log("Length: ", test.length()); // should be 13 (if none removed yet)

console.log("Remove 'frog': ", test.remove("frog")); // true
console.log("Remove 'unicorn': ", test.remove("unicorn")); // false

console.log("Length after remove: ", test.length()); // 12

console.log("Keys: ", test.keys()); // array of keys
console.log("Values: ", test.values()); // array of values
console.log("Entries: ", test.entries()); // array of [key, value] pairs

test.clear();
console.log("Length after clear: ", test.length()); // 0
console.log("Buckets after clear: ", test.buckets);
