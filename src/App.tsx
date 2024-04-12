import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Select, MenuItem, Typography } from "@mui/material";
import { GradeTable } from "./components/GradeTable";
/**
 * You will find globals from this file useful!
 */
import { BASE_API_URL, GET_DEFAULT_HEADERS, MY_BU_ID } from "./globals";
import { IUniversityClass, IStudent, IGrade } from "./types/api_types";

function App() {
  // You will need to use more of these!
  const [currClassId, setCurrClassId] = useState<string>("");
  const [classList, setClassList] = useState<IUniversityClass[]>([]);
  const [grades, setGrades] = useState<IGrade[]>([]);

/**
   * This is JUST an example of how you might fetch some data(with a different API).
   * As you might notice, this does not show up in your console right now.
   * This is because the function isn't called by anything!
   *
   * You will need to lookup how to fetch data from an API using React.js
   * Something you might want to look at is the useEffect hook.
   *
   * The useEffect hook will be useful for populating the data in the dropdown box.
   * You will want to make sure that the effect is only called once at component mount.
   *
   * You will also need to explore the use of async/await.
   *
   */

  // fetching class list
  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/class/listBySemester/fall2022?buid=${MY_BU_ID}`, {
          method: "GET",
          headers: GET_DEFAULT_HEADERS(),
        });
        const json: IUniversityClass[] = await response.json(); 
        setClassList(json);
      } catch (error) {
        console.error("Failed to fetch class list:", error);
      }
    };

    fetchClassList();
  }, []);

  // fetching grades for a class
  useEffect(() => {
    if (!currClassId) return;

    const fetchGrades = async () => {
      try {
        const studentResponse = await fetch(`${BASE_API_URL}/class/listStudents/${currClassId}?buid=${MY_BU_ID}`, {
          method: "GET",
          headers: GET_DEFAULT_HEADERS(),
        });
        const students: IStudent[] = await studentResponse.json(); 
        
        // map each student to a grade fetch
        const gradesPromises = students.map((student) => 
          fetch(`${BASE_API_URL}/student/listGrades/${student.universityId}/${currClassId}?buid=${MY_BU_ID}`, {
            method: "GET",
            headers: GET_DEFAULT_HEADERS(),
          }).then((res) => res.json())
        );

        const gradesResults: IGrade[] = await Promise.all(gradesPromises); 
        setGrades(gradesResults);
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      }
    };

    fetchGrades();
  }, [currClassId]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Grid container spacing={2} style={{ padding: "1rem" }}>
        <Grid xs={12} container alignItems="center" justifyContent="center">
          <Typography variant="h2" gutterBottom>
            Spark Assessment
          </Typography>
        </Grid>
        <Grid xs={12} md={4}>
          <Typography variant="h4" gutterBottom>
            Select a class
          </Typography>
          <Select
            fullWidth={true}
            value={currClassId}
            onChange={(e) => setCurrClassId(e.target.value)}
            label="Class"
            displayEmpty
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {classList.map((c) => (
              <MenuItem key={c.classId} value={c.classId}>
                {c.title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Final Grades
          </Typography>
          <GradeTable grades={grades} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
