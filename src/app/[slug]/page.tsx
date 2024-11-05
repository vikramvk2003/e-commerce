import Add from "@/components/Add";
import ProductImages from "@/components/ProductImages";

interface Params {
  id: string;
}

const SinglePage = async ({ params }: { params: Params }) => {
  const { id } = params;

  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('Error fetching product:', res.status, res.statusText);
      return <p>Product not found.</p>; // Handle error gracefully
    }

    // Log the raw response to check what we received
    const text = await res.text();
    console.log('Raw response:', text);

    // Check if the response is empty
    if (!text || text.trim() === '') {
      console.error('Received empty response from API.');
      return <p>Error: Received an empty response.</p>;
    }

    let product;
    try {
      product = JSON.parse(text);
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      return <p>Error parsing product data.</p>;
    }

    // Validate product data
    if (!product || !product.id) {
      console.error('Product data is invalid:', product);
      return <p>Product data is invalid.</p>;
    }

    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages items={[{ url: product.image }]} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.title}</h1>
          <p className="text-gray-500">{product.description}</p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">${(product.price * 1.2).toFixed(2)}</h3>
            <h2 className="font-medium text-2xl">${product.price}</h2>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <Add productId={product.id} stockNumber={20} />
          <div className="h-[2px] bg-gray-100" />
          <div className="text-sm">
            <h4 className="font-medium mb-4">Product Details</h4>
            <p>{product.description}</p>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-2">
            <h1 className="text-2xl">User Reviews</h1>
            <span className="text-sm text-gray-500">({product.rating?.count || 0} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-lg">{product.rating?.rate || 0} ⭐</span>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return <p>There was an error loading the product.</p>;
  }
};

export default SinglePage;
