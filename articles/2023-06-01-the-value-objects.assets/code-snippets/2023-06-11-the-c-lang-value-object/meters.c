#include <stdlib.h>
#include "meters.h"

meters* meters_new(float value) {
    meters* new_meter = (meters*)malloc(sizeof(meters));
    if (value < 0) {
        error* err = (error*)malloc(sizeof(error));
        err->code = 1;
        err->message = "Error: Meter value must be non-negative";
        new_meter->err = err;
    }  else if (value > 999) {
        error* err = (error*)malloc(sizeof(error));
        err->code = 2;
        err->message = "Error: Meter value must be less than 1000";
        new_meter->err = err;
    }
    else {
        new_meter->value = value;
        new_meter->err = NULL;
    }
    return new_meter;
}
