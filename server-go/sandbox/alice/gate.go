package main


import "fmt"

//#include "apple.h"
//#include <uuid/uuid.h>
// #cgo LDFLAGS: -luuid
import "C"

func main() {
    fmt.Println("Hello, world.")
	var a = C.a();
	fmt.Printf("%d", a)
	C.hello();


	// // Generate UUID from C. Humble Beginnings.
	// // https://dev.to/metal3d/understand-how-to-use-c-libraries-in-go-with-cgo-3dbn 
	var uuid *C.uchar
	uuid = (*C.uchar)(C.malloc(16))
    var uuid_str *C.char
    uuid_str = (*C.char)(C.malloc(37))
    C.uuid_generate_random(uuid)
    C.uuid_unparse(uuid, uuid_str)
    fmt.Println(C.GoString(uuid_str))
}