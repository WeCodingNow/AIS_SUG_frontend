from pathlib import Path
from codegen import reducerfile, typefile, creatorfile, thunkfile, actionfile

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
'cathedra': """
  name: string;
  shortName: string;

  groupIDs: Array<number>;
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

type_fields_api_bindings = {
'contact': """
  id: data['id'],
  def: data['def'],

  typeID: data['type']['id'];
""",
'contact_type': """
  id: data['id'],
  def: data['def'],
""",
'control_event_type': """
  id: data['id'],
  def: data['def'],
""",
'control_event': """
  id: data['id'],
  date: data['date'],

  disciplineID: data['discipline']['id'],
  semesterID: data['semester']['id'],
  markIDs: data['semester']['marks'].map((m: any) => m['id']),
""",
'discipline': """
  id: data['id'],
  name: data['name'],
  hours: data['hours'],

  controlEventIDs: data['control_events'].map((ce: any) => ce['id']),
""",
'group': """
  id: data['id'],
  number: data['number'],

  cathedraID: data['cathedra']['id'],
  studentIDs: data['students'].map((st: any) => st['id']),
  semesterIDs: data['students']
    .flatMap((st: any) => st['marks'])
    .flatMap((m: any) => m['control_event'])
    .flatMap((ce: any) => ce['semester'])
    .flatMap((sem: any) => sem['id'])
""",
'cathedra': """
  id: data['id'],
  name: data['name'],
  shortName: data['short_name'],

  groupIDs: data['groups'].map((g: any) => g['id']),
""",
'mark': """
  id: data['id'],
  date: data['date'],
  value: data['value'],

  controlEventID: data['control_event']['id'],
  studentID: data['student']['id'],
""",
'residence': """
  id: data['id'],
  address: data['address'],
  city: data['city'],
  community: data['community'],

  studentIDs: data['students'].map((s: any) => s['id']),
""",
'semester': """
  id: data['id'],
  number: data['number'],
  beginning: data['beginning'],
  end: data['end'],

  groupIDs: data['groups'].map((g: any) => g['id']),
  controlEventIDs: data['groups']
    .flatMap((g: any) => g['students'])
    .flatMap((st: any) => st['marks'])
    .map((m: any) => m['control_event']['id']),
""",
'student': """
  id: data['id'],
  name: data['name'],
  secondName: data['second_name'],
  thirdName: data['third_name'],

  groupID: data['group']['id'],
  residenceID: data['residence']['id'],
  contactIDs: data['contacts'].map((co: any) => co['id']),
  markIDs: data['marks'].map((m: any) => m['id']),
""",
}

generators = {
    'types': ('types.ts', typefile.make_type_file_maker(types_fields, type_fields_api_bindings)),
    'reducers': ('reducers.ts', reducerfile.make_reducer_file),
    'creators': ('creators.ts', creatorfile.make_creator_file),
    'thunks': ('thunks.ts', thunkfile.make_thunk_file),
    'actions': ('actions.ts', actionfile.make_action_file),
}

finishers = {
    'reducers': ('reducer.ts', reducerfile.make_big_reducer),
}

root_folder = Path(Path(__file__).parent)

to_generate = {
    'types',
    # 'reducers',
    # 'creators',
    # 'thunks',
    # 'actions',
}

codegen_folders = {
  'codegen',
}

nogen = {
  'contact',
}

types_order = [
  'cathedra',
  'group',
  'semester',
  'control_event',
  'control_event_type',
  'student',
  'contact',
  'contact_type',
  'residence',
  'discipline',
  'mark',
]

full_nogen = nogen | codegen_folders

generated_files_folder = 'generated'

for path in (
  path for path in root_folder.iterdir()
  if path.name not in full_nogen
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
      file.write(finisher(sorted(list(set(types_fields.keys()) - full_nogen), key=types_order.index)))
