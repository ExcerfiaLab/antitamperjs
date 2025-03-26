import type { Node, Statement } from '@swc/core'

export interface VM {
	compile(
		code: string
	): Buffer<ArrayBufferLike> | Promise<Buffer<ArrayBufferLike>>
	compileAst(
		code: (Statement | Node)[]
	): Buffer<ArrayBufferLike> | Promise<Buffer<ArrayBufferLike>>
}
