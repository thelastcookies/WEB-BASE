export const getRealtime = (tags: string) => {
  return usePost<AdminResponseBody<ValueResponseBody>, TagsRequestBody>(
    `${ADMIN_URL}/RealTime/GetReal`,
    { tags },
  );
};

export const getDesc = (tags: string) => {
  return usePost<BaseResponseBody<DescResponseBody>, TagsRequestBody>(
    `${BASE_URL}/taos/describe`,
    { tags },
  );
};

export const getRtData = async (tags: string[], decimal?: number) => {
  // 测点去重去空
  const tagSet = new Set(tags.filter(t => !!t));
  const tagStr = [...tagSet].join('|');

  /**
   * mock start
   */
  // const res = {
  //   data: {
  //     // values: tags.map(_ => Math.random() * 100).join('|'),
  //     values: tags.map(_ => round(Math.random())).join('|'),
  //   },
  // }
  /**
   * mock end
   */

  const res = await getRealtime(tagStr);
  if (!res.Success || !res.Data) return;

  let tagMap: Map<string, number> = new Map();
  let dataList = res.Data.values.split('|').map(item => Number(item));
  tagStr.split('|').forEach((tag, idx) => {
    let num = 0;
    if (!isNaN(dataList[idx])) {
      num = dataList[idx];
      if (decimal) num = round(num, decimal);
    }
    tagMap.set(tag, num);
  });
  return tagMap;
};
