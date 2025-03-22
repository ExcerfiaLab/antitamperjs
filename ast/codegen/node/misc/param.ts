import type { BNode } from '@/ast/api/api.node'
import type { JsIdentifier } from '@/ast/codegen/node/misc/identifier'
import { SPAN } from '@/ast/utils'
import type { Param } from '@swc/core'

export class JsFnParam implements BNode<Param> {
	constructor(private readonly _pattern: JsIdentifier) {}
	build(): Param {
		return {
			pat: this._pattern.build(),
			type: 'Parameter',
			span: SPAN
		}
	}
}
