import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const dummyGrades = [
  {
    studentId: 'U125',
    studentName: 'Hirluin',
    classId: 'C125',
    className: 'ST 519',
    semester: 'Fall 2022',
    finalGrade: 395.8,
  },
  {
    studentId: 'U127',
    studentName: 'King Theoden',
    classId: 'C125',
    className: 'ST 519',
    semester: 'Fall 2022',
    finalGrade: 431.2,
  },
];

export const GradeTable = () => {
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
            {dummyGrades.map((row) => (
              <TableRow key={row.studentId}>
                <TableCell>{row.studentId}</TableCell>
                <TableCell>{row.studentName}</TableCell>
                <TableCell>{row.classId}</TableCell>
                <TableCell>{row.className}</TableCell>
                <TableCell>{row.semester}</TableCell>
                <TableCell>{row.finalGrade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
