const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const databaseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tables: [
    {
      name: String,
      columns: [
        {
          name: String,
          dataType: String,
          required: Boolean,
          primaryKey: Boolean
        }
      ],
      connections: [
        {
          originKey: String,
          destinationTable: String,
          destinationKey: String
        }
      ]
    }
  ]
});

module.exports = mongoose.models.Database || mongoose.model('Database', databaseSchema);