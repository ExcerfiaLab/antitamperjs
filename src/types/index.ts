import type {
	ArrayPattern,
	ArrowFunctionExpression,
	AssignmentPattern,
	BindingIdentifier,
	FunctionDeclaration,
	ObjectPattern,
	RestElement
} from '@swc/core'

export type Parameter =
	| BindingIdentifier
	| ArrayPattern
	| RestElement
	| ObjectPattern
	| AssignmentPattern

export type AnyJsFunction = ArrowFunctionExpression | FunctionDeclaration
