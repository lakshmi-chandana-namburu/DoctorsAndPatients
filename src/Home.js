import React,{useState,useEffect} from "react";
import axios from "axios"; // HTTP Requests (CRUD)
function Doctor(){
    const [doctors,setDoctors]=useState([]);
    // mount phase in functional component useEffect after component 
    // rendering the details are rendered.
    useEffect(()=>{
        const fetchDoctors=async()=>{
            try{
                // bringing the doctors details : name,age,specialization,gender,salary..
                const response=await axios.get('https://doctorbackend-z1sm.onrender.com/doctors');
                // initially in doctors no details
                setDoctors(response.data);
                // the doctors details are bought in page(updated)..get / retrieve information..
            }
            catch(error){
                console.log('Error in fetching the doctors : '+error);
            }
        }
        fetchDoctors(); // calling the function..
    },[]); // mount based on dependency
    return(
        <div>
            <center>
                <h2>Doctors</h2>
                {
                    doctors.map(doctor=>(
                        <div key={doctor.id}>
                            <p><strong>{doctor.name}</strong>-{doctor.specialization}</p>
                            <p>Doctor id : {doctor.id}</p>
                        </div>
                    ))
                }
            </center>
        </div>
    )
}

export default Doctor;
