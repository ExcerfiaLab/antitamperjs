function calculator() {
	function add(a, b) {
		return a + b
	}

	function sub(a, b) {
		return a - b
	}

	return {
		add,
		sub
	}
}

const calc = calculator()

calc.add(1, 2)
calc.sub(4, 2)
