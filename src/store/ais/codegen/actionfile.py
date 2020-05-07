action_file_template = """
import {{ bindActionCreators }} from 'redux';

import {{ store }} from '../../store';
import {{ get{typename_first_upper}, get{typename_first_upper}s }} from './thunks';
// import {{}} from './creators';

export default bindActionCreators(
  {{
    get{typename_first_upper},
    get{typename_first_upper}s,
  }},
  store.dispatch,
);
"""

def make_action_file(t: str):
    ret_str = ''

    for l in action_file_template.splitlines()[1:]:
        added = l.format(
            # typename_all_upper=t.upper(),
            # plain_typename=t.replace('_', ' '),
            # typename_letter=t[0],
            typename_first_upper=''.join(m.capitalize() for m in t.split('_')),
            # typename_upper_after=''.join(c.lower() if i == 0 else c for i, c in enumerate(''.join(m.capitalize() for m in t.split('_')))),
        )

        ret_str += added + '\n'

    return ret_str