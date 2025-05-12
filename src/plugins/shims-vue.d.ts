import components from './componentsConfig';

type GlobalComponentsType = {
  [K in keyof typeof components]: (typeof components)[K];
};

declare module '@vue/runtime-core' {
  export interface GlobalComponents extends GlobalComponentsType {}
}

export {};
