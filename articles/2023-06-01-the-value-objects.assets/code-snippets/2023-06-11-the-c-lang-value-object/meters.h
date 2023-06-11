#ifndef METERS_H
#define METERS_H
#include "error.h"

typedef struct Meters {
    float value;
    Error* err;
} Meters;

Meters* Meters_new(float value);

#endif // METERS_H
