import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { consts } from "@/util/APIEndpoints";
import { getLocalStorageItem } from "@/util/common";

const EditTimeTableForm = ({ masjidId }) => {
  const [namazTimeTable, setNamazTimeTable] = useState([
    {
      masjidId: masjidId,
      namazName: "FAJAR",
      azaanTime: "",
      jamaatTime: "",
      startTime: "",
      endTime: "",
    },
    {
      masjidId: masjidId,
      namazName: "ZOHAR",
      azaanTime: "",
      jamaatTime: "",
      startTime: "",
      endTime: "",
    },
    {
      masjidId: masjidId,
      namazName: "ASAR",
      azaanTime: "",
      jamaatTime: "",
      startTime: "",
      endTime: "",
    },
    {
      masjidId: masjidId,
      namazName: "MAGRIB",
      azaanTime: "",
      jamaatTime: "",
      startTime: "",
      endTime: "",
    },
    {
      masjidId: masjidId,
      namazName: "ISHA",
      azaanTime: "",
      jamaatTime: "",
      startTime: "",
      endTime: "",
    },
    {
      masjidId: masjidId,
      namazName: "JUMA",
      azaanTime: "",
      jamaatTime: "",
      startTime: "",
      endTime: "",
    },
  ]);
  const navigate = useNavigate();
  const token = getLocalStorageItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(namazTimeTable);
    const response = await axios.put(consts.EDIT_NAMAZ_TIME_API(masjidId), namazTimeTable, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status >= 200 && response.status <= 300) {
      console.log("Masjid time table form submitted successfully.");
      navigate("/m-admin/masjid");
    } else {
      console.log("Error occure when submitting form");
    }
  };

  const fieldValueUpdate = (e, idx, fieldName) => {
    const newNamazTimeTable = [...namazTimeTable]; // Create a new copy of the array
    newNamazTimeTable[idx] = {
      ...newNamazTimeTable[idx], // Create a new copy of the object at the specified index
      [fieldName]: e.target.value,
    };
    setNamazTimeTable(newNamazTimeTable);
  };

  const fetchNamazTimeTable = useCallback(async (masjidId) => {
    try {
      const GET_NAMAZ_TIMETABLE =  consts.GET_NAMAZ_TIMETABLE_API(masjidId);
      const response = await axios.get(GET_NAMAZ_TIMETABLE, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.namazTimeTable;
    } catch (error) {
      console.error("error while submitting form", error);
      throw error;
    }
  }, [token]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNamazTimeTable(masjidId);
        setNamazTimeTable(data);
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };
    fetchData();
  }, [masjidId, fetchNamazTimeTable]);

  return (
    <>
      <div className="container mx-auto">
        <div style={{ fontWeight: "400" }} className="evaFvq">
          Edit Namaz Time
        </div>
        <form
          className="bg-white shadow-md rounded-md p-6"
          onSubmit={submitHandler}
        >
          {namazTimeTable.map((timetable, idx) => (
            <div key={idx}>
              {/* Namaz Name and Azaan Time in one line */}
              <div className="flex justify-between mb-4 w-[50%]">
                <div className="w-1/3 mr-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Namaz Name
                  </label>
                  <div className="w-full block border rounded-md px-3 py-2 mt-1">
                    {namazTimeTable[idx].namazName}
                  </div>
                </div>
                <div className="w-1/3 mr-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Azaan Time
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    value={namazTimeTable[idx].azaanTime}
                    onChange={(e) => fieldValueUpdate(e, idx, "azaanTime")}
                    required
                  />
                </div>
                <div className="w-1/3 mr-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Jamaat Time
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    onChange={(e) => fieldValueUpdate(e, idx, "jamaatTime")}
                    value={namazTimeTable[idx].jamaatTime}
                    required
                  />
                </div>
              </div>
              <div className="flex mb-4 w-[50%]">
                <div className="w-1/3 mr-2">
                  <label className="block text-sm font-semibold text-gray-600">
                    Start Time
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    onChange={(e) => fieldValueUpdate(e, idx, "startTime")}
                    value={namazTimeTable[idx].startTime}
                  />
                </div>
                <div className="w-1/3 mb-4">
                  <label className="block text-sm font-semibold text-gray-600">
                    End Time
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-md px-3 py-2 mt-1"
                    onChange={(e) => fieldValueUpdate(e, idx, "endTime")}
                    value={namazTimeTable[idx].endTime}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

EditTimeTableForm.propTypes = {
	masjidId: PropTypes.string
}
export default EditTimeTableForm;
