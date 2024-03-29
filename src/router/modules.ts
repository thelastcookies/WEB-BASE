/**
 * 将从接口中取到的路由配置的 component 字段进行校验与实际导入
 */
const modules = import.meta.glob([
    '@/views/**/*.vue',
    '@/views/**/*.tsx',
    '!@/views/common',
    '!@/views/**/component',
    '!@/views/**/test',
]);

export const basicRouteMap = {
    // iframe 模式下使用
    // Iframe: () => import('@/views/common/IFrame.vue'),
    // 一般用于存在子集的页面
    // RouteView: () => import('@/views/common/route-view.vue'),
    // 空页面
    ComponentError: () => import('@/views/exception/ComponentError.vue'),
};

const checkEager = (module: any) => {
    return typeof module === 'object' && 'default' in module ? module.default : module;
};

export const getRouterModule = (path?: string): any => {
    if (!path) {
        return basicRouteMap.ComponentError;
    }
    // 判断是否在 basicRouteMap 中存在
    if (path in basicRouteMap) {
        return (basicRouteMap as any)[path];
    }
    // 判断开头是不是/
    if (path.startsWith('/')) {
        path = path.slice(1);
    }
    // 组装页面路径
    const fullPath = `/src/views/${path}`;
    const fullPathIndex = `/src/views/${path}/index`;
    if (fullPath in modules) {
        return checkEager(modules[fullPath]);
    } else if (fullPathIndex in modules) {
        return checkEager(modules[fullPathIndex]);
    } else {
        return basicRouteMap.ComponentError;
    }
};

export default modules;
