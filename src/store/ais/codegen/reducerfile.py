reducer_file_template = """
import {{ {typename_first_upper}State, {typename_first_upper}ActionTypes, PUT_{typename_all_upper}, CHANGE_{typename_all_upper} }} from './types';

const initialState: {typename_first_upper}State = {{}};

export default function {typename_upper_after}Reducer(state: {typename_first_upper}State = initialState, action: {typename_first_upper}ActionTypes) {{
  switch (action.type) {{
    case PUT_{typename_all_upper}:
      return {{ ...state, [action.payload.id]: action.payload }};
    case CHANGE_{typename_all_upper}:
      return {{
        ...state,
        [action.payload.id]: {{ ...state[action.payload.id], ...action.payload.model }},
      }};
    default:
      return state;
  }}
}}
"""

def make_reducer_file(t: str):
    ret_str = ''

    for l in reducer_file_template.splitlines()[1:]:
        added = l.format(
            typename_all_upper=t.upper(),
            typename_first_upper=''.join(m.capitalize() for m in t.split('_')),
            typename_upper_after=''.join(c.lower() if i == 0 else c for i, c in enumerate(''.join(m.capitalize() for m in t.split('_')))),
        )

        ret_str += added + '\n'

    return ret_str


def make_big_reducer(types):
    ret_str = "import { combineReducers } from 'redux';\n\n"

    for t in types:
        ret_str += "import {typename_upper_after}Reducer from './{small_typename}/reducers';\n".format(
            typename_upper_after=''.join(c.lower() if i == 0 else c for i, c in enumerate(''.join(m.capitalize() for m in t.split('_')))),
            small_typename=t,
        )
    
    ret_str += "\nconst reducer = combineReducers({\n"

    for t in types:
        ret_str += "  {typename_upper_after}: {typename_upper_after}Reducer,\n".format(
            typename_upper_after=''.join(c.lower() if i == 0 else c for i, c in enumerate(''.join(m.capitalize() for m in t.split('_')))),
        )

    ret_str += "});\n\n"

    ret_str += "export default reducer;\n"

    return ret_str