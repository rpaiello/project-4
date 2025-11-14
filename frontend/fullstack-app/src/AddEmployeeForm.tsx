import {useState} from "react";
import axios from "axios";
const BASE_API_URL = "http://localhost:3000"


interface NewEmployeeData {
    emp_id: number,
    emp_name: string,
    emp_salary: number,
    dep_id: number
}

function AddEmployeeForm({onEmployeeAdded} : any) {
    const [id, setID] = useState(0);
    const [name, setName] = useState('');
    const [salary, setSalary] = useState(0);
    const [department, setDepartment] = useState(0);

    const handleFormChange = (event: any) => {
        const target = event.target.id;
        if (target == 'id') setID(event.target.value);
        if (target == 'name') setName(event.target.value);
        if (target == 'salary') setSalary(event.target.value);
        if (target == 'depid') setDepartment(event.target.value);
    }

    const handleSubmit = async(event: any) => {
        event.preventDefault();

        try {
            const response = await axios.post<NewEmployeeData>(`${BASE_API_URL}/api/employees`, {emp_id: id, emp_name: name, emp_salary: salary, dep_id: department});

            onEmployeeAdded(response.data);
            setID(0);
            setName('');
            setSalary(0);
            setDepartment(0);
            
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">ID</label>
                <input type="text" placeholder="ID" id="id" value={id} onChange={handleFormChange} />
                <label htmlFor="name">Name</label>
                <input type="text" placeholder="Name" id="name" value={name} onChange={handleFormChange} />
                <label htmlFor="salary">Salary</label>
                <input type="text" placeholder="Salary" id="salary" value={salary} onChange={handleFormChange} />
                <label htmlFor="depid">Department</label>
                <input type="text" placeholder="Department ID" id="depid" value={department} onChange={handleFormChange} />
                <input type="submit" />
            </form>
        </>
    )
}

export default AddEmployeeForm;