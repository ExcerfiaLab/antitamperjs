import { DeclarationAnalyzer } from '@/ast/analyzer/decl/decl.analyzer'
import { StatementAnalyzer } from '@/ast/analyzer/stmt/stmt.analyzer'
import { AstFlag } from '@/ast/api/api.analyzer'
import { WrappedStatement } from '@/ast/api/api.statement'
import type { ModuleItem, Program, Statement } from '@swc/core'

export class Analyzer {
	constructor(private readonly program: Program) {}

	private declarationAnalyzer = new DeclarationAnalyzer()
	private statementAnalyzer = new StatementAnalyzer()

	private analyzeStatement(statement: Statement | ModuleItem) {
		switch (statement.type) {
			case 'FunctionDeclaration':
			case 'VariableDeclaration':
				return this.declarationAnalyzer.analyze(statement)
			case 'BlockStatement':
				return this.statementAnalyzer.analyze(statement)
			case 'ImportDeclaration':
			case 'ExportNamedDeclaration':
			case 'ExportDefaultDeclaration':
			case 'ExportAllDeclaration':
				throw new Error("Not implemented module item's")
			default:
				return new WrappedStatement(statement, AstFlag.Readonly)
		}
	}

	public *analyze() {
		for (const stmt of this.program.body) {
			yield this.analyzeStatement(stmt)
		}
	}
}
