package cmd

import (
	"fmt"

	"net/http"

	"log"

	"html"

	"os"

	"io"

	"github.com/spf13/cobra"
)

// versionCmd represents the version command
var serveCommand = &cobra.Command{
	Use:   "image-convertor",
	Short: "Handles uploading of images",
	Long:  `Handles uploading of images`,
	Run: func(cmd *cobra.Command, args []string) {
		// http.Handle("/foo", fooHandler)
		http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
		})
		http.HandleFunc("/upload", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))

			// Parse our multipart form, 10 << 20 specifies a maximum
			// upload of 10 MB files.
			r.ParseMultipartForm(10 << 20)
			// FormFile returns the first file for the given key `myFile`
			// it also returns the FileHeader so we can get the Filename,
			// the Header and the size of the file
			file, handler, err := r.FormFile("myFile")
			if err != nil {
				fmt.Println("Error Retrieving the File")
				fmt.Println(err)
				return
			}
			defer file.Close()
			fmt.Printf("Uploaded File: %+v\n", handler.Filename)
			fmt.Printf("File Size: %+v\n", handler.Size)
			fmt.Printf("MIME Header: %+v\n", handler.Header)

			// Create a temporary file within our temp-images directory that follows
			// a particular naming pattern
			tempFile, err := os.CreateTemp("temp-images", "upload-*.png")
			if err != nil {
				fmt.Println(err)
			}
			defer tempFile.Close()

			// read all of the contents of our uploaded file into a
			// byte array
			fileBytes, err := io.ReadAll(file)
			if err != nil {
				fmt.Println(err)
			}
			// write this byte array to our temporary file
			tempFile.Write(fileBytes)
			// return that we have successfully uploaded our file!
			fmt.Fprintf(w, "Successfully Uploaded File\n")
		})
		log.Fatal(http.ListenAndServe(":7070", nil))
	},
}

func init() {
	rootCmd.AddCommand(serveCommand)
}
