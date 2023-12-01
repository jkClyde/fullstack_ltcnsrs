import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import lengthForAgeStatus from "../Database/Calculations/lengthForAgeStatus";
import weightForAgeStatus from "../Database/Calculations/weightForAgeStatus";
import weightForLengthStatus from "../Database/Calculations/weightForLengthStatus";
import { useNavigate } from "react-router-dom";
import MessagePopup from "./components/MessagePop";
import {
  mapPT,
  mapGender,
  formatDateToYYYYMMDD,
  swapDayMonth,
} from "./components/functions";
import keyMapping from "./components/keyMapping";
import LoadingPage from "../../components/SmallLoading";

//REDUX
import { connect } from "react-redux";
import { mapState } from "./../../redux/global_variables";
import { useDispatch, useSelector } from "react-redux";
import { setRefresher } from "../../redux/actions";

const LoadingDots = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots % 5) + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return ".".repeat(dots);
};

const ExcelToJSON = ({ population }) => {
  const [jsonData, setJsonData] = useState(null);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [isImporting, setImporting] = useState(true);
  const [loadingChilfInfo, setLoadingChilfInfo] = useState(false);
  const [cuurentBarangay, setBarangay] = useState("");
  const [isFile, setFile] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Initialize useHistory

  const success2 = useSelector((state) => state.refresher.success); // Assuming you have set up the Redux store correctly
  const dispatch = useDispatch();
  const failedPayloads = [];
  const failedPayloadObjects = [];

  const calculateAndAddStatuses = (data) => {
    // Loop through the transformed data
    data.forEach((item) => {
      // Calculate statuses based on available data fields and add them to the item
      const lengthForAge = lengthForAgeStatus(
        item.birthdate,
        item.age,
        item.height,
        item.gender
      );
      const weightForAge = weightForAgeStatus(
        item.birthdate,
        item.age,
        item.weight,
        item.gender
      );
      const weightForLength = weightForLengthStatus(
        item.birthdate,
        item.height,
        item.weight,
        item.gender
      );
      // Add statuses to the item object
      console.log("Gender", item.birthdate);

      item.lengthForAgeStatus = lengthForAge;
      item.weightForAgeStatus = weightForAge;
      item.weightForLengthStatus = weightForLength;
    });
    return data; // Return the data with added statuses
  };

  const [fileName, setFileName] = useState("");
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFile(true);
    setFileName(file.name);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const line7Value = sheet["A7"].v;
      const barangayName = line7Value.split(":")[1].trim();
      const formattedBarangayName =
        barangayName.charAt(0).toUpperCase() +
        barangayName.slice(1).toLowerCase();
      const barangayJSON = {
        barangay: formattedBarangayName,
      };

      const json = XLSX.utils.sheet_to_json(sheet, { range: 8 });
      json.forEach((item) => {
        Object.assign(item, barangayJSON);
      });

      const transformedData = json.map((item) => {
        const transformedItem = {};
        for (const sourceKey in item) {
          if (keyMapping[sourceKey]) {
            if (
              sourceKey === "DOB" ||
              sourceKey === "DOW" ||
              sourceKey === "__EMPTY_4" ||
              sourceKey === "__EMPTY_3"
            ) {
              transformedItem[keyMapping[sourceKey]] = swapDayMonth(
                formatDateToYYYYMMDD(item[sourceKey])
              );
            } else if (sourceKey === "SEX" || sourceKey === "__EMPTY_2") {
              transformedItem[keyMapping[sourceKey]] = mapGender(
                item[sourceKey]
              );
            } else if (sourceKey === "P/T" || sourceKey === "__EMPTY_12") {
              transformedItem[keyMapping[sourceKey]] = mapPT(item[sourceKey]);
            } else {
              transformedItem[keyMapping[sourceKey]] = item[sourceKey];
            }
          }
        }
        return transformedItem;
      });
      const dataWithStatuses = calculateAndAddStatuses(transformedData);
      setJsonData(dataWithStatuses);

      // Use Promise.all to wait for all fetch requests to complete
      Promise.all(
        dataWithStatuses.map((item) =>
          fetch("http://127.0.0.1:8000/primarychild/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          })
            .then((response) => {
              if (response.status === 200 || response.status === 201) {
                setSuccess((prevSuccess) => prevSuccess + 1);
                setBarangay(item.barangay);
                return response.json();

                // IF IMPORT FAILED ---------------------------------------------------------------------------
              } else {
                // Search for data in primaryChild similar to item.name

                //FOR DUPLICATES | ERROR 500
                if (response.status === 500) {
                  setFailed((prevFailed) => prevFailed + 1);

                  fetch(
                    `http://127.0.0.1:8000/primarychild/?fullName=${encodeURIComponent(
                      item.fullName
                    )}`
                  )
                    .then((searchResponse) => {
                      if (searchResponse.status === 200) {
                        return searchResponse.json();
                      } else {
                        console.error("Failed to search data in primaryChild.");
                        throw new Error("Search failed");
                      }
                    })
                    .then((searchData) => {
                      // const primaryChildBarangay = searchData.length > 0 ? searchData[0].barangay : null;
                      const primaryChildBarangay = searchData[0].fullName;

                      // Create payload for duplicateChild -----------------------------------------------------------
                      const duplicateChildPayload = {
                        full_name: item.fullName,
                        first_barangay: primaryChildBarangay,
                        second_barangay: item.barangay,
                      };

                      // Send POST request to duplicateChild endpoint
                      fetch("http://127.0.0.1:8000/duplicateChild/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(duplicateChildPayload),
                      })
                        .then((duplicateChildResponse) => {
                          if (
                            duplicateChildResponse.status === 200 ||
                            duplicateChildResponse.status === 201
                          ) {
                            // Handle success if needed
                            console.log(
                              "Duplicate Child data sent successfully."
                            );
                          } else {
                            console.error(
                              "Failed to send data to the duplicateChild server."
                            );

                            // Check if the server returned an error status of 500
                            if (duplicateChildResponse.status === 500) {
                              console.error(
                                "Server error 500: An error occurred on the server."
                              );
                              // Handle additional actions for error 500 if needed
                            }
                          }
                        })
                        .catch((duplicateChildError) => {
                          console.error(
                            "Error sending data to duplicateChild:",
                            duplicateChildError
                          );
                        });
                      // -------------------------------------------------------------------------------------------
                    })
                    .catch((searchError) => {
                      console.error(
                        "Error searching data in primaryChild:",
                        searchError
                      );
                    });
                }
              }
            })
            .then((data) => {
              const userID = data.id;
              const healthInfoItem = {
                child: userID,
                dow: item.dow,
                height: item.height,
                weight: item.weight,
                purga: item.purga,
                vac: item.vac,
                gender: item.gender,
                lengthForAge: item.lengthForAgeStatus,
                weightForAge: item.weightForAgeStatus,
                weightForLength: item.weightForLengthStatus,
              };
              return fetch("http://127.0.0.1:8000/childhealthinfo/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...healthInfoItem,
                }),
              });
            })
            .then((response) => {
              setLoadingChilfInfo(true);
            })
            .catch((error) => {
              console.error("Error:", error);
            })
        )
      )
        .then(() => {
          const storedToken = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));
          fetch('http://127.0.0.1:8000/auth/users/me/', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${storedToken.data.access}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const auditCreatePayload = {
                    user: data.first_name + " " + data.last_name,  // Assuming you want to send the user data as part of the payload
                    action: 'Imported An Excel File',  // Replace 'your_action_here' with the actual action
                };
                fetch('http://127.0.0.1:8000/audit/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(auditCreatePayload),
                })
                    .then((auditResponse) => auditResponse.json())
                    .then((auditData) => {
                        console.log('Audit creation response:', auditData);
                    })
                    .catch((auditError) => {
                        console.error('Error creating audit:', auditError);
                    });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
  

          dispatch(setRefresher({ success: success2 + 1 }));
          setLoadingChilfInfo(false);
          setImporting(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ margin: "1%" }}>
      {!isImporting ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            variant="h2"
            gutterBottom
            style={{ color: colors.primary[100] }}
          >
            Barangay : {cuurentBarangay}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ color: colors.greenAccent[300] }}
            >
              Data Added
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              style={{ marginLeft: "10px", color: colors.greenAccent[300] }}
            >
              : {success}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{ color: colors.redAccent[300] }}
            >
              Failed Import
            </Typography>
            <Typography
              variant="h4"
              gutterBottom
              style={{ marginLeft: "10px", color: colors.redAccent[300] }}
            >
              : {failed}
            </Typography>
          </div>
          {/* <Button variant="contained" color="primary" style={{marginTop : '30px'}}>
              OK
            </Button> */}
        </Box>
      ) : (
        <div style={{ padding: "2%" }}>
          {!isFile ? (
            <Box display="flex" flexDirection="column" alignItems="center">
              <input type="file" onChange={handleFileUpload} />
            </Box>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4" gutterBottom>
                Importing Data from
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: "blue" }}>
                : {fileName}.
              </Typography>
            </div>
          )}
          {jsonData && (
            <div>
              <pre style={{ marginTop: "10px" }}>
                {(success > 0 || failed > 0) && (
                  <MessagePopup successCount={success} failureCount={failed} />
                )}
              </pre>
              {loadingChilfInfo ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                      color: colors.greenAccent,
                      marginTop: "5%",
                      marginRight: "auto",
                    }}
                  >
                    Finalizing Import, please wait
                    <LoadingDots />
                  </Typography>
                  {/* Your other components or loading indicators */}
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default connect(mapState)(ExcelToJSON);
