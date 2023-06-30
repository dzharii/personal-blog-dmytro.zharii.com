// JavaScript
class Meters {
    // The constructor validates the input and throws an error if the input is invalid.
    // This ensures that a Meters object, once created, is always valid.
    constructor(value) {
        if (typeof value !== 'number' || value < 0) {
            throw new Error('Invalid meter value');
        }
        this._value = value; // The underscore convention signifies that this property should not be accessed directly
    }

    // A getter method provides read-only access to the encapsulated value.
    // This supports the object's immutability.
    get value() {
        return this._value;
    }

    // Equality is determined by comparing values, not identities.
    equals(otherMeters) {
        if (!(otherMeters instanceof Meters)) {
            throw new Error('Can only compare to another Meters object');
        }
        return this.value === otherMeters.value;
    }

    // An example method that doesn't produce side effects.
    // It returns a new Meters object instead of modifying the existing one.
    add(otherMeters) {
        if (!(otherMeters instanceof Meters)) {
            throw new Error('Can only add another Meters object');
        }
        return new Meters(this.value + otherMeters.value);
    }
}
