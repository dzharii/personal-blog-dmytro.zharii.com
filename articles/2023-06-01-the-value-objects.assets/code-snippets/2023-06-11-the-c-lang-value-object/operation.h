#ifndef OPERATION_H
#define OPERATION_H
#include "error.h"

typedef enum {
    ADD, SUB, MUL, DIV, UNKNOWN
} operation_type;

typedef struct Operation {
    operation_type value;
    Error* err;
} Operation;

Operation* operation_new(char* op_str);

#endif // OPERATION_H

