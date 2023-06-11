#include <stdlib.h>
#include <stdio.h>
#include "meters.h"
#include "operation.h"

// Declare your perform_operation function here or in another header file

int main(int argc, char* argv[]) {
    // Check argument count and handle errors ...

    Meters* m1 = Meters_new(atof(argv[1]));
    if (m1->err != NULL) {
        printf("Error in first meter value: %s\n", m1->err->message);
        exit(EXIT_FAILURE);
    }

    Operation* op = operation_new(argv[2]);
    if (op->err != NULL) {
        printf("Error in operation: %s\n", op->err->message);
        exit(EXIT_FAILURE);
    }

    Meters* m2 = Meters_new(atof(argv[3]));
    if (m2->err != NULL) {
        printf("Error in second meter value: %s\n", m2->err->message);
        exit(EXIT_FAILURE);
    }

    // Perform operation and print result ...

    return 0;
}
