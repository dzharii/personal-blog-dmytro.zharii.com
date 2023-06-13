#include <stdlib.h>
#include <stdio.h>
#include "meters.h"
#include "operation.h"
#include <errno.h>

double parse_double(const char* str) {
    char* endptr;
    errno = 0; // To distinguish success/failure after call
    double value = strtod(str, &endptr);

    /* Check for various possible errors */

    if (errno != 0) {
        /* Some error occurred */
        printf("Failed to parse double: %d\n", errno);
        exit(EXIT_FAILURE);
    }

    /* If we got here, strtod() successfully parsed a number */

    return value;
}

meters* perform_operation_on_meters(meters* m1, meters* m2, operation* op) {
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

    // Perform operation and print result ...

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
