import { AstAnalyzer } from '@/ast/api/api.analyzer'
import type { ArrowFunctionExpression, FunctionDeclaration } from '@swc/core'
import { WrappedStatement } from '@/ast/api/api.statement'
import { WrappedBlockStatement } from '@/ast/analyzer/stmt/stmt.block'
import { WrappedIdentifier } from '@/ast/analyzer/misc/identifier'
import { JsStmtBlock } from '@/ast/codegen/node/stmt/stmt.block'

export class WrappedFn<
	T extends ArrowFunctionExpression | FunctionDeclaration
> extends WrappedStatement<T> {
	body: WrappedBlockStatement
	constructor(statement: T) {
		super(statement)
		if (statement.body?.type !== 'BlockStatement') {
			throw Error('Not implemented body expression')
		}
		this.body = new WrappedBlockStatement(
			statement.body ?? new JsStmtBlock().build()
		)
	}

	get isEmpty() {
		return !this.body || this.body?.statements.length === 0
	}
}

export class WrappedFunctionDeclaration extends WrappedFn<FunctionDeclaration> {
	identifier: WrappedIdentifier

	constructor(statement: FunctionDeclaration) {
		super(statement)
		this.identifier = new WrappedIdentifier(statement.identifier)
	}

	override unwrap(): FunctionDeclaration {
		return {
			...this.statement,
			body: this.body?.unwrap(),
			identifier: this.identifier.unwrap()
		}
	}
}

export class FunctionDeclarationAnalyzer extends AstAnalyzer<FunctionDeclaration> {
	public override analyze(
		statement: FunctionDeclaration
	): WrappedFunctionDeclaration {
		return new WrappedFunctionDeclaration(statement)
	}
}
