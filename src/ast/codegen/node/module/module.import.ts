import type { BNode } from '@/ast/api/api.node'
import { Literal, type JsStringLiteral } from '@/ast/codegen/node/misc/literal'
import { JsImportDefaultSpecifier } from '@/ast/codegen/node/misc/specifier'
import { SPAN } from '@/ast/utils'
import type { ImportDeclaration } from '@swc/core'

export class JsDefaultImport implements BNode<ImportDeclaration> {
	constructor(readonly fromName: string) {
		this._source = Literal.string(fromName)
	}
	private _specifiers: JsImportDefaultSpecifier[] = []
	private _source: JsStringLiteral

	specifier(local: string) {
		const specifier = new JsImportDefaultSpecifier(local)
		this._specifiers.push(specifier)
		return specifier
	}

	build(): ImportDeclaration {
		return {
			type: 'ImportDeclaration',
			source: this._source.build(),
			specifiers: this._specifiers.map(spec => spec.build()),
			span: SPAN,
			with: null,
			phase: 'evaluation'
		}
	}
}
