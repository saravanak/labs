#include <stdio.h>
#include <errno.h>

//Add \n to flush the output from the buffer..
//https://groups.google.com/g/golang-nuts/c/I3ITEe91L3U

int a() {
    printf("Hello from C\n");
	return 3;
}

void hello() {
   printf("Hello from C\n");
}
