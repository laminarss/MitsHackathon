let data = []; // Global variable to store uploaded data
let client_data = []; // Stores data received from the backend

function generateData() {
    if (data.length === 0) {
        alert("No data available to send!");
        return;
    }

    console.log("Sending data to backend...", data);

    fetch("http://your-backend-url.com/upload-data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ salesData: data }) // Sending data as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to send data.");
        }
        return response.json();
    })
    .then(result => {
        console.log("Server Response:", result);
        client_data = result.processedData || []; // Assign received data to client_data
        alert("Data successfully sent and received!");
        console.log("Updated client_data:", client_data);
    })
    .catch(error => {
        console.error("Error sending data:", error);
        alert("Failed to send data. Check the console for errors.");
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById("fileName").innerText = "Uploaded: " + file.name;
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const fileType = file.name.split('.').pop().toLowerCase();

        if (fileType === "csv") {
            appendCSVData(content);
        } else if (fileType === "json") {
            appendJSONData(content);
        } else if (fileType === "txt") {
            appendTXTData(content);
        } else {
            alert("Unsupported file format. Please upload CSV, JSON, or TXT.");
        }
    };

    reader.readAsText(file);
}

function appendCSVData(content) {
    const rows = content.split("\n").map(row => row.split(",").map(col => col.trim()));
    data.push(...rows);
}

function appendJSONData(content) {
    try {
        const jsonData = JSON.parse(content);
        data.push(...jsonData);
    } catch (error) {
        alert("Invalid JSON file.");
    }
}

function appendTXTData(content) {
    data.push(content.split("\n").map(line => line.trim()));
}