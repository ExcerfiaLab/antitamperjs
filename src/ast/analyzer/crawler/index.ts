import type { WrappedFunctionDeclaration } from '@/ast/analyzer/decl/decl.function'
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
				case 'FunctionDeclaration':
					const fn = stmt as WrappedFunctionDeclaration
					if (!fn.isEmpty) {
						yield* this.deepCrawl(fn.body!.statements, clazz)
					}
			}
		}
	}
}
