import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import { isValidPhoneNumber } from "@/utils";
import { wilayat } from "@/json/wilayat.json";

import { MdOutlineError } from "react-icons/md";
import { setShipping } from "@/features/reduxSlices/cartSlice";
import { useDispatch } from "react-redux";
import { Toggle } from "@radix-ui/react-toggle";
import { FiEye, FiEyeOff } from "react-icons/fi";

const shipping = [
  { "id": 1, "place": "bureau" },
  { "id": 2, "place": "domicile" }
]

function InputFullName({
  defaultValue = "",
  setFirstState = null,
  setLastState = null,
  firstDefault = "",
  lastDefault = "",
}) {
  const handleChange = (e, setState, stateDefault) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/\s/g, "");
    if (setState) {
      setState(trimmedValue || stateDefault);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        <Label>First Name</Label>
        <Input
          type="text"
          name="firstName"
          placeholder="first name"
          defaultValue={defaultValue?.firstName}
          onChange={(e) => handleChange(e, setFirstState, firstDefault)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>Last Name</Label>
        <Input
          type="text"
          name="lastName"
          placeholder="last name"
          defaultValue={defaultValue?.lastName}
          onChange={(e) => handleChange(e, setLastState, lastDefault)}
          required
        />
      </div>
    </div>
  );
}

function InputEmail({ defaultValue = "", setState = null, stateDefault = "" }) {
  const handleChange = (e) => {
    const value = e.target.value;
    const trimmedValue = value.replace(/\s/g, "");
    if (setState) {
      setState(trimmedValue || stateDefault);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Label>Email</Label>
      <Input
        type="email"
        name="email"
        placeholder="email address"
        onChange={handleChange}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
}

function InputPassword({
  className = "",
  confirmPassword = false,
  newPassword = false,
  required = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label>
        {confirmPassword ? "Confirm" : ""}
        {newPassword ? "New" : ""} Password
      </Label>
      <div className={`relative`}>
        <Input
          name={
            confirmPassword
              ? "confirmPassword"
              : newPassword
                ? "newPassword"
                : "password"
          }
          type={showPassword ? "text" : "password"}
          placeholder={
            confirmPassword
              ? "confirm password"
              : newPassword
                ? "new password"
                : "your password"
          }
          required={required}
        />
        <Toggle
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </Toggle>
      </div>
    </div>
  );
}

function InputPhoneNumber({ name = "phone" }) {
  const [isValid, setIsValid] = useState(true);

  const handleInput = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setIsValid(isValidPhoneNumber(value));
    if (value.length <= 10) {
      event.target.value = value;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Phone Number</Label>
      <Input
        type="text"
        pattern="\d{10}"
        maxLength="10"
        id="phone"
        name={name}
        placeholder="phone number"
        onInput={handleInput}
        required
      />
      {!isValid && (
        <Label className="-mt-1 flex items-center gap-1 text-xs text-red-600">
          <MdOutlineError />
          Phone number is invalid
        </Label>
      )}
    </div>
  );
}

function SelectionWilaya() {
  return (
    <div className="flex flex-col gap-2">
      <Label>Wilaya</Label>
      <Select name="wilaya" required>
        <SelectTrigger>
          <SelectValue placeholder="Select your Wilaya" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Wilaya</SelectLabel>
            {wilayat.map(({ id, name }) => (
              <SelectItem value={`${id} ${name}`} key={id}>
                {id >= 10 ? id : `0${id}`} - {name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function InputAddress({ name = "commune" }) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Address</Label>
      <Input type="text" name={name} placeholder="address" required />
    </div>
  );
}

function SelectionShipping() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setShipping(0));
  }, []);

  const handleValueChange = (e) => {
    dispatch(setShipping(e === "bureau" ? 300 : 500));
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Shipping</Label>
      <Select name="ShippingType" onValueChange={handleValueChange} required>
        <SelectTrigger>
          <SelectValue placeholder="Select your Shipping Type" value="bureau" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Shipping Type</SelectLabel>
            {shipping.map(({ id, place }) => (
              <SelectItem value={place} key={id}>
                {place}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

function InputNote({ required = false }) {
  const [remainingCharacters, setRemainingCharacters] = useState(200);

  const handleText = (event) => {
    const value = event.target.value;
    if (value.length <= 200) {
      setRemainingCharacters(200 - value.length);
    } else {
      event.target.value = value.slice(0, 200);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Label>Note {required ? "" : "(Optional)"}</Label>
      <Textarea
        name="note"
        placeholder="Type your message here (max 200 characters)"
        onInput={handleText}
        required={required}
      />
      <div className="-mt-1 text-xs text-gray-600">
        {remainingCharacters} characters remaining
      </div>
    </div>
  );
}

function SelectionFilters({ name, placeholder, array, defaultValue }) {
  return (
    <div className="flex flex-col gap-2">
      <Select name={name} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {array.map(({ id, name, value }) => (
              <SelectItem value={value || name} key={id}>
                {id === 1 ? `${name} - ${placeholder}` : name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export {
  InputFullName,
  InputEmail,
  InputPassword,
  InputPhoneNumber,
  SelectionWilaya,
  InputAddress,
  SelectionShipping,
  InputNote,
  SelectionFilters,
};
