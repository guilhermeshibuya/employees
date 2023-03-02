import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Record = (props) => {
    return (
        <tr>
            <td>{props.record.name}</td>
            <td>{props.record.position}</td>
            <td>{props.record.level}</td>
            <td>
                <Link 
                    to={`/edit/${props.record._id}`}
                    className="btn btn-link"
                >
                    Edit
                </Link>
                <Button 
                    variant="link"
                    onClick={() => {
                        props.deleteRecord(props.record._id);
                    }}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export default Record;