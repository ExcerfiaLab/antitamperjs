import type { BNode } from '@/ast/api/api.node'
import { JsIdentifier } from '@/ast/codegen/node/misc/identifier'
import { SPAN } from '@/ast/utils'
import type { ImportDefaultSpecifier } from '@swc/core'

export class JsImportDefaultSpecifier implements BNode<ImportDefaultSpecifier> {
	constructor(readonly local: string) {
		this._local = new JsIdentifier(local)
	}
	private _local: JsIdentifier

	build(): ImportDefaultSpecifier {
		return {
			local: this._local.build(),
			type: 'ImportDefaultSpecifier',
			span: SPAN
		}
	}
}
