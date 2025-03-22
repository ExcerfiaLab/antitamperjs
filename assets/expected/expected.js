function a(...bytes) {
	// -> call WASM method
}

function randInt(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
}

console.log(randInt(1, 4))

function virtualized_randInt(min, max) {
	return a(
		0xa,
		0x0,
		0xfa,
		0xff,
		'EXP_FN_0x0001',
		min,
		0xa,
		0x1,
		0xfa,
		0xff,
		'EXP_FN_0x0002',
		max,
		0xaf
	)
	/**
	 * Внутри виртуальной машины ожидается следующее:
	 * - 0xA -> Выделение памяти под переменную
	 * - 0x0 -> Индекс переменной в контексте
	 * - 0xFA -> Присвоение значения переменной
	 * - 0xFF -> Вызов внешней функции
	 * - "EXP_FN_0x0001" -> Наименование функции в стэке VM (Math.ceil)
	 * -----
	 * - 0xA -> Выделение памяти под переменную
	 * - 0x1 -> Индекс переменной в контексте
	 * - 0xFA -> Присвоение значения переменной
	 * - 0xFF -> Вызов внешней функции
	 * - "EXP_FN_0x0002" -> Наименование функции в стэке VM (Math.floor)
	 * - 0xAF -> RETURN
	 */
}
