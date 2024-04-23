/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */


export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: string;
  semester: string;
}

export interface IStudent {
  dateEnrolled: string;
  name: string;
  status: string; 
  universityId: string; 
}

export interface IGrade {
  classId: string;
  grades: { [key: string]: number }; 
  name: string; 
  studentId: string;
  className: string;
  finalGrade: number;
}

export interface IAssignment {
  assignmentId: string;
  weight: number;
  classId: string;
}

//based off the schemas