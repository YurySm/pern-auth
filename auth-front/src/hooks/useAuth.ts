import {useAppSelector} from "@/store/hooks";

export const useAuth = () => useAppSelector(state => state.user)