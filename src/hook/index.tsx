import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store/store';
import { useNavigate } from 'react-router-dom';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const redirect = (path) => {
  const navigate = useNavigate();
  navigate(path);
};