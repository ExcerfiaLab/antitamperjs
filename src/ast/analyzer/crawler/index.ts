import type { WrappedFunctionDeclaration } from '@/ast/analyzer/decl/decl.function'
import type { WrappedVariableDeclaration } from '@/ast/analyzer/decl/decl.variable'
import type { WrappedArrowFn } from '@/ast/analyzer/decl/declarator/declarator.arrow-fn'
import type { WrappedBlockStatement } from '@/ast/analyzer/stmt/stmt.block'
import type { WrappedStatement } from '@/ast/api/api.statement'
import type { Expression, Node, Statement } from '@swc/core'

export class StatementsCrawler {
	static *crawl<
		Z extends Expression | Statement | Node,
		T = WrappedStatement<Z>
	>(
		statements: WrappedStatement[],
		clazz: T extends WrappedStatement<Z> ? new (...args: any) => T : never
	): Generator<T> {
		for (const stmt of statements) {
			if (stmt instanceof clazz) {
				yield stmt
			}
		}
	}

	// NOTE: Поиск по всем нодам внутри, что могут иметь вложенность
	static *deepCrawl<
		Z extends Expression | Statement | Node,
		T = WrappedStatement<Z>
	>(
		statements: WrappedStatement[],
		clazz: T extends WrappedStatement<Z> ? new (...args: any) => T : never
	): Generator<T> {
		for (const stmt of statements) {
			if (stmt instanceof clazz) {
				yield stmt
			}
			switch (stmt.type) {
				case 'BlockStatement':
					yield* this.deepCrawl((<WrappedBlockStatement>stmt).statements, clazz)
					break
				case 'FunctionDeclaration':
					const fn = stmt as WrappedFunctionDeclaration
					if (!fn.isEmpty) {
						yield* this.deepCrawl(fn.body!.statements, clazz)
					}
					break
				case 'VariableDeclaration':
					const varDecl = stmt as WrappedVariableDeclaration
					if (!varDecl.isEmpty) {
						const [declarator] = varDecl.declarators
						if (declarator.init && declarator.init instanceof clazz) {
							yield declarator.init
						}
						if (
							declarator.init &&
							declarator.init.type === 'ArrowFunctionExpression'
						) {
							const arrowFn = declarator.init as WrappedArrowFn
							yield* this.deepCrawl(arrowFn.body.statements, clazz)
						}
					}
					break
			}
		}
	}
}
