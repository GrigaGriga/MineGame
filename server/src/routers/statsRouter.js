const statsRouter = require('express').Router();
const checkId = require('../middlewares/checkId');
const { verifyRefreshToken, verifyAccessToken } = require('../middlewares/verifyTokens');
const StatsController = require('../controllers/StatsController');
// const upload = require('../middlewares/multer');

statsRouter.route('/allusers').get(StatsController.getAllUsers)
statsRouter.route('/usergames').get(verifyRefreshToken, StatsController.getAllUserGames)
statsRouter.route('/addStat').post(verifyAccessToken, StatsController.createStat);

// booksRouter.route('/:id/book').get(checkId, BooksController.getOne)
// booksRouter.route('/:id/book/comment').post(checkId, verifyAccessToken, BooksController.commentBook)

// booksRouter.route('/:id/edit').put(checkId, verifyAccessToken, BooksController.editBook);
// booksRouter.route('/:id/delete').delete(checkId, verifyAccessToken, BooksController.deleteOne);
// booksRouter.route('/:id/likeBook').post(checkId, verifyAccessToken, BooksController.likeBook);
// booksRouter.route('/:id/readBook').post(checkId, verifyAccessToken, BooksController.readBook);
// booksRouter.route('/:id/download').get(checkId, BooksController.downloadBook);
// booksRouter.route('/my').get(verifyAccessToken, BooksController.getMy)
// booksRouter.route('/favourite').get(verifyAccessToken, BooksController.getFavourite)
// booksRouter.route('/readed').get(verifyAccessToken, BooksController.getReaded)

module.exports = statsRouter;