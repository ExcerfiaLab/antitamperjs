import { JsFnDecl } from '@/ast/codegen/node/fn/fn.class'
import { nanoid } from 'nanoid'

export function createV8Executor() {
	const executorName = nanoid(12).replace('-', '_')
	const fn = new JsFnDecl(executorName, false, false)
}
