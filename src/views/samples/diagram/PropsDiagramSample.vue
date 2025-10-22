<script setup lang="ts">
const routeToUrlDiagramSample = () => {
  routeTo({
    name: 'urlDiagram',
    query: {
      href: 'svg.cfd',
    },
  });
};
</script>

<template>
  <div class="w-full h-full flex p-3 gap-3">
    <a-card title="来自组件入参">
      <div class="w-500px h-500px">
        <Diagram href="svg.cfd" />
      </div>
    </a-card>
    <div class="flex-1 bg-ant.bg-container rounded-ant.br p-3">
      <p>
        <a-button type="primary" @click="routeToUrlDiagramSample">跳转到 url 接入</a-button>
      </p>
      <p>
        页面的其他部分，表格、图表等。
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>
