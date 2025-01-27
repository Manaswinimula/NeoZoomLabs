import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const OutContainer = styled.div`
padding-left:14px;
`;
const Container = styled.div`
  margin-top: 100px;
  display: flex;
  align-items:center;
`;
const Button = styled.button`
  margin: 10px;
  background-color: rgb(0, 128, 128);
  color: white;
  border: 0 solid;
  border-radius: 10px;
  padding: 10px;
  width: 150px;

  &:hover {
    background-color: #00cccc;
  }
`;
const FileInput = styled.input`
  display: none;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RadioButtonCont = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 180px;
  height: 180px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  over-flow-y: auto;
`;

const DropdownCont = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 220px;
  height: 120px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  over-flow-y: auto;
`;

const DPI = styled.div`
  display:flex;
  gap:6px;
  margin: 20px;
  align-items: flex-start;
  width: 260px;
  height: 70px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;

`

const ManualCont = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 220px;
  height: 200px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;

`;

const SelectDropdown = styled.select`
  padding: 2px;
`;

const RadioButtons = styled.div`
  display: flex;
  align-items:center;
`;
const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    color: #007777;
  }
`;
const Input = styled.input`
  font-size: 14px;
  padding: 2px;
`;
const SectionTitle = styled.h4`
  margin-bottom: 15px;
  color: #007777;
  font-weight: bold;
  font-size: 20px;
`;
const SelectedFilesBox = styled.div`
  margin-top: 20px;
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  overflow: auto;
`;
const FileList = styled.ul`
  padding: 0;
  list-style-type: none;
`;
const FileItem = styled.li`
  margin: 5px 0;
  color: #333;
`;
const SubmitButton = styled.button`
  border: 0 solid;
  border-radius: 10px;
  padding: 10px;
  color: white;
  background-color: rgb(135, 5, 5);
  margin: 10px;

  &:hover {
    background-color: rgb(231, 47, 47);
  }
`;
const SubmitCont = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 50px;
`;


const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  max-height: 80vh; /* Set a maximum height for the modal */
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  z-index: 1000;
  overflow-y: auto; /* Enable vertical scrolling */
`;



const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  color: #555;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  float: right;

  &:hover {
    color: red;
  }
`;
const SaveButton = styled(SubmitButton)`
  background-color: rgb(0, 128, 0);

  &:hover {
    background-color: rgb(0, 200, 0);
  }
`;


const SizeContainer = styled.div`
  margin-left: 160px;
`;

const DateContainer = styled.div`
 
  align-items: flex-start;
  width: 300px;
  height: 120px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;

  h5{
  color: #007777;
  }
`;

const Select = styled.select`
  border: 1px solid #d1d5db;
  // border-radius: 0.5rem;
  padding: 0.3rem;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;




function Dashboard() {
  const [filePath, setFilePath] = useState([]);
  const [selectedDPI, setSelectedDPI] = useState("Select an option");
  const [selectedSize, setSelectedSize] = useState("Select an option");
  const [manualHeight, setManualHeight] = useState("");
  const [manualWidth, setManualWidth] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [sizeOption, setSizeOption] = useState("select size");
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    day: `${today.getDate()}`,
    month: today.toLocaleString("default", { month: "long" }),
    year: `${today.getFullYear()}`,
  });

  const daysInMonth = (year, monthIndex) => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  const getDaysForSelectedMonthYear = () => {
    const year = parseInt(selectedDate.year, 10);
    const monthIndex = months.indexOf(selectedDate.month);
    return Array.from({ length: daysInMonth(year, monthIndex) }, (_, i) => `${i + 1}`);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 101 }, (_, i) => `${today.getFullYear() - i}`);

  const handleDateChange = (key, value) => {
    setSelectedDate((prev) => {
      const newDate = { ...prev, [key]: value };

      if (key === "month" || key === "year") {
        const monthIndex = months.indexOf(newDate.month);
        const maxDays = daysInMonth(parseInt(newDate.year, 10), monthIndex);
        if (parseInt(newDate.day, 10) > maxDays) {
          newDate.day = `${maxDays}`;
        }
      }

      return newDate;
    });
  };

  const isDayDisabled = (day) => {
    const selectedFullDate = new Date(
      `${selectedDate.year}-${months.indexOf(selectedDate.month) + 1}-${day}`
    );
    return selectedFullDate > today;
  };



  useEffect(() => {
    const savedFilePaths = JSON.parse(localStorage.getItem("filePaths")) || [];
    const savedDPI = localStorage.getItem("selectedDPI") || "Select an option";
    const savedSize = localStorage.getItem("selectedSize") || "Select an option";

    setFilePath(savedFilePaths);
    setSelectedDPI(savedDPI);
    setSelectedSize(savedSize);
  }, []);

  useEffect(() => {
    localStorage.setItem("filePaths", JSON.stringify(filePath));
    localStorage.setItem("selectedDPI", selectedDPI);
    localStorage.setItem("selectedSize", selectedSize);
  }, [filePath, selectedDPI, selectedSize]);

  



  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      setErrorMessage("No files selected.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);  
    });

    
    try {
      const response = await axios.post('http://localhost:5295/api/Files/folder/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const filePaths = response.data;
      setFilePath(filePaths); 

      console.log("Received file paths:", filePaths);
    } catch (error) {
      console.error("Error fetching file paths", error);
      setErrorMessage("Error fetching file paths. Please try again.");
    }
};
  
  
  

  const handleSubmit = () => {

    if (selectedDPI === "Select an option") {
      setErrorMessage("Please select a DPI option.");
      return;
    }

    

   
    if (sizeOption === "select size") {
      if (selectedSize === "Select an option") {
        setErrorMessage("Please select a size from the dropdown.");
        return;
      }
    } else if (sizeOption === "manual size") {
      if (!manualHeight || !manualWidth) {
        setErrorMessage("Please provide both height and width for manual size.");
        return;
      }
    }
    

    setShowModal(true);
  };

  const handleSave = () => {


    const size = selectedSize !== "Select an option"
    ? selectedSize
    : manualHeight && manualWidth
    ? `${manualHeight}x${manualWidth}`
    : "Not Provided";

    const data = {
      filePath,
      selectedDPI,
      selectedSize :size,
    };

    console.log("Data Saved:", data);
    alert("Data has been saved successfully!");
    setShowModal(false);
  };

  


  const handleDPIChange = (e) => {
    setSelectedDPI(e.target.value);
    if (e.target.value !== "Select an option"){
      setErrorMessage("");
    }
  }

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    if (e.target.value !== "Select an option"){
      setErrorMessage("");
    }
  }


  
  const handleHeightChange = (e) => {
    setManualHeight(e.target.value);
    if (e.target.value && manualWidth) {
      setErrorMessage(""); 
    }
  };

  const handleWidthChange = (e) => {
    setManualWidth(e.target.value);
    if (manualHeight && e.target.value) {
      setErrorMessage(""); 
    }
  };

  return (
    <OutContainer>
      <Container>
        <ButtonContainer>
          <Button onClick={() => document.getElementById("source-file-input").click()}>
            Source Folder
          </Button>

        </ButtonContainer>

        <FileInput
          type="file"
          id="source-file-input"
          multiple
          webkitdirectory="true" 
          onChange={handleFileUpload}
        />

        {filePath && filePath.length > 0 && (
          <SelectedFilesBox>
            <SectionTitle>Selected Files</SectionTitle>
            <FileList>
              {filePath.map((path, index) => (
                <FileItem key={index}>{path}</FileItem>
              ))}
            </FileList>
          </SelectedFilesBox>
        )}

        <DPI>
          <SectionTitle>DPI</SectionTitle>
          <SelectDropdown value={selectedDPI} onChange={handleDPIChange}>
            <option id="Select an option" value="Select an option">
              Select an option
            </option>
            <option id="200" value="200">
              200
            </option>
            <option id="250" value="250">
              250
            </option>
            <option id="300" value="300">
              300
            </option>
          </SelectDropdown>
        </DPI>
        
        </Container>
        <SizeContainer>
        <RadioButtons>
          <Input 
          type="radio"
          value='select size'
          checked={sizeOption === "select size"}
          onChange={(e)=> setSizeOption(e.target.value)} />
        <DPI>
          <SectionTitle>Sizes</SectionTitle>
          <SelectDropdown 
          value={selectedSize} 
          onChange={handleSizeChange}
          disabled={sizeOption !== "select size"}
          >
            <option id="Select an option" value="Select an option">
              Select an option
            </option>
            <option id="12x18" value="12x18">
              12 x 18
            </option>
            <option id="12x15" value="12x15">
              12 x 15
            </option>
            <option id="10x15" value="10x15">
              10 x 15
            </option>
            <option id="8x12" value="8x12">
              8 x 12
            </option>
          </SelectDropdown>
        </DPI>

        <Input 
          type="radio"
          value='manual size'
          checked={sizeOption === "manual size"}
          onChange={(e)=> setSizeOption(e.target.value)} />
        <ManualCont>
        <Label>Height</Label>
          <Input
            type="number"
            placeholder="Enter the height"
            value={manualHeight}
            onChange={handleHeightChange} 
            disabled={sizeOption !== "manual size"}
          />


          <Label>Width</Label>
          <Input
            type="number"
            placeholder="Enter the width"
            value={manualWidth}
            onChange={handleWidthChange} 
            disabled= {sizeOption !== "manual size"}
          />
        </ManualCont>
        </RadioButtons>
        
        </SizeContainer>

      {errorMessage && <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>}


      <DateContainer>
      <h5>Enter the Date</h5>
      <Select
        value={selectedDate.month}
        onChange={(e) => handleDateChange("month", e.target.value)}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </Select>

      <Select
        value={selectedDate.day}
        onChange={(e) => handleDateChange("day", e.target.value)}
      >
        {getDaysForSelectedMonthYear().map((day) => (
          <option key={day} value={day} disabled={isDayDisabled(day)}>
            {day}
          </option>
        ))}
      </Select>

      <Select
        value={selectedDate.year}
        onChange={(e) => handleDateChange("year", e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      </DateContainer>

      <SubmitCont>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </SubmitCont>

      {showModal && (
        <>
          <Overlay onClick={() => setShowModal(false)} />
          <Modal>
            <CloseButton onClick={() => setShowModal(false)}>×</CloseButton>
            <SectionTitle>Preview</SectionTitle>
            <p>
              <strong>DPI:</strong> {selectedDPI}
            </p>
            <p>
              <strong>Size:</strong>{" "}
              {selectedSize !== "Select an option"
                ? selectedSize
                : manualHeight && manualWidth
                ? `${manualHeight}x${manualWidth}`
                : "Not Provided"}
            </p>
            <p>
              <strong>Selected Files:</strong>
            </p>
            <FileList>
              {filePath.map((path, index) => (
                <FileItem key={index}>{path}</FileItem>
              ))}
            </FileList>
            <SaveButton onClick={handleSave}>Save</SaveButton>
          </Modal>
        </>
      )}
    </OutContainer>
  );
}

export default Dashboard;
