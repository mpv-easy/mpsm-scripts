const fnVar = (t) =>
	t.variableDeclaration("var", [
		t.variableDeclarator(
			t.identifier("__"),
			t.functionExpression(null, [], t.blockStatement([])),
		),
	]);
module.exports = ({ types: t }) => ({
		visitor: {
			FunctionDeclaration(path) {
				path.node.body?.body?.unshift?.(fnVar(t));
			},
			ArrowFunctionExpression(path) {
				// path.node.body?.body?.unshift?.(fnVar(t))
			},
		},
	});
