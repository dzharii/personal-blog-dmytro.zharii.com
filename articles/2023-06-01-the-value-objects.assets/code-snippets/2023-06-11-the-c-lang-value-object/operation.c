#include <stdlib.h>
#include <string.h>
#include "operation.h"

operation* operation_from_string(char* op_str) {
    if (strncmp(op_str, "add", 3) == 0) {
        return operation_new(OPERATION_ADD);
    } else if (strncmp(op_str, "sub", 3) == 0) {
        return operation_new(OPERATION_SUB);
    } else if (strncmp(op_str, "mul", 3) == 0) {
        return operation_new(OPERATION_MUL);
    } else if (strncmp(op_str, "div", 3) == 0) {
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
