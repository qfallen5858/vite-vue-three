<script >
import Toolbar from 'component/Toolbar.vue'
import ComponentList from 'component/ComponentList.vue'
import RealTimeComponentList from 'component/RealTimeComponentList.vue'
import Editor from 'component/Editor/index.vue'
export default {
  components: {
    Toolbar,
    ComponentList,
    RealTimeComponentList,
    Editor
  }
}
</script>
<template>
  <div class="home">
    <Toolbar />

    <main>
      <section class="left">
        <ComponentList/>
        <RealTimeComponentList/>
      </section>
      <section class="center">
        <div class="content">
          <Editor/>
        </div>
      </section>
      <section class="right"></section>
    </main>
  </div>
</template>
<style lang="scss">
.home {
  height: 100vh;
  background: #fff;

  main {
    height: calc(100% - 64px);
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;

      &>div {
        overflow: auto;

        &:first-child {
          border-bottom: 1px solid #ddd;
        }
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 288px;
      right: 0;
      top: 0;

      .el-select {
        width: 100%;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 288px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }

  .global-attr {
    padding: 10px;
  }
}
</style>