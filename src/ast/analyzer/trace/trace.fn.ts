import { StatementsCrawler } from '@/ast/analyzer/crawler'
import { WrappedFn } from '@/ast/analyzer/decl/decl.function'
import { WrappedVariableDeclaration } from '@/ast/analyzer/decl/decl.variable'
import type { AnyJsFunction } from '@/types'

class TracedFn {
	variables: WrappedVariableDeclaration[] = []
	fns: WrappedFn<AnyJsFunction>[] = []
	constructor(private readonly fn: WrappedFn<AnyJsFunction>) {}

	trace() {
		const crawledVariables = Array.from(
			StatementsCrawler.deepCrawl(
				this.fn.body.statements,
				WrappedVariableDeclaration
			)
		)
		const crawledFns = Array.from(
			StatementsCrawler.deepCrawl(this.fn.body.statements, WrappedFn)
		)

		this.variables = crawledVariables
		this.fns = crawledFns
	}
}

export class FnTracer {
	static trace(fn: WrappedFn<AnyJsFunction>) {
		if (fn.isEmpty) {
			return null
		}

		const traced = new TracedFn(fn)
		traced.trace()
		return traced
	}
}
