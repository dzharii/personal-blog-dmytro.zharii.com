#include <stdlib.h>
#include <stdio.h>
#include "meters.h"
#include "operation.h"
#include <errno.h>
#include <string.h>

// A function to parse a double from a string with error checking.
double parse_double(const char* str) {
    char* endptr;
    errno = 0; // To distinguish success/failure after call

    // check that str is not longer than 10 characters
    if (strnlen(str, 20) == 20) {
        printf("Error: provided number is too long\n");
        exit(EXIT_FAILURE);
    }

    // check that str contains only digits and a single decimal point
    int i = 0;
    for (; str[i] != '\0'; i++) {
        char c = str[i];
        if (c == '.') {
            if (i == 0) {
                printf("Error: decimal point must be preceded by a digit\n");
                exit(EXIT_FAILURE);
            }
            if (str[i + 1] == '\0') {
                printf("Error: decimal point must be followed by a digit\n");
                exit(EXIT_FAILURE);
            }
        } else if (c < '0' || c > '9') {
            printf("Error: non-digit character in number\n");
            exit(EXIT_FAILURE);
        }
    }

    double value = strtod(str, &endptr);

    if (errno != 0) {
        /* Some error occurred */
        printf("Failed to parse double: %d\n", errno);
        exit(EXIT_FAILURE);
    }

    /* If we got here, strtod() successfully parsed a number */
    return value;
}

/*
    Function: perform_operation_on_meters

    This function does a math operation on two 'meter' values. 
    It uses raw values from 'meter' objects, does the math, 
    and then wraps the result in a new 'meter' object.

    Here are the steps:

    1. Get raw double values from input 'meter' objects.
       These values are already checked to be good.

    2. Perform the operation (add, sub, mul, div) on the raw values.
       The result is a double.

    3. Wrap the result in a new 'meter' object.
       This also checks that the result is a valid 'meter' value.

    If the math result is not valid for 'meter' (e.g., negative or too big), 
    the new 'meter' object will hold an error message.

    Although the function works with 'meter' and 'operation' objects, 
    the actual math is done on raw double values. 
    This makes the function easier to write and understand.

    Parameters:
    m1 - The first 'meter' object.
    m2 - The second 'meter' object.
    op - The operation to perform.

    Returns:
    A new 'meter' object holding the result of the operation.
*/
meters* perform_operation_on_meters(meters* m1, meters* m2, operation* op) {
    // Extract the nested values
    double operand1 = m1->value;
    double operand2 = m2->value;

    switch (op->value) {
        case OPERATION_ADD:
            printf("performing add operation:\n");
            double add_result = operand1 + operand2;
            return meters_new(add_result);
        case OPERATION_SUB:
            printf("performing sub operation:\n");
            double sub_result = operand1 - operand2;
            return meters_new(sub_result);
        case OPERATION_MUL:
            printf("performing mul operation:\n");
            double mul_result = operand1 * operand2;
            return meters_new(mul_result);
        case OPERATION_DIV:
            printf("performing div operation:\n");
            double div_result = operand1 / operand2;
            return meters_new(div_result);
        default:
            printf("Error: operation value is invalid\n");
            exit(EXIT_FAILURE);
    }
}


/*
    The main function that takes command-line arguments and performs a specified operation on two meter values.

    Usage examples:
    > myprogram 2 add 3
    This will add 2 and 3

    > myprogram 5.5 mul 6
    This will multiply 5.5 and 6

    > myprogram 10 div 2
    This will divide 10 by 2

    Arguments:
    argv[1] - the first operand, a floating point number as a string
    argv[2] - the operation, a string that is one of the following: add, sub, mul, div
    argv[3] - the second operand, a floating point number as a string

    Parameter Limits:
    The operands (argv[1] and argv[3]) should be positive numbers less than 1000. 
    The operation (argv[2]) should be one of the following: add, sub, mul, div.
*/
int main(int argc, char* argv[]) {

    if (argc != 4) {
        printf("Usage: %s <operand1> <operation> <operand2>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    int has_init_errors = 0;

    meters* m1 = meters_new(parse_double(argv[1]));
    if (m1->err != NULL) {
        printf("Error in first meter value: %s\n", m1->err->message);
        has_init_errors = 1;
    }

    operation* op = operation_from_string(argv[2]);
    if (op->err != NULL) {
        printf("Error in operation: %s\n", op->err->message);
        has_init_errors = 1;
    }

    meters* m2 = meters_new(parse_double(argv[3]));
    if (m2->err != NULL) {
        printf("Error in second meter value: %s\n", m2->err->message);
        has_init_errors = 1;
    }

    if (has_init_errors) {
        meters_free(m1);
        meters_free(m2);
        operation_free(op);
        exit(EXIT_FAILURE);
    }

    // Perform operation and print result
    printf(" - Operand 1: %f\n", m1->value);
    printf(" - Operand 2: %f\n", m2->value);
    meters* result = perform_operation_on_meters(m1, m2, op);
    if (result->err != NULL) {
        printf("Error in result: %s\n", result->err->message);
    } else {
        printf(" - Result: %f\n", result->value);
    }

    meters_free(m1);
    meters_free(m2);
    meters_free(result);

    operation_free(op);
    return 0;
}
