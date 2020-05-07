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

generators = {
    'types': ('types.ts', typefile.make_type_file_maker(types_fields)),
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
    # 'types',
    # 'reducers',
    # 'creators',
    'thunks',
    'actions',
}

codegen_folders = {
  'codegen',
}

nogen = {
  'contact',
}

types_order = [
  'contact',
  'contact_type',
  'control_event',
  'control_event_type',
  'discipline',
  'group',
  'mark',
  'residence',
  'semester',
  'student',
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
