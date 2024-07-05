param(
    # $Num is a mandatory parameter. This means you must provide a value for n when you call the function.
    [Parameter(Mandatory=$true)]
    [int]$Num
)

# Make the script stop if any errors occur
$ErrorActionPreference = "Stop"

# This script calculates the nth number in the Fibonacci sequence.

# The Fibonacci sequence is a series of numbers in which each number is the sum of the two preceding ones,
# usually starting with 0 and 1.
# For example: 0, 1, 1, 2, 3, 5, 8, 13, ...

# In this script, we define a function, `Get-Fibonacci`, which calculates the nth number in
# the Fibonacci sequence using a recursive algorithm.

# Here's what the function does:
# - If n is 0 or less, it returns 0.
# - If n is 1, it returns 1.
# - Otherwise, it calls itself twice with parameters n-1 and n-2, and adds the results together.
# This follows the definition of the Fibonacci sequence.

# Note: $ErrorActionPreference = "Stop" means that if there is any error in the script,
# it will stop executing immediately. This is a good practice to prevent further errors
# or unexpected results.

# Define the function
function Get-Fibonacci {
    param (
        # n is a mandatory parameter. This means you must provide a value for n
        # when you call the function.
        [Parameter(Mandatory=$true)]
        [int]$n
    )
    if ($n -le 0) {
        # If n is 0 or less, return 0
        return 0
    }
    elseif ($n -eq 1) {
        # If n is 1, return 1
        return 1
    }
    else {
        # If n is greater than 1, calculate the nth number in the sequence
        # by adding the (n-1)th and (n-2)th numbers
        return (Get-Fibonacci ($n - 1)) + (Get-Fibonacci ($n - 2))
    }
}

# Call the function to get the $Num-th Fibonacci number.
Get-Fibonacci -n $Num
