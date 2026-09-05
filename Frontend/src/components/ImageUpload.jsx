import { useRef, useState } from 'react'

/**
 * Simple image picker with preview. Since the upload destination
 * (backend endpoint vs. object storage) hasn't been decided yet, this
 * component reads the file as a data URL for local preview and hands
 * the raw File object back via onFileSelected so the parent form can
 * wire it to whichever endpoint you settle on (e.g. append to the
 * items FormData payload, or POST separately to an upload endpoint).
 */
export default function ImageUpload({ existingUrl, onFileSelected }) {
  const [preview, setPreview] = useState(existingUrl || null)
  const inputRef = useRef(null)

  function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result)
    reader.readAsDataURL(file)
    onFileSelected?.(file)
  }

  return (
    <div className="field">
      <label>Item Photo</label>
      {preview ? (
        <img src={preview} alt="Preview" className="image-upload-preview" />
      ) : (
        <div className="image-upload-placeholder">NO PHOTO<br />SELECTED</div>
      )}
      <div style={{ marginTop: '8px' }}>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} />
      </div>
    </div>
  )
}
