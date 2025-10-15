export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center">
          {/* Logo centered and enlarged */}
          <img src="/accordlogo.png" alt="Accord Medical Supplies" className="h-24 w-auto object-contain mb-4" />
          
          <div className="flex items-center justify-center w-full">
            <div className="flex items-center gap-4">
              <div className="border-l-2 border-gray-200 pl-4 hidden sm:block">
                <h1 className="text-2xl font-bold text-dark">Accord Medical Supplies</h1>
                <p className="text-sm text-gray-600">Your trusted partner in medical supplies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-5">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center">Client Feedback Form</h2>
          <p className="text-center text-sm mt-1 text-blue-100">
            We value your feedback and strive to serve you better
          </p>
        </div>
      </div>
    </header>
  )
}
