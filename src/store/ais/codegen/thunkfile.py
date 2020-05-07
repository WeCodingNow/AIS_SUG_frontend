thunk_file_template = """
import {{ ThunkAction }} from 'redux-thunk';

import {{ {typename_first_upper}ActionTypes, {typename_first_upper}, to{typename_first_upper} }} from './types';
import {{ put{typename_first_upper} }} from './creators';

import {{ State }} from '../../store';
import AisAPI from '../../../services/ais';

type ThunkResult<R> = ThunkAction<R, State, undefined, {typename_first_upper}ActionTypes>;

export const get{typename_first_upper} = (id: number): ThunkResult<void> => async (dispatch) => {{
  try {{
    const resp = await AisAPI.{typename_first_upper}.Get(id);
    const jsonedResp = await resp.json();

    dispatch(put{typename_first_upper}(to{tupename_first_upper}(jsonedResp)));
  }} catch (e) {{
    console.log(e);
    console.log("couldn't get {plain_typename} ", id);
  }}
}};

export const get{typename_first_upper}s = (): ThunkResult<void> => async (dispatch) => {{
  try {{
    const resp = await AisAPI.{typename_first_upper}.Get();
    const jsonedResp = await resp.json();

    jsonedResp.map(({typename_letter}: {typename_first_upper}) => dispatch(put{typename_first_upper}(to{typename_first_upper}({typename_letter}))));
  }} catch (e) {{
    console.log(e);
    console.log("couldn't get {plain_typename}s");
  }}
}};
"""


def make_thunk_file(t: str):
    ret_str = ''

    for l in thunk_file_template.splitlines()[1:]:
        added = l.format(
            typename_all_upper=t.upper(),
            plain_typename=t.replace('_', ' '),
            typename_letter=t[0],
            typename_first_upper=''.join(m.capitalize() for m in t.split('_')),
            typename_upper_after=''.join(c.lower() if i == 0 else c for i, c in enumerate(''.join(m.capitalize() for m in t.split('_')))),
        )

        ret_str += added + '\n'

    return ret_str