import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    // 输入框的值
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    getData (state, data) {
      state.list = data
    },
    // 监听输入框内容的变化
    handleInput (state, value) {
      state.inputValue = value
    },
    add (state) {
      const item = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(item)
      state.inputValue = ''
      state.nextId++
    },
    // 删除事项
    del (state, id) {
      const index = state.list.findIndex(x => x.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 当复选框的值发生改变时
    changedState (state, item) {
      const index = state.list.findIndex(x => x.id === item.id)
      if (index !== -1) {
        state.list[index].done = item.done
      }
    },
    // 清除已完成
    clearDone (state) {
      state.list = state.list.filter(x => !x.done)
    },
    changeViewKey (state, viewKey) {
      state.viewKey = viewKey
    }
  },
  actions: {
    async getDataAsync (context) {
      const { data: res } = await axios.get('/data.json')
      console.log(res)
      context.commit('getData', res)
    }
  },
  getters: {
    inputValue (state) {
      return state.inputValue
    },
    // 未完成的条数
    undone (state) {
      return state.list.filter(x => !x.done).length
    },
    listShow (state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      } else {
        return state.list
      }
    }
  }
})
