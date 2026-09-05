import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { createDamagedRecord } from "../api/damagedRecords";
import { getItems } from "../api/items";

const initialForm = {
  itemId: "",
  quantity: 1,
  damageDescription: "",
  repairStatus: "Repairable",
  notes: "",
};

export default function DamagedRecordForm() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getItems()
      .then((data) => setItems(Array.isArray(data) ? data : data.items || []))
      .catch(() => setItems([]));
  }, []);

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createDamagedRecord(form);
      navigate("/damaged-records");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Could not submit this report. Please check the form.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Report Damaged Item</h2>
          <div className="sub">DAMAGED RECORDS / NEW</div>
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
            <label>Item *</label>
            <select
              required
              value={form.itemId}
              onChange={(e) => setField("itemId", e.target.value)}
            >
              <option value="">Select item</option>
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="field">
              <label>Quantity *</label>
              <input
                type="number"
                min="1"
                required
                value={form.quantity}
                onChange={(e) => setField("quantity", Number(e.target.value))}
              />
            </div>
            <div className="field">
              <label>Repair Status *</label>
              <select
                required
                value={form.repairStatus}
                onChange={(e) => setField("repairStatus", e.target.value)}
              >
                <option value="Repairable">Repairable</option>
                <option value="Needs Replacement">Needs Replacement</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Damage Description *</label>
            <input
              type="text"
              required
              value={form.damageDescription}
              onChange={(e) => setField("damageDescription", e.target.value)}
              placeholder="e.g. Cracked frame, torn stitching"
            />
          </div>

          <div className="field">
            <label>Notes</label>
            <textarea
              rows="3"
              value={form.notes}
              onChange={(e) => setField("notes", e.target.value)}
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary display"
              disabled={saving}
            >
              {saving ? "Submitting…" : "Submit Report"}
            </button>
            <button
              type="button"
              className="btn btn-ghost display"
              onClick={() => navigate("/damaged-records")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
