import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <button className="text-blue-500" onClick={() => navigate(-1)}>Back</button>
    );
} 