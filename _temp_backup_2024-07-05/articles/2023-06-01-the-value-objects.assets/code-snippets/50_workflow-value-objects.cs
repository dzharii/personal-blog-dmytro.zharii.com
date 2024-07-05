namespace HelloWorld;

// CustomerId: A value object that represents the unique identifier of a customer.
public class CustomerId
{
    public Guid Value { get; }

    public static readonly Guid AdminId = Guid.Parse("ea2a9d01-e719-42f2-9e5d-56287f142c48");

    public CustomerId(Guid customerId)
    {
        if (customerId == Guid.Empty || customerId == AdminId)
        {
            throw new ArgumentException("Customer Id can't be empty or admin Id.");
        }

        Value = customerId;
    }

    public static CustomerId Parse(string input)
    {
        if (!Guid.TryParse(input, out Guid output))
        {
            throw new ArgumentException("Customer Id must be a valid GUID.");
        }

        return new CustomerId(output);
    }
}

// OrdersPlaced: A value object that encapsulates the number of orders a customer has placed.
public class OrdersPlaced
{
    public int Value { get; }

    public OrdersPlaced(int ordersPlaced)
    {
        if (ordersPlaced < 0 || ordersPlaced > 98)
        {
            throw new ArgumentException("Orders placed must be between 0 and 98.");
        }

        Value = ordersPlaced;
    }

    public static OrdersPlaced Parse(string input)
    {
        if (!int.TryParse(input, out int output))
        {
            throw new ArgumentException("Orders placed must be a valid integer.");
        }

        return new OrdersPlaced(output);
    }
}

// OrderLastModified: A value object that represents the last date an order was modified.
public class OrderLastModified
{
    public DateTime Value { get; }

    private static readonly DateTime MinDate = new DateTime(2018, 1, 1);
    private static readonly DateTime MaxDate = new DateTime(2099, 12, 31);

    public OrderLastModified(DateTime lastModified)
    {
        if (lastModified < MinDate || lastModified > MaxDate)
        {
            throw new ArgumentException($"OrderLastModified date must be between {MinDate} and {MaxDate}.");
        }

        Value = lastModified;
    }

    public static OrderLastModified Parse(string input)
    {
        if (!DateTime.TryParse(input, out DateTime output))
        {
            throw new ArgumentException("OrderLastModified must be a valid date.");
        }

        return new OrderLastModified(output);
    }
}


public class Program
{
    public static void Main(string[] args)
    {
        if (args.Length != 3)
        {
            Console.WriteLine("Please enter the correct parameters: customerId, ordersPlaced, lastModified.");
            return;
        }
                
        try
        {
            CustomerId customerId = CustomerId.Parse(args[0]);
            OrdersPlaced ordersPlaced = OrdersPlaced.Parse(args[1]);
            OrderLastModified lastModified = OrderLastModified.Parse(args[2]);

            ExecuteWorkflow(customerId, ordersPlaced, lastModified);
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
        }
    }

    public static void ExecuteWorkflow(CustomerId customerId, OrdersPlaced ordersPlaced, OrderLastModified lastModified)
    {
        Database.UpdateRecord(customerId.Value, ordersPlaced.Value, lastModified.Value);
    }
}


