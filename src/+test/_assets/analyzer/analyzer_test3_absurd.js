function test1() {
	function test2() {
		function test3() {
			return 1 + 1
		}

		return 1 + 1
	}

	function test4() {
		return 1 + 1
	}

	function test5() {
		function test6() {
			return 1 + 1
		}
		return 1 + 1
	}

	const t = () => {
		return 1 + 1
	}

	return 1 + 1
}

test()
