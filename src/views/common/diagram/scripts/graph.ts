import type { DiagramData, GraphConfig, NodeGraph } from '@/types/diagram';

const url = import.meta.env.APP_DIAGRAM_RESOURCE_URL + '/';

const graphConfig: GraphConfig[] = [
  { name: '数据绑定', type: 'text' },
  { name: '告警变色', type: 'text' },
  { name: '显示隐藏', type: 'text' },
  { name: '光字牌', type: 'switch' },
  { name: '表格', type: 'table' },
  { name: '按钮', type: 'button' },
  { name: '进度条', type: 'value' },
  { name: '刻度线', type: 'static', image: 'symbols/basic/刻度线.svg' },
  { name: '辅助点', type: 'static', image: 'symbols/lines/辅助点.svg' },
  { name: '线路接合点', type: 'static', image: 'symbols/lines/线路接合点.svg' },
  { name: '线路交叉点', type: 'static', image: 'symbols/lines/线路交叉点.svg' },
  { name: '箭头', type: 'static', image: 'symbols/lines/箭头.svg' },

  { name: '1/4圆弧', type: 'shape' },
  { name: '1/2圆弧', type: 'shape' },
  { name: '3/4圆弧', type: 'shape' },
  { name: '圆形', type: 'shape' },
  { name: '圆角矩形', type: 'shape' },
  { name: '矩形', type: 'shape' },
  { name: '三角形', type: 'shape' },
  { name: '梯形', type: 'shape' },

  {
    name: '开关', type: 'switch',
    images: [
      'symbols/new-energy/开关-variant1.svg',
      'symbols/new-energy/开关-variant2.svg',
    ],
  },
  {
    name: '手车', type: 'switch',
    images: [
      'symbols/new-energy/手车-variant1.svg',
      'symbols/new-energy/手车-variant2.svg',
    ],
  },
  {
    name: '断路器', type: 'switch',
    images: [
      'symbols/new-energy/断路器-variant1.svg',
      'symbols/new-energy/断路器-variant2.svg',
    ],
  },
  {
    name: '断路器（双测点）', type: 'ctmp',
    images: [
      'symbols/new-energy/断路器（双测点）-variant1.svg',
      'symbols/new-energy/断路器（双测点）-variant2.svg',
      'symbols/new-energy/断路器（双测点）-variant3.svg',
      'symbols/new-energy/断路器（双测点）-variant1.svg',
    ],
  },
  {
    name: '断路器组合', type: 'CB',
    images: [ // 00 01 10 11
      'symbols/new-energy/断路器组合-variant1.svg',
      'symbols/new-energy/断路器组合-variant2.svg',
      'symbols/new-energy/断路器组合-variant3.svg',
      'symbols/new-energy/断路器组合-variant4.svg',
    ],
  },
  {
    name: '接地开关', type: 'switch',
    images: [
      'symbols/new-energy/接地开关-variant1.svg',
      'symbols/new-energy/接地开关-variant2.svg',
    ],
  },
  {
    name: '信号', type: 'switch',
    images: [
      'symbols/new-energy/信号-variant1.svg',
      'symbols/new-energy/信号-variant2.svg',
    ],
  },
  {
    name: '网络信号', type: 'switch',
    images: [
      'symbols/new-energy/网络信号-variant1.svg',
      'symbols/new-energy/网络信号-variant2.svg',
    ],
  },
  {
    name: '旋钮开关', type: 'switch',
    images: [
      'symbols/new-energy/旋钮开关-variant1.svg',
      'symbols/new-energy/旋钮开关-variant2.svg',
    ],
  },
  {
    name: '远方就地信号', type: 'switch',
    images: [
      'symbols/new-energy/远方就地信号-variant1.svg',
      'symbols/new-energy/远方就地信号-variant2.svg',
    ],
  },
  {
    name: '运行状态信号', type: 'switch',
    images: [
      'symbols/new-energy/运行状态信号-variant1.svg',
      'symbols/new-energy/运行状态信号-variant2.svg',
    ],
  },
  {
    name: '风机状态信号', type: 'switch',
    images: [
      'symbols/new-energy/风机状态信号-variant1.svg',
      'symbols/new-energy/风机状态信号-variant2.svg',
    ],
  },
  {
    name: '运行方式信号', type: 'switch',
    images: [
      'symbols/new-energy/运行方式信号-variant1.svg',
      'symbols/new-energy/运行方式信号-variant2.svg',
    ],
  },

  { name: '负载', type: 'static', image: 'symbols/new-energy/static/负载.svg' },
  { name: '二极管', type: 'static', image: 'symbols/new-energy/static/二极管.svg' },
  { name: '电缆', type: 'static', image: 'symbols/new-energy/static/电缆.svg' },
  { name: '接地', type: 'static', image: 'symbols/new-energy/static/接地.svg' },
  {
    name: '电抗', type: 'static', images: [
      'symbols/new-energy/static/电抗-variant1.svg',
      'symbols/new-energy/static/电抗-variant2.svg',
    ],
  },
  { name: '放电间隙', type: 'static', image: 'symbols/new-energy/static/放电间隙.svg' },
  { name: '接地放电间隙', type: 'static', image: 'symbols/new-energy/static/接地放电间隙.svg' },
  { name: '避雷器', type: 'static', image: 'symbols/new-energy/static/避雷器.svg' },
  { name: '接地避雷器', type: 'static', image: 'symbols/new-energy/static/接地避雷器.svg' },
  { name: '熔断器', type: 'static', image: 'symbols/new-energy/static/熔断器.svg' },
  { name: '线圈', type: 'static', image: 'symbols/new-energy/static/线圈.svg' },
  { name: '消弧线圈', type: 'static', image: 'symbols/new-energy/static/消弧线圈.svg' },
  { name: '电阻', type: 'static', image: 'symbols/new-energy/static/电阻.svg' },
  { name: '电流互感器', type: 'static', image: 'symbols/new-energy/static/电流互感器.svg' },
  { name: '接地电流互感器', type: 'static', image: 'symbols/new-energy/static/接地电流互感器.svg' },
  { name: '接地线圈互感器', type: 'static', image: 'symbols/new-energy/static/接地线圈互感器.svg' },
  { name: '带电显示器', type: 'static', image: 'symbols/new-energy/static/带电显示器.svg' },
  { name: '接地电阻', type: 'static', image: 'symbols/new-energy/static/接地电阻.svg' },
  { name: '接地电阻2', type: 'static', image: 'symbols/new-energy/static/接地电阻2.svg' },
  { name: 'IGBT', type: 'static', image: 'symbols/new-energy/static/IGBT.svg' },

  { name: '交流发电机', type: 'static', image: 'symbols/new-energy/static/交流发电机.svg' },
  { name: '星型变压器', type: 'static', image: 'symbols/new-energy/static/星型变压器.svg' },
  { name: '三角变压器', type: 'static', image: 'symbols/new-energy/static/三角变压器.svg' },
  { name: '接地变压器', type: 'static', image: 'symbols/new-energy/static/接地变压器.svg' },
  { name: '分接开关星型变压器', type: 'static', image: 'symbols/new-energy/static/分接开关星型变压器.svg' },
  { name: '开口三角变压器', type: 'static', image: 'symbols/new-energy/static/开口三角变压器.svg' },
  { name: '单绕组变压器', type: 'static', image: 'symbols/new-energy/static/单绕组变压器.svg' },
  { name: '双绕组变压器', type: 'static', image: 'symbols/new-energy/static/双绕组变压器.svg' },
  { name: '三绕组变压器', type: 'static', image: 'symbols/new-energy/static/三绕组变压器.svg' },
  { name: '四绕组变压器', type: 'static', image: 'symbols/new-energy/static/四绕组变压器.svg' },
  { name: '变压器常用接法', type: 'static', image: 'symbols/new-energy/static/变压器常用接法.svg' },
  { name: '变压器常用接法2', type: 'static', image: 'symbols/new-energy/static/变压器常用接法2.svg' },
  { name: '取样变压器', type: 'static', image: 'symbols/new-energy/static/取样变压器.svg' },

  { name: '逆变器', type: 'static', image: 'symbols/new-energy/static/逆变器.svg' },
  { name: '电压取样柜', type: 'static', image: 'symbols/new-energy/static/电压取样柜.svg' },
  { name: '电容器', type: 'static', image: 'symbols/new-energy/static/电容器.svg' },
  { name: '电容器组', type: 'static', image: 'symbols/new-energy/static/电容器组.svg' },
  { name: '动态无功补偿', type: 'static', image: 'symbols/new-energy/static/动态无功补偿.svg' },
  { name: '燃机发电机', type: 'static', image: 'symbols/new-energy/static/燃机发电机.svg' },
  { name: '蓄电池组', type: 'static', image: 'symbols/new-energy/static/蓄电池组.svg' },
  { name: '静态开关模件', type: 'static', image: 'symbols/new-energy/static/静态开关模件.svg' },
  { name: '调压稳压器', type: 'static', image: 'symbols/new-energy/static/调压稳压器.svg' },
  { name: '风机模型', type: 'static', image: 'symbols/new-energy/static/风机模型.svg' },

  // 火电
  { name: '脱硝反应器', type: 'static', image: 'symbols/thermal-power/static/脱硝反应器.svg' },
];

export const graphMap: Map<string, GraphConfig> = new Map(graphConfig.map(item => [item.name, item]));

export const getNodeGraph = (d: DiagramData, map?: Map<string, number>): NodeGraph | GraphConfig => {
  const graph = graphMap.get(d.p.name)!;
  if (graph?.image) {
    return { ...graph, src: url + graph.image };
  } else if (graph?.images) {
    if (graph.type === 'switch') {
      const tag = d.a?.['node.tag'] ?? null;
      let v = tag ? getTagValue(tag, map) : 1;
      const reverse = d.a?.['node.type.switch.reverse'] ?? false;
      if (reverse) v = v ^ 1;
      return { ...graph, src: url + graph.images![v] };
    } else if (graph.type === 'ctmp' || graph.type === 'CB') {
      // 断路器组合与双合分测点
      const tag1 = d.a?.['node.tag.cmp'] ?? d.a?.['node.tag.CB'] ?? null;
      const tag2 = d.a?.['node.tag.tmp'] ?? d.a?.['node.tag.drawout'] ?? null;
      let v1 = tag1 ? getTagValue(tag1, map) : 1;
      let v2 = tag2 ? getTagValue(tag2, map) : 1;
      let v = parseInt('' + v1 + v2, 2);
      return { ...graph, src: url + graph.images![v] };
    } else if (graph.type === 'static') {
      // 静态图元最后处理
      if (d.a?.['node.direction']) {
        // 上右下左
        const dAttr = d.a['node.direction'];
        const i = dAttr === 'up' ? 0 : dAttr === 'right' ? 1 : dAttr === 'down' ? 2 : dAttr === 'left' ? 3 : 0;
        return { ...graph, src: url + graph.images[i] };
      } else if (d.a?.['node.direction.vertical']) {
        // 上下
        const dAttr = d.a['node.direction.vertical'];
        const i = dAttr === 'up' ? 0 : dAttr === 'down' ? 1 : 0;
        return { ...graph, src: url + graph.images[i] };
      } else if (d.a?.['node.direction.horizontal']) {
        // 右左
        const dAttr = d.a['node.direction.horizontal'];
        const i = dAttr === 'right' ? 0 : dAttr === 'left' ? 1 : 0;
        return { ...graph, src: url + graph.images[i] };
      }
    }
    return { ...graph, src: url + graph.images[0] };
  } else {
    return graph;
  }
};

const getTagValue = (tag: string, map?: Map<string, number>) => {
  let num = map?.get(tag) ?? 1;
  return Number.isInteger(num) ? num : 1;
};
