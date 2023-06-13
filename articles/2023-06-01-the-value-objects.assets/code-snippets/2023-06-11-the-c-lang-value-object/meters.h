#ifndef METERS_H
#define METERS_H
#include "error.h"

typedef struct meters {
    float value;
    error* err;
} meters;

meters* meters_new(float value);

#endif // METERS_H
