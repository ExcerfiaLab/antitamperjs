import type { BNode } from '@/ast/api/api.node'
import type { Expression, ModuleDeclaration, Node, Statement } from '@swc/core'

export class WrappedStatement<
	T extends Statement | Node | Expression | ModuleDeclaration = Statement
> {
	readonly type: Statement['type'] | Expression['type'] | Node['type']

	constructor(protected readonly statement: T) {
		this.type = statement.type as Statement['type']
	}

	unwrap() {
		return this.statement
	}

	static from<T extends Node>(node: BNode<T>) {
		return new WrappedStatement(node.build())
	}
}
