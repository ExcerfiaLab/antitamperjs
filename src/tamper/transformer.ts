import { WrappedStatement } from '@/ast/api/api.statement'
import { CodegenUtil } from '@/ast/codegen'
import { createImportsV8VM } from '@/structure/import-vm-v8'
import { TamperTarget } from '@/types/enum/enum.target'
import { type Node, type Statement } from '@swc/core'

export class Transformer {
	constructor(
		private readonly stmts: WrappedStatement<Statement | Node>[],
		private readonly target: TamperTarget
	) {}

	private compile() {
		const unwrapped = this.stmts.map(x => x.unwrap())
		return CodegenUtil.compile(unwrapped)
	}

	private postTransform() {
		if (this.target === TamperTarget.Node) {
			const { v8, vm } = createImportsV8VM()
			const wrappedV8 = WrappedStatement.from(v8)
			const wrappedVm = WrappedStatement.from(vm)
			this.stmts.unshift(wrappedV8, wrappedVm)
		} else {
			throw Error('Not implemented yet (Target: Browser)')
		}
	}

	private mutate() {}

	transform() {
		this.mutate()
		this.postTransform()
		return this.compile()
	}
}
