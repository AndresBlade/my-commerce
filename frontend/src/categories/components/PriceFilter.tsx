
export const PriceFilter = () => {
  return (
    <div className="w-full bg-white rounded-lg p-5 shadow-lg my-4">
      <header>
        <h1 className="text-2xl font-semibold">Precio</h1>
        <p className="mt-2 text-lg">Selecciona el rango</p>
      </header>
      <div className="flex mt-8 items-center mb-8">
        <div className="flex">
          <div className="flex items-center">
            <span className="mr-2">Min</span>
            <input
              type="number"
              className="w-full text-center py-2 px-3 ring-2 ring-gris rounded-sm"
            />
          </div>
        </div>
        <div className="mx-3">-</div>
        <div className="flex">  
          <div className="flex items-center">
            <input
              type="number"
              className="w-full text-center py-2 px-3 ring-2 ring-gris rounded-sm"
            />
            <span className="mx-2">Max</span>
          </div>
        </div>
      </div>
      
        <div className="h-2 relative bg-gris rounded-md">
          <div className="absolute h-full bg-azul rounded-md"></div>
        </div>
      
      <div className="relative">
        <input type="range" className="absolute w-full h-2 top-[-8px]" min="0" max="10000" step="100"/>
      </div>
    </div>
  );
};
