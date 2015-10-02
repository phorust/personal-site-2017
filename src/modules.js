/**
 * CommonJS's building with grunt/gulp is overkill and annoying for this tiny
 * project. AMD is a disgusting mess let's be honest.
 *
 * Let's roll our own. The syntatic sugar compiles to basically this anyway.
 * Any circular dependencies will be a problem...
 */

var _modules = {};

function exports(moduleName, props) {
  _modules[moduleName] = props;
}

window.module = {
  exports
};
window.modules = _modules;
