const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    block: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      default: 3,
    },
    occupants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    isFull: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['available', 'maintenance', 'cleaning'],
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

roomSchema.pre('save', function (next) {
  if (this.occupants.length >= this.capacity) {
    this.isFull = true;
  } else {
    this.isFull = false;
  }
  next();
});

module.exports = mongoose.model('Room', roomSchema);
