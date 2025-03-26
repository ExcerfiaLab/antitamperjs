import { parseFile } from '@swc/core'
import { resolve } from 'node:path'

export async function parseAsset(
	name: string,
	section: 'analyzer' = 'analyzer'
) {
	const cwd = process.cwd()
	const path = resolve(cwd, 'src', '+test', '_assets', section, name)
	console.log(path)

	const parsed = await parseFile(path)
	return parsed
}
