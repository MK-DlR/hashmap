// hashmap.js

// HashMap class
class HashMap {
  constructor(loadFactor, capacity) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.itemCount = 0;
    this.buckets = new Array(capacity);
  }
  // hash takes a key and produces a hash code with it
  hash(key) {
    let hashCode = 0;
    // use prime number to reduce likelihood of collisions
    const primeNumber = 31;
    // convert entire key into numbers
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      // use modulo on each iteration to keep output length lower than bucket
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  // set adds a new key-value pair
  set(key, value) {
    // get bucket index
    let index = this.hash(key);
    // check if bucket is empty
    if (this.buckets[index] === undefined) {
      // create new array with first key-value pair
      let newPair = { key: key, value: value };
      this.buckets[index] = [newPair];
      this.itemCount++;
    } else {
      // if bucket has data
      let found = false;
      // loop through array at buckets[index]
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          // update existing item's value
          this.buckets[index][i].value = value;
          found = true;
        }
      }
      // if key wasn't found, add new item to existing array
      if (!found) {
        // add new key-value pair to existing buckets array at index
        let newPair = { key: key, value: value };
        this.buckets[index].push(newPair);
        this.itemCount++;
      }
    }
    // load capacity
    let currentLoadFactor = this.itemCount / this.capacity;
    if (currentLoadFactor >= this.loadFactor) {
      // grow buckets to double capacity
      // ???
    }
  }

  // get takes one argument as a key and returns the value assigned to it
  get(key) {
    // get bucket index
    let index = this.hash(key);
    // if bucket doesn't exist
    if (this.buckets[index] === undefined) {
      return null;
    }
    // if bucket does exist loop through all key-value pairs in bucket
    for (let i = 0; i < this.buckets[index].length; i++) {
      // if current pair's key matches
      if (this.buckets[index][i].key === key) {
        return this.buckets[index][i].value;
      }
    }
    // if key wasn't found
    return null;
  }

  // has takes key as an argument and returns true or false
  // based on whether or not the key is in the hash map
  has(key) {
    // code
  }

  // remove takes key as an argument and if key is in hash map
  // should remove entry with that key and return true
  // if key is not in hash map, return false
  remove(key) {
    // code
  }

  // length returns number of stored keys
  length() {
    // code
  }

  // clear removes all entries
  clear() {
    // code
  }

  // keys returns array containing all keys
  keys() {
    // code
  }

  // values returns array containing all values
  values() {
    // code
  }

  // entries returns array that contains each key-value pair
  entries() {
    // code
  }
}
