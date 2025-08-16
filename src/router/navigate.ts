import type { RecordName, RouteToRecordRaw } from '@/types';
import type { ActionRecordRaw } from '@/types/action';
import type { RouteLocationRaw } from 'vue-router';
import type { TreeNode } from '@/utils/tree';

const actionStore = useActionStore();
const { actionTree } = storeToRefs(actionStore);

/**
 * 全局的路由导航方法
 * @param props 导航参数，允许以下几种类型：
 *  1. Key | RecordName 类型：
 *    首先会假定接受的是 Action 的 actionId 字段（也即 router 的 name 字段），查询 ActionTree 中是否有匹配的状态；
 *    如果没有匹配，则会假定参数为 fullPath 路径，调用 router.push 方法来导航。
 *  2. RouteToRecord 类型
 *    与 RouteLocationRaw 参数格式类似，接受一个描述地址的对象。
 */
export const routeTo = (props: RouteToRecordRaw) => {
  return new Promise<TreeNode<ActionRecordRaw>>((resolve, reject) => {
    let p;
    if (typeof props === 'object') {
      if (props.path) {
        router.push(props);
        return;
      } else {
        p = props.name!;
      }
    } else {
      p = props!;
    }
    const action = findAction(actionTree.value, p);
    if (!action) {
      router.push(p as string);
      // const err = `Router.navigate "routeTo": Cannot find action by id: ${String(actionId)}.`;
      // console.error(err);
      // reject(Error(err));
    } else if (action.type === MenuTypeEnum.MENU) {
      // 如果是菜单页面，则找寻其直系子节点，直到某一个子节点配置了可跳转的页面
      const descendant = findDescendantWithUrlDefined(action);
      if (descendant) {
        let dst;
        if (typeof props === 'object') {
          dst = { ...props, name: descendant.actionId as RecordName };
        } else {
          dst = descendant.actionId as RecordName;
        }
        resolve(routeTo(dst));
      } else {
        reject(Error(`Router.navigate "routeTo": Cannot find any descendants with 'url' attribute defined in the action with id: ${String(p)}.`));
      }
    } else {
      // 构建 Route
      let route: RouteLocationRaw;
      route = { name: action.actionId as RecordName };
      if (typeof props === 'object') {
        props.params && Object.assign(route, { params: props.params });
        props.query && Object.assign(route, { query: props.query });
      }
      router.push(route);
      resolve(action);
    }
  });
};
