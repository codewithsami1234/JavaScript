/**
 * @param {Object} context
 * @param {...*} args
 * @return {null|boolean|number|string|Array|Object}
 */
Function.prototype.callPolyfill = function(context, ...args) {
    //  Handle null or undefined context (use globalThis)
    if (context === null || context === undefined) {
        context = globalThis;
    }

    //  Create a unique temporary property
    const uniqueKey = Symbol("tempFn");

    // Step 3: Attach this function (the caller) to the context
    context[uniqueKey] = this;

    //  Execute the function with arguments
    const result = context[uniqueKey](...args);

    delete context[uniqueKey];

    return result;
};


function increment() { 
  this.count++; 
  return this.count; 
}

console.log(increment.callPolyfill({ count: 1 })); // Output: 2
