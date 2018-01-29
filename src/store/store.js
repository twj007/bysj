
import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters.js'
import mutations from '@/store/mutations.js'
import * as types from '@/store/mutation_types.js'
import actions from '@/store/actions.js'

Vue.use(Vuex)

const state = {
  user: {
    id: ''
  }
}

const moduleUser = {
  state.user,
  ...mutations['user'],
  ...getters['user'],
  ...actions['user']
}

export default new Vuex.store({
  modules: {user: moduleUser}
})
