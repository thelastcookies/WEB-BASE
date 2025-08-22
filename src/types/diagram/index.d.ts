import type { DiagramAttr } from '@/types/diagram/attr';
import type { DiagramStyle } from '@/types/diagram/style';

export interface XYPoint {
  x: number;
  y: number;
}

export interface DiagramJson {
  v: string;
  p: DiagramPage;
  d: DiagramData[];
}

export interface DiagramPage {
  layers: (string | number)[];
  autoAdjustIndex: boolean;
  hierarchicalRendering: boolean;
}

export interface DiagramData {
  // 类型
  c: 'ht.Text' | 'ht.Node' | 'ht.Edge' | 'ht.Shape';
  // id
  i: number;
  // 原生属性
  p: DiagramBasic;
  // 原生样式
  s: DiagramStyle,
  // attr 属性，多用于自定义的扩展属性
  a?: DiagramAttr
}

export interface DiagramDataWithPosition extends DiagramData {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  angle?: number;
}

export interface DiagramBasic {
  // 名称，对应实际的图元
  name: string;
  // 图层
  layer: number;
  // 图元链接
  image?: string;
  // 位置
  position: XYPoint;
  // 旋转
  rotation: number;
  // 宽高
  width: number;
  height: number;
  points?: {
    __a: XYPoint[];
  };
  // 宿主节点，忽略
  host?: {
    __i: number;
  };
  // 源节点，Edge
  source?: {
    __i: number;
  };
  // 目标节点，Edge
  target?: {
    __i: number;
  };
}

export type GraphType = 'text' | 'static' | 'shape' | 'table' | 'switch' | 'value' | 'button' | 'ctmp' | 'CB';

export interface GraphConfig {
  name: string;
  type: GraphType;
  image?: string;
  images?: string[];
}

export interface NodeGraph extends GraphConfig {
  src: string;
}

export type NodeValue = boolean | number | [boolean, boolean] | [number, number] | boolean[] | number[];
