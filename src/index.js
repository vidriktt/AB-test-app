import "./style.css";
import nightDayHours from "./modules/nightDayHours";

function outputToTextFormat(output) {
    return "Öö:        " + output[0] + "  tundi\nPäev:    " + output[1] + "  tundi";
}

const outputDiv = document.getElementById("output-div");
const errorP = document.getElementById("error-p");

document.getElementById("calculate-btn").addEventListener("click", () => {
    outputDiv.innerHTML = "";
    errorP.hidden = true;
    
    try {
        let output = nightDayHours(document.getElementById("start-time").value, document.getElementById("end-time").value);
        outputDiv.innerHTML = outputToTextFormat(output);
    } catch (error) {
        errorP.hidden = false;
        document.getElementById("error-msg").innerHTML = error.message.replace("!", ".");
    }
});
