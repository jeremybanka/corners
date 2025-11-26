// @ts-check

import NextPlugin from "@next/eslint-plugin-next"
import TypeScriptPlugin from "@typescript-eslint/eslint-plugin"
import parser from "@typescript-eslint/parser"
import ImportPlugin from "eslint-plugin-import"
import SimpleImportSortPlugin from "eslint-plugin-simple-import-sort"


const ERROR = 2

/** @type {import("@typescript-eslint/parser").ParserOptions} */
const parserOptions = {
	project: [`./tsconfig.json`],
	sourceType: `module`,
}

/** @type {import("eslint").Linter.Config["rules"]} */
const commonRules = {
	"@typescript-eslint/adjacent-overload-signatures": ERROR,
	"@typescript-eslint/array-type": 0,
	"@typescript-eslint/await-thenable": 0,
	"@typescript-eslint/ban-ts-comment": ERROR,
	"@typescript-eslint/ban-tslint-comment": 0,
	"@typescript-eslint/class-literal-property-style": ERROR,
	"@typescript-eslint/consistent-generic-constructors": 0,
	"@typescript-eslint/consistent-indexed-object-style": 0,
	"@typescript-eslint/consistent-return": 0,
	"@typescript-eslint/consistent-type-assertions": 0,
	"@typescript-eslint/consistent-type-definitions": 0,
	"@typescript-eslint/consistent-type-exports": ERROR,
	"@typescript-eslint/consistent-type-imports": [
		ERROR,
		{
			fixStyle: `separate-type-imports`,
			prefer: `type-imports`,
		},
	],
	"@typescript-eslint/default-param-last": ERROR,
	"@typescript-eslint/dot-notation": 0,
	"@typescript-eslint/explicit-function-return-type": 0,
	"@typescript-eslint/explicit-member-accessibility": ERROR,
	"@typescript-eslint/explicit-module-boundary-types": ERROR,
	"@typescript-eslint/init-declarations": 0,
	"@typescript-eslint/max-params": 0,
	"@typescript-eslint/member-ordering": 0,
	"@typescript-eslint/method-signature-style": 0,
	"@typescript-eslint/naming-convention": [
		0,
		{
			selector: `variable`,
			format: [`strictCamelCase`, `StrictPascalCase`, `UPPER_CASE`],
			leadingUnderscore: `allow`,
			trailingUnderscore: `allow`,
		},
	],
	"@typescript-eslint/no-array-constructor": ERROR,
	"@typescript-eslint/no-array-delete": ERROR,
	"@typescript-eslint/no-base-to-string": ERROR,
	"@typescript-eslint/no-confusing-non-null-assertion": ERROR,
	"@typescript-eslint/no-confusing-void-expression": ERROR,
	"@typescript-eslint/no-duplicate-enum-values": ERROR,
	"@typescript-eslint/no-duplicate-type-constituents": ERROR,
	"@typescript-eslint/no-dynamic-delete": ERROR,
	"@typescript-eslint/no-empty-function": 0,
	"@typescript-eslint/no-empty-interface": ERROR,
	"@typescript-eslint/no-explicit-any": 0,
	"@typescript-eslint/no-extra-non-null-assertion": ERROR,
	"@typescript-eslint/no-extraneous-class": 0,
	"@typescript-eslint/no-floating-promises": ERROR,
	"@typescript-eslint/no-for-in-array": ERROR,
	"@typescript-eslint/no-implied-eval": ERROR,
	"@typescript-eslint/no-import-type-side-effects": ERROR,
	"@typescript-eslint/no-inferrable-types": ERROR,
	"@typescript-eslint/no-invalid-void-type": 0, // void is good in unions sometimes?
	"@typescript-eslint/no-loop-func": 0,
	"@typescript-eslint/no-loss-of-precision": ERROR,
	"@typescript-eslint/no-magic-numbers": 0,
	"@typescript-eslint/no-meaningless-void-operator": ERROR,
	"@typescript-eslint/no-misused-new": ERROR,
	"@typescript-eslint/no-misused-promises": 0,
	"@typescript-eslint/no-mixed-enums": ERROR,
	"@typescript-eslint/no-namespace": ERROR,
	"@typescript-eslint/no-non-null-asserted-nullish-coalescing": ERROR,
	"@typescript-eslint/no-non-null-asserted-optional-chain": ERROR,
	"@typescript-eslint/no-non-null-assertion": 0,
	"@typescript-eslint/no-redundant-type-constituents": ERROR,
	"@typescript-eslint/no-require-imports": ERROR,
	"@typescript-eslint/no-restricted-imports": 0,
	"@typescript-eslint/no-shadow": ERROR,
	"@typescript-eslint/no-this-alias": ERROR,
	"@typescript-eslint/no-throw-literal": 0,
	"@typescript-eslint/no-unnecessary-boolean-literal-compare": 0,
	"@typescript-eslint/no-unnecessary-condition": 0,
	"@typescript-eslint/no-unnecessary-qualifier": 0,
	"@typescript-eslint/no-unnecessary-type-arguments": 0,
	"@typescript-eslint/no-unnecessary-type-assertion": ERROR,
	"@typescript-eslint/no-unnecessary-type-constraint": ERROR,
	"@typescript-eslint/no-unsafe-argument": 0,
	"@typescript-eslint/no-unsafe-assignment": 0,
	"@typescript-eslint/no-unsafe-call": 0,
	"@typescript-eslint/no-unsafe-member-access": 0,
	"@typescript-eslint/no-unsafe-return": 0,
	"@typescript-eslint/no-unsafe-unary-minus": ERROR,
	"@typescript-eslint/no-unused-expressions": 0,
	"@typescript-eslint/no-unused-vars": 0,
	"@typescript-eslint/no-use-before-define": 0,
	"@typescript-eslint/no-useless-constructor": ERROR,
	"@typescript-eslint/no-useless-empty-export": ERROR,
	"@typescript-eslint/no-var-requires": ERROR,
	"@typescript-eslint/non-nullable-type-assertion-style": 0,
	"@typescript-eslint/parameter-properties": 0,
	"@typescript-eslint/prefer-as-const": ERROR,
	"@typescript-eslint/prefer-destructuring": 0,
	"@typescript-eslint/prefer-enum-initializers": ERROR,
	"@typescript-eslint/prefer-find": ERROR,
	"@typescript-eslint/prefer-for-of": ERROR,
	"@typescript-eslint/prefer-function-type": ERROR,
	"@typescript-eslint/prefer-includes": ERROR,
	"@typescript-eslint/prefer-literal-enum-member": ERROR,
	"@typescript-eslint/prefer-namespace-keyword": ERROR,
	"@typescript-eslint/prefer-nullish-coalescing": ERROR,
	"@typescript-eslint/prefer-optional-chain": ERROR,
	"@typescript-eslint/prefer-promise-reject-errors": 0,
	"@typescript-eslint/prefer-readonly": 0,
	"@typescript-eslint/prefer-readonly-parameter-types": 0,
	"@typescript-eslint/prefer-reduce-type-parameter": 0,
	"@typescript-eslint/prefer-regexp-exec": 0,
	"@typescript-eslint/prefer-return-this-type": ERROR,
	"@typescript-eslint/prefer-string-starts-ends-with": ERROR,
	"@typescript-eslint/prefer-ts-expect-error": ERROR,
	"@typescript-eslint/promise-function-async": 0,
	"@typescript-eslint/require-array-sort-compare": 0,
	"@typescript-eslint/require-await": ERROR,
	"@typescript-eslint/restrict-plus-operands": ERROR,
	"@typescript-eslint/restrict-template-expressions": ERROR,
	"@typescript-eslint/return-await": ERROR,
	"@typescript-eslint/sort-type-constituents": ERROR,
	"@typescript-eslint/strict-boolean-expressions": 0,
	"@typescript-eslint/switch-exhaustiveness-check": 0,
	"@typescript-eslint/triple-slash-reference": ERROR,
	"@typescript-eslint/typedef": 0,
	"@typescript-eslint/unbound-method": 0,
	"@typescript-eslint/unified-signatures": ERROR,

	"import/no-duplicates": ERROR,

	"simple-import-sort/imports": ERROR,
	"simple-import-sort/exports": ERROR,

	"no-mixed-spaces-and-tabs": 0,
	quotes: [ERROR, `backtick`],
}

/** @type {(import("eslint").Linter.Config)[]} */
const configs = [
	{
		ignores: [
			`**/_shared/**`,
			`**/build/**`,
			`**/coverage/**`,
			`**/dist/**`,
			`**/gen/**`,
			`**/exhibits-wrapped/**`,
			`**/node_modules/**`,
			`**/next-env.d.ts`,
		],
	},
{
		languageOptions: { parser, parserOptions },
		files: [`**/*.ts{,x}`, `eslint.config.js`],
		plugins: {
			"@typescript-eslint": TypeScriptPlugin,
			import: ImportPlugin,
			"simple-import-sort": SimpleImportSortPlugin,
		},
		rules: commonRules,
	},
	{
		files: [`apps/cornersjs.org/**/*.ts{,x}`],
		ignores: [`**/*.gen.tsx`, `**/dist/**`, `**/node_modules/**`, `**/exhibits-wrapped/**`],
		plugins: { "@next/next": NextPlugin },
		rules: {
			...NextPlugin.configs.recommended.rules,
			...NextPlugin.configs[`core-web-vitals`].rules,
			"@next/next/no-duplicate-head": 0,
			"@next/next/no-page-custom-font": 0,
		},
		settings: { next: { rootDir: `apps/cornersjs.org/` } },
	},
]

export default configs
