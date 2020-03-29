<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="inp"></a-input>
    <a-button type='primary'>添加事项</a-button>
    <a-list bordered :dataSource="list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox>{{item.info}}</a-checkbox>
        <a slot="actions">删除</a>
      </a-list-item>
      <div slot="footer" class="footer">
        <span>0条剩余</span>
        <a-button-group>
          <a-button type='primary'>全部</a-button>
          <a-button type='primary'>未完成</a-button>
          <a-button type='primary'>已完成</a-button>
        </a-button-group>
        <a-button type="link" block class="link">清除已完成</a-button>
      </div>
    </a-list>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      list: [
        {
          id: 0, info: '111111111', done: false
        },
        {
          id: 1, info: '22222222', done: false
        },
        {
          id: 2, info: '3333333', done: true
        },
        {
          id: 3, info: '44444444', done: false
        },
        {
          id: 4, info: '555555555', done: true
        }
      ]
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
