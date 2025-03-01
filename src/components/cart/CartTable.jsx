"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/utils";
import {
  addItemWithStatus,
  clearAllWithStatus,
  clearCartWithStatus,
  removeItemWithStatus,
  removeSavedItemWithStatus,
} from "@/features/reduxSlices/cartSlice";
import { Link } from "react-router-dom";
import img from "@/assets/dell_xps_13_front.jpg";
import { useToast } from "@/hooks/use-toast";
import { AlertDialogComponent } from "../ui/alert-dialog-component";
import { X } from "lucide-react";

export function CartTable() {
  const { toast } = useToast();
  const cartData = useSelector((state) => state.cartReducer.savedItems) || [];
  const cartItems = useSelector((state) => state.cartReducer.cartItems) || [];
  const dispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const preselectedRows = cartData.reduce((acc, item, index) => {
      if (cartItems.find((cartItem) => cartItem._id === item._id)) {
        acc.push(index);
      }
      return acc;
    }, []);
    setSelectedRows(preselectedRows);
  }, [cartData, cartItems]);

  const deleteItem = (item) => {
    const { status, message } = dispatch(removeSavedItemWithStatus(item._id));
    dispatch(removeItemWithStatus(item._id));

    toast({
      title: `${status}: ${message}`,
      duration: 1000
    });
  };

  const handleClearAll = () => {
    const { status, message } = dispatch(clearAllWithStatus());

    toast({
      title: `${status}: ${message}`,duration: 1000
    });
  };

  const toggleRowSelection = (index) => {
    const item = cartData[index];
    setSelectedRows((prev) => {
      if (prev.includes(index)) {
        dispatch(removeItemWithStatus(item._id));
        return prev.filter((i) => i !== index);
      } else {
        dispatch(addItemWithStatus(item));
        return [...prev, index];
      }
    });
  };

  const filteredData = cartData.filter((item) =>
    item.model.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div className="w-full overflow-x-auto lg:col-span-2">
      <div className="rounded-md border">
        <Table>
          <CartTableHeader
            selectedRows={selectedRows}
            filteredData={filteredData}
            dispatch={dispatch}
            setSelectedRows={setSelectedRows}
          />
          <TableBody>
            {filteredData.length ? (
              filteredData.map((item, index) => (
                <CartTableRow
                  key={index}
                  item={item}
                  index={index}
                  selectedRows={selectedRows}
                  toggleRowSelection={toggleRowSelection}
                  deleteItem={deleteItem}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
            <CartTableFooter
              filterText={filterText}
              setFilterText={setFilterText}
              filteredData={filteredData}
              handleClearAll={handleClearAll}
            />
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const CartTableHeader = ({ selectedRows, filteredData, dispatch, setSelectedRows }) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>
          <Checkbox
            checked={
              selectedRows.length === filteredData.length ||
              (selectedRows.length !== 0 && "indeterminate")
            }
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedRows(filteredData.map((_, i) => i));
                filteredData.forEach((item) => dispatch(addItemWithStatus(item)));
              } else {
                setSelectedRows([]);
                dispatch(clearCartWithStatus());
              }
            }}
            aria-label="Select all rows"
          />
        </TableHead>
        {"Image Model Category Price".split(" ").map((header, index) => (
          <TableHead key={index}>{header}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

const CartTableRow = ({ item, index, selectedRows, toggleRowSelection, deleteItem }) => {
  return (
    <TableRow key={index}>
      <TableCell>
        <Checkbox
          checked={selectedRows.includes(index)}
          onCheckedChange={() => toggleRowSelection(index)}
          aria-label={`Select row ${index + 1}`}
        />
      </TableCell>
      <TableCell>
        <Link to={`/products/${item._id}`} className="aspect-square hover:underline">
          <img
            src={item.images[0]}
            alt=""
            className="h-16 w-16 rounded-lg object-cover object-center"
          />
        </Link>
      </TableCell>
      <TableCell className="text-nowrap">
        <Link to={`/products/${item._id}`} className="hover:underline">
          {item.model}
        </Link>
      </TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{formatPrice(item.price)}</TableCell>
      <TableCell>
        <AlertDialogComponent
          setAlertReturn={(alertConfirmed) => {
            if (alertConfirmed) deleteItem(item);
          }}
        >
          <Button variant="ghost" className="h-8 w-8 p-0">
            <X />
          </Button>
        </AlertDialogComponent>
      </TableCell>
    </TableRow>
  );
};

const CartTableFooter = ({ filterText, setFilterText, filteredData, handleClearAll }) => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <div className="flex gap-3">
          <Input
            placeholder="Filter by model"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
          {filteredData.length ? (
            <AlertDialogComponent
              setAlertReturn={(alertConfirmed) => {
                if (alertConfirmed) handleClearAll();
              }}
            >
              <Button>Delete All Products</Button>
            </AlertDialogComponent>
          ) : (
            <Button disabled>Delete All Products</Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};