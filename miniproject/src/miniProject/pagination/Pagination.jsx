import React, { useEffect, useState } from 'react';

const Pagination = () => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const PAGE_SIZE = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("https://dummyjson.com/products?limit=500");
                const json = await data.json();
                setProductData(json.products);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < Math.ceil(productData.length / PAGE_SIZE) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const totalProducts = productData.length;
    const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
    const start = currentPage * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    const getPageNumbers = () => {
        const pageNumbers = [];
        const groupSize = 10;

        const currentGroup = Math.floor(currentPage / groupSize);
        const startPage = currentGroup * groupSize;
        const endPage = Math.min(startPage + groupSize, noOfPages);

        for (let i = startPage; i < endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    return !productData.length ? (
        <div className="flex justify-center items-center h-screen">
            <h1 className="text-2xl font-semibold">Loading products...</h1>
        </div>
    ) : (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center my-6">Product Pagination</h1>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {productData.slice(start, end).map((product) => (
                    <ProductCard
                        key={product.id}
                        image={product.thumbnail}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center my-8 space-x-1 flex-wrap">
                <button
                    className={`px-4 py-2 rounded-md ${currentPage === 0
                        ? 'bg-gray-200 cursor-not-allowed opacity-50'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    disabled={currentPage === 0}
                    onClick={goToPreviousPage}
                >
                    ← Prev
                </button>

                {pageNumbers.map((pageIndex) => (
                    <button
                        key={pageIndex}
                        className={`w-10 h-10 rounded-full ${currentPage === pageIndex
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        onClick={() => handlePageChange(pageIndex)}
                    >
                        {pageIndex + 1}
                    </button>
                ))}

                <button
                    className={`px-4 py-2 rounded-md ${currentPage >= noOfPages - 1
                        ? 'bg-gray-200 cursor-not-allowed opacity-50'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }`}
                    disabled={currentPage >= noOfPages - 1}
                    onClick={goToNextPage}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

const ProductCard = ({ image, title, price, rating }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative pb-[60%]">
                <img
                    className="absolute h-full w-full object-cover"
                    src={image}
                    alt={title}
                />
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{title}</h3>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">${price}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                        ⭐ {rating}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
