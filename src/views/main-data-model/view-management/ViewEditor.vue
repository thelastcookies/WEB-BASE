<script setup lang="ts">
const currentStep = ref(0);
const successType = ref(null as null | 'save' | 'deploy');
const settingSteps = [{
    title: '主模型选择',
    actionId: 'AddViewStepMainModel'
}, {
    title: '关联模型字段选择',
    actionId: 'AddViewStepRelatedModel'
}, {
    title: '查询排序配置',
    actionId: 'AddViewStepQuerySetting'
}, {
    title: '显示配置',
    actionId: 'AddViewStepSortSetting'
}, {
    title: '完成',
    actionId: 'AddViewStepResult'

}];
const handleToStep = (step: StepEnum, type?: 'save' | 'deploy') => {
    currentStep.value = step;
    successType.value = type ?? null;
};

const routeBack = () => {
    router.back();
};
</script>

<template>
    <a-page-header
        h-48px lh-48px p-lr-normal p-tb-0 bg-ant__bg-container
        title="新增视图"
        @back="routeBack"
    />
    <div class="p-lr-normal calc:height-100%-112px">
        <a-steps
            p-lrtb-normal
            :current="currentStep"
            :items="settingSteps"
        ></a-steps>
        <div class="w-full calc:height-100%-80px bg-ant__bg-container flex">
            <template v-if="currentStep === StepEnum.STEP1">
                <view-step1></view-step1>
            </template>
            <template v-else-if="currentStep === StepEnum.STEP2">
                <view-step2></view-step2>
            </template>
            <template v-else-if="currentStep === StepEnum.STEP3">
                <view-step3></view-step3>
            </template>
            <template v-else-if="currentStep === StepEnum.STEP4">
                <view-step4></view-step4>
            </template>
            <template v-else-if="currentStep === StepEnum.STEP5">
                <view-step5></view-step5>
            </template>
        </div>
    </div>
    <div class="p-lr-normal h-64px flex justify-end">
        <a-button mr-12px v-if="currentStep > 0 && currentStep < settingSteps.length - 1" @click="handleToStep(currentStep - 1)">上一步</a-button>
        <a-button type="primary" v-if="currentStep < settingSteps.length - 2" @click="handleToStep(currentStep + 1)">下一步</a-button>
        <a-button type="primary" mr-12px v-if="currentStep === settingSteps.length - 2" @click="handleToStep(currentStep + 1)">另存为</a-button>
        <a-button type="primary" v-if="currentStep === settingSteps.length - 2" @click="handleToStep(currentStep + 1)">保存</a-button>
    </div>
</template>

<style scoped lang="less">
</style>
