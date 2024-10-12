import * as userActions from './user/user.actions'
import {userSlice} from "@/store/user/user.slice";

export const rootActions = {
    ...userActions,
    ...userSlice.actions,
}