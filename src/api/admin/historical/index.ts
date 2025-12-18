export const getTrend = (data: TagTimeRequestBody) => {
  return usePost<AdminResponseBody<ValueResponseBody>, TagTimeRequestBody>(
    `${ADMIN_URL}/RealTime/GetInterp`,
    data,
  );
};

export interface TrendTagValueItem {
  tag: string;
  value: number;
}

export interface TrendTimeValueItem {
  time: string;
  value: number;
}

export interface TrendTimeTag {
  time: string;
  tagValue: TrendTagValueItem[];
}

export interface TrendTagTime {
  tag: string;
  timeValue: TrendTimeValueItem[];
}

export const getTrendData = async (
  {
    tags,
    st,
    ed = dayjs(),
    interval = 60,
    type = HisDataType.TAG_ARR,
    decimal,
  }: HisTagParams,
) => {
  let stStr = st.format('YYYYMMDDHHmmss');
  let edStr = ed.format('YYYYMMDDHHmmss');

  /**
   * mock start
   */
  // const len = Math.floor(((ed?.valueOf() - st.valueOf()) / interval) / 1000);
  // const res = {
  //   data: {
  //     values: tags.split('|').map(_ => Array.from(new Array(len + 1), () => round((Math.pow(Math.random(), 10)) * 80), 2).join(';')).join('|'),
  //   },
  // };
  /**
   * mock end
   */

  const res = await getTrend({
    tags,
    time: stStr + '-' + edStr,
    interval,
  });
  if (!res.Success || !res.Data) return;
  let tagValueArr = res.Data.values.split('|').map(item => item.split(';'));
  let timeArr: string[] = [];
  for (
    let time = dayjs(st);
    dayjs(time).isSameOrBefore(ed);
    time = time.add(interval, 's')
  ) {
    timeArr.push(time.format('YYYY-MM-DD HH:mm:ss'));
  }
  if (type === HisDataType.TAG) {
    let tagMap: Map<string, Map<string, number>> = new Map();
    tags.split('|').forEach((tag, idx) => {
      let timeValueMap: Map<string, number> = new Map();
      timeArr.forEach((time, tIdx) => {
        let num = 0;
        if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
          num = Number(tagValueArr[idx][tIdx]);
          if (decimal) num = round(num, decimal);
        }
        timeValueMap.set(time, num);
      });
      tagMap.set(tag, timeValueMap);
    });
    return tagMap;
  } else if (type === HisDataType.TAG_ARR) {
    return tags.split('|').map((tag, idx): TrendTagTime => {
      return {
        tag: tag,
        timeValue: timeArr.map((time, tIdx): TrendTimeValueItem => {
          let num = 0;
          if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
            num = Number(tagValueArr[idx][tIdx]);
            if (decimal) num = round(num, decimal);
          }
          return {
            time,
            value: num,
          };
        }),
      };
    });
  } else if (type === HisDataType.TAG_MAP_VALUE_ARR) {
    let tagMap: Map<string, TrendTimeValueItem[]> = new Map();
    tags.split('|').forEach((tag, idx) => {
      tagMap.set(tag, timeArr.map((time, tIdx): TrendTimeValueItem => {
        let num = 0;
        if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
          num = Number(tagValueArr[idx][tIdx]);
          if (decimal) num = round(num, decimal);
        }
        return {
          time,
          value: num,
        };
      }));
    });
    return tagMap;
  } else if (type === HisDataType.TIME) {
    let timeMap: Map<string, Map<string, number>> = new Map();
    timeArr.forEach((time, tIdx) => {
      let tagValueMap: Map<string, number> = new Map();
      tags.split('|').forEach((tag, idx) => {
        let num = 0;
        if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
          num = Number(tagValueArr[idx][tIdx]);
          if (decimal) num = round(num, decimal);
        }
        tagValueMap.set(tag, num);
      });
      timeMap.set(time, tagValueMap);
    });
    return timeMap;
  } else if (type === HisDataType.TIME_ARR) {
    return timeArr.map((time, tIdx): TrendTimeTag => {
      return {
        time,
        tagValue: tags.split('|').map((tag, idx): TrendTagValueItem => {
          let num = 0;
          if (!isNaN(Number(tagValueArr[idx][tIdx]))) {
            num = Number(tagValueArr[idx][tIdx]);
            if (decimal) num = round(num, decimal);
          }
          return {
            tag,
            value: num,
          };
        }),
      };
    });
  } else if (type === HisDataType.TIME_VALUE_ARR) {
    return zip(timeArr, ...tagValueArr);
  }
};
