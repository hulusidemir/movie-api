const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema ({
    director_id: Schema.Types.ObjectId,
    title: {
        type : String,
        required: [true, `{PATH} alanı zorunludur`],
        maxlength: [10, `{PATH} alanına {MAXLENGTH} 'dan fazla değer girilemez!`],
        minlength: [2, `{PATH} alanına ({MINLENGTH}) 'dan az değer girilemez!`]
    },
    category: String,
    country : String,
    year : Number,
    imbdb_score: Number,
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('movie',MovieSchema);