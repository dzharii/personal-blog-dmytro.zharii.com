#include <stdlib.h>
#include <string.h>
#include "operation.h"

// Function to create an operation from a string, with error checking.
// Please notice the separation of concerns. In this function, 
// we first deal with the problem of parsing the string from the user input into the numeric value. 
// Then, we create a value objects, which validates the operation number is valid.
operation* operation_from_string(char* op_str) {
    const size_t add_token_len = 3;
    const size_t sub_token_len = 3;
    const size_t mul_token_len = 3;
    const size_t div_token_len = 3;

    if (strnlen(op_str, 10) == add_token_len && strncmp(op_str, "add", add_token_len) == 0) {
        return operation_new(OPERATION_ADD);
    } else if (strnlen(op_str, 10) == sub_token_len && strncmp(op_str, "sub", sub_token_len) == 0) {
        return operation_new(OPERATION_SUB);
    } else if (strnlen(op_str, 10) == mul_token_len && strncmp(op_str, "mul", mul_token_len) == 0) {
        return operation_new(OPERATION_MUL);
    } else if (strnlen(op_str, 10) == div_token_len && strncmp(op_str, "div", div_token_len) == 0) {
        return operation_new(OPERATION_DIV);
    } else {
        error* err = (error*)malloc(sizeof(error));
        err->code = 1;
        err->message = "Error: operation string is invalid";
        operation* new_op = (operation*)malloc(sizeof(operation));
        new_op->err = err;
        return new_op;
    }
}

// Function to create a new operation value object, with error checking.
operation* operation_new(operation_type op_type) {
    operation* new_op = (operation*)malloc(sizeof(operation));

    if (op_type <= OPERATION_NONE || op_type >= OPERATION_UNKNOWN) {
        error* err = (error*)malloc(sizeof(error));
        err->code = 2;
        err->message = "Error: operation value is invalid";
        new_op->err = err;
    } else {
        new_op->value = op_type;
        new_op->err = NULL;
    }

    return new_op;
}

// Function to free the memory allocated for an operation struct.
void operation_free(operation* op) {
    if (op->err != NULL) {
        free(op->err);
    }
    free(op);
}
