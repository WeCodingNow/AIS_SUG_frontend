creator_file_template = """
import {{ {typename_first_upper}ActionTypes, {typename_first_upper}, Pure{typename_first_upper}, PUT_{typename_all_upper}, CHANGE_{typename_all_upper} }} from './types';

export const put{typename_first_upper} = ({typename_upper_after}: {typename_first_upper}): {typename_first_upper}ActionTypes => ({{
  type: PUT_{typename_all_upper},
  payload: {typename_upper_after},
}});

export const change{typename_first_upper} = (id: number, {typename_upper_after}: Pure{typename_first_upper}): {typename_first_upper}ActionTypes => ({{
  type: CHANGE_{typename_all_upper},
  payload: {{
    id,
    model: {typename_upper_after},
  }},
}});
"""

def make_creator_file(t: str):
    ret_str = ''

    for l in creator_file_template.splitlines()[1:]:
        added = l.format(
            typename_all_upper=t.upper(),
            typename_first_upper=''.join(m.capitalize() for m in t.split('_')),
            typename_upper_after=''.join(c.lower() if i == 0 else c for i, c in enumerate(''.join(m.capitalize() for m in t.split('_')))),
        )

        ret_str += added + '\n'

    return ret_str