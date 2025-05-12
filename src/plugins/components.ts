import type { App } from 'vue';
import components from './componentsConfig';

const registerGlobalComponents = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
};

export default registerGlobalComponents;
