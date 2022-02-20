import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const requireContext = require.context('./modules', false, /.*\.js$/);

const modules = requireContext
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
  .reduce((moduleList, [name, module]) => {
    const m = module.default || module;
    const n = module.moduleName || m.moduleName || name;

    if (m.namespaced === undefined) {
      m.namespaced = true;
    }

    return { ...moduleList, [n]: m };
  }, {});

export default new Vuex.Store({
  modules,
});
