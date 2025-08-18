// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss';
import presetThelastcookies from './preset';
import icons from './icons';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
    presetTypography(),
    presetThelastcookies(),
  ],
  transformers: [
    transformerDirectives(),
  ],
  safelist: [
    ...icons,
  ],
});
