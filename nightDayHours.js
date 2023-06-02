function inputValidation(start, end) {
    if (typeof start !== "string" || typeof end !== "string") {
        return "Sisendandmed ei ole õiges formaadis (string)!";
    } else if (start.includes("-") || end.includes("-")) {
        return "Sisendandmete kellaaeg ei saa olla negatiivne!";
    } else if (start[2] !== ":" || end[2] !== ":") {
        return "Sisendandmed ei ole õiges formaadis (HH:MM)!";
    }

    let startSplit = start.split(":");
    let endSplit = end.split(":");
    if (!startSplit.concat(endSplit).every((item) => { return !isNaN(+item) })) {
        return "Sisendandmete kellaaeg ei koosne numbritest!";
    } else if (startSplit[0] > 23 || endSplit[0] > 23 || startSplit[1] > 59 || endSplit[1] > 59) {
        return "Sisendandmed ei vasta 24-tunnisele kellasüsteemile!";
    }

    const korrektsedMinutid = ["00", "15", "30", "45"];
    if (!korrektsedMinutid.includes(startSplit[1]) || !korrektsedMinutid.includes(endSplit[1])) {
        return "Sisendandmed ei ole korrektse intervalliga!";
    }
}

function extraMinutes(minutes) {
    if (minutes === 15) {
        return 0.25;
    } else if (minutes === 30) {
        return 0.5;
    } else if (minutes === 45) {
        return 0.75;
    }

    return 0;
}

function nightDayHours(start, end) {
    let uncorrectInput = inputValidation(start, end);
    if (uncorrectInput) {
        return uncorrectInput;
    }

    let [startH, startM] = start.split(":").map(Number);
    let [endH, endM] = end.split(":").map(Number);
    let outputNight = 0;
    let outputDay = 0;
    let hourCounter = startH;

    for (let i = startH; i <= 24 + startH; i++) {
        i === 24 && (hourCounter = 0);

        if (hourCounter >= 6 && hourCounter < 22) {
            if (i === startH) {
                outputDay += (1 - extraMinutes(startM));
            } else {
                if (hourCounter === endH) {
                    outputDay += extraMinutes(endM);
                    break;
                }

                outputDay++;
            }
        } else {
            if (i === startH) {
                outputNight += (1 - extraMinutes(startM));
            } else {
                if (hourCounter === endH) {
                    outputNight += extraMinutes(endM);
                    break;
                }

                outputNight++;
            }
        }

        hourCounter++;
    }

    return [outputNight, outputDay];
}

function outputToTextFormat(output) {
    return "öö:    " + output[0] + " tundi\npäev:  " + output[1] + " tundi";
}

console.log(outputToTextFormat(nightDayHours("14:00", "02:30")));

export default nightDayHours;
