// hashmap.js

export { HashMap };

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
      this.resize();
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
    // get bucket index
    let index = this.hash(key);
    // if bucket doesn't exist
    if (this.buckets[index] === undefined) {
      return false;
    }
    // if bucket does exist loop through all key-value pairs in bucket
    for (let i = 0; i < this.buckets[index].length; i++) {
      // if current pair's key matches
      if (this.buckets[index][i].key === key) {
        return true;
      }
    }
    // if key wasn't found
    return false;
  }

  // remove takes key as an argument and if key is in hash map
  // should remove entry with that key and return true
  // if key is not in hash map, return false
  remove(key) {
    // get bucket index
    let index = this.hash(key);
    // if bucket doesn't exist
    if (this.buckets[index] === undefined) {
      return false;
    }
    // if bucket does exist loop through all key-value pairs in bucket
    for (let i = 0; i < this.buckets[index].length; i++) {
      // if current pair's key matches
      if (this.buckets[index][i].key === key) {
        // remove entry with that key
        this.buckets[index].splice(i, 1);
        this.itemCount--;
        return true;
      }
    }
    // if key wasn't found
    return false;
  }

  // length returns number of stored keys
  length() {
    return this.itemCount;
  }

  // clear removes all entries
  clear() {
    this.buckets = new Array(this.capacity);
    this.itemCount = 0;
  }

  // keys returns array containing all keys
  keys() {
    // empty array to hold keys
    let keyArray = [];
    // loop through buckets array
    for (let i = 0; i < this.buckets.length; i++) {
      // skip undefined buckets
      if (this.buckets[i] === undefined) {
        continue;
      }
      // loop through each bucket's array of key-value pairs
      for (let j = 0; j < this.buckets[i].length; j++) {
        // push each key into keyArray
        keyArray.push(this.buckets[i][j].key);
      }
    }
    return keyArray;
  }

  // values returns array containing all values
  values() {
    // empty array to hold values
    let valueArray = [];
    // loop through buckets array
    for (let i = 0; i < this.buckets.length; i++) {
      // skip undefined buckets
      if (this.buckets[i] === undefined) {
        continue;
      }
      // loop through each bucket's array of key-value pairs
      for (let j = 0; j < this.buckets[i].length; j++) {
        // push each value into valueArray
        valueArray.push(this.buckets[i][j].value);
      }
    }
    return valueArray;
  }

  // entries returns array that contains each key-value pair
  entries() {
    // empty array to hold entries
    let entriesArray = [];
    // loop through buckets array
    for (let i = 0; i < this.buckets.length; i++) {
      // skip undefined buckets
      if (this.buckets[i] === undefined) {
        continue;
      }
      // loop through each bucket's array of key-value pairs
      for (let j = 0; j < this.buckets[i].length; j++) {
        // push each entry into entriesArray
        entriesArray.push([this.buckets[i][j].key, this.buckets[i][j].value]);
      }
    }
    return entriesArray;
  }

  // resize to double bucket capacity
  resize() {
    // save reference to old buckets
    const oldBuckets = this.buckets;
    // create new array with double the capacity
    this.buckets = new Array(2 * this.capacity);
    // update capacity
    this.capacity = 2 * this.capacity;
    // reset count
    this.itemCount = 0;
    // loop over all key-value pairs in old buckets
    for (let i = 0; i < oldBuckets.length; i++) {
      // skip undefined buckets
      if (oldBuckets[i] === undefined) {
        continue;
      }
      // loop through each bucket's array of key-value pairs
      for (let j = 0; j < oldBuckets[i].length; j++) {
        const pair = oldBuckets[i][j];
        // use private helper function
        this._insertWithoutResize(pair.key, pair.value);
      }
    }
  }

  // private helper function to insert key-value pairs without triggering a resize
  _insertWithoutResize(key, value) {
    // hash key to get index
    const index = this.hash(key);
    // if bucket is empty create new array with the pair
    if (this.buckets[index] === undefined) {
      this.buckets[index] = [{ key, value }];
      this.itemCount++;
    } else {
      // if bucket exists check for existing key and update or push new
      let found = false;
      for (let i = 0; i < this.buckets[index].length; i++) {
        if (this.buckets[index][i].key === key) {
          this.buckets[index][i].value = value;
          found = true;
          break;
        }
      }
      if (!found) {
        this.buckets[index].push({ key, value });
        this.itemCount++;
      }
    }
  }
}
