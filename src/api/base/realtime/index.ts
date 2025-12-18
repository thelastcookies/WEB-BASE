// import type { BaseResponseBody, DescResponseBody, TagsRequestBody, ValueResponseBody } from '@/api/base/types';
//
// const isNativeMock = import.meta.env.APP_MOCK_ENABLE === 'local';
//
// export const getRealtime = (tags: string) => {
//   return usePost<BaseResponseBody<ValueResponseBody>, TagsRequestBody>(
//     `${BASE_URL}/RealTime/GetReal`,
//     { tags },
//   );
// };
//
// export const getDesc = (tags: string) => {
//   return usePost<BaseResponseBody<DescResponseBody>, TagsRequestBody>(
//     `${BASE_URL}/taos/describe`,
//     { tags },
//   );
// };
//
// /**
//  * 获取实时数据
//  * @param tags 测点，多个测点中间用|隔开
//  * @param decimal 小数位数，默认为undefined，即不作处理，用于规范返回数据的小数位数
//  */
// export const getRtData = async (tags: string[], decimal?: number) => {
//   // 测点去重去空
//   const tagSet = new Set(tags.filter(t => !!t));
//   const tagStr = [...tagSet].join('|');
//
//   let res: BaseResponseBody<ValueResponseBody>;
//
//   if (isNativeMock) {
//     res = {
//       code: 200,
//       data: {
//         // values: tags.map(_ => Math.random() * 100).join('|'),
//         values: tags.map(_ => round(Math.random())).join('|'),
//       },
//       msg: '',
//     };
//   } else {
//     res = await getRealtime(tagStr);
//   }
//
//   if (res.code !== 200 || !res.data) return;
//   let tagMap: Map<string, number> = new Map();
//   let dataList = res.data.values.split('|').map(item => Number(item));
//   tagStr.split('|').forEach((tag, idx) => {
//     let num = 0;
//     if (!isNaN(dataList[idx])) {
//       num = dataList[idx];
//       if (decimal) num = round(num, decimal);
//     }
//     tagMap.set(tag, num);
//   });
//   return tagMap;
// };
