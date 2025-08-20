import { useState } from "react";
import API from "../../utils/api";
const initial = {
  name: "",
  description: "",
  category: "",
  material: "",
  cultivationType: "",
  colour: "",
  feature: "",
  type: "",
  country_of_origin: "",
  packagingType: "",
  selfLife: "",
  price: "",
  imageUrl: "",
  businessType: [],
  packSizes: [],
};

const ProductForm = ({ existing = {}, onDone }) => {
  const [form, setForm] = useState({ ...initial, ...existing });
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  const handleArray = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value.split(",").map((x) => x.trim()),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    Object.keys(form).forEach((k) => {
      if (Array.isArray(form[k])) data.append(k, form[k].join(","));
      else if (form[k]) data.append(k, form[k]);
    });
    if (file) data.append("image", file);

    try {
      if (existing._id) {
        await API.put(`/products/${existing._id}`, data);
      } else {
        await API.post("/products", data);
      }
      onDone();
    } catch (err) {
      alert("Failed to save product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-50 text-black p-6 rounded shadow mb-8 flex flex-col gap-3"
    >
      <h3 className="font-bold mb-2">
        {existing._id ? "Edit" : "Add"} Product
      </h3>
      <div className="flex flex-wrap gap-2">
        <input
          name="name"
          placeholder="Name"
          required
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="material"
          placeholder="Material"
          value={form.material}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="colour"
          placeholder="Colour"
          value={form.colour}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="feature"
          placeholder="Feature"
          value={form.feature}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="type"
          placeholder="Type"
          value={form.type}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="country_of_origin"
          placeholder="Country of origin"
          value={form.country_of_origin}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="packagingType"
          placeholder="Packaging Type"
          value={form.packagingType}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="selfLife"
          placeholder="Shelf Life"
          value={form.selfLife}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="businessType"
          placeholder="Business Types (comma separated)"
          value={form.businessType}
          onChange={handleArray}
          className="border px-3 py-2 rounded w-80"
        />
        <input
          name="packSizes"
          placeholder="Pack Sizes (comma separated)"
          value={form.packSizes}
          onChange={handleArray}
          className="border px-3 py-2 rounded w-80"
        />
      </div>
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border px-3 py-2 rounded w-full h-24"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mt-2"
      />
      <button
        className="bg-blue-800 text-white px-5 py-2 rounded font-bold"
        disabled={saving}
      >
        {saving ? "Saving..." : existing._id ? "Update" : "Add"}
      </button>
      <button
        type="button"
        className="mt-1 text-xs text-gray-600 underline"
        onClick={onDone}
      >
        Cancel
      </button>
    </form>
  );
};
export default ProductForm;
