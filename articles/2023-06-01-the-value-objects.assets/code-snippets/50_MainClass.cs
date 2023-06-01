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