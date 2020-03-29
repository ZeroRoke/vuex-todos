<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="inp" :value='inputValue' @change="handleInput"></a-input>
    <a-button type='primary' @click="add">添加事项</a-button>
    <a-list bordered :dataSource="listShow">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox :checked='item.done' @change="changedState(item.id,$event)">{{item.info}}</a-checkbox>
        <a slot="actions" @click="del(item.id)">删除</a>
      </a-list-item>
      <div slot="footer" class="footer">
        <span>{{undone}}条剩余</span>
        <a-button-group>
          <a-button :type='viewKey==="all"?"primary":"default"' @click="changedList('all')">全部</a-button>
          <a-button :type='viewKey==="undone"?"primary":"default"' @click="changedList('undone')">未完成</a-button>
          <a-button :type='viewKey==="done"?"primary":"default"' @click="changedList('done')">已完成</a-button>
        </a-button-group>
        <a-button type="link" block class="link" @click="clearDone">清除已完成</a-button>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    this.$store.dispatch('getDataAsync')
  },
  computed: {
    ...mapState(['viewKey']),
    ...mapGetters(['inputValue', 'undone', 'listShow'])
  },
  methods: {
    // 监听输入框内容的变化
    handleInput (e) {
      this.$store.commit('handleInput', e.target.value)
    },
    // 添加todos
    add () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('内空不能空')
      }
      this.$store.commit('add')
    },
    // 删除todos
    del (id) {
      this.$store.commit('del', id)
    },
    changedState (id, event) {
      // 改变复选框的值
      const item = {
        id,
        done: event.target.checked
      }
      this.$store.commit('changedState', item)
    },
    // 清除已完成
    clearDone () {
      this.$store.commit('clearDone')
    },
    // 改变列表
    changedList (viewKey) {
      this.$store.commit('changeViewKey', viewKey)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
  width: 800px;
}
input.inp{
  width: 89%;
}
.footer{
  display: flex;
  justify-content: space-between;

}
button.link{
  width: 74px;
}
</style>
