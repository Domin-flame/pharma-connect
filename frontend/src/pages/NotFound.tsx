import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (): React.ReactElement => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            <div className="text-center">
                <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                <button 
                    onClick={() => navigate("/")}>
                    Go Home
                </button>


            </div>
            
        </div>
    );
}

export default NotFound;