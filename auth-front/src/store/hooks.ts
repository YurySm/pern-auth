
import {useDispatch, useSelector, useStore} from 'react-redux';
import {AppDispatch, AppStore, RootState} from "@/store/store";
import {useMemo} from "react";
import {bindActionCreators} from "redux";
import {rootActions} from "@/store/root.actions";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useActions = () => {
    const dispatch = useAppDispatch()
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}