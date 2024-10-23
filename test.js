// const moment = require("moment-timezone");
import moment from "moment-timezone";
const convertTimeZone = (data, fromTimeZone, toTimeZone) => {
    return data.map(entry => {

        const dateTimeInSourceTZ = moment.tz(`2024-11-19T${String(entry.hour).padStart(2, '0')}:00:00`, fromTimeZone);

        // Convert the source time to the target timezone (Europe/London)
        console.log(dateTimeInSourceTZ);

        const convertedDateInTargetTZ = dateTimeInSourceTZ.tz(toTimeZone);
        console.log(convertedDateInTargetTZ.date());
        console.log(convertedDateInTargetTZ.month() + 1);
        console.log(convertedDateInTargetTZ.year());

        // Extract the date and hour after conversion
        const convertedDateString = `${convertedDateInTargetTZ.year()}-${String(convertedDateInTargetTZ.month() + 1).padStart(2, '0')}-${convertedDateInTargetTZ.date()}`;
        const convertedHour = convertedDateInTargetTZ.hour();

        return {
            date: convertedDateString,
            hour: convertedHour,
            formId: entry.formId,
            _id: entry._id,
            count: entry.count
        };
    });
}
let data =
    [
        {
            _id: '66eaffa27b9719bd56927a3d',
            formId: '66e05b5955fae4829266f6ea',
            date: '2024-09-19',
            hour: 0,
            count: 1,
            __v: 0
        }
    ]

// console.log(convertTimeZone(data, 'Asia/Kolkata', 'Asia/Singapore'));
const data1 = {
    questionType: 'text',
    title: 'What is the team name?',
    options: [],
    images: [],
    rows: [],
    columns: [],
};
console.log(!data1.published.slides[dropOffQuestion - 1]);
