namespace HelloWorld;
using System;

/*
 * This program simulates the workflow of updating a customer record in a database. 
 * The main function of the Program class accepts three command line arguments: customerId, 
 * ordersPlaced, and lastModified. 
 * - customerId: Should be a valid, non-empty Guid that is not reserved for the application admin.
 * - ordersPlaced: Should be an integer greater or equal to 0 but less than 99.
 * - lastModified: Should be a DateTime value between the store's establishment date (January 1, 2018) 
 *   and December 31, 2099.
 * If all parameters pass these validations, the program then calls the ExecuteWorkflow method, 
 * simulating an update to the database.
 */
public class Program
{
    private static readonly DateTime StoreEstablishedDate = new DateTime(2018, 1, 1);
    private static readonly DateTime FutureCutoffDate = new DateTime(2099, 12, 31);

    public static void Main(string[] args)
    {
        if (args.Length != 3)
        {
            Console.WriteLine("Please enter the correct parameters: customerId, ordersPlaced, lastModified.");
            return;
        }

        // Parameter: CustomerId
        Guid customerId;
        if (!Guid.TryParse(args[0], out customerId))
        {
            Console.WriteLine("The customerId should be a valid Guid value.");
            return;
        }

        // Empty Guid Check
        if (customerId == Guid.Empty)
        {
            Console.WriteLine("The customerId cannot be an empty Guid.");
            return;
        }

        // Application Admin Guid Check
        if (customerId == Guid.Parse("ea2a9d01-e719-42f2-9e5d-56287f142c48"))
        {
            Console.WriteLine("The entered customerId is reserved for the application admin.");
            return;
        }

        // Parameter: ordersPlaced
        int ordersPlaced;
        if (!int.TryParse(args[1], out ordersPlaced) || ordersPlaced < 0 || ordersPlaced >= 99)
        {
            Console.WriteLine("The ordersPlaced should be a number greater than or equal to 0 but less than 99.");
            return;
        }

        // Parameter: lastModified
        DateTime lastModified;
        if (!DateTime.TryParse(args[2], out lastModified) 
            || lastModified < StoreEstablishedDate 
            || lastModified > FutureCutoffDate)
        {
            Console.WriteLine("The lastModified should be a date between the store's established date "
                              + "and December 31, 2099.");
            return;
        }

        // All validations passed, we can call the method
        ExecuteWorkflow(customerId, ordersPlaced, lastModified);
    }

    public static void ExecuteWorkflow(Guid customerId, int ordersPlaced, DateTime lastModified)
    {
        //Database.UpdateRecord(customerId, ordersPlaced, lastModified);
        Console.WriteLine($"Updating Record: CustomerId: {customerId}, OrdersPlaced: {ordersPlaced}, "
                          + $"LastModified: {lastModified}");
    }
}