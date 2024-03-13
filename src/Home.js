import React,{useState,useEffect} from "react";
import axios from "axios";
import EditPatient from "./EditPatient";
function Home(){
    const [patients,setPatients]=useState([]);
    const [doctors,setDoctors]=useState([]);
    const [selectedDoctorId,setSelectedDoctorId]=useState(null);
    const [editPatientId,setEditPatientId]=useState(null);

    useEffect(()=>{
        const fetchPatientsAndDoctors=async ()=>{
            try{
                const patientsResponse=await axios.get('https://backendhospital-ji3g.onrender.com/patients');
                const doctorsResponse=await axios.get('https://backendhospital-ji3g.onrender.com/doctors');
                setPatients(patientsResponse.data);
                setDoctors(doctorsResponse.data);
            }
            catch(error){
                console.log('error in fetching info',error);
            }
        }
        fetchPatientsAndDoctors();
    },[]);

    const handleDoctorChange=(event)=>{
        const selectedDoctorId=parseInt(event.target.value);
        setSelectedDoctorId(selectedDoctorId);
    };
    // filter patients in table
    const filteredPatients=setSelectedDoctorId ? patients.filter(patient=>patient.doctor.id===selectedDoctorId) : patients;
    // editing
    const handleEdit=(patientId)=>{
        setEditPatientId(patientId);
    }
    // close edit
    const handleCloseEdit=()=>{
        setEditPatientId(null);
    }
    // update
    const handleUpdate=()=>{
        setEditPatientId(null);
    }
    // delete
    const handleDelete=async (patientId)=>{
        try{
            await axios.delete(`https://backendhospital-ji3g.onrender.com/patients/${patientId}`);
            setPatients((prevPatients)=>prevPatients.filter((patient)=>patient.id !== patientId));
        }
        catch(error){
            console.log('error in deleting patient ',error);
        }
    }
    return(
        <div>
            <h2>Patients</h2>
            <label>Select Doctor : </label>
            {/* creating a dropdown to show the or seledt the assigned doctors from doctor api */}
            <select onChange={handleDoctorChange}>
                <option value={null}>All Doctors</option>
                {doctors.map((doctor)=>(
                    <option key={doctor.id} value={doctor.id}>{doctor.name}-{doctor.specialization}</option>
                ))}
            </select>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Disease</th>
                        <th>Doctor</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPatients.map((patient)=>{
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.weight}</td>
                                <td>{patient.age}</td>
                                <td>{patient.disease}</td>
                                <td>{patient.doctor.name}-{patient.doctor.specialization}</td>
                                <td><button onClick={()=>handleEdit(patient.id)}>Edit</button></td>
                                <td><button onClick={()=>handleDelete(patient.id)}>Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {
                editPatientId !== null && (
                    <EditPatient patientId={editPatientId}
                    onClose={handleCloseEdit} onUpdate={handleUpdate}></EditPatient>
                )
            }
        </div>
    )
}

export default Home;