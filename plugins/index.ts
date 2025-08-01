import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { UnoCSSPluginConfig } from './unocss';
import { AutoImportPluginConfig } from './auto-import';
import { VueComponentPluginConfig } from './vue-component';
import { VisualizerPluginConfig } from './visualizer';

/**
 * 注入 vite 的插件
 * 目前包括：
 *  Vue
 *  VueJsx
 *  VueDevTools
 *  UnoCSS
 *  unplugin-auto-import
 *  unplugin-vue-components
 */
// vite.config.ts
export function createVitePlugins() {
  const vitePluginList: (PluginOption | PluginOption[])[] = [
    vue(),
    vueJsx(),
    UnoCSSPluginConfig,
    AutoImportPluginConfig,
    VueComponentPluginConfig,
    VisualizerPluginConfig,
    // BasicSslPluginConfig,
  ];
  return vitePluginList;
}
