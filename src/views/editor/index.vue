<template>
  <n-space vertical size="large">
    <n-layout has-sider>
        <n-layout-sider collapse-mode="transform" :collapsed-width="120" :width="240" show-trigger="bar" content-style="padding:24px" bordered>
            <n-collapse>
                <n-collapse-item title="Edit FloorPlan" name="1">
                    <div>test</div>
                </n-collapse-item>
                <n-collapse-item title="Design" name="2">
                    <div>test</div>
                </n-collapse-item>
                <n-collapse-item title="Add Items" name="3">
                    <div>test</div>
                </n-collapse-item>
            </n-collapse>
        </n-layout-sider>
        <n-layout-content content-style="padding:24px">
            <div id="floorplanner">
                <canvas id="floorplanner-canvas" ></canvas>
            </div>
        </n-layout-content>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import {NSpace, NLayout, NLayoutContent,NLayoutSider, NH2, NCollapse, NCollapseItem} from "naive-ui"
</script>

<style></style>
