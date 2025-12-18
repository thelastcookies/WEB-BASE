/**
 * 数据的定时刷新方法，会在mounted之后先执行一次
 * @param handler 需要定时刷新的方法
 * @param interval 定时，默认为30秒
 */
export const useTimedRefresh = (
  handler: Function,
  interval: number = 2000,
) => {
  const { pause, resume, isActive } = useIntervalFn(() => {
    handler();
  }, interval, {
    immediateCallback: true,
  });

  tryOnUnmounted(() => {
    pause();
  });

  return { pause, resume, isActive };
};
