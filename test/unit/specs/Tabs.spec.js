import Vue from 'vue'
import Tabs from '@src/components/tabs/Tabs.vue'
import Tab from '@src/components/tabs/Tab.vue'

describe('Tabs', () => {
  it('should not be able to work if not using <tabs><tab>...</tab></tabs>', () => {
    let _error = window.console.error
    window.console.error = () => {
      // Silent to remove out logs in terminal
    }
    try {
      let spy = sinon.spy(window.console, 'error')
      let res = Vue.compile('<tabs><tab><tab>{{ msg }}</tab></tab></tabs>')
      let vm = new Vue({
        data () {
          return {
            msg: 'hello'
          }
        },
        components: {Tab, Tabs},
        render: res.render,
        staticRenderFns: res.staticRenderFns
      })
      vm.$mount()
      sinon.assert.called(spy)
      vm.$destroy()
    } finally {
      window.console.error = _error
    }
  })

  it('should be ok if not <tab> present in <tabs>', () => {
    let res = Vue.compile('<tabs>{{msg}}</tabs>')
    let vm = new Vue({
      data () {
        return {
          msg: 'hello'
        }
      },
      components: {Tab, Tabs},
      render: res.render,
      staticRenderFns: res.staticRenderFns
    })
    vm.$mount()
    vm.$destroy()
  })
})
