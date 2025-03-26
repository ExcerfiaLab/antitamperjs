import 'dotenv/config'

import consola, { LogLevels } from 'consola'
import { stat, readFile } from 'node:fs/promises'
import { AntiTamper } from '@/tamper'
import type { TamperTarget } from '@/types/enum/enum.target'

consola.level = LogLevels.debug

async function boot() {
	consola.info('Booting AntiTamperJS v1.0')

	const path = await consola.prompt('Enter path to .js file:', {
		type: 'text'
	})

	const fileStat = await stat(path)
	if (!fileStat || !fileStat.isFile()) {
		return consola.error(`File ${path} does not exist`)
	}

	const target = await consola.prompt('Enter your target: ', {
		default: 'node',
		options: ['node', 'browser'],
		type: 'select',
		initial: 'node'
	})

	const text = await readFile(path, 'utf-8')
	const antiTamper = new AntiTamper(text, target as TamperTarget)

	antiTamper.execute()
}

boot()
