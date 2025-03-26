import { transform, type Node, type Program, type Statement } from '@swc/core'

function transformModule(program: Program) {
	return transform(program, {
		jsc: {
			parser: {
				syntax: 'ecmascript',
				jsx: false
			},
			target: 'es2022',
			loose: false,
			minify: {
				compress: false,
				mangle: false
			}
		},
		module: {
			type: 'es6'
		},
		isModule: true
	})
}

export class CodegenUtil {
	static compile(ast: (Statement | Node)[]) {
		const program = {
			body: ast,
			span: {
				start: 1,
				end: 99999
			},
			interpreter: null!,
			type: 'Module'
		} as Program

		return transformModule(program)
	}

	static compileModule(program: Program) {
		return transformModule(program)
	}
}
