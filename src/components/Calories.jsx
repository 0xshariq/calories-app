import { useState } from "react";

function Calories() {
  const [activity, setActivity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getCalories = async () => {
    const apiKey = "c4N0gXW1zyrSkuVUWCdRuQ==52IOjUi1WsDoQgNp";
    const apiUrl = `https://api.api-ninjas.com/v1/caloriesburned?activity=${activity}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network Connection Error");
      }

      const data = await response.json();
      setData(data);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = () => {
    getCalories();
  };

  const handleReset = () => {
    setData(null);
    setActivity("");
    setError("");
  };

  return (
    <div className="container">
      <h1>Calories Burned By the Activities</h1>
      <input
        type="text"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        placeholder="Enter activity"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && data.length > 0 ? (
        <>
          <div>
            <p className="activity-name-1">{data[0].name}</p>
            <p className="total-calories-burned-1">{data[0].total_calories}</p>
          </div>
          <div>
            <p className="activity-name-2">{data[1].name}</p>
            <p className="total-calories-burned-2">{data[1].total_calories}</p>
          </div>
          <div>
            <p className="activity-name-3">{data[2].name}</p>
            <p className="total-calories-burned-3">{data[2].total_calories}</p>
          </div>
        </>
      ) : (
        data && <p>No data available</p>
      )}
      <br />
      <button onClick={handleSubmit}>Get Data</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Calories;
