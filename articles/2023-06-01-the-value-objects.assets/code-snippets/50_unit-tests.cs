using System;
using Xunit;

public class CustomerIdTests
{
    // Test: Create a `CustomerId` with a valid `Guid` and 
    // check if the `Value` property is set correctly
    [Fact]
    public void Constructor_WithValidGuid_ShouldSetTheValue()
    {
        Guid expectedValue = Guid.NewGuid();

        var customerId = new CustomerId(expectedValue);

        Assert.Equal(expectedValue, customerId.Value);
    }

    // Test: Try to create a `CustomerId` with an empty `Guid`, 
    // expecting an exception
    [Fact]
    public void Constructor_WithEmptyGuid_ShouldThrowException()
    {
        Assert.Throws<ArgumentException>(() => new CustomerId(Guid.Empty));
    }

    // Test: Try to create a `CustomerId` 
    // with the `AdminId` `Guid`, expecting an exception
    [Fact]
    public void Constructor_WithAdminIdGuid_ShouldThrowException()
    {
        Guid adminId = CustomerId.AdminId;

        Assert.Throws<ArgumentException>(() => new CustomerId(adminId));
    }

    // Test: Parse a valid `Guid` string and 
    // return a `CustomerId` with the correct `Value`
    [Fact]
    public void Parse_WithValidGuidString_ShouldReturnCustomerId()
    {
        string validGuidString = Guid.NewGuid().ToString();

        var customerId = CustomerId.Parse(validGuidString);

        Assert.Equal(Guid.Parse(validGuidString), customerId.Value);
    }

    // Test: Try to parse an invalid `Guid` string, expecting an exception
    [Fact]
    public void Parse_WithInvalidGuidString_ShouldThrowException()
    {
        string invalidGuidString = "invalid guid";

        Assert.Throws<ArgumentException>(() => CustomerId.Parse(invalidGuidString));
    }
}
