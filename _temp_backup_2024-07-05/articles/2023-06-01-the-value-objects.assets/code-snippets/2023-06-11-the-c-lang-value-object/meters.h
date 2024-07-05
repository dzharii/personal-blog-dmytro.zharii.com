#ifndef METERS_H
#define METERS_H
#include "error.h"

typedef struct meters {
    double value;
    error* err;
} meters;

meters* meters_new(double value);
void meters_free(meters* m);

#endif // METERS_H
