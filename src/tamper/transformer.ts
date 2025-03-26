import { WrappedFunctionDeclaration } from '@/ast/analyzer/decl/decl.function'
import { FnTracer, TracedFn } from '@/ast/analyzer/trace/trace.fn'
import { WrappedStatement } from '@/ast/api/api.statement'
import { CodegenUtil } from '@/ast/codegen'
import { createImportsV8VM } from '@/structure/import-vm-v8'
import type { SourceHelper } from '@/tamper/source'
import { TamperTarget } from '@/types/enum/enum.target'
import type { VM } from '@/vm/vm.api'
import { NodeVM } from '@/vm/vm.node'
import { type Node, type Statement } from '@swc/core'
import consola from 'consola'

export class Transformer {
	constructor(
		private readonly stmts: WrappedStatement<Statement | Node>[],
		private readonly target: TamperTarget,
		private readonly sourceHelper: SourceHelper
	) {}

	private readonly vm: VM = new NodeVM()

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

	private async mutateTracedFn(traced: TracedFn) {
		const self = traced.fn as WrappedFunctionDeclaration
		const unwrappedBody = self.unwrap()
		const code = this.sourceHelper.getCode(unwrappedBody.span)
		if (code) {
			const buffer = await this.vm.compile(code)
			consola.debug('CODE:', code, self.identifier.name, buffer)
		}
	}

	private analyzeTracedFn(traced: TracedFn) {
		if (traced.fns.length > 0) {
		} else {
			this.mutateTracedFn(traced)
		}
	}

	private mutate() {
		for (const stmt of this.stmts) {
			if (stmt instanceof WrappedFunctionDeclaration) {
				const traced = FnTracer.trace(stmt)
				if (traced) {
					this.analyzeTracedFn(traced)
				}
			}
		}
	}

	transform() {
		this.mutate()
		this.postTransform()
		return this.compile()
	}
}
