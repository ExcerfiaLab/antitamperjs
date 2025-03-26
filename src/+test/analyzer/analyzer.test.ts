import { describe } from 'node:test'
import { expect, test } from 'vitest'
import { parseAsset } from '@/+test/utils/utils.parse'
import { Analyzer } from '@/ast/analyzer'

const parsedAsset = await parseAsset('analyzer_test1.js')
const analyzer = new Analyzer(parsedAsset)

const statements = Array.from(analyzer.analyze())

describe('Analyzer :: Statements', () => {
	test('Asset :: not null', () => {
		expect(parsedAsset).not.toBeNull()
	})

	test('Statements :: Nodes length must be 6', () => {
		expect(statements.length).toBe(6)
	})
})
