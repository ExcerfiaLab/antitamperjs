import type { BNode } from '@/ast/api/api.node'
import type { Expression, Node, Statement } from '@swc/core'

export class WrappedStatement<
	T extends Statement | Node | Expression = Statement
> {
	readonly type: Statement['type']
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
