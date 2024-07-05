namespace HelloWorld;

// The Value Object
public class Meters
{
    public int Value { get; }

    // Constructor for the Meters class.
    // It includes validation to ensure we're abiding by our defined rules.
    public Meters(int value)
    {
        // Rule 1: Meters must be positive integers.
        if (value <= 0)
        {
            throw new ArgumentException($"Invalid value for Meters: {value}. Meters must be a positive integer.");
        }

        // Rule 2: Meters can't exceed 999.
        if (value > 999)
        {
            throw new ArgumentException($"Invalid value for Meters: {value}. Meters cannot be greater than 999.");
        }

        Value = value;
    }
}

