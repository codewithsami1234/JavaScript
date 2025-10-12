class EventEmitter {
    constructor() {
        // Map to store eventName → array of callbacks
        this.events = {};
    }
    
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        // Initialize array for this event if it doesn’t exist
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        // Add callback to event list
        this.events[eventName].push(callback);

        // Return object with unsubscribe method
        return {
            unsubscribe: () => {
                // Remove the callback
                this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
                
                // Clean up empty arrays (optional)
                if (this.events[eventName].length === 0) {
                    delete this.events[eventName];
                }
                return undefined; // explicitly return undefined
            }
        };
    }
    
    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        // If event not found, return empty array
        if (!this.events[eventName]) {
            return [];
        }

        // Call each callback with args spread
        return this.events[eventName].map(cb => cb(...args));
    }
}

/**
 * Example usage:
 * 
 * const emitter = new EventEmitter();
 *
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * console.log(emitter.emit('onClick')); // [99]
 * sub.unsubscribe(); // undefined
 * console.log(emitter.emit('onClick')); // []
 */
