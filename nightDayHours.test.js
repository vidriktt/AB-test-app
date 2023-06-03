import nightDayHours from './nightDayHours';

describe("nightDayHours function", () => {

    test("returns correct array with sample case input (14.00 - 02:30)", () => {
        expect(nightDayHours("14:00", "02:30")).toEqual([4.5, 8]);
    });

    describe("throws error message", () => {
        test("with incorrect input not as strings", () => {
            expect(() => { nightDayHours(1400, 230) }).toThrow("Sisendandmed ei ole õiges formaadis (string)!");
        });
        test("with incorrect input containing a negative number", () => {
            expect(() => { nightDayHours("14:00", "-2:30") }).toThrow("Sisendandmete kellaaeg ei saa olla negatiivne!");
        });
        test("with incorrect input not formatted as HH:MM", () => {
            expect(() => { nightDayHours("1400", "02:30") }).toThrow("Sisendandmed ei ole õiges formaadis (HH:MM)!");
        });
        test("with incorrect input containing other characters than numbers", () => {
            expect(() => { nightDayHours("1a:00", "o2:30") }).toThrow("Sisendandmete kellaaeg ei koosne numbritest!");
        });
        test("with incorrect input not matching the 24-hour time system", () => {
            expect(() => { nightDayHours("25:00", "02:60") }).toThrow("Sisendandmed ei vasta 24-tunnisele kellasüsteemile!");
        });
        test("with incorrect input minutes in the wrong interval (00, 15, 30, 45)", () => {
            expect(() => { nightDayHours("14:01", "02:32") }).toThrow("Sisendandmed ei ole korrektse intervalliga!");
        });
    });

    describe("returns correct array", () => {
        test("with input start at night & end at day (05:00, 07:00)", () => {
            expect(nightDayHours("05:00", "07:00")).toEqual([1, 1]);
        });
        test("with input start at night & end at night (05:00, 04:00)", () => {
            expect(nightDayHours("05:00", "04:00")).toEqual([7, 16]);
        });
        test("with input start & end containing minutes (14:15, 02:45)", () => {
            expect(nightDayHours("14:15", "02:45")).toEqual([4.75, 7.75]);
        });
    });

});
