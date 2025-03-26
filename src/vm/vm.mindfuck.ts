import type { VM } from '@/vm/vm.api'
import type { Program } from '@swc/core'

export class MindFuckVM implements VM {
	compile(code: string): void {
		throw new Error('Method not implemented.')
	}
	compileAst(code: Program): void {
		throw new Error('Method not implemented.')
	}
}
