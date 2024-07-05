// Assuming you have two instances of Meters
Meters first = new Meters(200);
Meters second = new Meters(300);

// You can add the values together to create a new Meters instance
Meters third = new Meters(first.Value + second.Value);

Console.WriteLine($"The total distance is {third.Value} m.");