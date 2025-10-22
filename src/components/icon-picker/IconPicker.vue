<script setup lang="ts">
const value = defineModel<string>('value', {
  default: '',
});

const search = ref('');
const current = ref(1);

const iconsFiltered = computed(() => {
  current.value = 1;
  if (!search.value) return safelistIcons;
  return safelistIcons.filter((i: string) => i.indexOf(search.value) > -1);
});
const total = computed(() => iconsFiltered.value.length);

const iconsPaged = computed(() => {
  const page = current.value < 1 ? 1 : current.value;
  return iconsFiltered.value.slice((page - 1) * 64, page * 64);
});

const open = ref(false);
const handleSelect = (icon: string) => {
  if (icon === value.value) value.value = '';
  else value.value = icon;
  open.value = false;
};

</script>

<template>
  <a-input-group compact>
    <a-input v-model:value="value" style="width: 60%" disabled placeholder="请选择" />
    <a-popover v-model:open="open" :arrow="false" trigger="click" placement="bottomRight">
      <template #content>
        <a-form-item-rest>
          <a-input v-model:value="search" placeholder="搜索" />
        </a-form-item-rest>
        <a-divider class="mt-2 mb-1" />
        <template v-if="iconsPaged.length > 0">
          <div class="w-full grid grid-cols-8 grid-gap-1 grid-justify-items-center">
            <a-tooltip v-for="icon in iconsPaged" :title="icon" :mouse-enter-delay="0.5">
              <a-button :ghost="value === icon" :type="value === icon ? 'primary' : 'text'" @click="handleSelect(icon)">
                <template #icon>
                  <BaseIcon :icon="icon" />
                </template>
              </a-button>
            </a-tooltip>
          </div>
        </template>
        <template v-else>
          <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE"></a-empty>
        </template>
        <a-divider class="mt-1 mb-2" />
        <a-pagination size="small" show-less-items :show-size-changer="false"
          :show-total="() => `共 ${total} 个`"
          v-model:current="current" :total="total" :page-size="64" />
      </template>
      <a-button>
        <template #icon>
          <BaseIcon :icon="value!" />
        </template>
      </a-button>
    </a-popover>
  </a-input-group>
</template>
