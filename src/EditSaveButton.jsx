import React from "react";
import { Pencil, Save } from "lucide-react"; // ✅ This is the line you're asking about

export function EditSaveButton({ editing, onToggle }) {
  return (
    <button className="icon-button" onClick={onToggle} title={editing ? "Save" : "Edit"}>
      {editing ? <Save size={18} /> : <Pencil size={18} />}
    </button>
  );
}
