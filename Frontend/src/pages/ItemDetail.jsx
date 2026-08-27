import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ImageUpload from "../components/ImageUpload";
import { getItem, updateItem, deleteItem } from "../api/items";
import { useAuth } from "../context/AuthContext";
import { resolveImageUrl } from "../utils/media";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [photoFile, setPhotoFile] = useState(null);

  const [item, setItem] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getItem(id)
      .then((data) => {
        if (cancelled) return;
        setItem(data);
        setForm({
          name: data.name || "",
          brand: data.brand || "",
          category: data.category || "",
          sport: data.sport || "",
          unit: data.unit || "",
          quantity: data.quantity ?? data.onHand ?? 0,
          reorderLevel: data.reorderLevel ?? data.reorder_level ?? 0,
        });
      })
      .catch(() => {
        if (!cancelled) setError("Could not load this item.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSave() {
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
      payload.append("reorderLevel", form.reorderLevel);
      if (photoFile) {
        payload.append("photo", photoFile);
      }
      const updated = await updateItem(id, payload);
      setItem((prev) => ({ ...prev, ...updated }));
    } catch (err) {
      setError("Could not save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Delete "${item?.name}"? This cannot be undone.`))
      return;
    try {
      await deleteItem(id);
      navigate("/items");
    } catch (err) {
      setError("Could not delete this item.");
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading-note">Loading item…</div>
      </Layout>
    );
  }

  if (error && !item) {
    return (
      <Layout>
        <div className="error-note">{error}</div>
      </Layout>
    );
  }

  const qty = item.quantity ?? item.onHand ?? 0;
  const reorder = item.reorderLevel ?? item.reorder_level ?? 0;
  const isLow = qty <= reorder;
  const photoUrl = resolveImageUrl(item.photoUrl || item.photo_url);
  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Item Detail</h2>
          <div className="sub">ITEMS / {item.name?.toUpperCase()}</div>
        </div>
        {isAdmin && (
          <button className="btn btn-rust display" onClick={handleDelete}>
            Delete Item
          </button>
        )}
      </div>

      {error && <div className="error-note">{error}</div>}

      <div className="detail-grid">
        <div className="kit-tag-visual">
          <div className="perf"></div>
          <div className="inner">
            <div className="kit-id mono">ITEM-ID · {item.id}</div>
            <h2 className="display">{item.name}</h2>

            {photoUrl ? (
              <img src={photoUrl} alt={item.name} className="item-photo" />
            ) : (
              <div className="item-photo-placeholder">
                <span>NO PHOTO ON FILE</span>
              </div>
            )}

            <div className="meta-line">
              <span>
                Category: <b>{item.category}</b>
              </span>
              <span>
                Sport: <b>{item.sport}</b>
              </span>
              <span>
                Unit: <b>{item.unit}</b>
              </span>
              {item.brand && (
                <span>
                  Brand: <b>{item.brand}</b>
                </span>
              )}
            </div>
            <div className="meta-line">
              <span>
                On Hand: <b className="mono">{qty}</b>
              </span>
              <span>
                Reorder Level: <b className="mono">{reorder}</b>
              </span>
              {item.unitCost != null && (
                <span>
                  Unit Cost:{" "}
                  <b className="mono">
                    Rs {Number(item.unitCost).toLocaleString()}
                  </b>
                </span>
              )}
            </div>
            <div className={`stamp-status ${isLow ? "" : "ok"}`}>
              {isLow ? "LOW STOCK" : "IN STOCK"}
            </div>
          </div>
        </div>

        {isAdmin ? (
          <div className="panel form-panel">
            <h3
              className="display"
              style={{ marginBottom: "16px", fontSize: "15px" }}
            >
              Edit Details
              <ImageUpload
                existingUrl={photoUrl}
                onFileSelected={setPhotoFile}
              />
            </h3>
            <div className="form-row">
              <div className="field">
                <label>Item Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label>Brand</label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setForm({ ...form, brand: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>
              <div className="field">
                <label>Sport</label>
                <input
                  type="text"
                  value={form.sport}
                  onChange={(e) => setForm({ ...form, sport: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label>On Hand Qty</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: Number(e.target.value) })
                  }
                />
              </div>
              <div className="field">
                <label>Reorder Level</label>
                <input
                  type="number"
                  value={form.reorderLevel}
                  onChange={(e) =>
                    setForm({ ...form, reorderLevel: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <div className="form-actions">
              <button
                className="btn btn-primary display"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
              <button
                className="btn btn-ghost display"
                onClick={() => navigate("/items")}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="panel form-panel">
            <h3
              className="display"
              style={{ marginBottom: "16px", fontSize: "15px" }}
            >
              Details (Read-Only)
            </h3>
            <p style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
              You're viewing this item as committee. Editing is restricted to
              admin accounts.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
