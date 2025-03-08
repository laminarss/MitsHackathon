import React, { useState } from "react";

const FileProcessor = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleGenerate = () => {
        if (!selectedFile) {
            alert("Please upload a file!");
            return;
        }
        alert(`Processing file: ${selectedFile.name}`);
    };

    const handleDownload = () => {
        if (!selectedFile) {
            alert("No file available to download!");
            return;
        }
        const url = window.URL.createObjectURL(new Blob(["Generated Content"]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "processed_file.txt");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="">
            <div className="">
               
                <label className="">
                    <input type="file" className="hidden" onChange={handleFileChange} />
                    {selectedFile ? `📂 ${selectedFile.name}` : "Choose a File"}
                </label>

                {/* Display File Name */}
                {selectedFile && (
                    <p className="mt-3 text-gray-600 text-sm">{selectedFile.name}</p>
                )}

                <button
                    onClick={handleGenerate}
                    className=""
                >
                    Generate File
                </button>

                <button
                    onClick={handleDownload}
                    className=""
                >
                    Download File
                </button>
            </div>
        </div>
    );
};

export default FileProcessor;
