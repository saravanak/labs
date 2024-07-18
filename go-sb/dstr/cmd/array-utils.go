package cmd

func All[T any](ts []T, pred func(T) bool) bool {
	for _, t := range ts {
		if !pred(t) {
			return false
		}
	}
	return true
}

func Filter[T any](ts []T, pred func(T) bool) []T {
	s := make([]T, len(ts))
	for _, t := range ts {
		if pred(t) {
			s = append(s, t)
		}
	}
	return s
}

func FirstIndex[T any](ts []T, pred func(T) bool) int {
	for i, t := range ts {
		if pred(t) {
			return i
		}
	}
	return -1
}
