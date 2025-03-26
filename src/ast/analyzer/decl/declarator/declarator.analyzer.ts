import { DeclaratorArrowFnAnalyzer } from '@/ast/analyzer/decl/declarator/declarator.arrow-fn'
import { AstAnalyzer } from '@/ast/api/api.analyzer'
import { WrappedStatement } from '@/ast/api/api.statement'
import type { Expression, VariableDeclarator } from '@swc/core'

export class WrappedDeclarator extends WrappedStatement<VariableDeclarator> {
	private arrowFnAnalyzer = new DeclaratorArrowFnAnalyzer()
	init?: WrappedStatement<Expression>

	constructor(declarator: VariableDeclarator) {
		super(declarator)
		if (declarator.init) {
			const type = declarator.init.type
			switch (type) {
				case 'ArrowFunctionExpression':
					this.init = this.arrowFnAnalyzer.analyze(declarator.init)
					break
				default:
					this.init = new WrappedStatement<Expression>(declarator.init)
					break
			}
		}
	}
}

export class DeclaratorAnalyzer extends AstAnalyzer<VariableDeclarator> {
	public override analyze(declarator: VariableDeclarator): WrappedDeclarator {
		return new WrappedDeclarator(declarator)
	}
}
