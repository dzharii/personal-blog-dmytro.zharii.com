public class Program
{
    public static void Main(string[] args)
    {
        ////// UNSAFE ZONE!
        // Please note that we are in an unsafe zone before we have validated input parameters.
        ////// UNSAFE ZONE!

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

            // At this line, we have two outcomes:
            // - The parameters are correct and meet our criteria -- we continue to the safe zone
            // - The program will throw a validation exception if one or more parameters are incorrect.
            // At this point, we terminate the program execution.
            //
            ////// SAFE ZONE!
            ////// STARTS HERE!

            ExecuteWorkflow(customerId, ordersPlaced, lastModified);
        }
        catch (Exception e)
        {
            // User unfriendly error handling.
            Console.WriteLine(e.Message);
        }
    }

    public static void ExecuteWorkflow(CustomerId customerId, OrdersPlaced ordersPlaced, OrderLastModified lastModified)
    {
        Database.UpdateRecord(customerId.Value, ordersPlaced.Value, lastModified.Value);
    }
}