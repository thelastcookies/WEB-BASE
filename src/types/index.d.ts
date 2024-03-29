import {VNodeChild} from "vue";
import type {MenuPageType, ShowInMenuType} from "@/types/enums";

export type Key = string | number;

interface CommonItem {
    id: string,
    name: string,
}
interface ListItem extends CommonItem {
    pId: string,
}

interface TreeNode extends ListItem {
    children?: Array<TreeNode>
}


/**
 * 由接口获取的 Action 信息
 * 为构建路由、菜单、面包屑和 Tab 内容的基本数据
 */
export interface ActionItem {
    // 路由 id
    id?: Key;
    // 父级 id
    pId?: Key;
    // 路由短 id，与 id 职能相同，实践中一般使用该值来标识路由项
    menuId?: Key;
    // 路由配置的中文描述
    title?: string;
    // 路由配置的类型
    type?: MenuPageType;
    // 路由配置的 url，具体含义要结合 type 属性
    url?: string;
    // 路由配置的icon，一般用于第一级菜单
    icon?: string;
    // 是否为固定页签
    affix?: boolean;
    // 组件配置
    component?: string;
    // 排序
    sort?: number;
    // 是否 KeepAlive
    keepAlive?: boolean
    // 配置携带的默认查询参数
    query?: object;
    // 该配置项是否在系统中展示
    showInMenu?: ShowInMenuType;
    // 子节点
    children?: ActionItem[];
}

export interface RouteToInfo {
    id: Key,
    title?: string,
    type?: string,
    query?: Object
}

/**
 * 用于 Antdv 菜单
 */
export interface MenuTreeNode {
    key: Key;
    label: string;
    title?: string;
    icon?: string | (() => VNodeChild);
    disabled?: boolean;
    showInMenu?: ShowInMenuType;
    children?: MenuTreeNode[];
}
