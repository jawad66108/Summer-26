import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getPurchaseListLive, createPurchaseDraft } from "../api/reports";
import { useAuth } from "../context/AuthContext";

export default function PurchaseListLive() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getPurchaseListLive()
      .then((data) => setRows(Array.isArray(data) ? data : data.items || []))
      .catch(() => setError("Could not load the purchase list."))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreateDraft() {
    setCreating(true);
    setError("");
    try {
      const draft = await createPurchaseDraft();
      navigate(`/reports/purchase-list/draft/${draft.id}`);
    } catch (err) {
      setError("Could not create a draft. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  const units = rows.reduce(
    (sum, r) => sum + Number((r.reorderQty ?? r.reorder_qty) || 0),
    0,
  );
  const total = rows.reduce(
    (sum, r) =>
      sum +
      Number((r.reorderQty ?? r.reorder_qty) || 0) *
        Number(r.unitCost ?? r.unit_cost ?? 0),
    0,
  );

  return (
    <Layout>
      <div className="topbar">
        <div>
          <h2 className="display">Purchase List</h2>
          <div className="sub">
            {rows.length} LINE ITEMS · {units} UNITS TO PROCURE
          </div>
        </div>
        {isAdmin && (
          <button
            className="btn btn-primary display"
            onClick={handleCreateDraft}
            disabled={creating}
          >
            {creating ? "Creating…" : "Create Draft"}
          </button>
        )}
      </div>

      <div className="page-hero hero-purchase" />

      <div className="stat-row-3">
        <div className="stat-tag">
          <div className="label">Line Items</div>
          <div className="value mono">{rows.length}</div>
        </div>
        <div className="stat-tag">
          <div className="label">Units</div>
          <div className="value mono">{units}</div>
        </div>
        <div className="stat-tag">
          <div className="label">Estimated Cost</div>
          <div className="value mono">Rs {total.toLocaleString()}</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3 className="display">Requisition — Form 41</h3>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>

        {loading && <div className="loading-note">Loading purchase list…</div>}
        {error && <div className="error-note">{error}</div>}
        {!loading && !error && rows.length === 0 && (
          <div className="empty-note">Nothing to reorder right now.</div>
        )}

        {!loading && !error && rows.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>On Hand</th>
                <th>Qty</th>
                <th>Unit Rate</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <b>{r.name}</b>
                  </td>
                  <td>{r.category}</td>
                  <td className="mono-cell">{r.quantity ?? r.onHand}</td>
                  <td className="mono-cell">{r.reorderQty ?? r.reorder_qty}</td>
                  <td className="mono-cell">
                    Rs {Number(r.unitCost ?? r.unit_cost ?? 0).toLocaleString()}
                  </td>
                  <td className="mono-cell">
                    Rs{" "}
                    {(
                      ((r.reorderQty ?? r.reorder_qty) || 0) *
                      (r.unitCost ?? r.unit_cost ?? 0)
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="table-total-row">
                <td colSpan={5} className="total-label">
                  Total Estimate
                </td>
                <td className="mono-cell">Rs {total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        )}

        {!loading && !error && rows.length > 0 && (
          <div className="signature-panel">
            <div className="signature-line">Prepared By</div>
            <div className="signature-line">Checked By</div>
            <div className="signature-line">Approved By</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
