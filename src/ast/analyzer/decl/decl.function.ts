import { AstAnalyzer } from '@/ast/api/api.analyzer'
import type { FunctionDeclaration } from '@swc/core'
import { WrappedStatement } from '@/ast/api/api.statement'
import { WrappedBlockStatement } from '@/ast/analyzer/stmt/stmt.block'
import { WrappedIdentifier } from '@/ast/analyzer/misc/identifier'
import { JsStmtBlock } from '@/ast/codegen/node/stmt/stmt.block'

export class WrappedFunctionDeclaration extends WrappedStatement<FunctionDeclaration> {
	body?: WrappedBlockStatement
	identifier: WrappedIdentifier

	constructor(statement: FunctionDeclaration) {
		super(statement)
		this.body = new WrappedBlockStatement(
			statement.body ?? new JsStmtBlock().build()
		)
		this.identifier = new WrappedIdentifier(statement.identifier)
	}

	get isEmpty() {
		return !this.body || this.body?.statements.length === 0
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
