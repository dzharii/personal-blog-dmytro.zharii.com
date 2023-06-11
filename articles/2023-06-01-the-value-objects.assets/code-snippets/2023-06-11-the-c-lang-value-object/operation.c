#include <stdlib.h>
#include <string.h>
#include "operation.h"

Operation* operation_new(char* op_str) {
    Operation* new_op = (Operation*)malloc(sizeof(Operation));
    if (strncmp(op_str, "add", 3) == 0) {
        new_op->value = ADD;
        new_op->err = NULL;
    } else if (strncmp(op_str, "sub", 3) == 0) {
        new_op->value = SUB;
        new_op->err = NULL;
    } else if (strncmp(op_str, "mul", 3) == 0) {
        new_op->value = MUL;
        new_op->err = NULL;
    } else if (strncmp(op_str, "div", 3) == 0) {
        new_op->value = DIV;
        new_op->err = NULL;
    } else {
        Error* err = (Error*)malloc(sizeof(Error));
        err->code = 2;
        err->message = "Error: Unknown operation";
        new_op->err = err;
    }
    return new_op;
}
