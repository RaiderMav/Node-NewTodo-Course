var mongoose = require('mongoose')

var Todo = mongoose.model(`Todo`, {
  text: {
    type: String,
    required: true,
    minlength: [5, 'the value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'],
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: 'Number',
    default: null
  }
})

module.exports = {Todo}
