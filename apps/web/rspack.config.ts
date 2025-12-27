import { resolve } from "path";
import { rspack } from "@rspack/core";

export default {
	entry: {
		main: "./src/route.ts"
	},
	experiments: {
		css: true
	},
	externalsType: "commonjs",
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/],
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								decorators: true,
								syntax: "typescript"
							}
						}
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: "builtin:lightningcss-loader",
						options: {
							targets: ">0.5%"
						}
					}
				],
				type: "css/auto"
			}
		]
	},
	optimization: {
		splitChunks: {
			minSize: 0,
		}
	},
	output: {
		path: resolve(process.cwd(), "../../dist/public"),
		publicPath: "/a/"
	},
	performance: {
		maxAssetSize:      2000000,
		maxEntrypointSize: 2000000
	},
	plugins: [
		new rspack.HtmlRspackPlugin({
			template: "./src/index.html"
		})
	],
	resolve: {
		extensions: [".js", ".ts", ".json"]
	}
};
