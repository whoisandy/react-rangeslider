import 'es5-shim';

const context = require.context('.', true, /Spec\.js$/);
context.keys().forEach(context);
