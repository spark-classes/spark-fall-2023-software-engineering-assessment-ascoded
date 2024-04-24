import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination} from '@mui/material';
import { IGrade, IUniversityClass } from '../types/api_types';

interface GradeTableProps {
  grades: IGrade[];
  classList: IUniversityClass[];
}

export const GradeTable: React.FC<GradeTableProps> = ({ grades, classList}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const findClassNameById = (classId: string): string => {
    const classObj = classList.find(c => c.classId === classId);
    return classObj ? classObj.title : 'Unknown';
  };

  const reversedGrades = [...grades].reverse();
  const gradesToDisplay = reversedGrades.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Final Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gradesToDisplay.map((gradeData) => (
                <TableRow key={gradeData.studentId}>
                  <TableCell>{gradeData.studentId}</TableCell>
                  <TableCell>{gradeData.name}</TableCell>
                  <TableCell>{gradeData.classId}</TableCell>
                  <TableCell>{findClassNameById(gradeData.classId)}</TableCell>
                  <TableCell>{"fall2022"}</TableCell>
                  <TableCell>{gradeData.finalGrade}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={grades.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
