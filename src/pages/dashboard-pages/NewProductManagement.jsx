import { AddProduct } from "@/components/From/products-data-from";
import { Section } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";

function NewProductManagement() {
  return (
    <div>
      <Section
        title="New Product Management"
        description="Create your new products here"
      />
      <Separator className='mb-5'/>

      <AddProduct />
    </div>
  );
}

export default NewProductManagement;
