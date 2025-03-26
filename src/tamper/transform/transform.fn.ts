import type { FunctionDeclarationAnalyzer } from '@/ast/analyzer/decl/decl.function'
import type { AstTransformer } from '@/ast/api/api.transformer'

export class FunctionTransformer implements AstTransformer {
	constructor(private readonly fnAnalyzer: FunctionDeclarationAnalyzer) {}

	transform(): void {}
}
