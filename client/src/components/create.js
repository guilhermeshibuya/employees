import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const initialFieldsState = {
    name: "",
    position: "",
    level: ""
}

const positionsLevel = [
    "Intern",
    "Junior",
    "Senior"
]

const Create = () => {
    const [fields, setFields] = useState(initialFieldsState);

    const navigate = useNavigate();

    //Update the state properties
    const updateFields = value => {
        return setFields((prev) => {
            return { ...prev, ...value};
        });
    }


    //Handle the submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPerson = { ...fields };

        await fetch("http://localhost:5000/records/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPerson)
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        setFields(initialFieldsState);
        navigate("/");
    }

    return (
        <Fragment>
            <h3>Create new Record</h3>
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
                    value="Create person"
                    variant="outline-primary"
                />
            </Form>
        </Fragment>
    );
}

export default Create;