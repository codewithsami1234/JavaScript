var TimeLimitedCache = function() {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    const currentTime = Date.now();
    const existing = this.cache.get(key);
    const isUnexpired = existing && existing.expireTime > currentTime;

    // store new or overwrite existing
    this.cache.set(key, {
        value: value,
        expireTime: currentTime + duration
    });

    return !!isUnexpired;
};

/** 
 * @param {number} key
 * @return {number} value associated with key, or -1 if expired or missing
 */
TimeLimitedCache.prototype.get = function(key) {
    const currentTime = Date.now();
    const entry = this.cache.get(key);

    if (!entry || entry.expireTime <= currentTime) {
        this.cache.delete(key); // cleanup expired key
        return -1;
    }

    return entry.value;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    const currentTime = Date.now();
    let count = 0;

    for (const [key, entry] of this.cache.entries()) {
        if (entry.expireTime > currentTime) {
            count++;
        } else {
            this.cache.delete(key); // cleanup expired
        }
    }

    return count;
};

/**
 * Example usage:
 * const timeLimitedCache = new TimeLimitedCache();
 * console.log(timeLimitedCache.set(1, 42, 1000)); // false
 * console.log(timeLimitedCache.get(1)); // 42
 * console.log(timeLimitedCache.count()); // 1
 */
