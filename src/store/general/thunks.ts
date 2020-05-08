import { ThunkAction } from 'redux-thunk';
import { State } from '../store';
import { Action } from 'redux';
import { LoadingState, LOADING, SUCCESS, FAILED } from '../loading/types';
import EntityEndpoint from '../../services/entity_endpoint';

type ThunkResult<R, A extends Action> = ThunkAction<R, State, undefined, A>;

type ChangeLoadingStateCreator<T> = (state: LoadingState) => T;

export function makeGetters<T extends Action>(entityEndpoint: EntityEndpoint) {
  const singleGetter = (id?: number): ThunkResult<Promise<any>, T> => async () => {
    try {
      const resp = await entityEndpoint.Get(id);

      return resp.json();
    } catch (e) {
      console.log(e);
    }
  };

  const getOne = (id: number) => singleGetter(id);
  const getAll = () => singleGetter();

  return { getOne, getAll };
}

export function makePutters<T extends Action>(
  putActionCreator: (a: any) => T,
  loadingStateCreator: ChangeLoadingStateCreator<T>,
  modelTransformer: (a: any) => any,
  funcs: ReturnType<typeof makeGetters>,
) {
  const putOne = (id: number): ThunkResult<void, T> => async (dispatch) => {
    try {
      dispatch(loadingStateCreator(LOADING));
      const entity = await dispatch(funcs.getOne(id));
      dispatch(putActionCreator(modelTransformer(entity)));
      dispatch(loadingStateCreator(SUCCESS));
    } catch (e) {
      console.log(e);
      dispatch(loadingStateCreator(FAILED));
    }
  };

  const putAll = (): ThunkResult<void, T> => async (dispatch) => {
    try {
      dispatch(loadingStateCreator(LOADING));
      const entities = await dispatch(funcs.getAll());

      entities.map((e: any) => dispatch(putActionCreator(modelTransformer(e))));
      dispatch(loadingStateCreator(SUCCESS));
    } catch (e) {
      console.log(e);
      dispatch(loadingStateCreator(FAILED));
    }
  };

  return { putOne, putAll };
}
