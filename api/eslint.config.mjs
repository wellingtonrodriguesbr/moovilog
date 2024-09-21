import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.js", "**/*.ts"],
		rules: {
			"quotes": ["error", "double"],
			"semi": ["error", "always"],
			"indent": ["error", "tab"],
			"object-curly-spacing": ["error", "always"],
			"comma-dangle": ["error", "always-multiline"],
		},
	},
];
