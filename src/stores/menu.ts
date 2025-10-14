import type { MenuTreeNode } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { TreeNode } from '@/utils/tree';

export const useMenuStore = defineStore('menu', () => {
  const menu = ref<MenuTreeNode[]>([]);

  const actionToMenu = (tree: TreeNode<ActionRecordRaw>[]): MenuTreeNode[] => {
    let menuTree: MenuTreeNode[] = [];
    const treeSorted = tree.sort((a, b) => (a.sort || Infinity) - (b.sort || Infinity));
    for (const item of treeSorted) {
      if (item.showInMenu === false) continue;
      let menuNode: MenuTreeNode = {
        key: item.actionId ?? item.id ?? '',
        label: item.title ?? String(item.actionId) ?? String(item.id) ?? '',
        title: item.title,
      };
      if ('icon' in item) {
        menuNode.icon = item.icon;
      }
      // 带入路由元数据
      if ('meta' in item) {
        menuNode.meta = item.meta;
      }
      if (
        'children' in item
        && item.children
        && item.children.filter((menu: TreeNode<ActionRecordRaw>,
        ) => menu.showInMenu === true).length > 0) {
        menuNode.children = actionToMenu(item.children);
      }
      menuTree.push(menuNode);
    }
    return menuTree;
  };

  return {
    menu,
    actionToMenu,
  };
});
