import React, { useState } from 'react';

export const PriceFilter: React.FC = () => {
  const priceGap = 40;
  const maxRange = 1000;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxRange);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinPrice = parseInt(e.target.value);
    if (maxPrice - newMinPrice >= priceGap) {
      setMinPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxPrice = parseInt(e.target.value);
    if (newMaxPrice - minPrice >= priceGap && newMaxPrice <= maxRange) {
      setMaxPrice(newMaxPrice);
    }
  };

  const minPricePercentage = (minPrice / maxRange) * 100;
  const maxPricePercentage = 100 - (maxPrice / maxRange) * 100;

  return (
    <div className="w-full bg-white rounded-lg p-5 shadow-lg my-4">
      <header>
        <h1 className="text-md font-semibold md:text-2xl ">Precio</h1>
        <p className="mt-2 text-sm md:text-lg">Selecciona el rango</p>
      </header>
      <div className="flex mt-8 items-center mb-8">
        <div className="flex">
          <div className="flex items-center">
            <span className="hidden mr-2 smm:block smm:text-sm md:text-lg">Min</span>
            <input
              type="number"
              id="input-min"
              className="w-full text-center py-2 ring-2 ring-gris rounded-sm"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
          </div>
        </div>
        <div className="mx-3">-</div>
        <div className="flex">  
          <div className="flex items-center">
            <input
              type="number"
              id="input-max"
              className="w-full text-center py-2 ring-2 ring-gris rounded-sm"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
            <span className="hidden mx-2 smm:block smm:text-sm md:text-lg">Max</span>
          </div>
        </div>
      </div>
      
      <div className="h-2 relative bg-gris rounded-md">
        <div id="range-progress" className="absolute h-full bg-azul rounded-md"
          style={{ left: `${minPricePercentage}%`, right: `${maxPricePercentage}%` }}>
        </div>
      </div>
      
      <div id="range-input" className="relative">
        <input type="range" id="range-min" 
        className="rounded-md appearance-none bg-transparent absolute w-full h-2 top-[-8px] pointer-events-none" 
        min="0" max="1000" step="10" value={minPrice} onChange={handleMinPriceChange}/>

        <input type="range" id="range-max" 
        className="rounded-md appearance-none bg-transparent absolute w-full h-2 top-[-8px] pointer-events-none" 
        min="0" max="1000" step="10" value={maxPrice} onChange={handleMaxPriceChange}/>
      </div>
    </div>
  );
};
