import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IGrade, IUniversityClass } from '../types/api_types';

interface GradeTableProps {
  grades: IGrade[];
  classList: IUniversityClass[];
}

export const GradeTable: React.FC<GradeTableProps> = ({ grades, classList }) => {
  const findClassNameById = (classId: string): string => {
    const classObj = classList.find((c) => c.classId === classId);
    return classObj ? classObj.title : "Unknown";
  };

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
            {grades.map((gradeData) => (
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
    </Paper>
  );
};
