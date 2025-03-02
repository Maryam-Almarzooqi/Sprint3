const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// Enable CORS for all origins
app.use(cors()); 

// Function to fetch a random number from an external API with fallback
async function fetchRandomNumber() {
    try {
        const response = await axios.get(
            "https://www.random.org/integers/?num=1&min=1&max=6&col=1&base=10&format=plain&rnd=new"
        );
        return parseInt(response.data, 10); // Convert to integer
    } catch (error) {
        console.error("Error fetching random number, using fallback:", error);
        return Math.floor(Math.random() * 6) + 1; // Fallback: generate a random number
    }
}

// Endpoint to roll the dice
app.get("/roll", async (req, res) => {
    let dice = req.query.dice || "1d6"; // Default to "1d6"

    const randomRoll = await fetchRandomNumber();
    res.json({
        dice,
        roll: randomRoll,
    });
});

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
