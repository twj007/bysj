import * as types from '@/store/mutation_types';

export default {
  [types.userId](state, payload){
    if(payload){
      state.user.id = payload
    }
  }
}
