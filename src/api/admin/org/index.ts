// 获取组织机构（全量）
export const getSysOrg = () => {
  return useGet<AdminResponseBody<SysOrgRecord[]>>(
    `${ADMIN_URL}/SysOrg/GetSysOrg`,
  );
};
