import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import LookupDropdown from "../components/LookupDropdown";
import ImageUpload from "../components/ImageUpload";
import { createItem } from "../api/items";

const initialForm = {
  name: "",
  brand: "",
  category: "",
  sport: "",
  unit: "",
  quantity: 0,
  reorderLevel: 0,
};

export default function ItemForm() {
  const [form, setForm] = useState(initialForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("brand", form.brand);
      payload.append("category", form.category);
      payload.append("sport", form.sport);
      payload.append("unit", form.unit);
      payload.append("quantity", form.quantity);
      payload.append("threshold", form.reorderLevel); // backend expects "threshold", form uses "reorderLevel"
      if (photoFile) {
        payload.append("photo", photoFile); // key "photo" must match multer's upload.single("photo")
      }

      await createItem(payload);
      navigate("/items");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not create item. Please check the form and try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Add Item</h2>
          <div className="sub">ITEMS / NEW</div>
        </div>
      </div>

      <div className="panel form-panel" style={{ maxWidth: "640px" }}>
        {error && (
          <div className="error-note" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label>Item Name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </div>

          <div className="form-row">
            <LookupDropdown
              field="brand"
              label="Brand"
              value={form.brand}
              onChange={(v) => setField("brand", v)}
            />
            <LookupDropdown
              field="unit"
              label="Unit"
              value={form.unit}
              onChange={(v) => setField("unit", v)}
              required
            />
          </div>

          <div className="form-row">
            <LookupDropdown
              field="category"
              label="Category"
              value={form.category}
              onChange={(v) => setField("category", v)}
              required
            />
            <LookupDropdown
              field="sport"
              label="Sport"
              value={form.sport}
              onChange={(v) => setField("sport", v)}
              required
            />
          </div>

          <div className="form-row">
            <div className="field">
              <label>Starting Qty</label>
              <input
                type="number"
                min="0"
                value={form.quantity}
                onChange={(e) => setField("quantity", Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Reorder Level</label>
              <input
                type="number"
                min="0"
                value={form.reorderLevel}
                onChange={(e) =>
                  setField("reorderLevel", Number(e.target.value))
                }
              />
            </div>
          </div>

          <ImageUpload onFileSelected={setPhotoFile} />

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary display"
              disabled={saving}
            >
              {saving ? "Saving…" : "Add Item"}
            </button>
            <button
              type="button"
              className="btn btn-ghost display"
              onClick={() => navigate("/items")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
