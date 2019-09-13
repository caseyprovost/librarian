import { RootState, User } from '@/store/types'

export default {
  layout (state : RootState) : string {
    return state.layout
  },
  currentUser (state : RootState) : User | null {
    return state.currentUser
  }
}
