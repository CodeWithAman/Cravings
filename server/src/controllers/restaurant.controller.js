import Restaurant from "../models/restaurant.model.js";
import {
  uploadMultipleImages,
  deleteMultipleImages,
  uploadSingleImage,
  deleteSingleImage,
} from "../utils/image.service.js";
import Menu from "../models/menu.model.js";

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

    const restaurantData = await Restaurant.findOne({ managerId });

    if (restaurantData) {
      res.status(200).json({
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

export const RestaurantUpdateInfo = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      restaurantName,
      description,
      restaurantType,
      cuisineTypes,
      contactEmail,
      contactPhone,
      openingTime,
      closingTime,
    } = req.body;

    if (
      !restaurantName ||
      !description ||
      !restaurantType ||
      !cuisineTypes ||
      !contactEmail ||
      !contactPhone ||
      !openingTime ||
      !closingTime
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const cuisineTypesArray = cuisineTypes
      .split(",")
      .map((type) => type.trim());
    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });
    if (!existingRestaurant) {
      const newRestaurant = await Restaurant.create({
        managerId: currentUser._id,
        restaurantName,
        description,
        restaurantType,
        cuisineTypes: cuisineTypesArray,
        contactDetails: {
          email: contactEmail,
          phone: contactPhone,
        },
        servingHours: {
          openingTime,
          closingTime,
        },
      });
      return res.status(201).json({
        message: "Restaurant profile created successfully",
        data: newRestaurant,
      });
    } else {
      existingRestaurant.restaurantName = restaurantName;
      existingRestaurant.description = description;
      existingRestaurant.restaurantType = restaurantType;
      existingRestaurant.cuisineTypes = cuisineTypesArray;
      existingRestaurant.contactDetails.email = contactEmail;
      existingRestaurant.contactDetails.phone = contactPhone;
      existingRestaurant.servingHours.openingTime = openingTime;
      existingRestaurant.servingHours.closingTime = closingTime;
      await existingRestaurant.save();
      return res.status(200).json({
        message: "Restaurant profile updated successfully",
        data: existingRestaurant,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const OpenRestaurant = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const OpenStatus = req.params.openStatus;

    console.log("Open Status is", OpenStatus);

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    existingRestaurant.isOpen = OpenStatus;

    await existingRestaurant.save();

    return res.status(200).json({
      message: `${OpenStatus ? "Restaurant is Live Now" : "Restaurant is Offline"}`,
      data: existingRestaurant,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantUpdateLegalInfo = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { legalName, companyType } = req.body;

    if (!legalName || !companyType) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    existingRestaurant.legal = {
      legalName,
      companyType,
    };

    await existingRestaurant.save();

    return res.status(200).json({
      message: "Legal information updated successfully",
      data: existingRestaurant,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantAddMenuItem = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const {
      itemName,
      description,
      price,
      category,
      foodType,
      status,
      isTopRated,
      isRecommended,
      isNew,
      isDeleted,
    } = req.body;
    const itemImageFromFE = req.file;

    if (
      !itemName ||
      !description ||
      !price ||
      !category ||
      !foodType ||
      !status
    ) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    if (!itemImageFromFE) {
      const error = new Error("Item image is required");
      error.statusCode = 400;
      return next(error);
    }

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const itemImage = await uploadSingleImage(
      itemImageFromFE,
      `restaurant/${currentUser.phone}/menuItems`,
    );

    const existingMenuItem = await Menu.findOne({
      restaurantId: existingRestaurant._id,
    });

    if (existingMenuItem) {
      existingMenuItem.menuItems.push({
        itemName,
        description,
        price,
        category,
        foodType,
        status,
        isTopRated,
        isRecommended,
        isNew,
        isDeleted,
        image: itemImage,
      });

      console.log("Existing Menu Item after push");
      await existingMenuItem.save();
      return res.status(200).json({
        message: "Menu item added successfully",
        data: existingMenuItem,
      });
    } else {
      const newItem = {
        itemName,
        description,
        price,
        category,
        foodType,
        status,
        isTopRated,
        isRecommended,
        isNew,
        isDeleted,
        image: itemImage,
      };

      console.log("New Item to be added");
      const newMenuItem = await Menu.create({
        restaurantId: existingRestaurant._id,
        menuItems: [newItem],
      });

      return res.status(201).json({
        message: "Menu item added successfully",
        data: newMenuItem,
      });
    }
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const RestaurantMenuItems = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const existingRestaurant = await Restaurant.findOne({
      managerId: currentUser._id,
    });

    if (!existingRestaurant) {
      const error = new Error("Restaurant Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const existingMenuItem = await Menu.findOne({
      restaurantId: existingRestaurant._id,
    });

    if (!existingMenuItem) {
      const error = new Error("Menu Items Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const activeMenuItems = existingMenuItem.menuItems.filter(
      (item) => !item.isDeleted,
    );

    return res.status(200).json({
      message: "Menu items fetched successfully",
      data: activeMenuItems,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

const parseBoolean = (value) => {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return undefined;
};

const getMenuContext = async (currentUser, itemId, next) => {
  const existingRestaurant = await Restaurant.findOne({
    managerId: currentUser._id,
  });

  if (!existingRestaurant) {
    const error = new Error("Restaurant Not Found");
    error.statusCode = 404;
    return next(error);
  }

  const existingMenu = await Menu.findOne({
    restaurantId: existingRestaurant._id,
  });

  if (!existingMenu) {
    const error = new Error("Menu Items Not Found");
    error.statusCode = 404;
    return next(error);
  }

  const menuItem = existingMenu.menuItems.id(itemId);

  if (!menuItem) {
    const error = new Error("Menu Item Not Found");
    error.statusCode = 404;
    return next(error);
  }

  return { existingMenu, menuItem, existingRestaurant };
};

export const RestaurantUpdateMenuItem = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { itemId } = req.params;
    const context = await getMenuContext(currentUser, itemId, next);

    if (!context) return;

    const { existingMenu, menuItem } = context;

    const { itemName, description, price, category, foodType, status } =
      req.body;

    const itemImageFromFE = req.file;

    if (itemName !== undefined) menuItem.itemName = itemName;
    if (description !== undefined) menuItem.description = description;
    if (price !== undefined && price !== "") menuItem.price = Number(price);
    if (category !== undefined) menuItem.category = category;
    if (foodType !== undefined) menuItem.foodType = foodType;
    if (status !== undefined) menuItem.status = status;

    const isTopRated = parseBoolean(req.body.isTopRated);
    const isRecommended = parseBoolean(req.body.isRecommended);
    const isNew = parseBoolean(req.body.isNew);

    if (itemImageFromFE) {
      await deleteSingleImage(menuItem.image);
      const updatedImage = await uploadSingleImage(
        itemImageFromFE,
        `restaurant/${currentUser.phone}/menuItems`,
      );
      menuItem.image = updatedImage;
    }

    existingMenu.markModified("menuItems");

    await existingMenu.save();

    return res.status(200).json({
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const RestaurantUpdateMenuItemStatus = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { itemId } = req.params;
    const status = req.query.status || req.body?.status;

    if (!status) {
      const error = new Error("Status is required");
      error.statusCode = 400;
      return next(error);
    }

    const allowedStatus = ["available", "unavailable", "discontinued"];
    if (!allowedStatus.includes(status)) {
      const error = new Error("Invalid status value");
      error.statusCode = 400;
      return next(error);
    }

    const context = await getMenuContext(currentUser, itemId, next);
    if (!context) return;

    const { existingMenu, menuItem } = context;
    menuItem.status = status;

    existingMenu.markModified("menuItems");

    await existingMenu.save();

    return res.status(200).json({
      message: "Menu item status updated successfully",
      data: menuItem,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const RestaurantToggleMenuItemControl = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { itemId } = req.params;
    const control = req.query.control || req.body?.control;

    const allowedControls = ["isTopRated", "isRecommended", "isNew"];

    if (!allowedControls.includes(control)) {
      const error = new Error("Invalid control value");
      error.statusCode = 400;
      return next(error);
    }

    const context = await getMenuContext(currentUser, itemId, next);
    if (!context) return;

    const { existingMenu, menuItem } = context;
    menuItem[control] = !menuItem[control];

    existingMenu.markModified("menuItems");

    await existingMenu.save();

    return res.status(200).json({
      message: "Menu item control updated successfully",
      data: menuItem,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const RestaurantDeleteMenuItem = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { itemId } = req.params;

    const context = await getMenuContext(currentUser, itemId, next);
    if (!context) return;

    const { existingMenu, menuItem } = context;
    menuItem.isDeleted = true;
    menuItem.status = "discontinued";

    existingMenu.markModified("menuItems");

    await existingMenu.save();

    return res.status(200).json({
      message: "Menu item deleted successfully",
      data: menuItem,
    });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};
