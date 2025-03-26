import { WrappedBlockStatement } from '@/ast/analyzer/stmt/stmt.block'
import { AstAnalyzer } from '@/ast/api/api.analyzer'
import { WrappedStatement } from '@/ast/api/api.statement'
import type { ArrowFunctionExpression } from '@swc/core'

export class WrappedArrowFn extends WrappedStatement<ArrowFunctionExpression> {
	body: WrappedBlockStatement

	constructor(statement: ArrowFunctionExpression) {
		super(statement)
		if (statement.body.type === 'BlockStatement') {
			this.body = new WrappedBlockStatement(statement.body)
		} else {
			throw Error('Unimplemented body expression')
		}
	}

	get isEmpty() {
		return !this.body || this.body?.statements.length === 0
	}

	override unwrap(): ArrowFunctionExpression {
		return {
			...this.statement,
			body: this.body.unwrap()
		}
	}
}

export class DeclaratorArrowFnAnalyzer extends AstAnalyzer<ArrowFunctionExpression> {
	public override analyze(statement: ArrowFunctionExpression): WrappedArrowFn {
		return new WrappedArrowFn(statement)
	}
}
