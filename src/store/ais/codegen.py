from pathlib import Path


types_fields = {
'contact': """
  def: string;

  typeID: typeID;
""",
'contact_type': """
  def: string;
""",
'control_event_type': """
  def: string;
""",
'control_event': """
  date: Date;

  controlEventID: number;
  disciplineID: number;
  semesterID: number;
  markIDs: Array<number>;
""",
'discipline': """
  name: string;
  hours: number;

  controlEventIDs: Array<number>;
""",
'group': """
  number: number;

  cathedraID: number;
  studentIDs: Array<number>;
  semesterIDs: Array<number>;
""",
'mark': """
  date: Date;
  value: number;

  controlEventID: number;
  studentID: number;
""",
'residence': """
  address: string;
  city: string;
  community: boolean;

  studentIDs: Array<number>;
""",
'semester': """
  number: number;
  beginning: Date;
  end?: Date;

  groupIDs: Array<number>;
  controlEventIDs: Array<number>;
""",
'student': """
  name: string;
  secondName: string;
  thirdName?: string;

  groupID: number;
  residenceID: number;
  contactIDs: Array<number>;
  markIDs: Array<number>;
""",
}


type_file_template = """
import {{ Action }} from 'redux';
import {{ Model, HashTable, ChangeAction }} from '../types';

export interface Pure{typename_first_upper} {{
{type_fields}
}}

export interface {typename_first_upper} extends Model, Pure{typename_first_upper} {{}}

export type {typename_first_upper}State = HashTable<{typename_first_upper}>;

export const PUT_{typename_all_upper} = 'PUT_{typename_all_upper}';
export const CHANGE_{typename_all_upper} = 'CHANGE_{typename_all_upper}';

interface Put{typename_first_upper} extends Action<typeof PUT_{typename_all_upper}> {{
  payload: {typename_first_upper};
}}

interface Change{typename_first_upper} extends Action<typeof CHANGE_{typename_all_upper}> {{
  payload: ChangeAction<Pure{typename_first_upper}>;
}}

export type {typename_first_upper}ActionTypes = Put{typename_first_upper} | Change{typename_first_upper};
"""

def make_type_file(t: str):
    ret_str = ''

    for l in type_file_template.splitlines()[1:]:
        added = l.format(
            type_fields=types_fields[t][1:-1],
            typename_all_upper=t.upper(),
            typename_first_upper=''.join(m.capitalize() for m in t.split('_')),
        )

        ret_str += added + '\n'

    return ret_str

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

to_generate = {
    # 'types',
    # 'reducers',
}

generators = {
    'types': ('types.ts', make_type_file),
    'reducers': ('reducers.ts', make_reducer_file),
}

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

finishers = {
    'reducers': ('reducer.ts', make_big_reducer),
}

root_folder = Path(Path(__file__).parent)

nogen = {
    'contact'
}

for path in (
    path for path in root_folder.iterdir()
    if path.name not in nogen
    and path.is_dir()
):
    for gen in to_generate:
        filename, fun = generators[gen]
        with open(path / filename, 'w') as file:
            file.write(fun(path.name))

for gen in to_generate:
    if gen in finishers:
        filename, finisher = finishers[gen]
        with open(root_folder / filename, 'w') as file:
            file.write(finisher(set(types_fields.keys()) - nogen))
