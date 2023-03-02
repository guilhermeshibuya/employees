import { Fragment, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialFieldsState = {
    name: "",
    position: "",
    level: "",
    records: []
}

const positionsLevel = [
    "Intern",
    "Junior",
    "Senior"
]

const Edit = () => {
    const [fields, setFields] = useState(initialFieldsState);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/records/${id}`);

            if (!response.ok) {
                const message = `An error has ocurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with ${id} not found`);
                navigate("/");
                return;
            }

            setFields(record);
        }

        fetchData();
        return;
    }, [params.id, navigate]);

    const updateFields = value => {
        return setFields((prev) => {
            return { ...prev, ...value};
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedPerson = {
            name: fields.name,
            position: fields.position,
            level: fields.level
        }

        await fetch(`htttp://localhost:5000/records/update/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPerson)
        });

        navigate("/");
    }

    return (
        <Fragment>
            <h3>Update Record</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={fields.name}
                        onChange={(e) => updateFields({ name: e.currentTarget.value })}
                    />
                </Form.Group>

                <Form.Group controlId="position">
                    <Form.Label>Position</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={fields.position}
                        onChange={(e) => updateFields({ position: e.currentTarget.value })}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check 
                        type="radio"
                        name="positionOptions"
                        id="positionIntern"
                        value={positionsLevel[0]}
                        label={positionsLevel[0]}
                        checked={fields.level === positionsLevel[0]}
                        onChange={(e) => updateFields({ level: e.currentTarget.value })}
                    />
                    <Form.Check 
                        type="radio"
                        name="positionOptions"
                        id="positionJunior"
                        value={positionsLevel[1]}
                        label={positionsLevel[1]}
                        checked={fields.level === positionsLevel[1]}
                        onChange={(e) => updateFields({ level: e.currentTarget.value })}
                    />
                    <Form.Check 
                        type="radio"
                        name="positionOptions"
                        id="positionSenior"
                        value={positionsLevel[2]}
                        label={positionsLevel[2]}
                        checked={fields.level === positionsLevel[2]}
                        onChange={(e) => updateFields({ level: e.currentTarget.value })}
                    />
                </Form.Group>
                <Button
                    as="input"
                    type="submit"
                    value="Update Record"
                    variant="outline-primary"
                />
            </Form>
        </Fragment>
    );
}

export default Edit;