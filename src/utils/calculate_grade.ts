/**
 * This file contains some function stubs(ie incomplete functions) that
 * you MUST use to begin the work for calculating the grades.
 *
 * You may need more functions than are currently here...we highly encourage you to define more.
 *
 * Anything that has a type of "undefined" you will need to replace with something.
 */
import { IUniversityClass, IStudent, IGrade, IAssignment } from "../types/api_types";
import { BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID } from "../globals";


/**
 * This function might help you write the function below.
 * It retrieves the final grade for a single student based on the passed params.
 * 
 * If you are reading here and you haven't read the top of the file...go back.
 */
export async function calculateStudentFinalGrade(
  studentID: string,
  classAssignments: IAssignment[],
  studentGrades: { [key: string]: number }
): Promise<number> {
  let finalGrade = 0;
  let totalWeight = 0;

  classAssignments.forEach((assignment) => {
    const studentGrade = studentGrades[assignment.assignmentId];
    if (studentGrade !== undefined) {
      finalGrade += studentGrade * assignment.weight;
      //totalWeight += assignment.weight;
    }
  });

 // if (totalWeight === 0) {
  //  throw new Error('No weighted assignments for class');
  //}

  const grade = finalGrade / 100;
  return Number(grade.toFixed(2));
}

export async function calcAllFinalGrades(classID: string): Promise<IGrade[]> {
  const assignmentsResponse = await fetch(`${BASE_API_URL}/class/listAssignments/${classID}?buid=${MY_BU_ID}`, {
    method: "GET",
    headers: GET_DEFAULT_HEADERS(),
  });
  if (!assignmentsResponse.ok) throw new Error("Failed to fetch assignments");
  const classAssignments: IAssignment[] = await assignmentsResponse.json();

  const studentsResponse = await fetch(`${BASE_API_URL}/class/listStudents/${classID}?buid=${MY_BU_ID}`, {
    method: "GET",
    headers: GET_DEFAULT_HEADERS(),
  });
  if (!studentsResponse.ok) throw new Error("Failed to fetch students");
  const studentIds: string[] = await studentsResponse.json();

  const finalGradesPromises = studentIds.map(async (studentId) => {
    const gradesResponse = await fetch(`${BASE_API_URL}/student/listGrades/${studentId}/${classID}?buid=${MY_BU_ID}`, {
      method: "GET",
      headers: GET_DEFAULT_HEADERS(),
    });
    if (!gradesResponse.ok) throw new Error("Failed to fetch student grades");
    const gradesResponseData = await gradesResponse.json();
    const studentGrades = gradesResponseData.grades[0];

    const finalGrade = await calculateStudentFinalGrade(studentId, classAssignments, studentGrades);

    return {
      classId: classID,
      grades: studentGrades,
      name: gradesResponseData.name,
      studentId: studentId,
      className: "",
      finalGrade: finalGrade,
    } as IGrade;
  });

  return Promise.all(finalGradesPromises);
}