import type { Span } from '@swc/core'

export class SourceHelper {
	constructor(private readonly code: string) {}

	getCode(span: Span) {
		if (span.end === span.start) {
			return null
		}
		return this.code.slice(span.start - 1, span.end)
	}
}
