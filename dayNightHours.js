function sisendiValideerimine(algus, lopp) {
    if (typeof algus !== "string" || typeof lopp !== "string") {
        return "Sisendandmed ei ole õiges formaadis (string)!";
    } else if (algus.includes("-") || lopp.includes("-")) {
        return "Sisendandmete kellaaeg ei saa olla negatiivne!";
    } else if (algus[2] !== ":" || lopp[2] !== ":") {
        return "Sisendandmed ei ole õiges formaadis (HH:MM)!";
    }

    let algusSplit = algus.split(":");
    let loppSplit = lopp.split(":");
    if (!algusSplit.concat(loppSplit).every((item) => { return !isNaN(+item) })) {
        return "Sisendandmete kellaaeg ei koosne numbritest!";
    } else if (algusSplit[0] > 23 || loppSplit[0] > 23 || algusSplit[1] > 59 || loppSplit[1] > 59) {
        return "Sisendandmed ei vasta 24-tunnisele kellasüsteemile!";
    }

    const korrektsedMinutid = ["00", "15", "30", "45"];
    if (!korrektsedMinutid.includes(algusSplit[1]) || !korrektsedMinutid.includes(loppSplit[1])) {
        return "Sisendandmed ei ole korrektse intervalliga!";
    }
}

function lisaMinutid(M) {
    if (M === 15) {
        return 0.25;
    } else if (M === 30) {
        return 0.5;
    } else if (M === 45) {
        return 0.75;
    }

    return 0;
}

function ooPaevTunnid(algus, lopp) {
    let ebakorrektne = sisendiValideerimine(algus, lopp);
    if (ebakorrektne) {
        return ebakorrektne;
    }

    let [algusH, algusM] = algus.split(":").map(Number);
    let [loppH, loppM] = lopp.split(":").map(Number);
    let valjundOo = 0;
    let valjundPaev = 0;
    let tunniLoend = algusH;

    for (let i = algusH; i <= 24 + algusH; i++) {
        i === 24 && (tunniLoend = 0);

        if (tunniLoend >= 6 && tunniLoend < 22) {
            if (i === algusH) {
                valjundPaev += (1 - lisaMinutid(algusM));
            } else {
                if (tunniLoend === loppH) {
                    valjundPaev += lisaMinutid(loppM);
                    break;
                }

                valjundPaev++;
            }
        } else {
            if (i === algusH) {
                valjundOo += (1 - lisaMinutid(algusM));
            } else {
                if (tunniLoend === loppH) {
                    valjundOo += lisaMinutid(loppM);
                    break;
                }

                valjundOo++;
            }
        }

        tunniLoend++;
    }

    return "öö:    " + valjundOo + " tundi\npäev:  " + valjundPaev + " tundi";
}

console.log(ooPaevTunnid("14:00", "02:30"));
