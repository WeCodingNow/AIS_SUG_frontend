type_file_template = """
import {{ Action }} from 'redux';
import {{ Model, HashTable, ChangeAction }} from '../types';

export interface Pure{typename_first_upper} {{
{type_fields}
}}

export interface {typename_first_upper} extends Model, Pure{typename_first_upper} {{}}

export const to{typename_first_upper} = (data: any): {typename_first_upper} => ({{
{type_fields_api_bindings}
}});

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

def make_type_file_maker(types_fields, type_api_bindings):
    def make_type_file(t):
        ret_str = ''

        for l in type_file_template.splitlines()[1:]:
            added = l.format(
                type_fields=types_fields[t][1:-1],
                type_api_bindings=types_fields[t][1:-1],
                typename_all_upper=t.upper(),
                typename_first_upper=''.join(m.capitalize() for m in t.split('_')),
            )

            ret_str += added + '\n'

        return ret_str

    return make_type_file
