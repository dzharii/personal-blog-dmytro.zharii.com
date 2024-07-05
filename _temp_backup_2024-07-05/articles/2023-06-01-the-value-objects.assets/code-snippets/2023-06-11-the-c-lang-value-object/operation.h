#ifndef OPERATION_H
#define OPERATION_H
#include "error.h"

typedef enum {
    OPERATION_NONE,
    OPERATION_ADD,
    OPERATION_SUB,
    OPERATION_MUL,
    OPERATION_DIV,
    OPERATION_UNKNOWN,
} operation_type;

typedef struct operation {
    operation_type value;
    error* err;
} operation;


operation* operation_from_string(char* op_str);

operation* operation_new(operation_type op_type);
void operation_free(operation* op);

#endif // OPERATION_H

