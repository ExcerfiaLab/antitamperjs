import { parseAsset } from '@/+test/utils/utils.parse'
import { Analyzer } from '@/ast/analyzer'
import { StatementsCrawler } from '@/ast/analyzer/crawler'
import { WrappedFunctionDeclaration } from '@/ast/analyzer/decl/decl.function'
import { WrappedArrowFn } from '@/ast/analyzer/decl/declarator/declarator.arrow-fn'
import type { WrappedStatement } from '@/ast/api/api.statement'
import { describe } from 'node:test'
import { expect, test } from 'vitest'

const parsedAsset = await parseAsset('analyzer_test3_absurd.js')
const analyzer = new Analyzer(parsedAsset)

const statements = Array.from(analyzer.analyze())

describe('Statements :: Fn (Heavy)', () => {
	const fnStmts = Array.from(
		StatementsCrawler.crawl(
			statements as WrappedStatement[],
			WrappedFunctionDeclaration
		)
	)

	const deepFnStmts = Array.from(
		StatementsCrawler.deepCrawl(
			statements as WrappedStatement[],
			WrappedArrowFn
		)
	)

	test('Top Level Fn', () => {
		expect(fnStmts.length).toBe(1)
	})

	test('Deep Level Fn Crawler', () => {
		expect(deepFnStmts.length).toBe(1)
	})
})
