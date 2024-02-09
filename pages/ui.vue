<template>
    <div>
        <Pagination
            :total="120"
            :range-before="1"
            :range-after="2"
            :size-page="7"
            :current="activePage"
            @update:current="(e) => updatePage(e, 120, 7)"
            :before-content="true"
            :afterContent="true"
            class="gap-4"
            />
    
    <div class="test-ui-body">
        <Input :mode="'secondary'"
        :readonly="true"
        :model-value="'Какой-то текст'"
        :span="'Text'"
        :icon="{ 'key': 'basket', size: '25_25' }"/>
        <Input :mode="'outline'" :span="'Text'"/>
        <Input :mode="'secondary'" :icon="{ 'key': 'basket', size: '25_25' }"/>
        <Input :mode="'outline'" :readonly="true" :model-value="'Какой-то текст'" :icon="{ 'key': 'basket', size: '25_25' }"/>
        <RangeNumber :section="data"/>
        <Password :mode="'secondary'" :span="'Password'"/>
        
        <!-- <div class="w-40">
            <Rating :readonly="false" />
            <Switch />
            <CheckBox :disabled="true"/>
            <Group class="gap-2">
                <div v-if="false"></div>
                <div></div>
                <div v-show="false"></div>
                <Radio/>
                <GroupItem/>
            </Group>
            <Button :text="'test'" :icon-left="{ key: 'filter', size: '16_16' }" :appearance="'green'" @click="onClick" />
            <Accordion text="accordion">
                <div>Accordion</div>
            </Accordion>
            <Tooltip :type="'primary'" :position="'center-right'">
                <template #default>
                    <div :style="{ padding: `0.5rem 2rem` }">Accordion</div>
                </template>
                <template #content>
                    <div>Accordion</div>
                </template>
            </Tooltip>
            <div class="flex gap-2" :style="{ 'flex-wrap': 'wrap' }">
                <template v-for="value,key in iconPath">
                    <Button :icon-left="{ key: key, size: '24_24' }"  :size="'xs'" :appearance="'blue'" />
                </template>
            </div>
        </div> -->
    </div>
</div>
</template>


<script setup lang="ts">
import Input from "@/components/UI/Input/Input.vue";
import RangeNumber from "@/components/UI/Range/Number.vue";
import Password from "@/components/UI/Input/Password.vue";
import Pagination from "@/components/UI/Pagination/Pagination.vue";
import { paggination } from '#imports'

const { activePage, updatePage, getInfoPagination } = paggination()
const data ={
        title: "NUMBER",
        from: { name: 'from', min: 0, max: 45, placeholder: 'from', step: 1 },
        to: { name: 'to', min: 0, max: 45, placeholder: 'to', step: 1 }
    }
</script>

<!-- <script setup lang="ts">
import { default as CreateIcon, type Props as CreateIconProps } from "@/content/icons/create.ts";
import { iconPath } from "@/content/icons/1.ts";
import Rating from "@/components/UI/Rating/Rating.vue";
import Switch from "@/components/UI/Switch/Switch.vue";
import CheckBox from "@/components/UI/CheckBox/Checkbox.vue";
import Group from "@/components/UI/Group/Group.vue";
import GroupItem from "@/components/UI/Group/GroupItem.vue";
import Button from "@/components/UI/Button/Button.vue";
import Tooltip from "@/components/UI/Tooltip/Tooltip.vue";
import Accordion from "@/components/UI/Accordion/Accordion.vue";
import Radio from "@/components/UI/Radio/Radio.vue";
import { modal as _modal } from '@/stores/modal'

const storeModal = _modal()

function onClick() {
    storeModal.changeActiveModal('auth-user')
}
</script> -->


<style>
.test-ui-body {
    width: 300px;
}
</style>