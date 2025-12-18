// 获取测点列表
export const getPointList = () => {
  return useGet<AdminResponseBody<PointListResponseBody>>(
    `${ADMIN_URL}/Point/GetPointsInfo`,
  );
};

// 获取测点信息
export const getPointsInfoByTag = (data: TagsRequestBody) => {
  return usePost<AdminResponseBody<PointItemInfo[]>, TagsRequestBody>(
    `${ADMIN_URL}/Point/GetPointsInfoByTag`,
    data,
  );
};
