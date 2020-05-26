import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

import { State } from '../store';
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

export function makePutters<M, T extends Action>(
  putActionCreator: (a: any) => T,
  loadingStateCreator: ChangeLoadingStateCreator<T>,
  modelTransformer: (a: any) => M,
  funcs: ReturnType<typeof makeGetters>,
) {
  const putOne = (id: number): ThunkResult<Promise<M>, T> => async (dispatch) => {
    try {
      dispatch(loadingStateCreator(LOADING));
      const entity = await dispatch(funcs.getOne(id));

      dispatch(putActionCreator(modelTransformer(entity)));
      dispatch(loadingStateCreator(SUCCESS));

      return Promise.resolve(modelTransformer(entity));
    } catch (e) {
      console.log(e);
      dispatch(loadingStateCreator(FAILED));
      return Promise.reject();
    }
  };

  const putAll = (): ThunkResult<Promise<Array<M>>, T> => async (dispatch) => {
    try {
      dispatch(loadingStateCreator(LOADING));
      const entities: Array<any> = await dispatch(funcs.getAll());

      const models = entities.map(modelTransformer);

      models.map(putActionCreator).forEach(dispatch);

      dispatch(loadingStateCreator(SUCCESS));

      return Promise.resolve(models);
    } catch (e) {
      console.log(e);
      dispatch(loadingStateCreator(FAILED));
      return Promise.reject();
    }
  };

  return { putOne, putAll };
}

export function makeCreator<PureM, M, T extends Action>(
  entityEndpoint: EntityEndpoint,
  putActionCreator: (a: any) => T,
  modelTransformer: (a: any) => M,
  toBackTransformer: (m: PureM) => any,
) {
  return (m: PureM): ThunkResult<Promise<M>, T> => async (dispatch) => {
    try {
      const respModel = await entityEndpoint.Post(toBackTransformer(m));
      const newModel = modelTransformer(await respModel.json());

      dispatch(putActionCreator(newModel));
      return Promise.resolve(newModel);
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  };
}
