function sisendiValideerimine(algus, lopp) {
    if (typeof algus !== "string" || typeof lopp !== "string") {
        return "Sisendandmed ei ole õiges formaadis (string)!";
    } else if (algus[2] !== ":" || lopp[2] !== ":") {
        return "Sisendandmed ei ole õiges formaadis (HH:MM)!";
    } else if (algus.includes("-") || lopp.includes("-")) {
        return "Sisendandmete kellaaeg ei saa olla negatiivne!";
    }

    let algusSplit = algus.split(":");
    let loppSplit = lopp.split(":");
    if (!algusSplit.concat(loppSplit).every((item) => { return !isNaN(+item) })) {
        return "Sisendandmed ei ole õiges formaadis (HH:MM)!";
    } else if (algusSplit[0] > 24 || loppSplit[0] > 24 || algusSplit[1] > 60 || loppSplit[1] > 60) {
        return "Sisendandmed ei vasta 24-tunnisele kellasüsteemile!";
    }

    const korrektsedMinutid = ["00", "15", "30", "45"];
    if (!korrektsedMinutid.includes(algusSplit[1]) || !korrektsedMinutid.includes(loppSplit[1])) {
        return "Sisendandmed ei ole korrektse intervalliga!";
    }
}

function dayNightHours(algus, lopp) {
    let ebakorrektne = sisendiValideerimine(algus, lopp);
    if (ebakorrektne) {
        return ebakorrektne;
    }

    // let [algusH, algusM] = algus.split(":");
    // let [loppH, loppM] = lopp.split(":");

    return "";
}

console.log(dayNightHours("14:00", "02:30"));