import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { IGrade } from '../types/api_types';

interface GradeTableProps {
  grades: IGrade[];
}

export const GradeTable: React.FC<GradeTableProps> = ({ grades }) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>Semester</TableCell>
              <TableCell>Grades</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {grades.map((gradeData) => (
              <TableRow key={gradeData.studentId}>
                <TableCell>{gradeData.studentId}</TableCell>
                <TableCell>{gradeData.name}</TableCell>
                <TableCell>{gradeData.classId}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>
                  {Object.entries(gradeData.grades).map(([assignment, score]) => (
                    <div key={assignment}>{`${assignment}: ${score}`}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
