#include <stdlib.h>
#include "meters.h"

// Function that creates a new meter struct, with error checking.
meters* meters_new(double value) {
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

// Function to free the memory allocated for a meter struct.
void meters_free(meters* m) {
    if (m->err != NULL) {
        free(m->err);
    }
    free(m);
}