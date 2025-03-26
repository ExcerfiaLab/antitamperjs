import { DeclarationAnalyzer } from '@/ast/analyzer/decl/decl.analyzer'
import { StatementAnalyzer } from '@/ast/analyzer/stmt/stmt.analyzer'
import { AstAnalyzer } from '@/ast/api/api.analyzer'
import { WrappedStatement } from '@/ast/api/api.statement'
import type { BlockStatement, Node, Statement } from '@swc/core'

export class WrappedBlockStatement extends WrappedStatement<BlockStatement> {
	private stmts: WrappedStatement<Statement>[] = []

	private declarationAnalyzer = new DeclarationAnalyzer()
	private statementAnalyzer = new StatementAnalyzer()

	constructor(statement: BlockStatement) {
		super(statement)
		for (const stmt of statement.stmts) {
			let analyzed: WrappedStatement<Statement>
			switch (stmt.type) {
				case 'FunctionDeclaration':
				case 'VariableDeclaration':
					analyzed = this.declarationAnalyzer.analyze(stmt)
					break
				case 'BlockStatement':
					analyzed = this.statementAnalyzer.analyze(stmt)
					break
				default:
					analyzed = new WrappedStatement(stmt)
					break
			}
			this.stmts.push(analyzed)
		}
	}

	get statements() {
		return this.stmts
	}

	getStatements<Z extends Node = Statement, T = WrappedStatement<Z>>(
		clazz: T extends WrappedStatement<Z> ? new (...args: any) => T : never
	): T[] {
		return this.stmts.filter(x => clazz!.name === x.constructor.name) as T[]
	}
}

export class BlockStatementAnalyzer extends AstAnalyzer<BlockStatement> {
	public override analyze(statement: BlockStatement): WrappedBlockStatement {
		return new WrappedBlockStatement(statement)
	}
}
