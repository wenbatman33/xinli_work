const modules = require.context('./modules', true, /\.js$/i);

export default [...modules.keys().map(key => modules(key).default)];
