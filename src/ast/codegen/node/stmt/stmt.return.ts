import type { BNode } from '@/ast/api/api.node'
import type { JsExpBinary } from '@/ast/codegen/node/exp/exp.binary'
import type { JsIdentifier } from '@/ast/codegen/node/misc/identifier'
import { SPAN } from '@/ast/utils'
import type { ReturnStatement } from '@swc/core'

export class JsStmtReturn implements BNode<ReturnStatement> {
	constructor(private readonly expression?: JsIdentifier | JsExpBinary) {}
	build(): ReturnStatement {
		return {
			span: SPAN,
			argument: this.expression?.build(),
			type: 'ReturnStatement',
			ctxt: 0
		}
	}
}
