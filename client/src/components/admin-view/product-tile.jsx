import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-md mx-auto bg-purple-200 rounded-2xl overflow-hidden shadow-md">
      <div>
        {/* Product Image */}
        <div className="relative w-full h-[200px]">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Content */}
        <CardContent className="bg-purple-200 p-4 text-center">
          <h2 className="text-2xl font-bold mb-1">{product?.title}</h2>
          <div className="flex justify-center items-center gap-4">
            {product?.salePrice > 0 && (
              <span className="text-lg font-semibold text-gray-500 line-through">
                ${product?.price}
              </span>
            )}
            <span className="text-xl font-bold text-primary">
              ${product?.salePrice > 0 ? product?.salePrice : product?.price}
            </span>
          </div>
        </CardContent>

        {/* Buttons */}
        <CardFooter className="flex justify-between px-4 pb-4">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(product?._id)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
