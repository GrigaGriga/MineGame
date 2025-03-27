const questionsRouter = require('express').Router();
const checkId = require('../middlewares/checkId');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const QuestionsController = require('../controllers/QuestionsController');
// const upload = require('../middlewares/multer');

questionsRouter.route('/questions').get(QuestionsController.getAllQuestions)
questionsRouter.route('/themes').get(QuestionsController.getAllThemes)
// booksRouter.route('/:id/book').get(checkId, BooksController.getOne)
// booksRouter.route('/:id/book/comment').post(checkId, verifyAccessToken, BooksController.commentBook)
// booksRouter.route('/addbook').post(verifyAccessToken, upload.single('file'), BooksController.createBook);
// booksRouter.route('/:id/edit').put(checkId, verifyAccessToken, BooksController.editBook);
// booksRouter.route('/:id/delete').delete(checkId, verifyAccessToken, BooksController.deleteOne);
// booksRouter.route('/:id/likeBook').post(checkId, verifyAccessToken, BooksController.likeBook);
// booksRouter.route('/:id/readBook').post(checkId, verifyAccessToken, BooksController.readBook);
// booksRouter.route('/:id/download').get(checkId, BooksController.downloadBook);
// booksRouter.route('/my').get(verifyAccessToken, BooksController.getMy)
// booksRouter.route('/favourite').get(verifyAccessToken, BooksController.getFavourite)
// booksRouter.route('/readed').get(verifyAccessToken, BooksController.getReaded)

module.exports = questionsRouter;
