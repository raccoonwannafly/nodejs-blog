const express = require("express");
const router = express.Router();
// Insert and retrieve data
const Post = require("../models/Post");

// Get /
// Home
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "NodeJS blog",
      description: "Simple blog created with NodeJS, Express & MongoDB",
    };

    let perPage = 10
    let page = req.query.page || 1

    console.log(page)

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await Post.count()
    const nextPage = parseInt(page) + 1
    const hasNextPage = nextPage <= Math.ceil(count / perPage)

    // const data = await Post.find();
    res.render("index", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.log(err);
  }

  // Render index
});

// Routes about page
router.get("/about", (req, res) => {
  // Render about
  res.render("about");
});

module.exports = router;

// // Get /
// // Home
// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJS blog",
//     description: "Siple blog created with NodeJS, Express & MongoDB"
//   }

//   try {
//     const data = await Post.find()
//   res.render('index',{ locals, data })
//   } catch (err) {
//     console.log(err)
//   }

//   // Render index
// })

// Post to database
// function insertPostData() {
//   Post.insertMany([
//     {
//       title: "Building a Blog",
//       body: "This is a body text"
//     },
//     {
//       title: "Building a Blog",
//       body: "This is a body text"
//     },
//     {
//       title: "Building a Blog",
//       body: "This is a body text"
//     },
//     {
//       title: "Building a Blog",
//       body: "This is a body text"
//     },
//     {
//       title: "Building a Blog",
//       body: "This is a body text"
//     }
//   ])
// }
// insertPostData()
