import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const EditTimeTableForm = ({ masjidId }) => {
	const [namazTimeTable, setNamazTimeTable] = useState([
		{
			"masjidId": masjidId,
			"namazName": "FAJAR",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "ZOHAR",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "ASAR",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "MAGRIB",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "ISHA",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		},
		{
			"masjidId": masjidId,
			"namazName": "JUMA",
			"azaanTime": "",
			"jamaatTime": "",
			"startTime": "",
			"endTime": ""
		}
	]);
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(namazTimeTable);
		const createNamazTimeApi = `http://localhost:8080/api/namaz-time/update/${masjidId}`;
		const response = await axios.put(createNamazTimeApi, namazTimeTable, {
			headers: {
	  			'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
			},
		});
		if(response.status >= 200 && response.status <= 300){
			console.log("Masjid time table form submitted successfully.");
			navigate('/dashboard/masjid');
		} else {
			console.log("Error occure when submitting form");
		}
	}

	const fieldValueUpdate = (e, idx, fieldName) => {
           const newNamazTimeTable = [...namazTimeTable]; // Create a new copy of the array
         newNamazTimeTable[idx] = {
        ...newNamazTimeTable[idx], // Create a new copy of the object at the specified index
        [fieldName]: e.target.value,
    };
    setNamazTimeTable(newNamazTimeTable);
};


	useEffect(() => {
		console.log('use effect')
		// Get the details of the masjid
		// Note for update form: Get the details of the masjid with NamazTimeTable
		
			const getNamazTimeApi = `http://localhost:8080/api/namaz-time/${masjidId}`;
		 axios.get(getNamazTimeApi)
		 .then((response) => {
			setNamazTimeTable(response.data.namazTimeTable)
		 })
		 .catch((error) => {
			console.error("error while submitting form", error);
		 })
		
		
	}, [])

	return (
		<>
			<div className="flex w-[100%]">
				<form className="bg-white shadow-md rounded-md p-6" onSubmit={submitHandler}>
					<h2 className="text-2xl font-bold mb-4">Namaz Time Form</h2>
					{namazTimeTable.map((timetable, idx) => (
						<div key={idx}>
							{/* Namaz Name and Azaan Time in one line */}
							<div className="flex justify-between mb-4">
								<div className="w-1/5 mr-2">
									<label className="block text-sm font-semibold text-gray-600">
										Namaz Name
									</label>
									<div
										className="w-full block border rounded-md px-3 py-2 mt-1"
									>{namazTimeTable[idx].namazName}</div>
								</div>
								<div className="w-1/5 mr-2">
									<label className="block text-sm font-semibold text-gray-600">
										Azaan Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										value={namazTimeTable[idx].azaanTime}
										onChange={(e) => fieldValueUpdate(e, idx, 'azaanTime')}
										required
									/>
								</div>
								<div className="w-1/5 mr-2">
									<label className="block text-sm font-semibold text-gray-600">
										Jamaat Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'jamaatTime')}
										value={namazTimeTable[idx].jamaatTime}
										required
									/>
								</div>
								<div className="w-1/5 mr-2">
									<label className="block text-sm font-semibold text-gray-600">
										Start Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'startTime')}
										value={namazTimeTable[idx].startTime}
									/>
								</div>
								<div className="w-1/5 mb-4">
									<label className="block text-sm font-semibold text-gray-600">
										End Time
									</label>
									<input
										type="text"
										className="w-full border rounded-md px-3 py-2 mt-1"
										onChange={(e) => fieldValueUpdate(e, idx, 'endTime')}
										value={namazTimeTable[idx].endTime}
									/>
								</div>
							</div>
						</div>
					))}
					<button
						type="submit"
						className="bg-blue-500 text-white rounded-md px-4 py-2 font-semibold"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
}

export default EditTimeTableForm;