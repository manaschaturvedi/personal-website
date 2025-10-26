import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-black hover:text-gray-600 transition-colors">
            manas.dev
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              href="/blog" 
              className="text-gray-600 hover:text-black transition-colors"
            >
              blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
