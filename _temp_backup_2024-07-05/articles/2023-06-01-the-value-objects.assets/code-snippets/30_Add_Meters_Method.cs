public class Meters
{
    public int Value { get; private set; }

    public Meters(int value)
    {
        if (value <= 0)
        {
            throw new ArgumentException($"Invalid value for Meters: {value}. Meters must be a positive integer.");
        }

        if (value > 999)
        {
            throw new ArgumentException($"Invalid value for Meters: {value}. Meters cannot be greater than 999.");
        }

        Value = value;
    }

    // Adding an 'add' method
    public Meters Add(Meters other)
    {
        return new Meters(this.Value + other.Value);
    }
}

// Now, let's illustrate how this new method works:

Meters first = new Meters(200);
Meters second = new Meters(300);

// Using the new 'add' method to create a new Meters instance
Meters total = first.Add(second);

Console.WriteLine($"The total distance is {total.Value} m.");
