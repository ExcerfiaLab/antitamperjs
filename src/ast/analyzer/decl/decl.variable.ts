import { DeclaratorAnalyzer } from '@/ast/analyzer/decl/declarator/declarator.analyzer'
import { AstAnalyzer } from '@/ast/api/api.analyzer'
import { WrappedStatement } from '@/ast/api/api.statement'
import type { VariableDeclaration, VariableDeclarator } from '@swc/core'

export class WrappedVariableDeclaration extends WrappedStatement<VariableDeclaration> {
	private readonly declaratorAnalyzer = new DeclaratorAnalyzer()
	declarators: WrappedStatement<VariableDeclarator>[] = []

	constructor(statement: VariableDeclaration) {
		super(statement)
		for (const declarator of statement.declarations) {
			const analyzed = this.declaratorAnalyzer.analyze(declarator)
			this.declarators.push(analyzed)
		}
	}

	get isEmpty() {
		return this.declarators.length === 0
	}
}

export class VariableDeclarationAnalyzer extends AstAnalyzer<VariableDeclaration> {
	public analyze(declaration: VariableDeclaration): WrappedVariableDeclaration {
		return new WrappedVariableDeclaration(declaration)
	}
}
