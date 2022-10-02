const mongoose = require("mongoose");

mongoose.model("courses",{
    subject: {
        type: Number,
    },
    schedule: [{
        day: {
            type: String,
        },
        start_h: {
            type: String,
        },
        end_h: {
            type: String,
        },
        location: {
            type: String,
        },
    }],
    academic_semester: {
        type: String,
    },
    start_date: {
        type: String,
    },
    end_date: {
        type: String,
    },
    group_number: {
        type: Number,
    },
    places: {
        type: Number,
    },
    professors: [{
        type: String,
    }],
    students_record: [{
        student: {
            type: String,
        },
        grades: [{
            type: Number,
        }]
    }]
}) 