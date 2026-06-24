export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Report Accident
        </h1>

        <form className="space-y-6">

          {/* Location */}
          <div>
            <label className="block font-medium mb-2">
              Accident Location
            </label>

            <input
              type="text"
              placeholder="Enter accident location"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block font-medium mb-2">
              Vehicle Type
            </label>

            <select className="w-full border rounded-lg p-3">
              <option>Car</option>
              <option>Bike</option>
              <option>Bus</option>
              <option>Truck</option>
              <option>Other</option>
            </select>
          </div>

          {/* Injured Count */}
          <div>
            <label className="block font-medium mb-2">
              Number of Injured
            </label>

            <input
              type="number"
              placeholder="Enter number"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-2">
              Accident Description
            </label>

            <textarea
              rows={5}
              placeholder="Describe the accident..."
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-2">
              Upload Image
            </label>

            <input
              type="file"
              className="w-full border rounded-lg p-3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
          >
            Submit Accident Report
          </button>

        </form>

      </div>

    </main>
  );
}