const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      default: null,
    },
    photo: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.password, salt);

  this.password = hashed;

  return next();
});

UserSchema.methods.comparePassword = async function (inputPassword) {
  const valid = await bcrypt.compare(inputPassword, this.password);
  return valid;
};

module.exports = mongoose.model('User', UserSchema);
