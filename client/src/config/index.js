export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "fruits", label: "Fruits" },
      { id: "vegetables", label: "Vegetables" },
      { id: "dairy", label: "Dairy" },
      { id: "beverages", label: "Beverages" },
      { id: "bakery", label: "Bakery" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "amul", label: "Amul" },
      { id: "motherdairy", label: "Mother Dairy" },
      { id: "britannia", label: "Britannia" },
      { id: "nestle", label: "Nestlé" },
      { id: "pepsico", label: "PepsiCo" },
      { id: "none", label: "Other" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "fruits",
    label: "Fruits",
    path: "/shop/listing",
  },
  {
    id: "vegetables",
    label: "Vegetables",
    path: "/shop/listing",
  },
  {
    id: "dairy",
    label: "Dairy",
    path: "/shop/listing",
  },
  {
    id: "bakery",
    label: "Bakery",
    path: "/shop/listing",
  },
  {
    id: "beverages",
    label: "Beverages",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  fruits: "Fruits",
  vegetables: "Vegetables",
  dairy: "Dairy",
  beverages: "Beverages",
  bakery: "Bakery",
};
export const brandOptionsMap = {
  amul: "Amul",
  motherdairy: "Mother Dairy",
  britannia: "Britannia",
  nestle: "Nestlé",
  pepsico: "PepsiCo",
  none: "Other",
}

export const filterOptions = {
  category: [
    { id: "fruits", label: "Fruits" },
    { id: "vegetables", label: "Vegetables" },
    { id: "dairy", label: "Dairy" },
    { id: "beverages", label: "Beverages" },
    { id: "bakery", label: "Bakery" },
  ],
  brand: [
    { id: "amul", label: "Amul" },
    { id: "motherdairy", label: "Mother Dairy" },
    { id: "britannia", label: "Britannia" },
    { id: "nestle", label: "Nestlé" },
    { id: "pepsico", label: "PepsiCo" },
    { id: "none", label: "Other" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];