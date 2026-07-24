import React, { useState } from "react";
import { FaAward, FaRegGrinStars } from "react-icons/fa";
import { BiSolidDish } from "react-icons/bi";
import { LuPencilLine, LuTrash2, LuEye, LuChevronDown } from "react-icons/lu";
import { AiTwotoneLike } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import ConfirmModal from "./menuItems/ConfirmModal";

const dummyMenu = [
  {
    itemName: "Classic Margherita Pizza",
    description: "Fresh mozzarella, tomato sauce, basil leaves, and oregano.",
    price: 299,
    category: "Pizza",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/pizza1/600/600",
      publicId: "dummy-pizza-1",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Crispy Veg Burger",
    description:
      "Loaded with crispy vegetable patty, lettuce, cheese, and mayo.",
    price: 179,
    category: "Burger",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/burger1/600/600",
      publicId: "dummy-burger-1",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Paneer Tikka Wrap",
    description:
      "Soft tortilla stuffed with spicy paneer tikka and fresh veggies.",
    price: 229,
    category: "Wrap",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/wrap1/600/600",
      publicId: "dummy-wrap-1",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: false,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Chocolate Brownie Sundae",
    description: "Warm chocolate brownie served with vanilla ice cream.",
    price: 199,
    category: "Dessert",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/dessert1/600/600",
      publicId: "dummy-dessert-1",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Cold Coffee Delight",
    description: "Refreshing chilled coffee topped with whipped cream.",
    price: 149,
    category: "Beverages",
    type: "Vegetarian",
    image: {
      url: "https://picsum.photos/seed/coffee1/600/600",
      publicId: "dummy-coffee-1",
    },
    status: "discontinued",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Chicken Tikka Pizza",
    description:
      "Stone-baked pizza topped with spicy chicken tikka and mozzarella.",
    price: 399,
    category: "Pizza",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-pizza/600/600",
      publicId: "dummy-chicken-pizza",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Grilled Chicken Burger",
    description:
      "Juicy grilled chicken patty with lettuce, cheese, and smoky sauce.",
    price: 279,
    category: "Burger",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-burger/600/600",
      publicId: "dummy-chicken-burger",
    },
    status: "available",
    isTopRated: true,
    isRecommended: false,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Butter Chicken",
    description: "Tender chicken cooked in a rich, creamy tomato gravy.",
    price: 429,
    category: "Main Course",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/butter-chicken/600/600",
      publicId: "dummy-butter-chicken",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Chicken Biryani",
    description:
      "Fragrant basmati rice cooked with marinated chicken and aromatic spices.",
    price: 349,
    category: "Biryani",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-biryani/600/600",
      publicId: "dummy-chicken-biryani",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Fish & Chips",
    description:
      "Crispy battered fish fillet served with golden fries and tartar sauce.",
    price: 379,
    category: "Seafood",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/fish-chips/600/600",
      publicId: "dummy-fish-chips",
    },
    status: "available",
    isTopRated: false,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Prawn Fried Rice",
    description:
      "Wok-tossed fried rice with juicy prawns, vegetables, and soy sauce.",
    price: 389,
    category: "Rice",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/prawn-rice/600/600",
      publicId: "dummy-prawn-rice",
    },
    status: "discontinued",
    isTopRated: false,
    isRecommended: false,
    isNew: true,
    isDeleted: false,
  },
  {
    itemName: "Chicken Shawarma Wrap",
    description:
      "Grilled chicken wrapped with fresh veggies, garlic sauce, and pita bread.",
    price: 249,
    category: "Wrap",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/shawarma-wrap/600/600",
      publicId: "dummy-shawarma-wrap",
    },
    status: "available",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
  {
    itemName: "Spicy Chicken Wings",
    description: "Crispy chicken wings tossed in a fiery hot sauce.",
    price: 299,
    category: "Starter",
    type: "Non-Vegetarian",
    image: {
      url: "https://picsum.photos/seed/chicken-wings/600/600",
      publicId: "dummy-chicken-wings",
    },
    status: "unavailable",
    isTopRated: true,
    isRecommended: true,
    isNew: false,
    isDeleted: false,
  },
];

const statusChipStyles = {
  available: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
  unavailable: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
  discontinued: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20 hover:bg-rose-500/20",
};

const statusLabels = {
  available: "Available",
  unavailable: "Unavailable",
  discontinued: "Discontinued",
};

const RestaurantMenu = () => {
  const [menuItems, setMenuItems] = useState(dummyMenu);

  const [isAddNewItemModalOpen, setIsAddNewItemModalOpen] = useState(false);
  const [isEditViewItemModalOpen, setIsEditViewItemModalOpen] = useState(false);
  const [isControlsModalOpen, setIsControlsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="h-[86vh] flex flex-col">
        {/* Header - fixed */}
        <div className="shrink-0 flex justify-between items-center px-1 mb-4">
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <div className="flex gap-4 items-center">
            <button
              className="bg-(--color-primary) text-white hover:opacity-90 px-4 py-2 rounded-full transition-opacity flex items-center gap-2 text-sm font-medium shadow-sm"
              onClick={() => setIsAddNewItemModalOpen(true)}
            >
              <IoMdAddCircleOutline className="text-lg" />
              Add New Item
            </button>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search menu..."
              className="border border-(--color-secondary)/40 bg-(--color-base-100) rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-(--color-primary) transition-colors w-56"
            />
          </div>
        </div>

        {/* Content - fills remaining space, only the list scrolls */}
        <div className="flex-1 min-h-0 flex flex-col bg-(--color-base-200) rounded-2xl p-3">
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 space-y-2.5">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group relative flex items-center gap-4 bg-(--color-base-100) rounded-2xl border border-(--color-secondary)/25 p-2.5 pr-4 shadow-sm hover:shadow-md hover:border-(--color-primary)/40 transition-all"
              >
                {/* Thumbnail */}
                <div className="relative shrink-0">
                  <img
                    src={item.image.url}
                    alt={item.itemName}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  {item.isNew && (
                    <span
                      className="absolute -top-1.5 -left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-(--color-primary) text-white shadow"
                      title="New Item"
                    >
                      NEW
                    </span>
                  )}
                </div>

                {/* Name / description / tags */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate">
                      {item.itemName}
                    </h3>
                    {item.isTopRated && (
                      <FaAward
                        className="text-(--color-primary) text-xs shrink-0"
                        title="Top Rated"
                      />
                    )}
                    {item.isRecommended && (
                      <AiTwotoneLike
                        className="text-(--color-primary) text-xs shrink-0"
                        title="Recommended"
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--color-secondary)/15 font-medium">
                      {item.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-(--color-secondary)/15 font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="shrink-0 text-right w-20">
                  <p className="text-[10px] text-(--color-secondary) uppercase tracking-wide">
                    Price
                  </p>
                  <p className="text-base font-bold text-(--color-primary)">
                    ₹{item.price.toFixed(2)}
                  </p>
                </div>

                {/* Status */}
                <div className="relative inline-flex items-center shrink-0">
                  <select
                    value={item.status}
                    className={`appearance-none rounded-full pl-3 pr-7 py-1.5 text-xs font-semibold tracking-wide transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--color-primary) ${
                      statusChipStyles[item.status]
                    }`}
                    onChange={(e) => {
                      // Handle status change logic here
                    }}
                  >
                    <option value="available">{statusLabels.available}</option>
                    <option value="unavailable">
                      {statusLabels.unavailable}
                    </option>
                    <option value="discontinued">
                      {statusLabels.discontinued}
                    </option>
                  </select>
                  <LuChevronDown className="pointer-events-none absolute right-2.5 text-xs opacity-70" />
                </div>

                {/* Controls (top-rated / recommended toggles) - subtle, always visible */}
                <div className="hidden lg:flex gap-1 shrink-0">
                  <button
                    className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${
                      item.isTopRated
                        ? "bg-(--color-primary)/10 text-(--color-primary)"
                        : "text-(--color-secondary) hover:bg-(--color-secondary)/10"
                    }`}
                    title={item.isTopRated ? "Top Rated" : "Mark as Top Rated"}
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("topRated");
                      setIsControlsModalOpen(true);
                    }}
                  >
                    <FaAward className="text-sm" />
                  </button>
                  <button
                    className={`h-8 w-8 flex items-center justify-center rounded-full transition-colors ${
                      item.isRecommended
                        ? "bg-(--color-primary)/10 text-(--color-primary)"
                        : "text-(--color-secondary) hover:bg-(--color-secondary)/10"
                    }`}
                    title={
                      item.isRecommended ? "Recommended" : "Mark as Recommended"
                    }
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("recommended");
                      setIsControlsModalOpen(true);
                    }}
                  >
                    <AiTwotoneLike className="text-sm" />
                  </button>
                  <button
                    className={`h-8 px-2 flex items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                      item.isNew
                        ? "bg-(--color-primary)/10 text-(--color-primary)"
                        : "text-(--color-secondary) hover:bg-(--color-secondary)/10"
                    }`}
                    title={item.isNew ? "New Item" : "Mark as New"}
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("new");
                      setIsControlsModalOpen(true);
                    }}
                  >
                    NEW
                  </button>
                </div>

                {/* Actions - reveal on hover */}
                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="h-8 w-8 flex items-center justify-center border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded-full transition-colors"
                    title="Edit Item"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("edit");
                      setIsEditViewItemModalOpen(true);
                    }}
                  >
                    <LuPencilLine className="text-xs" />
                  </button>
                  <button
                    className="h-8 w-8 flex items-center justify-center border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded-full transition-colors"
                    title="View Item Details"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("view");
                      setIsEditViewItemModalOpen(true);
                    }}
                  >
                    <LuEye className="text-xs" />
                  </button>
                  <button
                    className="h-8 w-8 flex items-center justify-center border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white rounded-full transition-colors"
                    title="Delete Item"
                    onClick={() => {
                      setSelectedItem(item);
                      setModalMode("delete");
                      setIsControlsModalOpen(true);
                    }}
                  >
                    <LuTrash2 className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isControlsModalOpen && (
        <ConfirmModal
          selectedItem={selectedItem}
          modalMode={modalMode}
          isOpen={isControlsModalOpen}
          onClose={() => setIsControlsModalOpen(false)}
        />
      )}
    </>
  );
};

export default RestaurantMenu;
