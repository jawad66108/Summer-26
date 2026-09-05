import client from "./client";

export async function getItems(params = {}) {
  const res = await client.get("/items", { params });
  return res.data;
}

export async function getItem(id) {
  const res = await client.get(`/items/${id}`);
  return res.data;
}

export async function createItem(payload) {
  const res = await client.post("/items", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateItem(id, payload) {
  const res = await client.put(`/items/${id}`, payload);
  return res.data;
}

export async function deleteItem(id) {
  const res = await client.delete(`/items/${id}`);
  return res.data;
}
