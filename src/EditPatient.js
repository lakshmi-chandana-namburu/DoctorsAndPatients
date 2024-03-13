import React,{useState,useEffect} from "react";
import axios from "axios";

const EditPatient=(patientId,onClose,onUpdate)=>{
    const [patientData,setPatientData]=useState({});
    useEffect(()=>{
        // get to bring the patient details from api where created in patient.js component
        const fetchPatientData=async ()=>{
            // based on patient id fetching the details
            try{
                const response=await axios.get(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`);
            }
            catch(error){
                console.log('error in fetching data for changing',error);
            }
        }
        fetchPatientData();
    },[patientId]);

    const handleUpdate=async ()=>{
        try{
            await axios.put(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`,patientData);
            onClose();
            onUpdate();
        }
        catch(error){
            console.log('error in updating patient info',error);
        }
    }

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setPatientData({...patientData,[name]:value});
    }
    
    return(
        <div>
        <h2>Edit Patient</h2>

        <label>Name : </label>
        <input type="text" name="name" value={patientData.name || ''} onChange={handleChange}/><br></br>
        <label>Weight : </label>
        <input type="text" name="weight" value={patientData.weight || ''} onChange={handleChange}/><br></br>
        <label>Gender : </label>
        <input type="text" name="gender" value={patientData.gender || ''} onChange={handleChange}/><br></br>
        <label>Age : </label>
        <input type="text" name="age" value={patientData.age || ''} onChange={handleChange}/><br></br>
        <label>Disease : </label>
        <input type="text" name="disease" value={patientData.name || ''} onChange={handleChange}/><br></br>

        <button onClick={handleUpdate}>Update</button>
        <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default EditPatient;