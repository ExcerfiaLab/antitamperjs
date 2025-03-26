import type { BNode } from '@/ast/api/api.node'
import type { JsVarDeclaration } from '@/ast/codegen/node/var/var.declaration'
import { SPAN } from '@/ast/utils'
import type { VariableDeclaration, VariableDeclarationKind } from '@swc/core'

export class JsVar implements BNode<VariableDeclaration> {
	private declarations: JsVarDeclaration[] = []
	constructor(private readonly kind: VariableDeclarationKind) {}

	build(): VariableDeclaration {
		return {
			span: SPAN,
			type: 'VariableDeclaration',
			declarations: this.declarations.map(decl => decl.build()),
			declare: false,
			kind: this.kind
		}
	}
}
