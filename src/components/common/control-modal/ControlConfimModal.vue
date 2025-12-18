<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue/es/form/Form';
import type { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

const open = defineModel('open', { default: false });

const emit = defineEmits<{
  (e: 'exec'): void;
}>();

const { userInfo } = useUserStore();

const opFormRef = ref<FormInstance>();
const operatorForm = ref({
  UserName: userInfo.UserName,
  Password: '',
});
const gdFormRef = ref<FormInstance>();
const guardianForm = ref({
  UserName: '',
  Password: '',
});
const rules: Record<string, Rule[]> = {
  UserName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  Password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
};

const operatorLoading = ref(false);
const guardianLoading = ref(false);

const { controlTagInfo, execLogs } = storeToRefs(useControlStore());

const handleOperatorConfirm = async () => {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
  let flag = '';
  try {
    await opFormRef.value?.validate();
    const form = merge({}, operatorForm.value, {
      CreatorId: userInfo.UserName!,
      CreatorRealName: userInfo.RealName!,
      Tag: controlTagInfo.value.Tag,
      Des: controlTagInfo.value.Des,
      Action: controlTagInfo.value.action,
    });
    const res = await setOperatorVerify(form);
    if (res.Success) {
      flag = '成功';
      guardianOpen.value = true;
    } else {
      flag = res.Msg ? res.Msg : '失败';
      message.error(`验证失败，${res.Msg}`);
    }
  } catch (e) {
    if ((e as ValidateErrorEntity)?.errorFields) {
      return;
    } else {
      flag = '失败';
      message.error(`验证失败，${e}`);
    }
  }
  execLogs.value.unshift({
    Time: time,
    Action: '操作验证',
    Des: '操作人验证',
    Result: flag,
    SName: controlTagInfo.value.SName,
  });
};
const handleOperatorClear = () => {
  opFormRef.value!.resetFields();
  operatorForm.value = {
    UserName: userInfo.UserName,
    Password: '',
  };
};

const guardianOpen = ref(false);
const handleGuardianConfirm = async () => {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
  let flag = '';
  try {
    await gdFormRef.value?.validate();
    const form = merge({}, guardianForm.value, {
      CreatorId: userInfo.UserName!,
      CreatorRealName: userInfo.RealName!,
      Tag: controlTagInfo.value.Tag,
      Des: controlTagInfo.value.Des,
      Action: controlTagInfo.value.action,
    });
    const res = await setGuardianVerify(form);
    if (res.Success) {
      flag = '成功';
      guardianOpen.value = false;
      open.value = false;
      emit('exec');
    } else {
      flag = res.Msg ? res.Msg : '失败';
      message.error(`验证失败，${res.Msg}`);
    }
  } catch (e) {
    if ((e as ValidateErrorEntity)?.errorFields) {
      return;
    } else {
      flag = '失败';
      message.error(`验证失败，${e}`);
    }
  }
  execLogs.value.unshift({
    Time: time,
    Action: '监护验证',
    Des: '监护人验证',
    Result: flag,
    SName: controlTagInfo.value.SName,
  });
};
const handleGuardianClear = () => {
  gdFormRef.value!.resetFields();
  guardianForm.value = {
    UserName: '',
    Password: '',
  };
};
</script>

<template>
  <a-modal
    v-model:open="open"
    centered
    title="操作人验证"
    :loading="operatorLoading"
    :mask-closable="false"
    ok-text="确认"
    @ok="handleOperatorConfirm"
    @cancel="handleOperatorClear"
  >
    <a-form
      mt-4 pr-4
      ref="opFormRef"
      :model="operatorForm"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :disabled="operatorLoading"
    >
      <a-row>
        <a-col :span="24">
          <a-form-item label="用户名" name="UserName">
            <a-input disabled v-model:value="operatorForm.UserName" placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="密码" name="Password">
            <a-input-password v-model:value="operatorForm.Password" placeholder="请输入密码" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
  <a-modal
    v-model:open="guardianOpen"
    centered
    title="操作人验证"
    :loading="operatorLoading"
    :mask-closable="false"
    ok-text="确认"
    @ok="handleGuardianConfirm"
    @cancel="handleGuardianClear"
  >
    <a-form
      mt-4 pr-4
      ref="gdFormRef"
      :model="guardianForm"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 18 }"
      :disabled="guardianLoading"
    >
      <a-row>
        <a-col :span="24">
          <a-form-item label="用户名" name="UserName">
            <a-input v-model:value="guardianForm.UserName" placeholder="请输入用户名" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="密码" name="newPwd">
            <a-input-password v-model:value="guardianForm.Password" placeholder="请输入密码" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<style scoped lang="less">

</style>
