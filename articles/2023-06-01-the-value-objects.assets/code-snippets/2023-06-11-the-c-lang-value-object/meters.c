#include <stdlib.h>
#include "meters.h"

Meters* Meters_new(float value) {
    Meters* new_meter = (Meters*)malloc(sizeof(Meters));
    if (value < 0) {
        Error* err = (Error*)malloc(sizeof(Error));
        err->code = 1;
        err->message = "Error: Meter value must be non-negative";
        new_meter->err = err;
    } else {
        new_meter->value = value;
        new_meter->err = NULL;
    }
    return new_meter;
}
