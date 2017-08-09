var index = require('./index');

module.exports = function(api) {
  api.route('/api/index')
    .get(function(req, res) {
      res.json(index);
    });

//   api.route('/api/books/:id')
//     .get(function(req, res) {
//       var model = collection.get(req.params.id);
//       res.json(model);
//     });
};
