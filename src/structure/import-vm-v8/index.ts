import { JsDefaultImport } from '@/ast/codegen/node/module/module.import'

export function createImportsV8VM() {
	const v8 = new JsDefaultImport('node:v8')
	v8.specifier('v8')

	const vm = new JsDefaultImport('node:vm')
	vm.specifier('vm')

	return {
		v8,
		vm
	}
}
