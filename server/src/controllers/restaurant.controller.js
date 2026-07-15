import Restaurant from "../models/restaurant.model.js";
import {
  uploadMultipleImages,
  deleteMultipleImages,
  uploadSingleImage,
  deleteSingleImage,
} from "../utils/image.service.js";

export const RestaurantGetData = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const managerId = req.query.id;

    console.log("Current User: ", currentUser);
    console.log("ManagerID: ", managerId);

    if (currentUser.id.toString() !== managerId) {
      const error = new Error("Unauthorized Access");
      error.statusCode = 401;
      return next(error);
    }

    const restaurantData = await Restaurant.find({ managerId });

    if (restaurantData) {
      res
        .status(200)
        .json({
          message: "Restaurant Fetched Successfully",
          data: restaurantData,
        });
    } else {
      res.status(200).json({ message: "No Restaurant Data Found..", data: {} });
    }
    
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantUpdateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const restaurantData = req.body;
    const coverImage = req.files?.coverImage;
    const restaurantImages = req.files?.restaurantImages;

    const dataKeys = Object.keys(restaurantData);

    dataKeys.forEach((keys) => {
      if (!restaurantData[keys]) {
        const error = new Error(`Missing required field: ${keys}`);
        error.statusCode = 400;
        return next(error);
      }
    });

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      if (coverImage) {
        const coverImage = await uploadSingleImage(
          coverImage,
          `restaurant/${currentUser.phone}/coverPhoto`,
        );

        dataKeys.push("coverImage");
        restaurantData.coverImage = coverImage;
      }

      if (restaurantImages && restaurantImages.length > 0) {
        const restaurantImage = await uploadMultipleImages(
          restaurantData,
          `restaurant/${currentUser.phone}/restaurantPhotos`,
        );

        dataKeys.push("restaurantImages");
        restaurantData.restaurantImages = restaurantImage;
      }

      const newRestaurant = await Restaurant.create({
        managerId: currentUser._id,
        ...restaurantData,
      });

      return res.status(201).json({
        message: "Restaurant Profile Created Successfully",
        data: newRestaurant,
      });
    } else {
      if (coverImage) {
        await deleteSingleImage(existingRestaurant.coverImage);

        const coverImage = await uploadSingleImage(
          coverImage,
          `restaurant/${currentUser.phone}/coverPhoto`,
        );

        dataKeys.push("coverImage");
        restaurantData.coverImage = coverImage;
      }

      if (restaurantImages && restaurantImages.length > 0) {
        await deleteMultipleImages(existingRestaurant.restaurantImage);

        const restaurantImage = await uploadMultipleImages(
          restaurantData,
          `restaurant/${currentUser.phone}/restaurantPhotos`,
        );

        dataKeys.push("restaurantImages");
        restaurantData.restaurantImages = restaurantImage;
      }

      dataKeys.forEach((keys) => {
        existingRestaurant[keys] =
          restaurantData[keys] || existingRestaurant[keys];
      });

      await existingRestaurant.save();

      return res.status(200).json({
        message: "Restaurant Profile Updated Successfully",
        data: existingRestaurant,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};
