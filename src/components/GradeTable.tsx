/**
 * You might find it useful to have some dummy data for your own testing.
 * Feel free to write this function if you find that feature desirable.
 * 
 * When you come to office hours for help, we will ask you if you have written
 * this function and tested your project using it.
 */
 import Box from '@mui/material/Box';
 import { DataGrid, GridColDef } from '@mui/x-data-grid';


export function dummyData() {
  return [];
}


const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'sID',
    headerName: 'Student ID',
    width: 150,
    editable: true,
  },
  {
    field: 'sName',
    headerName: 'Student Name',
    width: 150,
    editable: true,
  },
  {
    field: 'cID',
    headerName: 'Class ID',
    width: 110,
    editable: true,
  },
  {
    field: 'cName',
    headerName: 'Class Name',
    sortable: false,
    width: 150,
  },
  {
    field: 'sem',
    headerName: 'Semester',
    sortable: false,
    width: 150,
  },
  {
    field: 'fGrade',
    headerName: 'Final Grade',
    sortable: false,
    width: 150,
  }
];

const rows = [
  {
    sID: 'U125',
    sName: 'Hirluin',
    cID: 'C125',
    cName: 'ST 519',
    sem: 'Fall 2022',
    fGrade: 395.8
  },
  {
    sID: 'U127',
    sName: 'King Theoden',
    cID: 'C125',
    cName: 'ST 519',
    sem: 'Fall 2022',
    fGrade: 431.2
  },
  {
    sID: 'U130',
    sName: 'Aragorn',
    cID: 'C125',
    cName: 'ST 519',
    sem: 'Fall 2022',
    fGrade: 411.4
  },
  {
    sID: 'U131',
    sName: 'Arod',
    cID: 'C125',
    cName: 'ST 519',
    sem: 'Fall 2022',
    fGrade: 419.4
  },
];

/**
 * This is the component where you should write the code for displaying the
 * the table of grades.
 *
 * You might need to change the signature of this function.
 *
 */
 export const GradeTable: React.FC = () => {
  console.log('GradeTable is rendering', { rows, columns });

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
      />
    </Box>
  );
}