import { CodegenUtil } from '@/ast/codegen'
import type { VM } from '@/vm/vm.api'
import type { Node, Statement } from '@swc/core'

import nodeVm from 'node:vm'

export class NodeVM implements VM {
	compile(code: string): Buffer<ArrayBufferLike> {
		const compiled = new nodeVm.Script(code, {
			produceCachedData: true
		})

		return compiled.cachedData ?? compiled.createCachedData()
	}

	async compileAst(
		code: (Statement | Node)[]
	): Promise<Buffer<ArrayBufferLike>> {
		const builded = await CodegenUtil.compile(code)

		const compiled = new nodeVm.Script(builded.code, {
			produceCachedData: true
		})

		return compiled.cachedData ?? compiled.createCachedData()
	}
}
