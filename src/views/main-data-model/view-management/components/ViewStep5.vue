<script setup lang="ts">
const successType = ref(null as null | 'save' | 'deploy');
const routeToPageViewMng = () => {
    routeTo({name: 'viewMng'});
};
</script>

<template>
        <a-result
            h-full w-full
            status="success"
            title="成功"
            :sub-title="successType === 'save' ? '模型1配置已保存': '模型1配置已部署成功'"
        >
            <template #extra>
                <a-button key="console" type="primary" @click="routeToPageViewMng">返回视图管理</a-button>
                <a-button key="buy">其他1</a-button>
                <a-button key="buy">其他2</a-button>
            </template>
        </a-result>
</template>

<style scoped lang="less">

</style>
