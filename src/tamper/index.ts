import consola from 'consola'

import { parse, type Statement } from '@swc/core'
import { Analyzer } from '../ast/analyzer'
import { Transformer } from '@/tamper/transformer'
import type { WrappedStatement } from '@/ast/api/api.statement'
import { writeFile } from 'node:fs'
import type { TamperTarget } from '@/types/enum/enum.target'
import { SourceHelper } from '@/tamper/source'

export class AntiTamper {
	constructor(
		private readonly code: string,
		private readonly target: TamperTarget
	) {}

	async execute() {
		const parsed = await parse(this.code)

		const analyzer = new Analyzer(parsed)
		const wrappedStatements = Array.from(
			analyzer.analyze()
		) as WrappedStatement<Statement>[]

		const transformer = new Transformer(
			wrappedStatements,
			this.target,
			new SourceHelper(this.code)
		)
		const transformed = await transformer.transform()

		writeFile('out.js', transformed.code, () => {})

		consola.success('Transformed!')
	}
}
