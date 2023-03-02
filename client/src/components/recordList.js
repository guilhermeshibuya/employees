import { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Record from "./record";

const RecordList = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const getRecords = async () => {
            const response = await fetch("http://localhost:5000/records");

            if (!response.ok) {
                const message = `An error ocurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();
        return;
    }, [records.length]);

    const deleteRecord = async (id) => {
        await fetch(`http://localhost:5000/records/${id}`, {
            method: "DELETE"
        });

        const newRecords = records.filter((el) => el._id !== id);
        setRecords(newRecords);
    }

    const recordList = () => {
        return records.map((record) => {
           return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record._id)}
                    key={record._id}
                />
           ); 
        });
    }

    return (
        <Fragment>
            <h3>Record List</h3>
            <Table bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </Table>
        </Fragment>
    );
}

export default RecordList;