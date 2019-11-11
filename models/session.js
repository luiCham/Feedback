const mongoose = require ('mongoose');

const sessionsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    data:{
      type: mongoose.Schema.Types.Mixed,
    },
    usedAt:{
      type:     Date,
    },
});

module.exports=mongoose.model('sessions', sessionsSchema);