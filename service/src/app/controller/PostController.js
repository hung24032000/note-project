const PostModel = require("../models/PostModel");
class PostController {
    // GET -- api/post/
    // Get All Post
    // Private
    async index(req, res) {
        try {
            const posts = await PostModel.find({
                user: req.userId,
            }).populate("user", ["username"]);
            res.json({ success: true, posts });
        } catch (error) {
            console.log(error.message);
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }
    // Post -- api/post/
    // Post create Post
    // Private
    async store(req, res) {
        const { title, description, url, status } = req.body;
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: "Please enter a title." });
        try {
            const post = await PostModel.find({ title, user: req.userId });
            console.log(post);
            if (post.length) {
                return res
                    .status(400)
                    .json({ success: false, message: "Title already exists" });
            }
            let urlnew = url.startsWith("https://") ? url : `https://${url}`;
            const newPost = new PostModel({
                title,
                description,
                url: urlnew,
                status: status || "To Learn",
                user: req.userId,
            });
            await newPost.save();
            res.json({
                success: true,
                message: "Created successfully",
                post: newPost,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }

    //// GET
    // GET -- api/post/:id
    // GET show details of a post
    // Private
    async show(req, res) {
        try {
            const post = await PostModel.find({
                _id: req.params.id,
            }).populate("user", ["username"]);
            res.json({ success: true, post });
        } catch (error) {
            console.log(error.message);
            return res
                .status(400)
                .json({ success: false, message: "Invalid request!" });
        }
    }

    //// GET  ---  edit page
    edit(req, res) {
        res.render("Edit Page");
    }

    //// PUT/PATCH --req update
    // PUT -- api/post/
    // Private
    async update(req, res) {
        const { title, description, url, status } = req.body;
        if (!title)
            return res
                .status(400)
                .json({ success: false, message: "Please enter a title." });
        try {
            let urlnew = url.startsWith("https://") ? url : `https://${url}`;
            const updatedPost = {
                title,
                description: description || "",
                url: urlnew || "",
                status: status || "To Learn",
            };
            const postUpdateCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            const updated = await PostModel.findOneAndUpdate(
                postUpdateCondition,
                updatedPost,
                { new: true }
            );

            if (!updated)
                return res.status(401).json({
                    success: false,
                    message: "Post not found or user not authorised",
                });

            res.json({
                success: true,
                message: "Excellent progress",
                post: updated,
            });
        } catch (error) {
            console.log(error.message);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
    //// DELETE --req DELETE
    async destroy(req, res) {
        try {
            const postDeleteCondition = {
                _id: req.params.id,
                user: req.userId,
            };
            const deletedPost = await PostModel.findOneAndDelete(
                postDeleteCondition
            );
            if (!deletedPost) {
                return res.status(401).json({
                    success: false,
                    message: "Post not found or user not authorised",
                });
            }
            res.json({ success: true, message: "Deleted", post: deletedPost });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = new PostController();
