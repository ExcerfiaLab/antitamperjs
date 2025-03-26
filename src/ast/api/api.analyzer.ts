import { WrappedStatement } from '@/ast/api/api.statement'
import { setMemoryElement } from '@/ast/utils/utils.memory'
import type { Node } from '@swc/core'

export abstract class AstAnalyzer<T extends Node> {
	constructor() {
		setMemoryElement(this.constructor, this)
	}
	public analyze(_statement: T): WrappedStatement<T> {
		throw new Error('Not implemented abstract method')
	}
}
