import nightDayHours from "./src/modules/nightDayHours";

function outputToTextFormat(output) {
    return "öö:    " + output[0] + " tundi\npäev:  " + output[1] + " tundi";
}

try {
    console.log(outputToTextFormat(nightDayHours("14:00", "02:30")));
} catch (error) {
    console.log(error.message);
}
