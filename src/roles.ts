const ADMIN = 'ADMIN';
const HEADMAN = 'HEADMAN';
const STUDENT = 'STUDENT';

// type Admin = typeof ADMIN;
// type Headman = typeof HEADMAN;
// type Student = typeof STUDENT;

// export type RoleType = Admin | Headman | Student;

export const typeStringsToIDs = {
  [ADMIN]: 1,
  [HEADMAN]: 2,
  [STUDENT]: 3,
};

export const adminID = 1;
export const headmanID = 2;
export const studentID = 3;

export interface RoleViewsType {
  [id: number]: JSX.Element;
}
