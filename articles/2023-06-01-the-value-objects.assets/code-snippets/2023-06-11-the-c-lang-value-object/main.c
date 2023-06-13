#include <stdlib.h>
#include <stdio.h>
#include "meters.h"
#include "operation.h"

meters* perform_operation_on_meters(meters* m1, meters* m2, operation* op) {
    float operand1 = m1->value;
    float operand2 = m2->value;

    switch (op->value) {
        case OPERATION_ADD:
            printf("performing add operation:\n");
            float add_result = operand1 + operand2;
            return meters_new(add_result);
        case OPERATION_SUB:
            printf("performing sub operation:\n");
            float sub_result = operand1 - operand2;
            return meters_new(sub_result);
        case OPERATION_MUL:
            printf("performing mul operation:\n");
            float mul_result = operand1 * operand2;
            return meters_new(mul_result);
        case OPERATION_DIV:
            printf("performing div operation:\n");
            float div_result = operand1 / operand2;
            return meters_new(div_result);
        default:
            printf("Error: operation value is invalid\n");
            exit(EXIT_FAILURE);
    }
}

int main(int argc, char* argv[]) {
    // Check argument count and handle errors ...

    meters* m1 = meters_new(atof(argv[1]));
    if (m1->err != NULL) {
        printf("Error in first meter value: %s\n", m1->err->message);
        exit(EXIT_FAILURE);
    }

    operation* op = operation_from_string(argv[2]);
    if (op->err != NULL) {
        printf("Error in operation: %s\n", op->err->message);
        exit(EXIT_FAILURE);
    }

    meters* m2 = meters_new(atof(argv[3]));
    if (m2->err != NULL) {
        printf("Error in second meter value: %s\n", m2->err->message);
        exit(EXIT_FAILURE);
    }

    // Perform operation and print result ...

    printf(" - Operand 1: %f\n", m1->value);
    printf(" - Operand 2: %f\n", m2->value);
    meters* result = perform_operation_on_meters(m1, m2, op);
    if (result->err != NULL) {
        printf("Error in result: %s\n", result->err->message);
        exit(EXIT_FAILURE);
    }
    printf(" - Result: %f\n", result->value);
    return 0;
}
