import React, { useState } from "react";
import axios from "axios";

function Patient(){
    // wrapping all the details in use state or else you can use const [name,setName]=useState("");
    const [patientData,setPatientData]=useState({
        name:'',
        weight:'',
        gender:'',
        age:'',
        disease:'',
        doctorId:null,
    })
    // to change the patients data value and e is random argument
    // value - current value what you entered in the input box - e.target - current value
    const handleChange=(e)=>{
        const {name,value}=e.target; // name:property like disease and value: 23,fever etc..
        // so updated value through e.target is updated added by spread operator.
        setPatientData({...patientData,[name]:value});

    }
    const handleSubmit=async (e)=>{
        e.preventDefault(); // submission behaviour is handled
        try{
            const response=await axios.post('https://backendhospital-ji3g.onrender.com/patients',patientData);
            console.log('patient data is created : ',response.data);
        }
        catch(error){
            console.log("error in creating patient details : ",error);
        }
    }
    return(
        <div>
            <h2>Register the Patient Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={patientData.name} onChange={handleChange}/><br></br>
                <label>Weight:</label>
                <input type="text" name="weight" value={patientData.weight} onChange={handleChange}/><br></br>
                <label>Gender:</label>
                <input type="text" name="gender" value={patientData.gender} onChange={handleChange}/><br></br>
                <label>Age:</label>
                <input type="text" name="age" value={patientData.age} onChange={handleChange}/><br></br>
                <label>Disease:</label>
                <input type="text" name="disease" value={patientData.disease} onChange={handleChange}/><br></br>
                <label>Doctor ID:</label>
                <input type="text" name="doctorid" value={patientData.doctorId} onChange={handleChange}/><br></br>
                <button type="submit">Submit Patient Info</button>
            </form>
        </div>
    )
}

export default Patient;