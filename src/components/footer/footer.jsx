const Footer = () => {
  return (
    <footer className="footer w-full flex justify-center items-center border-t">
      <p className="p-3 text-sm">
        © {new Date().getFullYear()} <span className="font-semibold">OG STORE</span><span className="border mx-2"></span>All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
