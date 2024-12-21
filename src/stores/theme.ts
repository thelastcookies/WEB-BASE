import 'dayjs/locale/zh-cn';
import { theme } from 'ant-design-vue';
import { darkToken, defaultToken } from '@/assets/theme/design-token.ts';
import type { Handler } from 'mitt';

export const useThemeStore = defineStore('theme', () => {
  // 语言环境，为 Antdv 初始化
  dayjs.locale('zh-cn');

  // 主题配色模式
  const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const isDarkTheme = ref(darkModeMediaQuery.matches);
  const emitter = mitt();

  const themeModeChange = (e: MediaQueryListEvent) => {
    isDarkTheme.value = e.matches;
    emitter.emit(THEME_CHANGE_KEY, isDarkTheme.value);
    console.log(isDarkTheme.value ? '🌒 深色模式开启' : '🌖 浅色模式开启');
  };

  const themeAlgorithm = computed(() => {
    return isDarkTheme.value ? theme.darkAlgorithm : theme.defaultAlgorithm;
  });

  const designToken = computed(() => {
    return isDarkTheme.value ? darkToken : defaultToken;
  });

  darkModeMediaQuery.addEventListener('change', themeModeChange);

  tryOnUnmounted(() => {
    darkModeMediaQuery.removeEventListener('change', themeModeChange);
  });

  const listenThemeChange = (
    handler: (isDark: Boolean) => void,
    immediate = true,
  ) => {
    emitter.on(THEME_CHANGE_KEY, handler as Handler);
    if (immediate && isDarkTheme.value) {
      handler(isDarkTheme.value);
    }
  };

  const removeThemeListener = () => {
    emitter.off(THEME_CHANGE_KEY);
  };

  return { isDarkTheme, designToken, themeAlgorithm, listenThemeChange, removeThemeListener };
});
