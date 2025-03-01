import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { PlusCircleIcon, Save, X } from "lucide-react";
import { customFetch } from "@/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { queryClient } from "@/utils/queryClient";

export const BasicInfo = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <InputField
      label="Model"
      name="model"
      value={formData.model}
      onChange={handleChange}
      placeholder="Enter the product name"
    />
    <InputField
      label="Price"
      name="price"
      type="number"
      value={formData.price}
      onChange={handleChange}
      placeholder="Enter the price"
    />
    <div>
      <label className="mb-1 block text-sm font-medium">Category</label>
      <Select
        name="category"
        value={formData.category}
        onValueChange={(value) =>
          handleChange({ target: { name: "category", value } })
        }
        required
      >
        <SelectTrigger>
          <SelectValue placeholder="Select your Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            {[
              { id: 1, name: "etudiant" },
              { id: 2, name: "bureautique" },
              { id: 3, name: "gaming" },
              { id: 4, name: "work" },
            ].map(({ id, name }) => (
              <SelectItem value={name} key={id}>
                {`0${id}`} - {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="mb-1 block text-sm font-medium">Description</label>
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
    </div>
  </div>
);

// Specifications Component
export const Specifications = ({ formData, handleChange }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold uppercase">Specifications</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <SpecInput
        label="Processor"
        name="processor"
        value={formData.specs.processor}
        onChange={handleChange}
      />
      <SpecInput
        label="GPU"
        name="GPU"
        value={formData.specs.GPU}
        onChange={handleChange}
      />
      <div className="flex justify-between gap-3">
        <SpecInput
          label="RAM Size"
          name="RamSize"
          type="number"
          value={formData.specs.RamSize}
          onChange={handleChange}
        />
        <SpecInput
          label="RAM Type"
          name="RamType"
          value={formData.specs.RamType}
          onChange={handleChange}
        />
        <SpecInput
          label="RAM Speed"
          name="RamSpeed"
          type="number"
          value={formData.specs.RamSpeed}
          onChange={handleChange}
        />
      </div>
      <SpecInput
        label="Storage"
        name="storage"
        type="number"
        value={formData.specs.storage}
        onChange={handleChange}
      />
      <div className="flex justify-between gap-3 sm:col-span-2">
        <SpecInput
          label="Display Size"
          name="displaySize"
          type="number"
          value={formData.specs.displaySize}
          onChange={handleChange}
        />
        <SpecInput
          label="Display Quality"
          name="displayQuality"
          value={formData.specs.displayQuality}
          onChange={handleChange}
        />
        <SpecInput
          label="Display Type"
          name="displayType"
          value={formData.specs.displayType}
          onChange={handleChange}
        />
      </div>
    </div>
  </div>
);

// Images Component
export const ProductImages = ({
  images,
  handleImageAdd,
  handleImageDelete,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleImageAdd(imageUrl);
    }
  };

  return (
    <div>
      <label className="mb-2 block font-medium uppercase">Images</label>
      <div className="grid grid-cols-3 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <X
              className="absolute right-1 top-1 h-5 w-5 cursor-pointer rounded-full bg-destructive p-1 text-white"
              onClick={() => handleImageDelete(index)}
            />
            <img
              src={image}
              className="aspect-square w-full rounded object-cover"
              alt={`image-${index}`}
            />
          </div>
        ))}
        <div className="relative flex aspect-square items-center justify-center rounded bg-secondary">
          <PlusCircleIcon className="h-2/3 w-2/3 text-muted-foreground dark:text-primary-foreground" />
          <input
            type="file"
            accept="image/*"
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Input Components
export const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label htmlFor={name} className="mb-1 block text-sm font-medium">
      {label}
    </label>
    <Input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export const SpecInput = ({ label, name, type = "text", value, onChange }) => (
  <div className="w-full">
    <label htmlFor={`specs.${name}`} className="mb-2 block text-sm font-medium">
      {label}
    </label>
    <Input
      name={`specs.${name}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full"
    />
  </div>
);

// Main Component
export const EditProduct = ({ laptop, setEditMode = null }) => {
  const token = useSelector((state) => state.userReducer.token);
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    ...laptop,
    specs: { ...laptop.specs },
    images: laptop.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("specs.")) {
      const [, specField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageAdd = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl],
    }));
  };

  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.patch(`/laptop/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        queryClient.invalidateQueries(["product", id]);
        queryClient.invalidateQueries(["product"]);
        toast({ title: "Success: Product updated successfully" });
        if (setEditMode) setEditMode(false);
        navigate(`/user-dashboard/products/${id}`);
      }
    } catch (error) {
      toast({
        title: "Error: Failed to update product",
        variant: "destructive",
      });
      console.error("Update failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfo formData={formData} handleChange={handleChange} />
      <Separator />
      <ProductImages
        images={formData.images}
        handleImageAdd={handleImageAdd}
        handleImageDelete={handleImageDelete}
      />
      <Separator />
      <Specifications formData={formData} handleChange={handleChange} />
      <Separator />
      <div className="flex gap-2">
        <Button type="submit">
          Save Changes <Save className="ml-2" />
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setEditMode(false);
            navigate(`/user-dashboard/products/${id}`);
          }}
        >
          Cancel <X className="ml-2" />
        </Button>
      </div>
    </form>
  );
};

export const AddProduct = () => {
  const token = useSelector((state) => state.userReducer.token);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    model: "",
    price: "",
    category: "",
    description: "",
    specs: {
      processor: "",
      GPU: "",
      RamSize: "",
      RamType: "",
      RamSpeed: "",
      storage: "",
      displaySize: "",
      displayQuality: "",
      displayType: "",
    },
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("specs.")) {
      const [, specField] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        specs: {
          ...prev.specs,
          [specField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageAdd = (imageUrl) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl],
    }));
  };

  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await customFetch.post("/laptop", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        // Invalidate product list queries to reflect the new product
        queryClient.invalidateQueries(["product"]); // Adjust key based on your product list query
        toast({ title: "Success: Product added successfully" });
        // Navigate to product list or new product page
        navigate("/user-dashboard/products"); // Adjust route as needed
      }
    } catch (error) {
      toast({
        title: "Error: Failed to add product",
        variant: "destructive",
      });
      console.error("Add product failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfo formData={formData} handleChange={handleChange} />
      <Separator />
      <ProductImages
        images={formData.images}
        handleImageAdd={handleImageAdd}
        handleImageDelete={handleImageDelete}
      />
      <Separator />
      <Specifications formData={formData} handleChange={handleChange} />
      <Separator />
      <div className="flex gap-2">
        <Button type="submit">
          Add Product <Save className="ml-2" />
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/user-dashboard/products")}
        >
          Cancel <X className="ml-2" />
        </Button>
      </div>
    </form>
  );
};
