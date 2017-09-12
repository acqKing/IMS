var blog = require('./blog');

module.exports = function(api) {
  api.route('/api/blog')
    .get(function(req, res) {
      res.json(blog);
    });

//   api.route('/api/books/:id')
//     .get(function(req, res) {
//       var model = collection.get(req.params.id);
//       res.json(model);
//     });
};
