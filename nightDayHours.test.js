import nightDayHours from './nightDayHours';

describe("nightDayHours function", () => {
    test("returns correct array with sample case input (14.00 - 02:30)", () => {
        expect(nightDayHours("14:00", "02:30")).toEqual([4.5, 8]);
    });
});
