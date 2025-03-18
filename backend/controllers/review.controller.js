import Review from "../database/model/review.model.js";
import Vendor from "../database/model/vendor.model.js";

export const addReview = async (req, res) => {
    try {
        const { vendorId, rating, message } = req.body;
        const userId = req.user.id;

        if (!vendorId || !rating || !message) {
            return res.status(400).json({
                success: false,
                message: "Vendor ID, rating, and message are required",
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5",
            });
        }

        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({
                success: false,
                message: "Vendor not found",
            });
        }

        const review = await Review.create({
            vendor: vendorId,
            user: userId,
            rating,
            message,
        });

        vendor.reviews.push(review._id);
        await vendor.save();

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            review,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { reviewId, rating, message } = req.body;
        const userId = req.user.id;

        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required",
            });
        }

        const review = await Review.findOne({ _id: reviewId, user: userId });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or you don't have permission to update it",
            });
        }

        if (rating !== undefined) {
            if (rating < 1 || rating > 5) {
                return res.status(400).json({
                    success: false,
                    message: "Rating must be between 1 and 5",
                });
            }
            review.rating = rating;
        }

        if (message !== undefined) {
            review.message = message;
        }

        await review.save();

        return res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required",
            });
        }

        const review = await Review.findOneAndDelete({ _id: reviewId, user: userId });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found or you don't have permission to delete it",
            });
        }

        // Remove the review ID from the vendor's review array
        await Vendor.findByIdAndUpdate(review.vendor, {
            $pull: { reviews: reviewId },
        });

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const getVendorReviews = async (req, res) => {
    try {
        const { vendorId } = req.params;

        if (!vendorId) {
            return res.status(400).json({
                success: false,
                message: "Vendor ID is required",
            });
        }

        const reviews = await Review.find({ vendor: vendorId }).populate("user", "name");

        if(!reviews || reviews.length == 0) return res.status(404).json({
            success: false,
            message: "No reviews available"
        })

        return res.status(200).json({
            success: true,
            reviews,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
