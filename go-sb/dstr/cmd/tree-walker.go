package cmd

import (
	"fmt"

	"github.com/spf13/cobra"

	"golang.org/x/tour/tree"
)

func Walk(t *tree.Tree, ch chan int) {

	if t.Left != nil {
		Walk(t.Left, ch)
	}
	ch <- t.Value
	if t.Right != nil {
		Walk(t.Right, ch)
	}
}

// Same determines whether the trees
// t1 and t2 contain the same values.
func Same(t1, t2 *tree.Tree) bool {
	lhsNodeCollector := make(chan int)
	rhsNodeCollector := make(chan int)

	fmt.Print(t1)
	fmt.Print(t2)

	go Walk(t1, lhsNodeCollector)
	go Walk(t2, rhsNodeCollector)

	count := 0

	for lhsValue := range lhsNodeCollector {
		fmt.Print(lhsValue)
		if lhsValue != <-rhsNodeCollector {
			return false
		}
		count = count + 1
		if count == 10 {
			break
		}
	}

	return true
}

// versionCmd represents the version command
var treeWalker = &cobra.Command{
	Use:   "tree-walker",
	Short: "Tour of Go Tree Comparer",
	Long:  `Ref https://go.dev/tour/concurrency/8`,

	// type Tree struct {
	// 	Left  *Tree
	// 	Value int
	// 	Right *Tree
	// }
	Run: func(cmd *cobra.Command, args []string) {

		// nodeCollector := make(chan int)

		// go Walk(tree.New(1), nodeCollector)

		// for i := range nodeCollector {
		// 	fmt.Print(i)
		// }

		fmt.Println(Same(tree.New(1), tree.New(1)))
		fmt.Println(Same(tree.New(1), tree.New(2)))
	},
}

func init() {
	rootCmd.AddCommand(crawler)
}
