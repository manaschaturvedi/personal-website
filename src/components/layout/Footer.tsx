const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center text-sm text-gray-500">
          © {currentYear} Manas. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
