function add(a, b) {
	return a + b
}

const wrapped = (a, b) => {
	return a + b
}

function add_2(a, b) {
	return wrapped(a, b)
}

add(1, 4)
