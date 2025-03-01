import { CardDescription, CardTitle } from "./card";

export function Section({ className, title, description, children }) {
  return (
    <div className={`py-5 ${className}`}>
      <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
      {children}
    </div>
  );
}