import { useNavigate } from "react-router-dom";

export function BackButton() {
    const navigate = useNavigate();
    return (
        <div className="mb-4 flex justify-start">
            <button className="text-blue-500" onClick={() => navigate(-1)}>Back</button>
        </div>
    );
} 